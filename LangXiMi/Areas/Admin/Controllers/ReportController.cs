using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LangXiMi.Data;
using LangXiMi.Models;
using Microsoft.AspNetCore.Authorization;

namespace LangXiMi.Areas.Admin.Controllers;

[Area("Admin")]
[Authorize(Roles = "Administrator,Staff")]
public class ReportController : Controller
{
    private readonly LangXiMiDbContext _db;

    public ReportController(LangXiMiDbContext db) => _db = db;

    public async Task<IActionResult> Index(string period = "month", DateTime? from = null, DateTime? to = null)
    {
        var toDate = to ?? DateTime.Today;
        var fromDate = from ?? toDate.AddMonths(-1);

        var completedOrders = _db.Orders
            .Where(o => o.Status != OrderStatus.DaHuy
                     && o.OrderDate >= fromDate
                     && o.OrderDate <= toDate.AddDays(1));

        var vm = new RevenueReportViewModel
        {
            Period = period,
            FromDate = fromDate,
            ToDate = toDate,
            TotalRevenue = await completedOrders.SumAsync(o => o.TotalAmount),
            TotalOrders = await completedOrders.CountAsync(),
            TopProducts = await _db.OrderDetails
                .Include(d => d.Order)
                .Include(d => d.Product)
                .Where(d => d.Order!.Status != OrderStatus.DaHuy
                         && d.Order.OrderDate >= fromDate
                         && d.Order.OrderDate <= toDate.AddDays(1))
                .GroupBy(d => d.Product!.ProductName)
                .Select(g => new TopProductItem
                {
                    ProductName = g.Key,
                    TotalSold = g.Sum(d => d.Quantity),
                    TotalRevenue = g.Sum(d => d.Quantity * d.UnitPrice)
                })
                .OrderByDescending(x => x.TotalSold)
                .Take(10)
                .ToListAsync()
        };

        // Build chart data based on period
        if (period == "day")
        {
            vm.ChartData = await completedOrders
                .GroupBy(o => o.OrderDate.Date)
                .Select(g => new RevenueDataPoint
                {
                    Label = g.Key.ToString("dd/MM"),
                    Revenue = g.Sum(o => o.TotalAmount),
                    OrderCount = g.Count()
                })
                .OrderBy(x => x.Label)
                .ToListAsync();
        }
        else if (period == "quarter")
        {
            var data = await completedOrders.ToListAsync();
            vm.ChartData = data
                .GroupBy(o => $"Q{(o.OrderDate.Month - 1) / 3 + 1}/{o.OrderDate.Year}")
                .Select(g => new RevenueDataPoint
                {
                    Label = g.Key,
                    Revenue = g.Sum(o => o.TotalAmount),
                    OrderCount = g.Count()
                })
                .OrderBy(x => x.Label)
                .ToList();
        }
        else // month
        {
            var data = await completedOrders.ToListAsync();
            vm.ChartData = data
                .GroupBy(o => o.OrderDate.ToString("MM/yyyy"))
                .Select(g => new RevenueDataPoint
                {
                    Label = g.Key,
                    Revenue = g.Sum(o => o.TotalAmount),
                    OrderCount = g.Count()
                })
                .OrderBy(x => x.Label)
                .ToList();
        }

        return View(vm);
    }
}
