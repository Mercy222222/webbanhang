using Microsoft.AspNetCore.Mvc;
using LangXiMi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;

namespace LangXiMi.Areas.Admin.Controllers;

[Area("Admin")]
[Authorize(Roles = "Administrator")]
public class UserController : Controller
{
    private readonly UserManager<ApplicationUser> _userManager;

    public UserController(UserManager<ApplicationUser> userManager)
        => _userManager = userManager;

    public async Task<IActionResult> Index()
    {
        var users = _userManager.Users.ToList();
        var list = new List<UserManagementItem>();

        foreach (var u in users)
        {
            var roles = await _userManager.GetRolesAsync(u);
            list.Add(new UserManagementItem
            {
                UserId = u.Id,
                Email = u.Email ?? "",
                FullName = u.FullName,
                Role = string.Join(", ", roles),
                IsLockedOut = await _userManager.IsLockedOutAsync(u),
                LockoutEnd = u.LockoutEnd
            });
        }
        return View(list);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> ToggleLock(string userId)
    {
        var user = await _userManager.FindByIdAsync(userId);
        if (user is null) return NotFound();

        // Don't allow locking yourself
        if (user.Email == User.Identity?.Name)
        {
            TempData["Error"] = "Không thể khóa chính tài khoản của bạn.";
            return RedirectToAction(nameof(Index));
        }

        bool isLocked = await _userManager.IsLockedOutAsync(user);
        if (isLocked)
        {
            // Unlock
            await _userManager.SetLockoutEndDateAsync(user, null);
            TempData["Success"] = $"Đã mở khóa tài khoản \"{user.Email}\".";
        }
        else
        {
            // Lock for 100 years (essentially permanent)
            await _userManager.SetLockoutEnabledAsync(user, true);
            await _userManager.SetLockoutEndDateAsync(user, DateTimeOffset.UtcNow.AddYears(100));
            TempData["Success"] = $"Đã khóa tài khoản \"{user.Email}\".";
        }

        return RedirectToAction(nameof(Index));
    }
}
