using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LangXiMi.Data;
using LangXiMi.Models;
using Microsoft.AspNetCore.Authorization;

namespace LangXiMi.Areas.Admin.Controllers;

[Area("Admin")]
[Authorize(Roles = "Administrator,Staff")]
public class OrderController : Controller
{
    private readonly LangXiMiDbContext _db;

    public OrderController(LangXiMiDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> Index()
    {
        var orders = await _db.Orders
            .Include(o => o.Customer)
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync();
        return View(orders);
    }

    [HttpGet]
    public async Task<IActionResult> Details(int id)
    {
        var order = await _db.Orders
            .Include(o => o.Customer)
            .Include(o => o.OrderDetails)
                .ThenInclude(d => d.Product)
            .FirstOrDefaultAsync(o => o.OrderId == id);

        if (order == null) return NotFound();

        return View(order);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> UpdateStatus(int id, string status)
    {
        var order = await _db.Orders.FirstOrDefaultAsync(o => o.OrderId == id);
        if (order == null) return NotFound();

        order.Status = status;
        await _db.SaveChangesAsync();

        TempData["Success"] = $"Đã cập nhật trạng thái đơn hàng #{id} thành {status}";
        return RedirectToAction(nameof(Details), new { id });
    }
}
