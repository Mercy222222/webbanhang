using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LangXiMi.Models;

/// <summary>Lô tồn kho sản phẩm</summary>
public class TonKho
{
    [Key]
    public int MaTonKho { get; set; }

    [Required]
    [Display(Name = "Sản phẩm")]
    public int ProductId { get; set; }

    [Required]
    [Range(0, int.MaxValue)]
    [Display(Name = "Số lượng")]
    public int SoLuong { get; set; }

    [Required]
    [Display(Name = "Ngày sản xuất")]
    [DataType(DataType.Date)]
    public DateOnly NgaySanXuat { get; set; }

    [Required]
    [Display(Name = "Hạn sử dụng")]
    [DataType(DataType.Date)]
    public DateOnly HanSuDung { get; set; }

    // Navigation
    [ForeignKey(nameof(ProductId))]
    public virtual Product? Product { get; set; }
}
