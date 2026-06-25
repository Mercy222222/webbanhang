using System.Text.Json;
using LangXiMi.Models;

namespace LangXiMi.Services;

/// <summary>
/// Quản lý giỏ hàng qua ISession (JSON serialization)
/// Đăng ký: builder.Services.AddScoped&lt;CartService&gt;()
/// </summary>
public class CartService
{
    private const string CartKey = "CART_LANGXIMI";
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CartService(IHttpContextAccessor httpContextAccessor)
        => _httpContextAccessor = httpContextAccessor;

    private ISession Session
        => _httpContextAccessor.HttpContext!.Session;

    // ── Đọc giỏ hàng từ Session ─────────────────────────────────────────────
    public List<CartItem> GetCart()
    {
        var json = Session.GetString(CartKey);
        return json is null
            ? new List<CartItem>()
            : JsonSerializer.Deserialize<List<CartItem>>(json)!;
    }

    // ── Lưu giỏ hàng vào Session ────────────────────────────────────────────
    private void SaveCart(List<CartItem> cart)
        => Session.SetString(CartKey, JsonSerializer.Serialize(cart));

    // ── Thêm / tăng số lượng sản phẩm ─────────────────────────────────────
    public void AddToCart(Product product, int quantity = 1)
    {
        var cart = GetCart();
        var existing = cart.FirstOrDefault(c => c.ProductId == product.ProductId);
        if (existing is not null)
            existing.Quantity += quantity;
        else
            cart.Add(new CartItem
            {
                ProductId    = product.ProductId,
                CategoryId   = product.CategoryId,
                CategoryName = product.Category?.CategoryName ?? "",
                ProductName  = product.ProductName,
                UnitPrice    = product.Price,
                Quantity     = quantity,
                ImageUrl     = product.ImageUrl
            });
        SaveCart(cart);
    }

    // ── Cập nhật số lượng ───────────────────────────────────────────────────
    public void UpdateQuantity(int productId, int quantity)
    {
        var cart = GetCart();
        var item = cart.FirstOrDefault(c => c.ProductId == productId);
        if (item is null) return;
        if (quantity <= 0) cart.Remove(item);
        else item.Quantity = quantity;
        SaveCart(cart);
    }

    // ── Xóa 1 sản phẩm ──────────────────────────────────────────────────────
    public void RemoveItem(int productId)
    {
        var cart = GetCart();
        cart.RemoveAll(c => c.ProductId == productId);
        SaveCart(cart);
    }

    // ── Xóa toàn bộ giỏ hàng (sau khi đặt hàng thành công) ─────────────────
    public void ClearCart() => Session.Remove(CartKey);

    // ── Đếm số lượng items ───────────────────────────────────────────────────
    public int GetItemCount() => GetCart().Sum(c => c.Quantity);
}
