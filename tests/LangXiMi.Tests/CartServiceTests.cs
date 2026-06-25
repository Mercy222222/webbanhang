using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Moq;
using Xunit;
using LangXiMi.Models;
using LangXiMi.Services;
using System.Text;

namespace LangXiMi.Tests
{
    public class CartServiceTests
    {
        private readonly Mock<IHttpContextAccessor> _mockHttpContextAccessor;
        private readonly Mock<HttpContext> _mockHttpContext;
        private readonly Mock<ISession> _mockSession;
        private readonly CartService _cartService;

        public CartServiceTests()
        {
            _mockHttpContextAccessor = new Mock<IHttpContextAccessor>();
            _mockHttpContext = new Mock<HttpContext>();
            _mockSession = new Mock<ISession>();

            _mockHttpContext.Setup(c => c.Session).Returns(_mockSession.Object);
            _mockHttpContextAccessor.Setup(x => x.HttpContext).Returns(_mockHttpContext.Object);

            _cartService = new CartService(_mockHttpContextAccessor.Object);
        }

        // --- Fake Session Storage cho Moq ---
        private void SetupSessionData(string key, string data)
        {
            var bytes = data == null ? null : Encoding.UTF8.GetBytes(data);
            _mockSession.Setup(s => s.TryGetValue(key, out bytes)).Returns(data != null);
        }

        [Fact]
        public void GetCart_EmptySession_ReturnsEmptyList()
        {
            // Arrange
            SetupSessionData("CART_LANGXIMI", null!);

            // Act
            var cart = _cartService.GetCart();

            // Assert
            Assert.NotNull(cart);
            Assert.Empty(cart);
        }

        [Fact]
        public void AddToCart_NewProduct_AddsItemToCart()
        {
            // Arrange
            SetupSessionData("CART_LANGXIMI", null!); // Giỏ trống lúc đầu
            
            var product = new Product 
            { 
                ProductId = 1, 
                ProductName = "Bánh Sinh Nhật", 
                Price = 100000 
            };

            // Bắt sự kiện SetString để kiểm tra xem JSON có được lưu đúng không
            string savedJson = "";
            _mockSession.Setup(s => s.Set(It.IsAny<string>(), It.IsAny<byte[]>()))
                .Callback<string, byte[]>((k, v) => savedJson = Encoding.UTF8.GetString(v));

            // Act
            _cartService.AddToCart(product, 2);

            // Assert
            _mockSession.Verify(s => s.Set(It.Is<string>(k => k == "CART_LANGXIMI"), It.IsAny<byte[]>()), Times.Once);
            var savedCart = JsonSerializer.Deserialize<List<CartItem>>(savedJson);
            Assert.NotNull(savedCart);
            Assert.Contains(savedCart, c => c.ProductName == "Bánh Sinh Nhật" && c.Quantity == 2);
        }

        [Fact]
        public void UpdateQuantity_ExistingProduct_UpdatesCorrectly()
        {
            // Arrange
            var initialCart = new List<CartItem> 
            { 
                new CartItem { ProductId = 1, ProductName = "Bánh Mì", Quantity = 1 } 
            };
            SetupSessionData("CART_LANGXIMI", JsonSerializer.Serialize(initialCart));

            string savedJson = "";
            _mockSession.Setup(s => s.Set(It.IsAny<string>(), It.IsAny<byte[]>()))
                .Callback<string, byte[]>((k, v) => savedJson = Encoding.UTF8.GetString(v));

            // Act
            _cartService.UpdateQuantity(1, 5); // Tăng lên 5

            // Assert
            Assert.Contains("\"Quantity\":5", savedJson);
        }

        [Fact]
        public void UpdateQuantity_ZeroQuantity_RemovesItem()
        {
            // Arrange
            var initialCart = new List<CartItem> 
            { 
                new CartItem { ProductId = 1, ProductName = "Bánh Mì", Quantity = 2 } 
            };
            SetupSessionData("CART_LANGXIMI", JsonSerializer.Serialize(initialCart));

            string savedJson = "";
            _mockSession.Setup(s => s.Set(It.IsAny<string>(), It.IsAny<byte[]>()))
                .Callback<string, byte[]>((k, v) => savedJson = Encoding.UTF8.GetString(v));

            // Act
            _cartService.UpdateQuantity(1, 0); // Số lượng 0 -> Xóa

            // Assert
            Assert.Equal("[]", savedJson); // Giỏ hàng rỗng
        }
    }
}
