import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import apiService from "../services/apiService";
import { useNavigate } from "react-router-dom"; // ⬅️ add this
import Login from "../components/Userlogin.jsx";

import {
  Wallet,
  CreditCard,
  Users,
  MessageCircle,
  Send,
  Home,
  CheckSquare,
  Info,
  User,
} from "lucide-react";
import { useApp } from "../context/AppContext.jsx";

// Products
const dayProducts = [
  {
    name: "Plan A - Kaju Mixture",
    price: 590,
    dailyProfit: 75,
    duration: 120,
    totalReturn: 9000,
    image: "/kaju mix.jpeg",
  },
  {
    name: "Plan B - Moong daal",
    price: 1990,
    dailyProfit: 310,
    duration: 105,
    totalReturn: 32550,
    image: "/mongdaal.jpeg",
  },
  {
    name: "Plan C - Navrattan Mix",
    price: 4900,
    dailyProfit: 840,
    duration: 90,
    totalReturn: 75600,
    image: "/navrattan.jpg",
  },
  {
    name: "Plan D - Murmura Mix",
    price: 9700,
    dailyProfit: 1620,
    duration: 75,
    totalReturn: 121500,
    image: "/murmukra.jpeg",
  },
  {
    name: "Plan E - Bhujia",
    price: 15980,
    dailyProfit: 3960,
    duration: 50,
    totalReturn: 198000,
    image: "/imagesbhejia.jpeg",
  },
  {
    name: "Plan F - Elite Selection",
    price: 21000,
    dailyProfit: 6500,
    duration: 50,
    totalReturn: 325000,
    image: "/elite.jpeg",
  },
  {
    name: "Plan G - Happy Moments",
    price: 34900,
    dailyProfit: 11000,
    duration: 50,
    totalReturn: 550000,
    image: "/momonets.jpeg",
  },
];

const vipProducts = [
  {
    name: "VIP Plan 1 - Express Mix",
    price: 5000,
    dailyProfit: 3100,
    duration: 7,
    totalReturn: 21700,
    image: "/vipimg.jpeg",
  },
  {
    name: "VIP Plan 2 - Supreme Collection",
    price: 12000,
    dailyProfit: 7200,
    duration: 7,
    totalReturn: 50400,
    image: "/vipimg2.jpeg",
  },
  {
    name: "VIP Plan 3 - Ultimate Premium",
    price: 25000,
    dailyProfit: 14500,
    duration: 7,
    totalReturn: 101500,
    image: "/vipimg3.jpeg",
  },
];

