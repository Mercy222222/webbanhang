using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LangXiMi.Models;

/// <summary>Chi tiết đơn hàng</summary>
public class OrderDetail
{
    public int OrderDetailId { get; set; }

    [Required]
    public int OrderId { get; set; }

    [Required]
    [Display(Name = "Sản phẩm")]
    public int ProductId { get; set; }

    [Required]
    [Range(1, int.MaxValue, ErrorMessage = "Số lượng phải ≥ 1")]
    [Display(Name = "Số lượng")]
    public int Quantity { get; set; }

    [Required]
    [Column(TypeName = "decimal(18,2)")]
    [Display(Name = "Đơn giá")]
    [DataType(DataType.Currency)]
    public decimal UnitPrice { get; set; }

    // Computed (không map DB)
    [NotMapped]
    public decimal LineTotal => Quantity * UnitPrice;

    // Navigation
    [ForeignKey(nameof(OrderId))]
    public virtual Order? Order { get; set; }

    [ForeignKey(nameof(ProductId))]
    public virtual Product? Product { get; set; }
}
