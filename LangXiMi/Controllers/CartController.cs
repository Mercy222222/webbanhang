using LangXiMi.Data;
using LangXiMi.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LangXiMi.Controllers;

public class CartController : Controller
{
    private readonly CartService _cartService;
    private readonly LangXiMiDbContext _context;

    public CartController(CartService cartService, LangXiMiDbContext context)
    {
        _cartService = cartService;
        _context = context;
    }

    [HttpGet]
    public IActionResult Index()
    {
        return View(_cartService.GetCart());
    }

    [HttpPost]
    public async Task<IActionResult> AddToCart(int productId, int quantity = 1)
    {
        var product = await _context.Products
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.ProductId == productId);

        if (product == null || !product.IsActive)
        {
            return Json(new { success = false, message = "Sản phẩm không tồn tại hoặc đã ngừng bán." });
        }

        _cartService.AddToCart(product, quantity);

        return Json(new 
        { 
            success = true, 
            message = "Đã thêm vào giỏ hàng!",
            cartCount = _cartService.GetItemCount()
        });
    }

    [HttpPost]
    public IActionResult UpdateQuantity(int productId, int quantity)
    {
        _cartService.UpdateQuantity(productId, quantity);
        var cart = _cartService.GetCart();
        var item = cart.FirstOrDefault(c => c.ProductId == productId);
        
        return Json(new 
        { 
            success = true,
            lineTotal = item?.LineTotal ?? 0,
            grandTotal = cart.Sum(c => c.LineTotal),
            cartCount = _cartService.GetItemCount()
        });
    }

    [HttpPost]
    public IActionResult RemoveItem(int productId)
    {
        _cartService.RemoveItem(productId);
        var cart = _cartService.GetCart();

        return Json(new 
        { 
            success = true,
            grandTotal = cart.Sum(c => c.LineTotal),
            cartCount = _cartService.GetItemCount()
        });
    }
}
