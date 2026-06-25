using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LangXiMi.Data;
using LangXiMi.Models;

namespace LangXiMi.Controllers;

public class HomeController : Controller
{
    private readonly LangXiMiDbContext _db;

    public HomeController(LangXiMiDbContext db) => _db = db;

    public async Task<IActionResult> Index()
    {
        var categories = await _db.Categories
            .Include(c => c.Products.Where(p => p.IsActive))
            .OrderBy(c => c.CategoryName)
            .ToListAsync();

        // Lấy một số sản phẩm nổi bật để hiển thị trên trang chủ
        var featuredProducts = await _db.Products
            .Include(p => p.Category)
            .Where(p => p.IsActive && p.StockQuantity > 0)
            .OrderByDescending(p => p.Price)
            .Take(6)
            .ToListAsync();

        ViewBag.FeaturedProducts = featuredProducts;
        return View(categories);
    }

    public IActionResult Privacy()
    {
        return View();
    }
}