// Profile Section Component
const ProfileSection = ({
  user,
  balance,
  setShowRecharge,
  setShowWithdraw,
  onLogout,
}) => {
  return (
    <div className="p-4">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-red-700 to-red-600 rounded-2xl p-4 text-white shadow-md">
        <div className="flex items-center mb-4">
          <div className="bg-white text-red-700 font-bold px-3 py-2 rounded-full mr-3">
            {user?.username?.charAt(0) || "H"}
          </div>
          <div>
            <p className="font-semibold text-sm">{user?.username || "Guest"}</p>
            <p className="text-xs">{user?.phone || "123****88"}</p>
          </div>
        </div>

        {/* Account Balance */}
        <div className="bg-white text-red-700 p-3 rounded-xl flex justify-between items-center mb-3">
          <div>
            <p className="text-xs text-gray-600">Account Balance</p>
            <p className="font-bold text-lg">₹{balance}</p>
          </div>
          <button
            onClick={() => setShowRecharge(true)}
            className="bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 rounded-lg text-white text-xs font-semibold"
          >
            Recharge ⚡
          </button>
        </div>

        {/* Quick Summary */}
        <div className="flex justify-between text-xs font-semibold">
          <div className="text-center flex-1">
            <p>₹{balance}</p>
            <p className="text-white/80">Balance</p>
          </div>
          <div className="text-center flex-1">
            <p>₹50</p>
            <p className="text-white/80">Recharge</p>
          </div>
          <div className="text-center flex-1">
            <p>₹350</p>
            <p className="text-white/80">Withdraw</p>
          </div>
        </div>
      </div>

      {/* Menu List */}
      <div className="mt-4 bg-white rounded-xl shadow divide-y">
        <button className="w-full flex justify-between items-center p-3 text-sm">
          <span>📑 About Company</span> <span>›</span>
        </button>
        <button className="w-full flex justify-between items-center p-3 text-sm">
          <span>💰 Income Record</span> <span>›</span>
        </button>
        <button className="w-full flex justify-between items-center p-3 text-sm">
          <span>➕ Recharge Record</span> <span>›</span>
        </button>
        <button className="w-full flex justify-between items-center p-3 text-sm">
          <span>➖ Withdraw Record</span> <span>›</span>
        </button>
        <button className="w-full flex justify-between items-center p-3 text-sm">
          <span>🔒 Security Manager</span> <span>›</span>
        </button>
      </div>

      {/* Logout Button */}
      <div className="mt-6">
        <button
          onClick={onLogout}
          className="w-full bg-red-600 text-white py-3 rounded-xl font-bold"
        >
          LOGOUT
        </button>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("day");
  const [showRecharge, setShowRecharge] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawBank, setWithdrawBank] = useState({
    accountNumber: "",
    ifscCode: "",
    accountHolder: "",
  });
  const [investing, setInvesting] = useState(false);
  const [message, setMessage] = useState("");
  const { user, token, setUser } = useApp();
  const navigate = useNavigate();
  const balance = user?.balance || 0;
  const { logout } = useApp();

  // Logout functionality
  const handleLogout = () => {
    // Clear user data from context
    logout();

    // Clear any stored authentication data (if you're using localStorage/sessionStorage)
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Redirect to login page
    navigate("/login", { replace: true });
  };
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!user || !storedToken) {
      navigate("/login", { replace: true });
    }
  }, [user, navigate]);



  // Recharge
  const handleRecharge = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await apiService.recharge(token, Number(rechargeAmount));
      if (res.balance !== undefined) setUser({ ...user, balance: res.balance });
      setMessage(res.message || "Recharge successful");
      setShowRecharge(false);
      setRechargeAmount("");
    } catch {
      setMessage("Recharge failed");
    }
  };

  // Withdraw
  const handleWithdraw = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await apiService.requestWithdrawal(
        token,
        Number(withdrawAmount),
        withdrawBank
      );
      setMessage(res.message || "Withdrawal requested");
      setShowWithdraw(false);
      setWithdrawAmount("");
      setWithdrawBank({ accountNumber: "", ifscCode: "", accountHolder: "" });
    } catch {
      setMessage("Withdraw failed");
    }
  };

  // Invest
  const handleInvest = async (product) => {
    setInvesting(true);
    setMessage("");
    try {
      const res = await apiService.invest(
        token,
        product._id || product.id || product.name
      );
      if (res.balance !== undefined) setUser({ ...user, balance: res.balance });
      setMessage(res.message || "Investment successful");
    } catch {
      setMessage("Investment failed");
    }
    setInvesting(false);
  };

  return (
    <div className="min-h-screen bg-red-700 pb-safe">
      {/* Header */}
      <header className="bg-white p-4 flex items-center justify-between shadow-sm">
        <h1 className="text-base font-bold text-gray-800">Dashboard</h1>
      </header>

      {/* //section main */}
      <div className="bg-gradient-to-r from-red-700 to-red-600 m-4 p-6 rounded-2xl text-white shadow-lg">
        <div className="flex items-center mb-4">
          <div className="bg-white p-2 rounded-lg mr-3">
            <span className="text-red-700 font-bold text-sm">Haldiram's</span>
          </div>
          <div>
            <div className="text-white font-semibold text-lg">
              {user ? user.username : "Guest"}
            </div>
            <div className="text-white text-sm">{user ? user.phone : ""}</div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <div className="text-white/80 text-sm">Your Balance</div>
            <div className="text-white text-2xl font-bold">₹{balance}</div>
          </div>
          <div>
            <div className="text-white/80 text-sm">Total Income</div>
            <div className="text-white text-2xl font-bold">₹75</div>
          </div>
          <div className="bg-green-500 p-2 rounded-full">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <span className="text-green-500 text-xs font-bold">₹</span>
            </div>
          </div>
        </div>

        <div className="flex justify-between">
          <button
            className="flex flex-col items-center space-y-1"
            onClick={() => setShowRecharge(true)}
          >
            <div className="bg-white/20 p-3 rounded-xl">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-xs">Recharge</span>
          </button>
          <button
            className="flex flex-col items-center space-y-1"
            onClick={() => setShowWithdraw(true)}
          >
            <div className="bg-white/20 p-3 rounded-xl">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-xs">Withdraw</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <div className="bg-white/20 p-3 rounded-xl">
              <Users className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-xs">Link</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <div className="bg-white/20 p-3 rounded-xl">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-xs">Orders</span>
          </button>
          <button className="flex flex-col items-center space-y-1">
            <div className="bg-white/20 p-3 rounded-xl">
              <Send className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-xs">Telegram</span>
          </button>
        </div>
      </div>

      {/* Show Profile Section */}
      {activeTab === "profile" ? (
        <ProfileSection
          user={user}
          balance={balance}
          setShowRecharge={setShowRecharge}
          setShowWithdraw={setShowWithdraw}
          onLogout={handleLogout}
        />
      ) : (
        <>
          {/* Tabs */}
          <div className="mx-3 mb-3 flex bg-white rounded-xl shadow-sm text-sm mt-3">
            <button
              onClick={() => setActiveTab("day")}
              className={`flex-1 py-2 ${
                activeTab === "day" ? "bg-red-600 text-white" : "text-gray-600"
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setActiveTab("vip")}
              className={`flex-1 py-2 relative ${
                activeTab === "vip" ? "bg-red-600 text-white" : "text-gray-600"
              }`}
            >
              VIP
              <span className="absolute -top-1 right-2 bg-orange-500 text-white text-[10px] px-1 rounded">
                Hot
              </span>
            </button>
          </div>

          {/* Products */}

          <div className="px-3 space-y-3">
            {(activeTab === "day" ? dayProducts : vipProducts).map(
              (product, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-4 shadow-sm flex flex-col"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="mt-3 p-5 sm:mt-0 sm:ml-3 w-full sm:w-10 h-60 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-sm font-semibold mb-2">
                        {product.name}
                      </h3>
                      <ul className="text-xs space-y-1">
                        <li className="flex justify-between">
                          <span>Price</span>
                          <span>₹{product.price}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Duration</span>
                          <span>{product.duration} Days</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Daily</span>
                          <span>₹{product.dailyProfit}</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Total</span>
                          <span>₹{product.totalReturn}</span>
                        </li>
                      </ul>
                      <button
                        onClick={() => handleInvest(product)}
                        disabled={investing}
                        className="mt-3 w-full bg-red-600 text-white py-2 rounded-full text-xs font-semibold"
                      >
                        {investing ? "Investing..." : "Invest Now"}
                      </button>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </>
      )}

      {/* Recharge Modal */}
      {showRecharge && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
          <form
            onSubmit={handleRecharge}
            className="bg-white p-4 rounded-lg w-full max-w-sm"
          >
            <h2 className="text-sm font-bold mb-3">Recharge</h2>
            <input
              type="number"
              value={rechargeAmount}
              onChange={(e) => setRechargeAmount(e.target.value)}
              className="w-full border p-2 rounded mb-3 text-sm"
              placeholder="Amount"
              required
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowRecharge(false)}
                className="px-3 py-1 bg-gray-200 rounded text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-red-600 text-white rounded text-xs"
              >
                OK
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdraw && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-3">
          <form
            onSubmit={handleWithdraw}
            className="bg-white p-4 rounded-lg w-full max-w-sm text-sm"
          >
            <h2 className="font-bold mb-3">Withdraw</h2>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              placeholder="Amount"
              className="w-full border p-2 rounded mb-2"
              required
            />
            <input
              type="text"
              value={withdrawBank.accountNumber}
              onChange={(e) =>
                setWithdrawBank({
                  ...withdrawBank,
                  accountNumber: e.target.value,
                })
              }
              placeholder="Account Number"
              className="w-full border p-2 rounded mb-2"
              required
            />
            <input
              type="text"
              value={withdrawBank.ifscCode}
              onChange={(e) =>
                setWithdrawBank({ ...withdrawBank, ifscCode: e.target.value })
              }
              placeholder="IFSC Code"
              className="w-full border p-2 rounded mb-2"
              required
            />
            <input
              type="text"
              value={withdrawBank.accountHolder}
              onChange={(e) =>
                setWithdrawBank({
                  ...withdrawBank,
                  accountHolder: e.target.value,
                })
              }
              placeholder="Account Holder"
              className="w-full border p-2 rounded mb-3"
              required
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowWithdraw(false)}
                className="px-3 py-1 bg-gray-200 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-red-600 text-white rounded"
              >
                Withdraw
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Message */}
      {message && (
        <div className="fixed bottom-16 left-1/2 -translate-x-1/2 bg-white border border-red-400 text-red-600 px-4 py-2 rounded text-xs shadow z-50">
          {message}
          <button onClick={() => setMessage("")} className="ml-2 text-gray-500">
            ×
          </button>
        </div>
      )}

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 py-2 pb-safe">
        <div className="flex justify-around text-xs">
          <button
            onClick={() => setActiveTab("day")}
            className={`flex flex-col items-center ${
              activeTab === "day" ? "text-red-500" : "text-gray-400"
            }`}
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </button>
          <Link to="/task" className="flex flex-col items-center text-gray-400">
            <CheckSquare className="w-5 h-5" />
            <span>Task</span>
          </Link>
          <button className="flex flex-col items-center">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
          </button>
          <Link
            to="/about"
            className="flex flex-col items-center text-gray-400"
          >
            <Info className="w-5 h-5" />
            <span>About</span>
          </Link>
          <button
            onClick={() => setActiveTab("profile")}
            className={`flex flex-col items-center ${
              activeTab === "profile" ? "text-red-500" : "text-gray-400"
            }`}
          >
            <User className="w-5 h-5" />
            <span>Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Dashboard;
