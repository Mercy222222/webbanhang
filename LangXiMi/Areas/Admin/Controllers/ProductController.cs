using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LangXiMi.Data;
using LangXiMi.Models;
using Microsoft.AspNetCore.Authorization;

namespace LangXiMi.Areas.Admin.Controllers;

[Area("Admin")]
[Authorize(Roles = "Administrator,Staff")]
public class ProductController : Controller
{
    private readonly LangXiMiDbContext _db;
    private readonly IWebHostEnvironment _env;
    private readonly ILogger<ProductController> _logger;

    public ProductController(LangXiMiDbContext db, IWebHostEnvironment env, ILogger<ProductController> logger)
    {
        _db = db;
        _env = env;
        _logger = logger;
    }

    public async Task<IActionResult> Index()
    {
        var products = await _db.Products
            .Include(p => p.Category)
            .OrderByDescending(p => p.ProductId)
            .ToListAsync();
        return View(products);
    }

    [HttpGet]
    public async Task<IActionResult> Create()
    {
        var vm = new AdminProductViewModel
        {
            Categories = await _db.Categories.OrderBy(c => c.CategoryName).ToListAsync()
        };
        return View(vm);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(AdminProductViewModel vm)
    {
        vm.Categories = await _db.Categories.OrderBy(c => c.CategoryName).ToListAsync();

        if (!ModelState.IsValid)
            return View(vm);

        var product = new Product
        {
            CategoryId = vm.CategoryId,
            ProductName = vm.ProductName,
            Price = vm.Price,
            StockQuantity = vm.StockQuantity,
            IsActive = vm.IsActive
        };

        // Upload image
        if (vm.ImageFile is { Length: > 0 })
        {
            product.ImageUrl = await SaveImageAsync(vm.ImageFile);
        }

        _db.Products.Add(product);
        await _db.SaveChangesAsync();

        _logger.LogInformation("Admin: Thêm sản phẩm mới '{Name}' (ID={Id})", product.ProductName, product.ProductId);
        TempData["Success"] = $"Đã thêm sản phẩm \"{product.ProductName}\" thành công!";
        return RedirectToAction(nameof(Index));
    }

    [HttpGet]
    public async Task<IActionResult> Edit(int id)
    {
        var product = await _db.Products.FindAsync(id);
        if (product is null) return NotFound();

        var vm = new AdminProductViewModel
        {
            ProductId = product.ProductId,
            CategoryId = product.CategoryId,
            ProductName = product.ProductName,
            Price = product.Price,
            StockQuantity = product.StockQuantity,
            IsActive = product.IsActive,
            ExistingImageUrl = product.ImageUrl,
            Categories = await _db.Categories.OrderBy(c => c.CategoryName).ToListAsync()
        };
        return View(vm);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(AdminProductViewModel vm)
    {
        vm.Categories = await _db.Categories.OrderBy(c => c.CategoryName).ToListAsync();

        if (!ModelState.IsValid)
            return View(vm);

        var product = await _db.Products.FindAsync(vm.ProductId);
        if (product is null) return NotFound();

        product.CategoryId = vm.CategoryId;
        product.ProductName = vm.ProductName;
        product.Price = vm.Price;
        product.StockQuantity = vm.StockQuantity;
        product.IsActive = vm.IsActive;

        if (vm.ImageFile is { Length: > 0 })
        {
            product.ImageUrl = await SaveImageAsync(vm.ImageFile);
        }

        await _db.SaveChangesAsync();

        _logger.LogInformation("Admin: Cập nhật sản phẩm '{Name}' (ID={Id})", product.ProductName, product.ProductId);
        TempData["Success"] = $"Đã cập nhật sản phẩm \"{product.ProductName}\"!";
        return RedirectToAction(nameof(Index));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> ToggleActive(int id)
    {
        var product = await _db.Products.FindAsync(id);
        if (product is null) return NotFound();

        product.IsActive = !product.IsActive;
        await _db.SaveChangesAsync();

        var state = product.IsActive ? "hiển thị" : "ẩn";
        TempData["Success"] = $"Đã {state} sản phẩm \"{product.ProductName}\".";
        return RedirectToAction(nameof(Index));
    }

    // ── Helper: Save uploaded image ─────────────────────────────────
    private async Task<string> SaveImageAsync(IFormFile file)
    {
        var uploadsDir = Path.Combine(_env.WebRootPath, "images", "products");
        Directory.CreateDirectory(uploadsDir);

        var fileName = $"{Guid.NewGuid():N}{Path.GetExtension(file.FileName)}";
        var filePath = Path.Combine(uploadsDir, fileName);

        await using var stream = new FileStream(filePath, FileMode.Create);
        await file.CopyToAsync(stream);

        return $"/images/products/{fileName}";
    }
}
