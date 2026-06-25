using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LangXiMi.Models;

/// <summary>
/// Trạng thái đơn hàng – BR03/BR04: chỉ hủy khi "Chờ xác nhận" hoặc "Đang làm"
/// </summary>
public static class OrderStatus
{
    public const string ChoXacNhan  = "Chờ xác nhận";
    public const string DangLam     = "Đang làm";
    public const string DangGiao    = "Đang giao hàng";
    public const string HoanThanh   = "Hoàn thành";
    public const string DaHuy       = "Đã hủy";

    /// <summary>BR03/BR04: Kiểm tra xem đơn có thể hủy không</summary>
    public static bool CanCancel(string status)
        => status == ChoXacNhan || status == DangLam;
}

/// <summary>Đơn hàng</summary>
public class Order
{
    public int OrderId { get; set; }

    [Required]
    [Display(Name = "Khách hàng")]
    public int CustomerId { get; set; }

    [Display(Name = "Ngày đặt")]
    [DataType(DataType.DateTime)]
    public DateTime OrderDate { get; set; } = DateTime.Now;

    [Column(TypeName = "decimal(18,2)")]
    [Display(Name = "Tổng tiền")]
    [DataType(DataType.Currency)]
    public decimal TotalAmount { get; set; }

    [MaxLength(50)]
    [Display(Name = "Trạng thái")]
    public string Status { get; set; } = OrderStatus.ChoXacNhan;

    // Navigation
    [ForeignKey(nameof(CustomerId))]
    public virtual Customer? Customer { get; set; }
    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
}
