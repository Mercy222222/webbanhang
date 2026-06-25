using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace LangXiMi.Models;

/// <summary>ViewModel: Giỏ hàng (lưu trong Session)</summary>
public class CartItem
{
    public int ProductId    { get; set; }
    public int CategoryId   { get; set; }
    public string CategoryName { get; set; } = string.Empty;
    public string ProductName { get; set; } = string.Empty;
    public decimal UnitPrice  { get; set; }
    public int Quantity       { get; set; }
    public string? ImageUrl   { get; set; }

    public decimal LineTotal => UnitPrice * Quantity;
}

/// <summary>ViewModel: Trang đặt hàng – form nhập thông tin khách</summary>
public class CheckoutViewModel
{
    // Thông tin khách hàng
    [Required(ErrorMessage = "Vui lòng nhập họ tên")]
    [Display(Name = "Họ và tên")]
    public string FullName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Vui lòng nhập email")]
    [EmailAddress(ErrorMessage = "Email không hợp lệ")]
    [Display(Name = "Email")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Vui lòng nhập số điện thoại")]
    [Phone(ErrorMessage = "Số điện thoại không hợp lệ")]
    [Display(Name = "Số điện thoại")]
    public string Phone { get; set; } = string.Empty;

    [Required(ErrorMessage = "Vui lòng nhập địa chỉ nhận hàng")]
    [Display(Name = "Địa chỉ giao hàng")]
    public string Address { get; set; } = string.Empty;

    [Display(Name = "Ghi chú")]
    public string? Note { get; set; }

    [Display(Name = "Ngày giờ nhận hàng (Chỉ dành cho Bánh Sinh Nhật)")]
    public DateTime? DeliveryDate { get; set; }

    // Giỏ hàng (populate từ Session)
    public List<CartItem> CartItems { get; set; } = new();
    public decimal GrandTotal => CartItems.Sum(c => c.LineTotal);
}

/// <summary>ViewModel: Trang xác nhận đặt hàng thành công</summary>
public class OrderConfirmationViewModel
{
    public int OrderId         { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public decimal TotalAmount { get; set; }
    public string Status       { get; set; } = string.Empty;
    public DateTime OrderDate  { get; set; }
}

/// <summary>ViewModel: Danh sách sản phẩm theo danh mục</summary>
public class ProductCatalogViewModel
{
    public List<Category> Categories     { get; set; } = new();
    public List<Product>  Products       { get; set; } = new();
    public int?           SelectedCategoryId { get; set; }
    public string?        SearchKeyword      { get; set; }
}
