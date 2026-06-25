-- ============================================================
-- Script T-SQL: Khởi tạo Database LangXiMiDB
-- Dự án: Website kinh doanh Bánh ngọt "Làng Xì Mi"
-- Công nghệ: SQL Server | ASP.NET Core MVC | EF Core (Database-First)
-- Tác giả: Senior ASP.NET Core Developer
-- Ngày tạo: 2026-05-12
-- ============================================================

-- ============================================================
-- BƯỚC 1: Tạo Database (nếu chưa tồn tại)
-- ============================================================
USE master;
GO

IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'LangXiMiDB')
BEGIN
    CREATE DATABASE LangXiMiDB;
    PRINT 'Database LangXiMiDB đã được tạo thành công.';
END
ELSE
BEGIN
    PRINT 'Database LangXiMiDB đã tồn tại, bỏ qua bước tạo mới.';
END
GO

USE LangXiMiDB;
GO

-- ============================================================
-- BƯỚC 2: Tạo các bảng (thứ tự ưu tiên theo FK dependency)
-- ============================================================

-- ------------------------------------------------------------
-- Bảng 1: Categories (Danh mục sản phẩm)
-- Không phụ thuộc FK nào → tạo trước tiên
-- ------------------------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Categories')
BEGIN
    CREATE TABLE Categories (
        CategoryID   INT            NOT NULL IDENTITY(1,1),   -- PK, tự tăng
        CategoryName NVARCHAR(100)  NOT NULL,                  -- Tên danh mục
        Description  NVARCHAR(500)  NULL,                      -- Mô tả

        CONSTRAINT PK_Categories PRIMARY KEY (CategoryID)
    );
    PRINT 'Bảng Categories đã được tạo.';
END
GO

-- ------------------------------------------------------------
-- Bảng 2: Customers (Khách hàng)
-- Không phụ thuộc FK nào → tạo trước Orders
-- ------------------------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Customers')
BEGIN
    CREATE TABLE Customers (
        CustomerID INT            NOT NULL IDENTITY(1,1),   -- PK, tự tăng
        FullName   NVARCHAR(150)  NOT NULL,                  -- Họ và tên
        Email      NVARCHAR(150)  NOT NULL,                  -- Email
        Phone      NVARCHAR(20)   NULL,                      -- Số điện thoại
        Address    NVARCHAR(300)  NULL,                      -- Địa chỉ

        CONSTRAINT PK_Customers PRIMARY KEY (CustomerID),
        CONSTRAINT UQ_Customers_Email UNIQUE (Email)         -- Email phải duy nhất
    );
    PRINT 'Bảng Customers đã được tạo.';
END
GO

-- ------------------------------------------------------------
-- Bảng 3: Products (Sản phẩm bánh)
-- FK → Categories(CategoryID)
-- ------------------------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Products')
BEGIN
    CREATE TABLE Products (
        ProductID     INT             NOT NULL IDENTITY(1,1),  -- PK, tự tăng
        CategoryID    INT             NOT NULL,                 -- FK → Categories
        ProductName   NVARCHAR(200)   NOT NULL,                 -- Tên sản phẩm
        Price         DECIMAL(18, 2)  NOT NULL DEFAULT 0,       -- Đơn giá
        StockQuantity INT             NOT NULL DEFAULT 0,       -- Số lượng tồn kho
        ImageURL      NVARCHAR(500)   NULL,                     -- Đường dẫn ảnh
        IsActive      BIT             NOT NULL DEFAULT 1,       -- Trạng thái (1=Đang bán)

        CONSTRAINT PK_Products PRIMARY KEY (ProductID),
        CONSTRAINT FK_Products_Categories FOREIGN KEY (CategoryID)
            REFERENCES Categories(CategoryID)
            ON UPDATE CASCADE
            ON DELETE NO ACTION                                  -- Không xóa Category đang có sản phẩm
    );
    PRINT 'Bảng Products đã được tạo.';
END
GO

-- ------------------------------------------------------------
-- Bảng 4: Orders (Đơn hàng)
-- FK → Customers(CustomerID)
-- ------------------------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Orders')
BEGIN
    CREATE TABLE Orders (
        OrderID     INT            NOT NULL IDENTITY(1,1),    -- PK, tự tăng
        CustomerID  INT            NOT NULL,                   -- FK → Customers
        OrderDate   DATETIME       NOT NULL DEFAULT GETDATE(), -- Ngày đặt hàng
        TotalAmount DECIMAL(18, 2) NOT NULL DEFAULT 0,         -- Tổng tiền
        Status      NVARCHAR(50)   NOT NULL DEFAULT N'Chờ xác nhận',
                                                               -- Trạng thái đơn hàng

        CONSTRAINT PK_Orders PRIMARY KEY (OrderID),
        CONSTRAINT FK_Orders_Customers FOREIGN KEY (CustomerID)
            REFERENCES Customers(CustomerID)
            ON UPDATE CASCADE
            ON DELETE CASCADE                                  -- Xóa Customer → xóa Order liên quan
    );
    PRINT 'Bảng Orders đã được tạo.';
