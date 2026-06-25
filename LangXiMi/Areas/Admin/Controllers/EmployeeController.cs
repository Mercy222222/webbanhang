using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LangXiMi.Data;
using LangXiMi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace LangXiMi.Areas.Admin.Controllers;

[Area("Admin")]
[Authorize(Roles = "Administrator")]
public class EmployeeController : Controller
{
    private readonly LangXiMiDbContext _db;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly ILogger<EmployeeController> _logger;

    public EmployeeController(
        LangXiMiDbContext db,
        UserManager<ApplicationUser> userManager,
        RoleManager<IdentityRole> roleManager,
        ILogger<EmployeeController> logger)
    {
        _db = db;
        _userManager = userManager;
        _roleManager = roleManager;
        _logger = logger;
    }

    public async Task<IActionResult> Index()
    {
        var employees = await _db.Employees
            .Include(e => e.User)
            .OrderByDescending(e => e.EmployeeId)
            .ToListAsync();
        return View(employees);
    }

    [HttpGet]
    public IActionResult Create() => View(new AdminEmployeeViewModel());

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(AdminEmployeeViewModel vm)
    {
        if (vm.CreateAccount && string.IsNullOrWhiteSpace(vm.AccountPassword))
            ModelState.AddModelError(nameof(vm.AccountPassword), "Vui lòng nhập mật khẩu cho tài khoản.");

        if (await _db.Employees.AnyAsync(e => e.MaNhanVien == vm.MaNhanVien))
            ModelState.AddModelError(nameof(vm.MaNhanVien), "Mã nhân viên đã tồn tại.");

        if (!ModelState.IsValid)
            return View(vm);

        var employee = new Employee
        {
            MaNhanVien = vm.MaNhanVien,
            FullName = vm.FullName,
            CCCD = vm.CCCD,
            Phone = vm.Phone,
            Email = vm.Email,
            Address = vm.Address,
            Position = vm.Position,
            TrangThai = vm.TrangThai,
            NgayVaoLam = vm.NgayVaoLam
        };

        // Create account if requested
        if (vm.CreateAccount && !string.IsNullOrWhiteSpace(vm.Email))
        {
            var user = new ApplicationUser
            {
                UserName = vm.Email,
                Email = vm.Email,
                FullName = vm.FullName,
                PhoneNumber = vm.Phone,
                EmailConfirmed = true
            };

            var result = await _userManager.CreateAsync(user, vm.AccountPassword!);
            if (!result.Succeeded)
            {
                foreach (var error in result.Errors)
                    ModelState.AddModelError(string.Empty, error.Description);
                return View(vm);
            }

            // Assign role based on position
            var roleName = vm.Position == EmployeePosition.QuanLy ? "Administrator" : "Staff";
            if (!await _roleManager.RoleExistsAsync(roleName))
                await _roleManager.CreateAsync(new IdentityRole(roleName));
            await _userManager.AddToRoleAsync(user, roleName);

            employee.UserId = user.Id;
        }

        _db.Employees.Add(employee);
        await _db.SaveChangesAsync();

        _logger.LogInformation("Admin: Thêm nhân viên {MaNV} - {Name}", vm.MaNhanVien, vm.FullName);
        TempData["Success"] = $"Đã thêm nhân viên \"{vm.FullName}\" thành công!";
        return RedirectToAction(nameof(Index));
    }

    [HttpGet]
    public async Task<IActionResult> Edit(int id)
    {
        var emp = await _db.Employees.FindAsync(id);
        if (emp is null) return NotFound();

        var vm = new AdminEmployeeViewModel
        {
            EmployeeId = emp.EmployeeId,
            MaNhanVien = emp.MaNhanVien,
            FullName = emp.FullName,
            CCCD = emp.CCCD,
            Phone = emp.Phone,
            Email = emp.Email,
            Address = emp.Address,
            Position = emp.Position,
            TrangThai = emp.TrangThai,
            NgayVaoLam = emp.NgayVaoLam
        };
        return View(vm);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Edit(AdminEmployeeViewModel vm)
    {
        // Don't validate account fields on edit
        ModelState.Remove(nameof(vm.AccountPassword));

        if (!ModelState.IsValid)
            return View(vm);

        var emp = await _db.Employees.FindAsync(vm.EmployeeId);
        if (emp is null) return NotFound();

        emp.FullName = vm.FullName;
        emp.CCCD = vm.CCCD;
        emp.Phone = vm.Phone;
        emp.Email = vm.Email;
        emp.Address = vm.Address;
        emp.Position = vm.Position;
        emp.TrangThai = vm.TrangThai;

        await _db.SaveChangesAsync();

        TempData["Success"] = $"Đã cập nhật nhân viên \"{vm.FullName}\".";
        return RedirectToAction(nameof(Index));
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> ToggleStatus(int id, EmployeeStatus status)
    {
        var emp = await _db.Employees.FindAsync(id);
        if (emp is null) return NotFound();

        emp.TrangThai = status;
        await _db.SaveChangesAsync();

        TempData["Success"] = $"Đã cập nhật trạng thái nhân viên \"{emp.FullName}\".";
        return RedirectToAction(nameof(Index));
    }
}
