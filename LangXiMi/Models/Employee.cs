using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LangXiMi.Models;

/// <summary>Vị trí công việc</summary>
public enum EmployeePosition
{
    [Display(Name = "Quản lý")]
    QuanLy = 0,

    [Display(Name = "Thu ngân")]
    ThuNgan = 1,

    [Display(Name = "Thợ bánh")]
    ThoBanh = 2
}

/// <summary>Trạng thái lao động (không xóa vĩnh viễn)</summary>
public enum EmployeeStatus
{
    [Display(Name = "Đang làm")]
    DangLam = 0,

    [Display(Name = "Nghỉ phép")]
    NghiPhep = 1,

    [Display(Name = "Đã nghỉ")]
    DaNghi = 2
}

/// <summary>Nhân viên tiệm bánh</summary>
public class Employee
{
    [Key]
    public int EmployeeId { get; set; }

    [Required, MaxLength(20)]
    [Display(Name = "Mã nhân viên")]
    public string MaNhanVien { get; set; } = null!;

    [Required, MaxLength(150)]
    [Display(Name = "Họ và tên")]
    public string FullName { get; set; } = null!;

    [MaxLength(12)]
    [Display(Name = "CCCD")]
    public string? CCCD { get; set; }

    [MaxLength(20), Phone]
    [Display(Name = "Số điện thoại")]
    public string? Phone { get; set; }

    [MaxLength(150), EmailAddress]
    [Display(Name = "Email")]
    public string? Email { get; set; }

    [MaxLength(300)]
    [Display(Name = "Địa chỉ")]
    public string? Address { get; set; }

    [Required]
    [Display(Name = "Chức vụ")]
    public EmployeePosition Position { get; set; } = EmployeePosition.ThoBanh;

    [Required]
    [Display(Name = "Trạng thái")]
    public EmployeeStatus TrangThai { get; set; } = EmployeeStatus.DangLam;

    [Display(Name = "Ngày vào làm")]
    [DataType(DataType.Date)]
    public DateTime NgayVaoLam { get; set; } = DateTime.Now;

    /// <summary>FK → AspNetUsers (tài khoản đăng nhập, nullable nếu chưa cấp)</summary>
    [MaxLength(450)]
    public string? UserId { get; set; }

    [ForeignKey(nameof(UserId))]
    public virtual ApplicationUser? User { get; set; }
}