END
GO

-- ------------------------------------------------------------
-- Bảng 5: OrderDetails (Chi tiết đơn hàng)
-- FK → Orders(OrderID), Products(ProductID)
-- ------------------------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'OrderDetails')
BEGIN
    CREATE TABLE OrderDetails (
        OrderDetailID INT            NOT NULL IDENTITY(1,1),  -- PK, tự tăng
        OrderID       INT            NOT NULL,                 -- FK → Orders
        ProductID     INT            NOT NULL,                 -- FK → Products
        Quantity      INT            NOT NULL DEFAULT 1,       -- Số lượng sản phẩm
        UnitPrice     DECIMAL(18, 2) NOT NULL DEFAULT 0,       -- Đơn giá tại thời điểm mua

        CONSTRAINT PK_OrderDetails PRIMARY KEY (OrderDetailID),
        CONSTRAINT FK_OrderDetails_Orders FOREIGN KEY (OrderID)
            REFERENCES Orders(OrderID)
            ON UPDATE CASCADE
            ON DELETE CASCADE,                                 -- Xóa Order → xóa OrderDetails
        CONSTRAINT FK_OrderDetails_Products FOREIGN KEY (ProductID)
            REFERENCES Products(ProductID)
            ON UPDATE NO ACTION
            ON DELETE NO ACTION                                -- Không cho xóa Product đang có trong đơn
    );
    PRINT 'Bảng OrderDetails đã được tạo.';
END
GO

-- ------------------------------------------------------------
-- Bảng 6: TonKho (Tồn kho / Lô hàng)
-- FK → Products(ProductID)
-- ------------------------------------------------------------
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'TonKho')
BEGIN
    CREATE TABLE TonKho (
        MaTonKho    INT      NOT NULL IDENTITY(1,1),  -- PK, tự tăng
        ProductID   INT      NOT NULL,                 -- FK → Products
        SoLuong     INT      NOT NULL DEFAULT 0,       -- Số lượng trong lô
        NgaySanXuat DATE     NOT NULL,                 -- Ngày sản xuất
        HanSuDung   DATE     NOT NULL,                 -- Hạn sử dụng

        CONSTRAINT PK_TonKho PRIMARY KEY (MaTonKho),
        CONSTRAINT FK_TonKho_Products FOREIGN KEY (ProductID)
            REFERENCES Products(ProductID)
            ON UPDATE CASCADE
            ON DELETE CASCADE,                         -- Xóa Product → xóa lô tồn kho liên quan
        CONSTRAINT CK_TonKho_HanSuDung CHECK (HanSuDung > NgaySanXuat) -- HSD phải sau NSX
    );
    PRINT 'Bảng TonKho đã được tạo.';
END
GO

-- ============================================================
-- BƯỚC 3: Thêm dữ liệu mẫu (Seed Data) để kiểm thử
-- ============================================================

-- Seed: Categories
IF NOT EXISTS (SELECT 1 FROM Categories)
BEGIN
    INSERT INTO Categories (CategoryName, Description) VALUES
    (N'Bánh sinh nhật',  N'Các loại bánh dành cho dịp sinh nhật, kỷ niệm'),
    (N'Bánh mì ngọt',    N'Bánh mì nhân kem, nhân trái cây các loại'),
    (N'Bánh cupcake',    N'Bánh cupcake mini nhiều hương vị'),
    (N'Bánh macaron',    N'Bánh macaron Pháp truyền thống'),
    (N'Bánh mousse',     N'Bánh mousse lạnh nhiều tầng');
    PRINT 'Dữ liệu mẫu Categories đã được thêm.';
END
GO

-- Seed: Customers
IF NOT EXISTS (SELECT 1 FROM Customers)
BEGIN
    INSERT INTO Customers (FullName, Email, Phone, Address) VALUES
    (N'Nguyễn Thị Lan',    'lan.nguyen@gmail.com',   '0901234567', N'12 Lê Lợi, Q.1, TP.HCM'),
    (N'Trần Văn Minh',     'minh.tran@gmail.com',    '0912345678', N'45 Nguyễn Huệ, Q.1, TP.HCM'),
    (N'Phạm Thị Hoa',      'hoa.pham@gmail.com',     '0923456789', N'78 Điện Biên Phủ, Q.3, TP.HCM'),
    (N'Lê Quốc Dũng',      'dung.le@gmail.com',      '0934567890', N'23 Võ Thị Sáu, Q.3, TP.HCM'),
    (N'Hoàng Thị Mai',     'mai.hoang@gmail.com',    '0945678901', N'56 Nam Kỳ Khởi Nghĩa, Q.3, TP.HCM');
    PRINT 'Dữ liệu mẫu Customers đã được thêm.';
