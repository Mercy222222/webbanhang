using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LangXiMi.Models;

/// <summary>Sản phẩm bánh ngọt</summary>
public class Product
{
    public int ProductId { get; set; }

    [Required]
    [Display(Name = "Danh mục")]
    public int CategoryId { get; set; }

    [Required, MaxLength(200)]
    [Display(Name = "Tên sản phẩm")]
    public string ProductName { get; set; } = null!;

    [Required]
    [Column(TypeName = "decimal(18,2)")]
    [Display(Name = "Đơn giá")]
    [DataType(DataType.Currency)]
    public decimal Price { get; set; }

    [Display(Name = "Tồn kho")]
    public int StockQuantity { get; set; }

    [MaxLength(500)]
    [Display(Name = "Ảnh sản phẩm")]
    public string? ImageUrl { get; set; }

    [Display(Name = "Đang bán")]
    public bool IsActive { get; set; } = true;

    // Navigation
    [ForeignKey(nameof(CategoryId))]
    public virtual Category? Category { get; set; }
    public virtual ICollection<OrderDetail> OrderDetails { get; set; } = new List<OrderDetail>();
    public virtual ICollection<TonKho> TonKhos { get; set; } = new List<TonKho>();
}
