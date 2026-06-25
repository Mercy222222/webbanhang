using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LangXiMi.Data;
using LangXiMi.Models;
using Microsoft.AspNetCore.Authorization;

namespace LangXiMi.Areas.Admin.Controllers;

[Area("Admin")]
[Authorize(Roles = "Administrator")]
public class DashboardController : Controller
{
    private readonly LangXiMiDbContext _db;

    public DashboardController(LangXiMiDbContext db) => _db = db;

    public async Task<IActionResult> Index()
    {
        var today = DateTime.Today;
        var monthStart = new DateTime(today.Year, today.Month, 1);

        var vm = new DashboardViewModel
        {
            TotalOrders = await _db.Orders.CountAsync(),
            PendingOrders = await _db.Orders.CountAsync(o => o.Status == OrderStatus.ChoXacNhan),
            TotalProducts = await _db.Products.CountAsync(p => p.IsActive),
            TotalCustomers = await _db.Customers.CountAsync(),
            TodayRevenue = await _db.Orders
                .Where(o => o.OrderDate.Date == today && o.Status != OrderStatus.DaHuy)
                .SumAsync(o => o.TotalAmount),
            MonthRevenue = await _db.Orders
                .Where(o => o.OrderDate >= monthStart && o.Status != OrderStatus.DaHuy)
                .SumAsync(o => o.TotalAmount),
            RecentOrders = await _db.Orders
                .Include(o => o.Customer)
                .OrderByDescending(o => o.OrderDate)
                .Take(10)
                .ToListAsync(),
            TopProducts = await _db.OrderDetails
                .Include(d => d.Product)
                .GroupBy(d => d.Product!.ProductName)
                .Select(g => new TopProductItem
                {
                    ProductName = g.Key,
                    TotalSold = g.Sum(d => d.Quantity),
                    TotalRevenue = g.Sum(d => d.Quantity * d.UnitPrice)
                })
                .OrderByDescending(x => x.TotalSold)
                .Take(5)
                .ToListAsync()
        };
        return View(vm);
    }
}
