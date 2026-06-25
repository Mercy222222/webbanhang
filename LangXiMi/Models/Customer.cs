using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LangXiMi.Models;

/// <summary>Khách hàng</summary>
public class Customer
{
    public int CustomerId { get; set; }

    [Required, MaxLength(150)]
    [Display(Name = "Họ và tên")]
    public string FullName { get; set; } = null!;

    [Required, MaxLength(150), EmailAddress]
    [Display(Name = "Email")]
    public string Email { get; set; } = null!;

    [MaxLength(20), Phone]
    [Display(Name = "Số điện thoại")]
    public string? Phone { get; set; }

    [MaxLength(300)]
    [Display(Name = "Địa chỉ")]
    public string? Address { get; set; }

    // Navigation
    public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
}
