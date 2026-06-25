using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using LangXiMi.Models;

namespace LangXiMi.Data;

/// <summary>
/// DbContext chính – Database-First (Scaffold-DbContext tạo ra file này)
/// Connection string đọc từ appsettings.json → "LangXiMiConnection"
/// </summary>
public class LangXiMiDbContext : IdentityDbContext<ApplicationUser>
{
    public LangXiMiDbContext(DbContextOptions<LangXiMiDbContext> options)
        : base(options) { }

    // ── DbSets ──────────────────────────────────────────────────────────────
    public DbSet<Category>    Categories   { get; set; }
    public DbSet<Product>     Products     { get; set; }
    public DbSet<Customer>    Customers    { get; set; }
    public DbSet<Order>       Orders       { get; set; }
    public DbSet<OrderDetail> OrderDetails { get; set; }
    public DbSet<TonKho>      TonKhos      { get; set; }
    public DbSet<Employee>    Employees    { get; set; }

    // ── Fluent API Configuration ─────────────────────────────────────────────
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // ── Categories ──────────────────────────────────────────────────────
        modelBuilder.Entity<Category>(entity =>
        {
            entity.ToTable("Categories");
            entity.HasKey(e => e.CategoryId);
            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.CategoryName).HasMaxLength(100).IsRequired();
            entity.Property(e => e.Description).HasMaxLength(500);
        });

        // ── Products ────────────────────────────────────────────────────────
        modelBuilder.Entity<Product>(entity =>
        {
            entity.ToTable("Products");
            entity.HasKey(e => e.ProductId);
            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.CategoryId).HasColumnName("CategoryID");
            entity.Property(e => e.ProductName).HasMaxLength(200).IsRequired();
            entity.Property(e => e.Price).HasColumnType("decimal(18,2)").HasDefaultValue(0m);
            entity.Property(e => e.StockQuantity).HasDefaultValue(0);
            entity.Property(e => e.ImageUrl).HasColumnName("ImageURL").HasMaxLength(500);
            entity.Property(e => e.IsActive).HasDefaultValue(true);

            entity.HasOne(e => e.Category)
                  .WithMany(c => c.Products)
                  .HasForeignKey(e => e.CategoryId)
                  .OnDelete(DeleteBehavior.Restrict);
        });

        // ── Customers ───────────────────────────────────────────────────────
        modelBuilder.Entity<Customer>(entity =>
        {
            entity.ToTable("Customers");
            entity.HasKey(e => e.CustomerId);
            entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
            entity.Property(e => e.FullName).HasMaxLength(150).IsRequired();
            entity.Property(e => e.Email).HasMaxLength(150).IsRequired();
            entity.Property(e => e.Phone).HasMaxLength(20);
            entity.Property(e => e.Address).HasMaxLength(300);
            entity.HasIndex(e => e.Email).IsUnique();
        });

        // ── Orders ──────────────────────────────────────────────────────────
        modelBuilder.Entity<Order>(entity =>
        {
            entity.ToTable("Orders");
            entity.HasKey(e => e.OrderId);
            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.CustomerId).HasColumnName("CustomerID");
            entity.Property(e => e.OrderDate).HasDefaultValueSql("CURRENT_TIMESTAMP");
            entity.Property(e => e.TotalAmount).HasColumnType("decimal(18,2)").HasDefaultValue(0m);
            entity.Property(e => e.Status).HasMaxLength(50).HasDefaultValue(OrderStatus.ChoXacNhan);

            entity.HasOne(e => e.Customer)
                  .WithMany(c => c.Orders)
                  .HasForeignKey(e => e.CustomerId)
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // ── OrderDetails ─────────────────────────────────────────────────────
        modelBuilder.Entity<OrderDetail>(entity =>
        {
            entity.ToTable("OrderDetails");
            entity.HasKey(e => e.OrderDetailId);
            entity.Property(e => e.OrderDetailId).HasColumnName("OrderDetailID");
            entity.Property(e => e.OrderId).HasColumnName("OrderID");
            entity.Property(e => e.ProductId).HasColumnName("ProductID");
            entity.Property(e => e.Quantity).HasDefaultValue(1);
            entity.Property(e => e.UnitPrice).HasColumnType("decimal(18,2)").HasDefaultValue(0m);

            entity.HasOne(e => e.Order)
                  .WithMany(o => o.OrderDetails)
                  .HasForeignKey(e => e.OrderId)
                  .OnDelete(DeleteBehavior.Cascade);

            entity.HasOne(e => e.Product)
                  .WithMany(p => p.OrderDetails)
                  .HasForeignKey(e => e.ProductId)
                  .OnDelete(DeleteBehavior.Restrict);
        });

        // ── TonKho ──────────────────────────────────────────────────────────
        modelBuilder.Entity<TonKho>(entity =>
        {
            entity.ToTable("TonKho");
            entity.HasKey(e => e.MaTonKho);
            entity.Property(e => e.SoLuong).HasDefaultValue(0);

            entity.HasOne(e => e.Product)
                  .WithMany(p => p.TonKhos)
                  .HasForeignKey(e => e.ProductId)
                  .HasConstraintName("FK_TonKho_Products")
                  .OnDelete(DeleteBehavior.Cascade);
        });

        // ── Employees ────────────────────────────────────────────────────
        modelBuilder.Entity<Employee>(entity =>
        {
            entity.ToTable("Employees");
            entity.HasKey(e => e.EmployeeId);
            entity.Property(e => e.MaNhanVien).HasMaxLength(20).IsRequired();
            entity.HasIndex(e => e.MaNhanVien).IsUnique();
            entity.Property(e => e.FullName).HasMaxLength(150).IsRequired();
            entity.Property(e => e.CCCD).HasMaxLength(12);
            entity.Property(e => e.Phone).HasMaxLength(20);
            entity.Property(e => e.Email).HasMaxLength(150);
            entity.Property(e => e.Address).HasMaxLength(300);

            entity.HasOne(e => e.User)
                  .WithMany()
                  .HasForeignKey(e => e.UserId)
                  .OnDelete(DeleteBehavior.SetNull);
        });
    }
}