END
GO

-- Seed: Products
IF NOT EXISTS (SELECT 1 FROM Products)
BEGIN
    INSERT INTO Products (CategoryID, ProductName, Price, StockQuantity, ImageURL, IsActive) VALUES
    (1, N'Bánh sinh nhật socola',           350000, 20, '/images/products/banh-sn-socola.jpg',      1),
    (1, N'Bánh sinh nhật dâu tây',          320000, 15, '/images/products/banh-sn-dautay.jpg',      1),
    (2, N'Bánh mì kem trứng',                35000, 50, '/images/products/banh-mi-kem-trung.jpg',   1),
    (2, N'Bánh mì nhân pate thịt',           30000, 40, '/images/products/banh-mi-pate.jpg',        1),
    (3, N'Cupcake vani kem bơ',              45000, 60, '/images/products/cupcake-vani.jpg',         1),
    (3, N'Cupcake matcha nhân đậu đỏ',       50000, 45, '/images/products/cupcake-matcha.jpg',      1),
    (4, N'Macaron hỗn hợp 6 vị',            120000, 30, '/images/products/macaron-6vi.jpg',         1),
    (5, N'Mousse chanh leo',                 85000, 25, '/images/products/mousse-chanh-leo.jpg',     1);
    PRINT 'Dữ liệu mẫu Products đã được thêm.';
END
GO

-- Seed: Orders
IF NOT EXISTS (SELECT 1 FROM Orders)
BEGIN
    INSERT INTO Orders (CustomerID, OrderDate, TotalAmount, Status) VALUES
    (1, GETDATE() - 5, 1050000, N'Hoàn thành'),
    (2, GETDATE() - 3, 680000,  N'Đang giao hàng'),
    (3, GETDATE() - 1, 350000,  N'Chờ xác nhận'),
    (4, GETDATE(),     240000,  N'Chờ xác nhận');
    PRINT 'Dữ liệu mẫu Orders đã được thêm.';
END
GO

-- Seed: OrderDetails
IF NOT EXISTS (SELECT 1 FROM OrderDetails)
BEGIN
    INSERT INTO OrderDetails (OrderID, ProductID, Quantity, UnitPrice) VALUES
    (1, 1, 2, 350000),   -- Order 1: 2 bánh sinh nhật socola
    (1, 5, 6,  45000),   -- Order 1: 6 cupcake vani
    (2, 7, 2, 120000),   -- Order 2: 2 hộp macaron
    (2, 8, 5,  85000),   -- Order 2: 5 mousse chanh leo
    (3, 1, 1, 350000),   -- Order 3: 1 bánh sinh nhật socola
    (4, 3, 4,  35000),   -- Order 4: 4 bánh mì kem trứng
    (4, 5, 2,  45000);   -- Order 4: 2 cupcake vani
    PRINT 'Dữ liệu mẫu OrderDetails đã được thêm.';
END
GO

-- Seed: TonKho
IF NOT EXISTS (SELECT 1 FROM TonKho)
BEGIN
    INSERT INTO TonKho (ProductID, SoLuong, NgaySanXuat, HanSuDung) VALUES
    (1, 10, '2026-05-10', '2026-05-17'),
    (2,  8, '2026-05-11', '2026-05-18'),
    (3, 25, '2026-05-12', '2026-05-14'),  -- Bánh mì hạn ngắn 2 ngày
    (4, 20, '2026-05-12', '2026-05-14'),
    (5, 30, '2026-05-10', '2026-05-16'),
    (6, 22, '2026-05-10', '2026-05-16'),
    (7, 15, '2026-05-08', '2026-05-22'),  -- Macaron hạn dài hơn
    (8, 12, '2026-05-11', '2026-05-15');
    PRINT 'Dữ liệu mẫu TonKho đã được thêm.';
END
GO

-- ============================================================
-- BƯỚC 4: Kiểm tra kết quả - Hiển thị danh sách bảng
-- ============================================================
SELECT
    t.name          AS [Tên bảng],
    p.rows          AS [Số dòng dữ liệu]
FROM
    sys.tables t
    JOIN sys.partitions p ON t.object_id = p.object_id
WHERE
    p.index_id IN (0, 1)
ORDER BY
    t.name;
GO

PRINT '============================================================';
PRINT 'Khởi tạo database LangXiMiDB hoàn tất!';
PRINT 'Tổng số bảng: 6 (Categories, Products, Customers, Orders, OrderDetails, TonKho)';
PRINT '============================================================';
GO
