using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using LangXiMi.Data;
using LangXiMi.Models;
using LangXiMi.Services;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace LangXiMi.Controllers;

/// <summary>
/// OrderController – xử lý toàn bộ luồng đặt hàng (UC06) và hủy đơn (BR03/BR04)
/// </summary>
[Authorize]
public class OrderController : Controller
{
    private readonly LangXiMiDbContext _db;
    private readonly CartService _cartService;
    private readonly ILogger<OrderController> _logger;

    public OrderController(
        LangXiMiDbContext db,
        CartService cartService,
        ILogger<OrderController> logger)
    {
        _db          = db;
        _cartService = cartService;
        _logger      = logger;
    }
    // ════════════════════════════════════════════════════════════════════════
    // CART – GET: Hiển thị giỏ hàng
    // ════════════════════════════════════════════════════════════════════════
    [AllowAnonymous]
    [HttpGet]
    public IActionResult Cart()
    {
        var cart = _cartService.GetCart();
        return View(cart);
    }

    // ── AJAX: Thêm sản phẩm vào giỏ ────────────────────────────────────────
    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> AddToCart(int productId, int quantity = 1)
    {
        var product = await _db.Products
            .Include(p => p.Category)
            .FirstOrDefaultAsync(p => p.ProductId == productId);

        if (product == null || !product.IsActive)
            return Json(new { success = false, message = "Sản phẩm không tồn tại hoặc đã ngừng bán." });

        _cartService.AddToCart(product, quantity);
        return Json(new { success = true, message = "Đã thêm vào giỏ hàng!", cartCount = _cartService.GetItemCount() });
    }

    // ── AJAX: Cập nhật số lượng ─────────────────────────────────────────────
    [AllowAnonymous]
    [HttpPost]
    public IActionResult UpdateQuantity(int productId, int quantity)
    {
        _cartService.UpdateQuantity(productId, quantity);
        var cart = _cartService.GetCart();
        var item = cart.FirstOrDefault(c => c.ProductId == productId);
        return Json(new
        {
            success = true,
            lineTotal = item?.LineTotal ?? 0,
            grandTotal = cart.Sum(c => c.LineTotal),
            itemCount = cart.Sum(c => c.Quantity),
            cartCount = _cartService.GetItemCount(),
            isEmpty = !cart.Any()
        });
    }

    // ── POST: Xóa sản phẩm khỏi giỏ ────────────────────────────────────────
    [AllowAnonymous]
    [HttpPost]
    [ValidateAntiForgeryToken]
    public IActionResult RemoveFromCart(int productId)
    {
        _cartService.RemoveItem(productId);
        TempData["Success"] = "Đã xóa sản phẩm khỏi giỏ hàng.";
        return RedirectToAction(nameof(Cart));
    }

    // ── AJAX: Lấy danh sách giỏ hàng (cho drawer) ─────────────────────────
    [AllowAnonymous]
    [HttpGet]
    public IActionResult GetCartItems()
    {
        var cart = _cartService.GetCart();
        return Json(new
        {
            items = cart.Select(c => new
            {
                c.ProductId,
                c.ProductName,
                c.UnitPrice,
                c.Quantity,
                c.ImageUrl,
                lineTotal = c.LineTotal
            }),
            grandTotal = cart.Sum(c => c.LineTotal),
            itemCount = cart.Sum(c => c.Quantity)
        });
    }

