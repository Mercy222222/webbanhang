/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect } from "react";

function LoginScreen({ apiBase, setToken }: { apiBase: string, setToken: (t: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiBase}authApi/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem("adminToken", data.token);
        setToken(data.token);
      } else {
        setError(data.message || "Đăng nhập thất bại");
      }
    } catch(err) {
      setError("Lỗi kết nối đến máy chủ");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center p-4 font-sans">
       <div className="mb-8 flex items-center gap-2">
          <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span className="text-2xl font-bold tracking-wider bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent">
            GEARVN ADMIN
          </span>
       </div>
       <form onSubmit={handleLogin} className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 w-full max-w-sm space-y-5 shadow-2xl">
          <h2 className="text-lg text-white font-bold text-center">Đăng nhập Quản trị</h2>
          {error && <div className="text-rose-400 text-xs font-semibold bg-rose-500/10 p-3 rounded-lg border border-rose-500/20">{error}</div>}
          <div>
            <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold block mb-2">Email Admin</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" required placeholder="admin@gearvn.com" />
          </div>
          <div>
            <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold block mb-2">Mật khẩu</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" required placeholder="••••••••" />
          </div>
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg p-3 mt-2 transition-colors text-sm">Đăng nhập</button>
       </form>
    </div>
  );
}

interface Stats {
  total_revenue: number;
  total_orders: number;
  average_order_value: number;
  status_breakdown: {
    [key: string]: number;
  };
}

interface Order {
  id: number;
  user_id: number;
  user_name: string;
  phone: string;
  shipping_address: string;
  total_price: number;
  status: string;
  payment_method: string;
  coupon_code: string | null;
  discount_amount: number;
  created_at: string;
}

interface OrderItem {
  id: number;
  product_name: string;
  price: number;
  quantity: number;
  image: string | null;
}

interface OrderDetailData {
  order: Order & { user_email: string };
  items: OrderItem[];
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "orders">("overview");
  const [apiBase, setApiBase] = useState<string>("http://localhost/webbanhang/index.php?url=");
  const [customApiUrl, setCustomApiUrl] = useState<string>("");
  const [showSettings, setShowSettings] = useState<boolean>(false);

  // States for lists & details
  const [stats, setStats] = useState<Stats | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
  const [orderDetail, setOrderDetail] = useState<OrderDetailData | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<boolean>(false);
  const [isDetailLoading, setIsDetailLoading] = useState<boolean>(false);

  // Filter states
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "highest" | "lowest">("newest");

  // Error & loading
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // JWT Auth
  const [token, setToken] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (savedToken) setToken(savedToken);
    setIsCheckingAuth(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setToken(null);
  };

  // Fetch initial data
  const fetchData = async (urlBase: string, currentToken: string) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch Stats
      const statsRes = await fetch(`${urlBase}api/stats`, { 
        mode: "cors", 
        headers: { "Authorization": `Bearer ${currentToken}` } 
      });
      if (statsRes.status === 401 || statsRes.status === 403) {
        handleLogout();
        return;
      }
      const statsJson = await statsRes.json();
      if (statsJson.success) {
        setStats(statsJson.data);
      }

