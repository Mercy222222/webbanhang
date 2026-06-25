document.addEventListener("DOMContentLoaded", function () {
    // ── Thêm vào giỏ hàng (AJAX) ────────────────────────────────────────────
    const addToCartForms = document.querySelectorAll(".form-add-to-cart");
    addToCartForms.forEach(form => {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            const formData = new FormData(this);

            fetch("/Order/AddToCart", {
                method: "POST",
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    showToast(data.message, "success");
                    updateCartBadge(data.cartCount);
                    // Auto-open drawer after adding
                    openCartDrawer();
                } else {
                    showToast(data.message, "danger");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                showToast("Đã xảy ra lỗi khi thêm vào giỏ hàng.", "danger");
            });
        });
    });

    // ── Tăng / giảm số lượng trong trang giỏ hàng ───────────────────────────
    document.querySelectorAll(".btn-qty").forEach(btn => {
        btn.addEventListener("click", function () {
            const productId = this.dataset.productId;
            const action = this.dataset.action;
            const qtyEl = document.getElementById("qty-" + productId);
            let qty = parseInt(qtyEl.textContent);

            if (action === "increase") qty++;
            else if (action === "decrease" && qty > 1) qty--;
            else return;

            qtyEl.textContent = qty;

            fetch("/Order/UpdateQuantity", {
                method: "POST",
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: `productId=${productId}&quantity=${qty}`
            })
            .then(r => r.json())
            .then(data => {
                if (data.success) {
                    const lineTotalEl = document.getElementById("line-total-" + productId);
                    if (lineTotalEl) lineTotalEl.textContent = formatVND(data.lineTotal);
                    const grandTotalEl = document.getElementById("grand-total");
                    if (grandTotalEl) grandTotalEl.textContent = formatVND(data.grandTotal);
                    const subtotalEl = document.getElementById("subtotal");
                    if (subtotalEl) subtotalEl.textContent = formatVND(data.grandTotal);
                    const itemCountEl = document.getElementById("item-count");
                    if (itemCountEl) itemCountEl.textContent = data.itemCount;
                    updateCartBadge(data.cartCount);
                }
            });
        });
    });
});

// ── Cart Drawer ──────────────────────────────────────────────────────────────
function openCartDrawer() {
    const drawerEl = document.getElementById("cartDrawer");
    if (!drawerEl) return;
    const drawer = bootstrap.Offcanvas.getOrCreateInstance(drawerEl, { backdrop: true, scroll: true });
    drawer.show();
    loadCartDrawer();
}

function loadCartDrawer() {
    fetch("/Order/GetCartItems")
        .then(r => r.json())
        .then(data => {
            const container = document.getElementById("drawer-cart-items");
            const footer = document.getElementById("drawer-cart-footer");
            const countBadge = document.getElementById("drawer-item-count");

            if (!data.items || data.items.length === 0) {
                container.innerHTML = `
                    <div class="text-center py-5 text-muted">
                        <i class="bi bi-bag display-3" style="opacity:.2"></i>
                        <p class="mt-3 mb-1 fw-semibold">Giỏ hàng trống</p>
                        <p class="small">Hãy thêm bánh vào giỏ nhé!</p>
                    </div>`;
                footer.style.display = "none";
                countBadge.textContent = "0";
                return;
            }

            countBadge.textContent = data.itemCount;
            let html = "";
            data.items.forEach(item => {
                const imgSrc = item.imageUrl || "/images/no-image.jpg";
                html += `
                <div class="drawer-cart-item d-flex gap-3 p-3 border-bottom align-items-center" id="drawer-item-${item.productId}">
                    <img src="${imgSrc}" alt="${item.productName}" class="rounded-3" 
                         style="width:60px;height:60px;object-fit:cover;flex-shrink:0;">
                    <div class="flex-grow-1 min-width-0">
                        <div class="fw-semibold text-truncate" style="font-size:.9rem;">${item.productName}</div>
                        <div class="text-muted small">${formatVND(item.unitPrice)}</div>
                        <div class="d-flex align-items-center gap-2 mt-1">
                            <button class="btn btn-sm btn-outline-secondary rounded-circle p-0" 
                                    style="width:26px;height:26px;font-size:.8rem;line-height:1;"
                                    onclick="drawerUpdateQty(${item.productId}, ${item.quantity - 1})">−</button>
                            <span class="fw-bold" style="min-width:20px;text-align:center;">${item.quantity}</span>
                            <button class="btn btn-sm btn-outline-secondary rounded-circle p-0" 
                                    style="width:26px;height:26px;font-size:.8rem;line-height:1;"
                                    onclick="drawerUpdateQty(${item.productId}, ${item.quantity + 1})">+</button>
                        </div>
                    </div>
                    <div class="text-end" style="flex-shrink:0;">
                        <div class="fw-bold text-primary" style="font-size:.9rem;">${formatVND(item.lineTotal)}</div>
                        <button class="btn btn-sm text-danger p-0 mt-1" onclick="drawerRemoveItem(${item.productId})" title="Xóa">
                            <i class="bi bi-trash3"></i>
                        </button>
                    </div>
                </div>`;
            });
            container.innerHTML = html;

            footer.style.display = "block";
            document.getElementById("drawer-grand-total").textContent = formatVND(data.grandTotal);
        });
}

function drawerUpdateQty(productId, quantity) {
    if (quantity <= 0) {
        drawerRemoveItem(productId);
        return;
    }
    fetch("/Order/UpdateQuantity", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `productId=${productId}&quantity=${quantity}`
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            updateCartBadge(data.cartCount);
            if (data.isEmpty) {
                loadCartDrawer();
            } else {
                loadCartDrawer();
            }
        }
    });
}

function drawerRemoveItem(productId) {
    // Use fetch with form data to include anti-forgery token workaround
    fetch("/Order/UpdateQuantity", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `productId=${productId}&quantity=0`
    })
    .then(r => r.json())
    .then(data => {
        if (data.success) {
            updateCartBadge(data.cartCount);
            loadCartDrawer();
        }
    });
}

// ── Helpers ──────────────────────────────────────────────────────────────────
function updateCartBadge(count) {
    const el = document.getElementById("cart-count");
    if (el) {
        el.textContent = count;
        el.style.display = count > 0 ? "" : "none";
    }
}

function formatVND(number) {
    return new Intl.NumberFormat("vi-VN").format(number) + "₫";
}

function showToast(message, type = "success") {
    const toastContainer = document.getElementById("toast-container");
    if (!toastContainer) return;

    const icon = type === "success" ? "bi-check-circle" : "bi-x-circle";
    const toastEl = document.createElement("div");
    toastEl.className = `toast align-items-center text-white bg-${type} border-0 mb-2`;
    toastEl.setAttribute("role", "alert");
    toastEl.innerHTML = `
        <div class="d-flex">
            <div class="toast-body"><i class="bi ${icon} me-2"></i>${message}</div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
        </div>`;
    toastContainer.appendChild(toastEl);
    const toast = new bootstrap.Toast(toastEl, { delay: 3000 });
    toast.show();
    toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
}
