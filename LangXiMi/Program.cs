using LangXiMi.Data;
using LangXiMi.Models;
using LangXiMi.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// ── 1. DbContext (Database-First) ────────────────────────────────────────────
builder.Services.AddDbContext<LangXiMiDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("LangXiMiConnection")));

builder.Services.AddIdentity<ApplicationUser, IdentityRole>(options =>
{
    // Hạ yêu cầu mật khẩu để hỗ trợ mật khẩu đơn giản
    options.Password.RequireUppercase = false;
    options.Password.RequiredLength = 6;
})
    .AddEntityFrameworkStores<LangXiMiDbContext>()
    .AddDefaultTokenProviders();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.LoginPath = "/Account/Login";
    options.AccessDeniedPath = "/Account/AccessDenied";
    options.ExpireTimeSpan = TimeSpan.FromHours(1);
});

// ── 2. Session (dùng cho giỏ hàng) ─────────────────────────────────────────
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout        = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly    = true;
    options.Cookie.IsEssential = true;
    options.Cookie.Name        = ".LangXiMi.Session";
});
builder.Services.AddHttpContextAccessor();

// ── 3. CartService ───────────────────────────────────────────────────────────
builder.Services.AddScoped<CartService>();

// ── 4. MVC ───────────────────────────────────────────────────────────────────
builder.Services.AddControllersWithViews();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();
    var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();

    if (!await roleManager.RoleExistsAsync("Administrator"))
        await roleManager.CreateAsync(new IdentityRole("Administrator"));
    if (!await roleManager.RoleExistsAsync("Staff"))
        await roleManager.CreateAsync(new IdentityRole("Staff"));
    if (!await roleManager.RoleExistsAsync("Customer"))
        await roleManager.CreateAsync(new IdentityRole("Customer"));

    var adminEmail = "admin@langximi.vn";
    var existingAdmin = await userManager.FindByEmailAsync(adminEmail);
    if (existingAdmin != null)
    {
        // Update existing user's username and password
        existingAdmin.UserName = "admin";
        await userManager.UpdateAsync(existingAdmin);

        var token = await userManager.GeneratePasswordResetTokenAsync(existingAdmin);
        await userManager.ResetPasswordAsync(existingAdmin, token, "admin123@");
        
        if (!await userManager.IsInRoleAsync(existingAdmin, "Administrator"))
            await userManager.AddToRoleAsync(existingAdmin, "Administrator");
    }
    else
    {
        var admin = new ApplicationUser
        {
            UserName = "admin",
            Email = adminEmail,
            FullName = "Quản trị viên",
            EmailConfirmed = true
        };
        var result = await userManager.CreateAsync(admin, "admin123@");
        if (result.Succeeded)
            await userManager.AddToRoleAsync(admin, "Administrator");
    }
    
    var dbContext = scope.ServiceProvider.GetRequiredService<LangXiMiDbContext>();
    DataSeeder.Initialize(dbContext);
}


// ── Middleware pipeline ──────────────────────────────────────────────────────
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();
app.UseSession();          // ← phải nằm TRƯỚC UseAuthentication
app.UseAuthentication();
app.UseAuthorization();

app.MapStaticAssets();
app.MapControllerRoute(
    name: "areas",
    pattern: "{area:exists}/{controller=Home}/{action=Index}/{id?}");

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")  // Trang chủ = homepage danh mục
    .WithStaticAssets();

app.Run();

public partial class Program { }