      // 2. Fetch Orders
      const ordersRes = await fetch(`${urlBase}api/orders`, { 
        mode: "cors", 
        headers: { "Authorization": `Bearer ${currentToken}` } 
      });
      if (!ordersRes.ok) throw new Error("Failed to fetch orders list");
      const ordersJson = await ordersRes.json();
      if (ordersJson.success) {
        setOrders(ordersJson.data);
      }
    } catch (err: any) {
      console.error(err);
      setError(`Không thể kết nối đến máy chủ PHP tại URL: ${urlBase}. Vui lòng kiểm tra cổng dịch vụ Apache/PHP hoặc cấu hình lại URL kết nối trong phần Cài đặt.`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchData(apiBase, token);
  }, [apiBase, token]);

  // Fetch single order details
  const fetchOrderDetail = async (orderId: number) => {
    setIsDetailLoading(true);
    try {
      const res = await fetch(`${apiBase}api/orderDetail/${orderId}`, { 
        mode: "cors", 
        headers: { "Authorization": `Bearer ${token}` } 
      });
      const json = await res.json();
      if (json.success) {
        setOrderDetail(json.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsDetailLoading(false);
    }
  };

  useEffect(() => {
    if (selectedOrderId !== null) {
      fetchOrderDetail(selectedOrderId);
    } else {
      setOrderDetail(null);
    }
  }, [selectedOrderId]);

  // Update order status handler
  const handleUpdateStatus = async (status: string) => {
    if (!selectedOrderId) return;
    setIsUpdatingStatus(true);
    try {
      const res = await fetch(`${apiBase}api/updateOrderStatus/${selectedOrderId}`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ status }),
        mode: "cors"
      });
      const json = await res.json();
      if (json.success) {
        // Refetch stats and list
        if (token) await fetchData(apiBase, token);
        // Refetch details
        await fetchOrderDetail(selectedOrderId);
      } else {
        alert("Lỗi khi cập nhật trạng thái đơn hàng: " + json.message);
      }
    } catch (err) {
      console.error(err);
      alert("Không thể kết nối đến server để cập nhật.");
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  const handleApplySettings = (e: React.FormEvent) => {
    e.preventDefault();
    if (customApiUrl) {
      setApiBase(customApiUrl);
      setShowSettings(false);
    }
  };

  // Formatting utils
  const formatVND = (value: number) => {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-500/10 text-amber-500 border border-amber-500/20";
      case "confirmed":
        return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      case "shipping":
        return "bg-purple-500/10 text-purple-400 border border-purple-500/20";
      case "completed":
        return "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20";
      case "cancelled":
        return "bg-rose-500/10 text-rose-400 border border-rose-500/20";
      default:
        return "bg-zinc-500/10 text-zinc-400 border border-zinc-500/20";
    }
  };

  const translateStatus = (status: string) => {
    switch (status) {
      case "pending": return "Chờ xử lý";
      case "confirmed": return "Đã xác nhận";
      case "shipping": return "Đang giao hàng";
      case "completed": return "Hoàn tất";
      case "cancelled": return "Đã hủy";
      default: return status;
    }
  };

  // Filter and sort computation
  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesSearch =
      order.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.phone.includes(searchQuery) ||
      order.id.toString().includes(searchQuery);
    return matchesStatus && matchesSearch;
  }).sort((a, b) => {
    if (sortOrder === "newest") return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    if (sortOrder === "oldest") return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
    if (sortOrder === "highest") return b.total_price - a.total_price;
    if (sortOrder === "lowest") return a.total_price - b.total_price;
    return 0;
  });

  if (isCheckingAuth) return <div className="min-h-screen bg-zinc-950 flex items-center justify-center"><div className="animate-spin h-8 w-8 border-b-2 border-blue-500 rounded-full"></div></div>;

  if (!token) {
    return <LoginScreen apiBase={apiBase} setToken={setToken} />;
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans flex flex-col md:flex-row">
      
      {/* ─── SIDEBAR ─── */}
      <aside className="w-full md:w-64 bg-zinc-900 border-b md:border-b-0 md:border-r border-zinc-800 flex flex-col flex-shrink-0">
        {/* Brand Header */}
        <div className="h-16 px-6 border-b border-zinc-800 flex items-center justify-between">
          <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent flex items-center gap-2">
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            GEARVN ADMIN
          </span>
          <button 
            onClick={() => setShowSettings(!showSettings)} 
            className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
            title="Database Connection Config"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          <button 
            onClick={handleLogout}
            className="p-1.5 ml-2 rounded-lg border border-rose-500/20 text-rose-400 hover:text-white hover:bg-rose-500 transition"
            title="Đăng xuất"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-4 py-6 space-y-1.5">
          <button
            onClick={() => setActiveTab("overview")}
            className={`w-full py-2.5 px-4 rounded-lg flex items-center gap-3.5 font-medium text-sm transition-all ${
              activeTab === "overview"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/15"
                : "text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
            </svg>
            Tổng quan (Overview)
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`w-full py-2.5 px-4 rounded-lg flex items-center gap-3.5 font-medium text-sm transition-all ${
              activeTab === "orders"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/15"
                : "text-zinc-400 hover:text-zinc-50 hover:bg-zinc-800"
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
            Đơn hàng (Orders)
          </button>
        </nav>

        {/* Footer info */}
        <div className="p-4 border-t border-zinc-800 text-[10px] text-zinc-500 font-mono">
          API URL: <span className="text-zinc-400 break-all">{apiBase}</span>
        </div>
      </aside>

      {/* ─── MAIN APP WRAPPER ─── */}
      <main className="flex-1 bg-zinc-950 min-h-screen p-6 md:p-10 overflow-y-auto flex flex-col gap-8">
        
        {/* Settings Modal (Overlay) */}
        {showSettings && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl w-full max-w-md shadow-2xl relative">
              <button 
                onClick={() => setShowSettings(false)}
                className="absolute top-4 right-4 text-zinc-400 hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Địa chỉ Kết nối API PHP
              </h3>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                Nhập địa chỉ máy chủ chạy ứng dụng PHP của bạn (ví dụ: chạy trên Apache XAMPP, Laragon).
              </p>
              <form onSubmit={handleApplySettings} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-500 uppercase mb-1.5">PHP Endpoint URL</label>
                  <input
                    type="url"
                    value={customApiUrl || apiBase}
                    onChange={(e) => setCustomApiUrl(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-blue-500"
                    placeholder="http://localhost/webbanhang/index.php?url="
                    required
                  />
                </div>
                <div className="flex gap-3 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSettings(false)}
                    className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-xs font-semibold"
                  >
                    Kết nối ngay
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Connection Error Banner */}
        {error && (
          <div className="bg-rose-500/10 border border-rose-500/20 text-rose-300 p-4 rounded-xl flex gap-3.5 items-start">
            <svg className="w-6 h-6 text-rose-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div className="flex-1 text-sm">
              <p className="font-semibold text-rose-200">Không thể kết nối API!</p>
              <p className="mt-1 leading-relaxed">{error}</p>
              <button 
                onClick={() => setShowSettings(true)}
                className="mt-3 text-xs font-bold text-rose-400 hover:underline flex items-center gap-1"
              >
                Cấu hình lại cổng kết nối <i className="fa-solid fa-arrow-right text-[10px]"></i>
              </button>
            </div>
          </div>
        )}

        {/* Loading overlay for data fetch */}
        {loading && !error && (
          <div className="flex-1 flex flex-col items-center justify-center py-20 text-zinc-400">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4"></div>
            <p className="text-sm">Đang tải dữ liệu từ cơ sở dữ liệu...</p>
          </div>
        )}

        {!loading && !error && (
          <>
            {/* ─── TAB 1: OVERVIEW ─── */}
            {activeTab === "overview" && stats && (
              <div className="space-y-8 animate-fadeIn">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Trang quản trị (Dashboard Overview)</h1>
                  <p className="text-zinc-400 text-sm mt-1">Dữ liệu phân tích và hiệu năng bán hàng của GEARVN.</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Revenue Card */}
                  <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex items-center justify-between shadow-sm hover:border-zinc-700 transition">
                    <div className="space-y-1.5">
                      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Doanh thu đạt được</span>
                      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{formatVND(stats.total_revenue)}</h2>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>

                  {/* Total Orders Card */}
                  <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex items-center justify-between shadow-sm hover:border-zinc-700 transition">
                    <div className="space-y-1.5">
                      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Tổng đơn hàng</span>
                      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{stats.total_orders} đơn</h2>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </div>
                  </div>

                  {/* Average Order Value Card */}
                  <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl flex items-center justify-between shadow-sm hover:border-zinc-700 transition">
                    <div className="space-y-1.5">
                      <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Giá trị trung bình đơn</span>
                      <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">{formatVND(stats.average_order_value)}</h2>
                    </div>
                    <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Visual Status Breakdown & Recent Activity */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Status Breakdown Panel */}
                  <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-6 lg:col-span-1">
                    <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Trạng thái đơn hàng</h3>
                    
                    <div className="space-y-4">
                      {["pending", "confirmed", "shipping", "completed", "cancelled"].map((statusKey) => {
                        const count = stats.status_breakdown[statusKey] || 0;
                        const percentage = stats.total_orders > 0 ? (count / stats.total_orders) * 100 : 0;
                        
                        let barColor = "bg-amber-500";
                        if (statusKey === "confirmed") barColor = "bg-blue-500";
                        if (statusKey === "shipping") barColor = "bg-purple-500";
                        if (statusKey === "completed") barColor = "bg-emerald-500";
                        if (statusKey === "cancelled") barColor = "bg-rose-500";

                        return (
                          <div key={statusKey} className="space-y-1">
                            <div className="flex justify-between text-xs">
                              <span className="font-semibold text-zinc-300 capitalize">{translateStatus(statusKey)}</span>
                              <span className="text-zinc-500 font-mono">{count} / {stats.total_orders} ({Math.round(percentage)}%)</span>
                            </div>
                            <div className="h-2 w-full bg-zinc-850 rounded-full overflow-hidden">
                              <div className={`h-full ${barColor} rounded-full`} style={{ width: `${percentage}%` }}></div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Recent Orders List Panel */}
                  <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl space-y-5 lg:col-span-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">Đơn hàng vừa đặt</h3>
                      <button onClick={() => setActiveTab("orders")} className="text-xs text-blue-400 hover:underline font-semibold flex items-center gap-0.5">
                        Xem tất cả <i className="fa-solid fa-arrow-right text-[10px]"></i>
                      </button>
                    </div>

                    <div className="space-y-3.5">
                      {orders.slice(0, 5).map((order) => (
                        <div 
                          key={order.id} 
                          onClick={() => setSelectedOrderId(order.id)}
                          className="p-3 bg-zinc-950 border border-zinc-850/50 rounded-lg hover:border-zinc-700 transition cursor-pointer flex justify-between items-center"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-bold text-white">#DH{order.id}</span>
                              <span className="text-[10px] text-zinc-500">{new Date(order.created_at).toLocaleDateString("vi-VN")}</span>
                            </div>
                            <div className="text-xs text-zinc-400">{order.user_name} ({order.phone})</div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-semibold text-zinc-300">{formatVND(order.total_price)}</span>
                            <span className={`text-[10px] py-0.5 px-2 rounded-full font-bold ${getStatusBadgeClass(order.status)}`}>
                              {translateStatus(order.status)}
                            </span>
                          </div>
                        </div>
                      ))}
                      {orders.length === 0 && (
                        <div className="text-center py-6 text-zinc-500 text-xs">Chưa có đơn hàng nào trong hệ thống.</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ─── TAB 2: ORDERS LIST ─── */}
            {activeTab === "orders" && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight">Quản lý Đơn hàng</h1>
                  <p className="text-zinc-400 text-sm mt-1">Duyệt thông tin đơn, cập nhật trạng thái vận chuyển và giao nhận của khách hàng.</p>
                </div>

                {/* Filter and Query Bar */}
                <div className="bg-zinc-900 border border-zinc-800 p-4 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between">
                  
                  {/* Search Query Input */}
                  <div className="relative w-full md:w-80">
                    <input
                      type="text"
                      placeholder="Tìm kiếm theo Tên, Số điện thoại, Mã đơn..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-lg py-2 pl-9 pr-4 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500"
                    />
                    <svg className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>

                  {/* Option filters */}
                  <div className="flex flex-wrap gap-3 w-full md:w-auto items-center justify-end">
                    
                    {/* Status Filter */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-zinc-500 font-semibold uppercase">Trạng thái:</span>
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-zinc-950 border border-zinc-800 text-xs rounded-lg py-2 px-3 focus:outline-none text-white"
                      >
                        <option value="all">Tất cả</option>
                        <option value="pending">Chờ xử lý</option>
                        <option value="confirmed">Đã xác nhận</option>
                        <option value="shipping">Đang giao</option>
                        <option value="completed">Hoàn tất</option>
                        <option value="cancelled">Đã hủy</option>
                      </select>
                    </div>

                    {/* Sorting */}
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs text-zinc-500 font-semibold uppercase">Sắp xếp:</span>
                      <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value as any)}
                        className="bg-zinc-950 border border-zinc-800 text-xs rounded-lg py-2 px-3 focus:outline-none text-white"
                      >
                        <option value="newest">Mới nhất</option>
                        <option value="oldest">Cũ nhất</option>
                        <option value="highest">Giá trị cao</option>
                        <option value="lowest">Giá trị thấp</option>
                      </select>
                    </div>

                  </div>
                </div>

                {/* Orders Grid Table */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-zinc-800 text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
                          <th className="py-4 px-6">Mã Đơn</th>
                          <th className="py-4 px-6">Khách Hàng</th>
                          <th className="py-4 px-6">Số Điện Thoại</th>
                          <th className="py-4 px-6">Địa Chỉ Nhận Hàng</th>
                          <th className="py-4 px-6 text-right">Tổng Tiền</th>
                          <th className="py-4 px-6 text-center">Trạng Thái</th>
                          <th className="py-4 px-6 text-center">Hành Động</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-850/50 text-xs text-zinc-300">
                        {filteredOrders.map((order) => (
                          <tr key={order.id} className="hover:bg-zinc-850/30 transition">
                            <td className="py-4 px-6 font-bold text-white">#DH{order.id}</td>
                            <td className="py-4 px-6">
                              <div className="font-semibold text-zinc-200">{order.user_name}</div>
                              <div className="text-[10px] text-zinc-500 font-mono mt-0.5">{new Date(order.created_at).toLocaleString("vi-VN")}</div>
                            </td>
                            <td className="py-4 px-6 font-mono text-zinc-400">{order.phone}</td>
                            <td className="py-4 px-6 max-w-xs truncate" title={order.shipping_address}>{order.shipping_address}</td>
                            <td className="py-4 px-6 text-right font-bold text-white">{formatVND(order.total_price)}</td>
                            <td className="py-4 px-6 text-center">
                              <span className={`py-1 px-3 rounded-full text-[10px] font-bold ${getStatusBadgeClass(order.status)}`}>
                                {translateStatus(order.status)}
                              </span>
                            </td>
                            <td className="py-4 px-6 text-center">
                              <button
                                onClick={() => setSelectedOrderId(order.id)}
                                className="bg-blue-600/10 hover:bg-blue-600 border border-blue-500/20 hover:border-transparent text-blue-400 hover:text-white px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all"
                              >
                                Chi tiết
                              </button>
                            </td>
                          </tr>
                        ))}
                        {filteredOrders.length === 0 && (
                          <tr>
                            <td colSpan={7} className="py-8 text-center text-zinc-500 font-medium">
                              Không tìm thấy đơn hàng nào khớp với bộ lọc tìm kiếm.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* ─── ORDER DETAIL DRAWER / MODAL ─── */}
        {selectedOrderId !== null && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-end z-50 animate-fadeIn">
            <div className="w-full max-w-2xl bg-zinc-900 border-l border-zinc-800 h-full flex flex-col shadow-2xl animate-slideLeft">
              
              {/* Modal Header */}
              <div className="h-16 px-6 border-b border-zinc-800 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-white">Đơn hàng #DH{selectedOrderId}</h3>
                  <p className="text-xs text-zinc-500 font-mono">Quản lý chi tiết giao dịch</p>
                </div>
                <button 
                  onClick={() => setSelectedOrderId(null)}
                  className="p-1.5 rounded-lg border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {isDetailLoading && (
                  <div className="flex flex-col items-center justify-center py-20 text-zinc-500">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500 mb-4"></div>
                    <p className="text-xs">Đang nạp thông tin đơn...</p>
                  </div>
                )}

                {!isDetailLoading && orderDetail && (
                  <>
                    {/* Status control card */}
                    <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-xl flex flex-col md:flex-row gap-4 items-center justify-between">
                      <div className="space-y-1 text-center md:text-left">
                        <span className="text-[10px] font-semibold text-zinc-500 uppercase">Trạng thái hiện tại</span>
                        <div className="flex items-center gap-2">
                          <span className={`py-1 px-3 rounded-full text-[10px] font-bold ${getStatusBadgeClass(orderDetail.order.status)}`}>
                            {translateStatus(orderDetail.order.status)}
                          </span>
                        </div>
                      </div>

                      {/* Dropdown status update switcher */}
                      <div className="flex items-center gap-3">
                        <select
                          disabled={isUpdatingStatus}
                          value={orderDetail.order.status}
                          onChange={(e) => handleUpdateStatus(e.target.value)}
                          className="bg-zinc-900 border border-zinc-800 text-xs rounded-lg py-2 px-3 focus:outline-none text-white disabled:opacity-50"
                        >
                          <option value="pending">Chờ xử lý</option>
                          <option value="confirmed">Đã xác nhận</option>
                          <option value="shipping">Đang giao hàng</option>
                          <option value="completed">Hoàn tất</option>
                          <option value="cancelled">Hủy đơn hàng</option>
                        </select>
                      </div>
                    </div>

                    {/* Customer Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-800 pb-1.5">Khách hàng</h4>
                        <div className="text-xs space-y-2 text-zinc-300">
                          <div><span className="text-zinc-500">Tên:</span> <strong className="text-white">{orderDetail.order.user_name}</strong></div>
                          <div><span className="text-zinc-500">Email:</span> <span className="font-mono">{orderDetail.order.user_email}</span></div>
                          <div><span className="text-zinc-500">Số điện thoại:</span> <span className="font-mono">{orderDetail.order.phone}</span></div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-800 pb-1.5">Giao dịch</h4>
                        <div className="text-xs space-y-2 text-zinc-300">
                          <div><span className="text-zinc-500">Ngày đặt:</span> <span className="font-mono">{new Date(orderDetail.order.created_at).toLocaleString("vi-VN")}</span></div>
                          <div><span className="text-zinc-500">Thanh toán:</span> <span className="uppercase text-emerald-400 font-bold">{orderDetail.order.payment_method}</span></div>
                          {orderDetail.order.coupon_code && (
                            <div><span className="text-zinc-500">Mã giảm giá:</span> <span className="bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded font-mono font-semibold">{orderDetail.order.coupon_code}</span></div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-800 pb-1.5">Địa chỉ nhận hàng</h4>
                      <p className="text-xs text-zinc-300 leading-relaxed bg-zinc-950 border border-zinc-850 p-3.5 rounded-lg">
                        {orderDetail.order.shipping_address}
                      </p>
                    </div>

                    {/* Order items List */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-800 pb-1.5">Sản phẩm đã mua</h4>
                      <div className="divide-y divide-zinc-800">
                        {orderDetail.items.map((item) => {
                          const imageUrl = item.image || "https://placehold.co/80x60/1e293b/white?text=GEARVN";
                          return (
                            <div key={item.id} className="py-3.5 flex gap-4 items-center">
                              <img src={imageUrl} alt={item.product_name} className="w-16 h-12 rounded bg-zinc-950 object-cover border border-zinc-800 flex-shrink-0" />
                              <div className="flex-1 min-w-0">
                                <h5 className="text-xs font-semibold text-white truncate" title={item.product_name}>{item.product_name}</h5>
                                <p className="text-[10px] text-zinc-500 font-mono mt-0.5">{formatVND(item.price)} × {item.quantity}</p>
                              </div>
                              <span className="text-xs font-bold text-zinc-200 flex-shrink-0">{formatVND(item.price * item.quantity)}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Price calculations summary */}
                    <div className="p-4 bg-zinc-950 border border-zinc-850 rounded-xl text-xs space-y-2.5">
                      <div className="flex justify-between text-zinc-400">
                        <span>Tạm tính</span>
                        <span>{formatVND(Number(orderDetail.order.total_price) + Number(orderDetail.order.discount_amount))}</span>
                      </div>
                      {Number(orderDetail.order.discount_amount) > 0 && (
                        <div className="flex justify-between text-rose-400">
                          <span>Giảm giá</span>
                          <span>- {formatVND(orderDetail.order.discount_amount)}</span>
                        </div>
                      )}
                      <div className="h-px bg-zinc-850 my-1"></div>
                      <div className="flex justify-between text-sm font-bold text-white">
                        <span>Tổng cộng</span>
                        <span className="text-blue-400">{formatVND(orderDetail.order.total_price)}</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

      </main>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-slideLeft {
          animation: slideLeft 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
}
