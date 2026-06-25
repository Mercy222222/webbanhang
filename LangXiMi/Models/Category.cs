using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LangXiMi.Models;

/// <summary>Danh mục sản phẩm bánh</summary>
public class Category
{
    public int CategoryId { get; set; }

    [Required, MaxLength(100)]
    [Display(Name = "Tên danh mục")]
    public string CategoryName { get; set; } = null!;

    [MaxLength(500)]
    [Display(Name = "Mô tả")]
    public string? Description { get; set; }

    // Navigation
    public virtual ICollection<Product> Products { get; set; } = new List<Product>();
}