    // ════════════════════════════════════════════════════════════════════════
    // CHECKOUT – GET: Hiển thị form đặt hàng
    // ════════════════════════════════════════════════════════════════════════
    [HttpGet]
    public async Task<IActionResult> Checkout()
    {
        var cartItems = _cartService.GetCart();

        // Giỏ hàng rỗng → quay về trang sản phẩm
        if (!cartItems.Any())
        {
            TempData["Warning"] = "Giỏ hàng của bạn đang trống. Vui lòng chọn sản phẩm trước.";
            return RedirectToAction("Index", "Product");
        }

        var vm = new CheckoutViewModel { CartItems = cartItems };
        
        // Populate user details if possible
        var userEmail = User.Identity?.Name;
        if (userEmail != null)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Email == userEmail);
            if (user != null)
            {
                vm.Email = user.Email ?? "";
                vm.FullName = user.FullName;
                vm.Phone = user.PhoneNumber ?? "";
                vm.Address = user.Address ?? "";
            }
        }
        
        return View(vm);
    }

    // ════════════════════════════════════════════════════════════════════════
    // CHECKOUT – POST: UC06 – Xử lý đặt hàng
    // Luồng: Validate → Kiểm tra tồn kho → Tạo đơn → Trừ kho → Xóa giỏ → Báo thành công
    // ════════════════════════════════════════════════════════════════════════
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Checkout(CheckoutViewModel vm)
    {
        vm.CartItems = _cartService.GetCart();
        if (!vm.CartItems.Any())
        {
            TempData["Warning"] = "Giỏ hàng trống, không thể đặt hàng.";
            return RedirectToAction("Index", "Product");
        }

        // ── 1. Validation Logic ───────────────────────────────────────────────
        if (vm.GrandTotal < 100000)
        {
            ModelState.AddModelError(string.Empty, "Tổng giá trị đơn hàng phải từ 100.000 VNĐ trở lên.");
        }

        bool hasBirthdayCake = vm.CartItems.Any(c => c.CategoryName.Contains("Bánh Sinh Nhật", StringComparison.OrdinalIgnoreCase));
        if (hasBirthdayCake)
        {
            if (!vm.DeliveryDate.HasValue)
            {
                ModelState.AddModelError(string.Empty, "Vui lòng chọn Ngày giờ nhận hàng cho Bánh Sinh Nhật.");
            }
            else if (vm.DeliveryDate.Value < DateTime.Now.AddHours(24))
            {
                ModelState.AddModelError(string.Empty, "Bánh Sinh Nhật cần được đặt trước ít nhất 24 giờ.");
            }
        }

        if (!ModelState.IsValid)
            return View(vm);

        // ── 2. Bắt đầu Transaction – đảm bảo atomicity ─────────────────────
        await using var transaction = await _db.Database.BeginTransactionAsync();
        try
        {
            var productIds = vm.CartItems.Select(c => c.ProductId).ToList();
            var products = await _db.Products
                .Include(p => p.TonKhos)
                .Where(p => productIds.Contains(p.ProductId) && p.IsActive)
                .ToListAsync();

            var stockErrors = new List<string>();
            foreach (var cartItem in vm.CartItems)
            {
                var product = products.FirstOrDefault(p => p.ProductId == cartItem.ProductId);
                if (product is null)
                {
                    stockErrors.Add($"Sản phẩm '{cartItem.ProductName}' không còn tồn tại hoặc ngừng bán.");
                    continue;
                }
                
                int totalStock = product.TonKhos.Sum(t => t.SoLuong);
                if (totalStock < cartItem.Quantity)
                {
                    stockErrors.Add($"'{product.ProductName}': chỉ còn {totalStock} cái (bạn đặt {cartItem.Quantity}).");
                }
            }

            if (stockErrors.Any())
            {
                foreach (var err in stockErrors)
                    ModelState.AddModelError(string.Empty, err);
                return View(vm);
            }

            // ── 3. Upsert Customer (tìm theo email, nếu chưa có thì tạo mới) ─
            var customer = await _db.Customers.FirstOrDefaultAsync(c => c.Email == vm.Email);

            if (customer is null)
            {
                customer = new Customer
                {
                    FullName = vm.FullName,
                    Email    = vm.Email,
                    Phone    = vm.Phone,
                    Address  = vm.Address
                };
                _db.Customers.Add(customer);
                await _db.SaveChangesAsync();
            }
            else
            {
                customer.FullName = vm.FullName;
                customer.Phone    = vm.Phone;
                customer.Address  = vm.Address;
            }

            // ── 4. Tạo đơn hàng mới ────────────────────────────────────────
            var order = new Order
            {
                CustomerId  = customer.CustomerId,
                OrderDate   = DateTime.Now,
                TotalAmount = vm.GrandTotal,
                Status      = OrderStatus.ChoXacNhan
            };
            _db.Orders.Add(order);
            await _db.SaveChangesAsync();

            // ── 5. Tạo OrderDetails + Trừ TonKho ─────────────────────────
            foreach (var cartItem in vm.CartItems)
            {
                var detail = new OrderDetail
                {
                    OrderId   = order.OrderId,
                    ProductId = cartItem.ProductId,
                    Quantity  = cartItem.Quantity,
                    UnitPrice = cartItem.UnitPrice
                };
                _db.OrderDetails.Add(detail);

                // FIFO deduction from TonKho based on HanSuDung
                var product = products.First(p => p.ProductId == cartItem.ProductId);
                var tonKhos = product.TonKhos.Where(t => t.SoLuong > 0).OrderBy(t => t.HanSuDung).ToList();
                int remainingToDeduct = cartItem.Quantity;

                foreach (var tk in tonKhos)
                {
                    if (remainingToDeduct == 0) break;

                    if (tk.SoLuong >= remainingToDeduct)
                    {
                        tk.SoLuong -= remainingToDeduct;
                        remainingToDeduct = 0;
                    }
                    else
                    {
                        remainingToDeduct -= tk.SoLuong;
                        tk.SoLuong = 0;
                    }
                    _db.TonKhos.Update(tk);
                }
                
                // Update Product.StockQuantity cache
                product.StockQuantity -= cartItem.Quantity;
                _db.Products.Update(product);
            }

            await _db.SaveChangesAsync();
            await transaction.CommitAsync();
            _cartService.ClearCart();

            _logger.LogInformation("UC06: Đặt hàng thành công. OrderID={OrderId}, Customer={Email}", order.OrderId, vm.Email);

            return RedirectToAction(nameof(Confirmation), new { orderId = order.OrderId });
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            _logger.LogError(ex, "UC06: Lỗi khi xử lý đặt hàng.");
            ModelState.AddModelError(string.Empty, "Có lỗi xảy ra trong quá trình đặt hàng. Vui lòng thử lại.");
            return View(vm);
        }
    }

    [HttpGet]
    public async Task<IActionResult> Confirmation(int orderId)
    {
        var order = await _db.Orders
            .Include(o => o.Customer)
            .Include(o => o.OrderDetails)
                .ThenInclude(d => d.Product)
            .FirstOrDefaultAsync(o => o.OrderId == orderId);

        if (order is null) return NotFound();

        var vm = new OrderConfirmationViewModel
        {
            OrderId      = order.OrderId,
            CustomerName = order.Customer?.FullName ?? "Khách hàng",
            TotalAmount  = order.TotalAmount,
            Status       = order.Status,
            OrderDate    = order.OrderDate
        };
        return View(vm);
    }

    [HttpGet]
    public async Task<IActionResult> MyOrders(string? email)
    {
        // Ưu tiên email từ form, nếu không có thì lấy từ Identity
        var currentEmail = string.IsNullOrWhiteSpace(email) ? User.Identity?.Name : email;
        
        // Fix lỗi hiển thị cho tài khoản admin (vì username là admin nhưng email thật là admin@langximi.vn)
        if (currentEmail == "admin")
        {
            var adminUser = await _db.Users.FirstOrDefaultAsync(u => u.UserName == "admin");
            if (adminUser != null) currentEmail = adminUser.Email;
        }

        if (string.IsNullOrWhiteSpace(currentEmail))
            return View(new List<Order>());

        var orders = await _db.Orders
            .Include(o => o.Customer)
            .Include(o => o.OrderDetails)
            .Where(o => o.Customer!.Email == currentEmail)
            .OrderByDescending(o => o.OrderDate)
            .ToListAsync();

        ViewBag.Email = currentEmail;
        return View(orders);
    }

    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Cancel(int orderId, string? returnEmail)
    {
        var currentEmail = string.IsNullOrWhiteSpace(returnEmail) ? User.Identity?.Name : returnEmail;
        if (currentEmail == "admin")
        {
            var adminUser = await _db.Users.FirstOrDefaultAsync(u => u.UserName == "admin");
            if (adminUser != null) currentEmail = adminUser.Email;
        }

        var order = await _db.Orders
            .Include(o => o.Customer)
            .Include(o => o.OrderDetails)
                .ThenInclude(d => d.Product)
                    .ThenInclude(p => p.TonKhos)
            .FirstOrDefaultAsync(o => o.OrderId == orderId && o.Customer!.Email == currentEmail);

        if (order is null)
        {
            TempData["Error"] = "Không tìm thấy đơn hàng.";
            return RedirectToAction(nameof(MyOrders));
        }

        if (!OrderStatus.CanCancel(order.Status))
        {
            TempData["Error"] = $"Không thể hủy đơn hàng #{orderId}. Đơn đang ở trạng thái '{order.Status}'.";
            return RedirectToAction(nameof(MyOrders));
        }

        await using var transaction = await _db.Database.BeginTransactionAsync();
        try
        {
            foreach (var detail in order.OrderDetails)
            {
                if (detail.Product is not null)
                {
                    // Hoàn trả vào TonKho (tạo lô mới hoặc cộng vào lô cuối)
                    // Ở đây đơn giản cộng vào Product.StockQuantity và tạo một bản ghi TonKho phục hồi
                    detail.Product.StockQuantity += detail.Quantity;
                    
                    var newTonKho = new TonKho 
                    {
                        ProductId = detail.ProductId,
                        SoLuong = detail.Quantity,
                        NgaySanXuat = DateOnly.FromDateTime(DateTime.Now),
                        HanSuDung = DateOnly.FromDateTime(DateTime.Now.AddDays(7)) // Temporary example
                    };
                    _db.TonKhos.Add(newTonKho);
                }
            }

            order.Status = OrderStatus.DaHuy;
            await _db.SaveChangesAsync();
            await transaction.CommitAsync();

            _logger.LogInformation("BR04: Hủy đơn #{OrderId} thành công.", orderId);
            TempData["Success"] = $"Đơn hàng #{orderId} đã được hủy thành công.";
        }
        catch (Exception ex)
        {
            await transaction.RollbackAsync();
            _logger.LogError(ex, "BR04: Lỗi khi hủy đơn hàng #{OrderId}.", orderId);
            TempData["Error"] = "Có lỗi xảy ra khi hủy đơn hàng. Vui lòng thử lại.";
        }

        return RedirectToAction(nameof(MyOrders));
    }
}
