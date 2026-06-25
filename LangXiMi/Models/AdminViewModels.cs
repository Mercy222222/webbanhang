using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace LangXiMi.Models;

// ═══════════════════════════════════════════════════════════════
// Dashboard
// ═══════════════════════════════════════════════════════════════
public class DashboardViewModel
{
    public int TotalOrders { get; set; }
    public int PendingOrders { get; set; }
    public int TotalProducts { get; set; }
    public int TotalCustomers { get; set; }
    public decimal TodayRevenue { get; set; }
    public decimal MonthRevenue { get; set; }
    public List<Order> RecentOrders { get; set; } = new();
    public List<TopProductItem> TopProducts { get; set; } = new();
}

public class TopProductItem
{
    public string ProductName { get; set; } = string.Empty;
    public int TotalSold { get; set; }
    public decimal TotalRevenue { get; set; }
}

// ═══════════════════════════════════════════════════════════════
// Admin Product CRUD
// ═══════════════════════════════════════════════════════════════
public class AdminProductViewModel
{
    public int ProductId { get; set; }

    [Required(ErrorMessage = "Vui lòng chọn danh mục")]
    [Display(Name = "Danh mục")]
    public int CategoryId { get; set; }

    [Required(ErrorMessage = "Vui lòng nhập tên sản phẩm")]
    [MaxLength(200)]
    [Display(Name = "Tên sản phẩm")]
    public string ProductName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Vui lòng nhập giá")]
    [Range(0, double.MaxValue, ErrorMessage = "Giá phải ≥ 0")]
    [Display(Name = "Đơn giá (VNĐ)")]
    public decimal Price { get; set; }

    [Range(0, int.MaxValue, ErrorMessage = "Tồn kho phải ≥ 0")]
    [Display(Name = "Tồn kho")]
    public int StockQuantity { get; set; }

    [Display(Name = "Ảnh sản phẩm")]
    public IFormFile? ImageFile { get; set; }

    public string? ExistingImageUrl { get; set; }

    [Display(Name = "Đang bán")]
    public bool IsActive { get; set; } = true;

    // For dropdowns
    public List<Category> Categories { get; set; } = new();
}

// ═══════════════════════════════════════════════════════════════
// Admin Employee CRUD
// ═══════════════════════════════════════════════════════════════
public class AdminEmployeeViewModel
{
    public int EmployeeId { get; set; }

    [Required(ErrorMessage = "Vui lòng nhập mã nhân viên")]
    [MaxLength(20)]
    [Display(Name = "Mã nhân viên")]
    public string MaNhanVien { get; set; } = string.Empty;

    [Required(ErrorMessage = "Vui lòng nhập họ tên")]
    [MaxLength(150)]
    [Display(Name = "Họ và tên")]
    public string FullName { get; set; } = string.Empty;

    [MaxLength(12)]
    [Display(Name = "CCCD")]
    public string? CCCD { get; set; }

    [Phone]
    [Display(Name = "Số điện thoại")]
    public string? Phone { get; set; }

    [EmailAddress]
    [Display(Name = "Email")]
    public string? Email { get; set; }

    [Display(Name = "Địa chỉ")]
    public string? Address { get; set; }

    [Required]
    [Display(Name = "Chức vụ")]
    public EmployeePosition Position { get; set; }

    [Required]
    [Display(Name = "Trạng thái lao động")]
    public EmployeeStatus TrangThai { get; set; }

    [Display(Name = "Ngày vào làm")]
    [DataType(DataType.Date)]
    public DateTime NgayVaoLam { get; set; } = DateTime.Now;

    [Display(Name = "Cấp tài khoản đăng nhập?")]
    public bool CreateAccount { get; set; }

    [DataType(DataType.Password)]
    [Display(Name = "Mật khẩu (nếu cấp TK)")]
    public string? AccountPassword { get; set; }
}

// ═══════════════════════════════════════════════════════════════
// Admin User Management
// ═══════════════════════════════════════════════════════════════
public class UserManagementItem
{
    public string UserId { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
    public bool IsLockedOut { get; set; }
    public DateTimeOffset? LockoutEnd { get; set; }
}

// ═══════════════════════════════════════════════════════════════
// Revenue Report
// ═══════════════════════════════════════════════════════════════
public class RevenueReportViewModel
{
    public string Period { get; set; } = "month"; // day, month, quarter
    public DateTime? FromDate { get; set; }
    public DateTime? ToDate { get; set; }
    public decimal TotalRevenue { get; set; }
    public int TotalOrders { get; set; }
    public List<RevenueDataPoint> ChartData { get; set; } = new();
    public List<TopProductItem> TopProducts { get; set; } = new();
}

public class RevenueDataPoint
{
    public string Label { get; set; } = string.Empty;
    public decimal Revenue { get; set; }
    public int OrderCount { get; set; }
}
