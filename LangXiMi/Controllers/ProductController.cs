using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LangXiMi.Data;
using LangXiMi.Models;

namespace LangXiMi.Controllers;

public class ProductController : Controller
{
    private readonly LangXiMiDbContext _db;

    public ProductController(LangXiMiDbContext db) => _db = db;

    // Danh sách sản phẩm + lọc danh mục + tìm kiếm
    public async Task<IActionResult> Index(int? categoryId, string? search)
    {
        var query = _db.Products
            .Include(p => p.Category)
            .Where(p => p.IsActive)
            .AsQueryable();

        if (categoryId.HasValue)
            query = query.Where(p => p.CategoryId == categoryId.Value);

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(p => p.ProductName.Contains(search));

        var vm = new ProductCatalogViewModel
        {
            Categories         = await _db.Categories.OrderBy(c => c.CategoryName).ToListAsync(),
            Products           = await query.OrderBy(p => p.ProductName).ToListAsync(),
            SelectedCategoryId = categoryId,
            SearchKeyword      = search
        };
        return View(vm);
    }

    // Chi tiết sản phẩm
    public async Task<IActionResult> Detail(int id)
    {
        var product = await _db.Products
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.ProductId == id && p.IsActive);

        if (product is null) return NotFound();
        return View(product);
    }
}
