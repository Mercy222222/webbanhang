using LangXiMi.Models;
using LangXiMi.Data;

namespace LangXiMi.Data;

public static class DataSeeder
{
    public static void Initialize(LangXiMiDbContext context)
    {
        if (!context.Categories.Any())
        {
            context.Categories.AddRange(
                new Category { CategoryName = "Bánh sinh nhật", Description = "Các loại bánh dành cho dịp sinh nhật, kỷ niệm" },
                new Category { CategoryName = "Bánh mì ngọt", Description = "Bánh mì nhân kem, nhân trái cây các loại" },
                new Category { CategoryName = "Bánh cupcake", Description = "Bánh cupcake mini nhiều hương vị" },
                new Category { CategoryName = "Bánh macaron", Description = "Bánh macaron Pháp truyền thống" },
                new Category { CategoryName = "Bánh mousse", Description = "Bánh mousse lạnh nhiều tầng" }
            );
            context.SaveChanges();
        }

        if (!context.Customers.Any())
        {
            context.Customers.AddRange(
                new Customer { FullName = "Nguyễn Thị Lan", Email = "lan.nguyen@gmail.com", Phone = "0901234567", Address = "12 Lê Lợi, Q.1, TP.HCM" },
                new Customer { FullName = "Trần Văn Minh", Email = "minh.tran@gmail.com", Phone = "0912345678", Address = "45 Nguyễn Huệ, Q.1, TP.HCM" },
                new Customer { FullName = "Phạm Thị Hoa", Email = "hoa.pham@gmail.com", Phone = "0923456789", Address = "78 Điện Biên Phủ, Q.3, TP.HCM" },
                new Customer { FullName = "Lê Quốc Dũng", Email = "dung.le@gmail.com", Phone = "0934567890", Address = "23 Võ Thị Sáu, Q.3, TP.HCM" },
                new Customer { FullName = "Hoàng Thị Mai", Email = "mai.hoang@gmail.com", Phone = "0945678901", Address = "56 Nam Kỳ Khởi Nghĩa, Q.3, TP.HCM" }
            );
            context.SaveChanges();
        }

        if (!context.Products.Any())
        {
            context.Products.AddRange(
                new Product { CategoryId = 1, ProductName = "Bánh sinh nhật socola", Price = 350000m, StockQuantity = 20, ImageUrl = "/images/products/banh-sn-socola.jpg", IsActive = true },
                new Product { CategoryId = 1, ProductName = "Bánh sinh nhật dâu tây", Price = 320000m, StockQuantity = 15, ImageUrl = "/images/products/banh-sn-dautay.jpg", IsActive = true },
                new Product { CategoryId = 2, ProductName = "Bánh mì kem trứng", Price = 35000m, StockQuantity = 50, ImageUrl = "/images/products/banh-mi-kem-trung.jpg", IsActive = true },
                new Product { CategoryId = 2, ProductName = "Bánh mì nhân pate thịt", Price = 30000m, StockQuantity = 40, ImageUrl = "/images/products/banh-mi-pate.jpg", IsActive = true },
                new Product { CategoryId = 3, ProductName = "Cupcake vani kem bơ", Price = 45000m, StockQuantity = 60, ImageUrl = "/images/products/cupcake-vani.jpg", IsActive = true },
                new Product { CategoryId = 3, ProductName = "Cupcake matcha nhân đậu đỏ", Price = 50000m, StockQuantity = 45, ImageUrl = "/images/products/cupcake-matcha.jpg", IsActive = true },
                new Product { CategoryId = 4, ProductName = "Macaron hỗn hợp 6 vị", Price = 120000m, StockQuantity = 30, ImageUrl = "/images/products/macaron-6vi.jpg", IsActive = true },
                new Product { CategoryId = 5, ProductName = "Mousse chanh leo", Price = 85000m, StockQuantity = 25, ImageUrl = "/images/products/mousse-chanh-leo.jpg", IsActive = true }
            );
            context.SaveChanges();
        }

        if (!context.Orders.Any())
        {
            context.Orders.AddRange(
                new Order { CustomerId = 1, OrderDate = DateTime.Now.AddDays(-5), TotalAmount = 1050000m, Status = "Hoàn thành" },
                new Order { CustomerId = 2, OrderDate = DateTime.Now.AddDays(-3), TotalAmount = 680000m, Status = "Đang giao hàng" },
                new Order { CustomerId = 3, OrderDate = DateTime.Now.AddDays(-1), TotalAmount = 350000m, Status = "Chờ xác nhận" },
                new Order { CustomerId = 4, OrderDate = DateTime.Now, TotalAmount = 240000m, Status = "Chờ xác nhận" }
            );
            context.SaveChanges();
        }

        if (!context.OrderDetails.Any())
        {
            context.OrderDetails.AddRange(
                new OrderDetail { OrderId = 1, ProductId = 1, Quantity = 2, UnitPrice = 350000m },
                new OrderDetail { OrderId = 1, ProductId = 5, Quantity = 6, UnitPrice = 45000m },
                new OrderDetail { OrderId = 2, ProductId = 7, Quantity = 2, UnitPrice = 120000m },
                new OrderDetail { OrderId = 2, ProductId = 8, Quantity = 5, UnitPrice = 85000m },
                new OrderDetail { OrderId = 3, ProductId = 1, Quantity = 1, UnitPrice = 350000m },
                new OrderDetail { OrderId = 4, ProductId = 3, Quantity = 4, UnitPrice = 35000m },
                new OrderDetail { OrderId = 4, ProductId = 5, Quantity = 2, UnitPrice = 45000m }
            );
            context.SaveChanges();
        }

        if (!context.TonKhos.Any())
        {
            context.TonKhos.AddRange(
                new TonKho { ProductId = 1, SoLuong = 10, NgaySanXuat = new DateOnly(2026, 5, 10), HanSuDung = new DateOnly(2026, 5, 17) },
                new TonKho { ProductId = 2, SoLuong = 8, NgaySanXuat = new DateOnly(2026, 5, 11), HanSuDung = new DateOnly(2026, 5, 18) },
                new TonKho { ProductId = 3, SoLuong = 25, NgaySanXuat = new DateOnly(2026, 5, 12), HanSuDung = new DateOnly(2026, 5, 14) },
                new TonKho { ProductId = 4, SoLuong = 20, NgaySanXuat = new DateOnly(2026, 5, 12), HanSuDung = new DateOnly(2026, 5, 14) },
                new TonKho { ProductId = 5, SoLuong = 30, NgaySanXuat = new DateOnly(2026, 5, 10), HanSuDung = new DateOnly(2026, 5, 16) },
                new TonKho { ProductId = 6, SoLuong = 22, NgaySanXuat = new DateOnly(2026, 5, 10), HanSuDung = new DateOnly(2026, 5, 16) },
                new TonKho { ProductId = 7, SoLuong = 15, NgaySanXuat = new DateOnly(2026, 5, 8), HanSuDung = new DateOnly(2026, 5, 22) },
                new TonKho { ProductId = 8, SoLuong = 12, NgaySanXuat = new DateOnly(2026, 5, 11), HanSuDung = new DateOnly(2026, 5, 15) }
            );
            context.SaveChanges();
        }
    }
}
