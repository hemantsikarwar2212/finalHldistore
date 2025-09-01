import  { useState } from "react";
import { Link } from "react-router-dom";
import apiService from "../services/apiService";
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
    image:"/vipimg.jpeg"
  },
  {
    name: "VIP Plan 2 - Supreme Collection",
    price: 12000,
    dailyProfit: 7200,
    duration: 7,
    totalReturn: 50400,
    image:"/vipimg2.jpeg"
  },
  {
    name: "VIP Plan 3 - Ultimate Premium",
    price: 25000,
    dailyProfit: 14500,
    duration: 7,
    totalReturn: 101500,
    image:"/vipimg3.jpeg"
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("day");
  const [showRecharge, setShowRecharge] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [rechargeAmount, setRechargeAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawBank, setWithdrawBank] = useState({ accountNumber: "", ifscCode: "", accountHolder: "" });
  const [investing, setInvesting] = useState(false);
  const [message, setMessage] = useState("");
  const { user, token, setUser } = useApp();
  const balance = user?.balance || 0;

  // Recharge handler
  const handleRecharge = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await apiService.recharge(token, Number(rechargeAmount));
      if (res.balance !== undefined) setUser({ ...user, balance: res.balance });
      setMessage(res.message || "Recharge successful");
      setShowRecharge(false);
      setRechargeAmount("");
    } catch (err) {
      setMessage("Recharge failed");
    }
  };

  // Withdraw handler
  const handleWithdraw = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await apiService.requestWithdrawal(token, Number(withdrawAmount), withdrawBank);
      setMessage(res.message || "Withdrawal requested");
      setShowWithdraw(false);
      setWithdrawAmount("");
      setWithdrawBank({ accountNumber: "", ifscCode: "", accountHolder: "" });
    } catch (err) {
      setMessage("Withdraw failed");
    }
  };

  // Invest handler
  const handleInvest = async (product) => {
    setInvesting(true);
    setMessage("");
    try {
      const res = await apiService.invest(token, product._id || product.id || product.name); // fallback for demo
      if (res.balance !== undefined) setUser({ ...user, balance: res.balance });
      setMessage(res.message || "Investment successful");
    } catch (err) {
      setMessage("Investment failed");
    }
    setInvesting(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between shadow-sm">
        <div className="text-lg font-bold text-gray-800">Dashboard</div>
        <div className="flex items-center space-x-1 text-sm text-gray-600">
          <div className="w-6 h-3 border border-gray-400 rounded-sm">
            <div className="w-1/2 h-full bg-gray-600 rounded-sm"></div>
          </div>
        </div>
      </div>

      {/* Balance Card */}
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

      {/* Tab Navigation */}
      <div className="mx-4 mb-4 flex bg-white rounded-2xl overflow-hidden shadow-sm">
        <button
          onClick={() => setActiveTab("day")}
          className={`flex-1 py-3 px-4 text-center font-semibold ${
            activeTab === "day"
              ? "bg-red-600 text-white"
              : "bg-white text-gray-600"
          }`}
        >
          Day Product
        </button>
        <button
          onClick={() => setActiveTab("vip")}
          className={`flex-1 py-3 px-4 text-center font-semibold relative ${
            activeTab === "vip"
              ? "bg-red-600 text-white"
              : "bg-white text-gray-600"
          }`}
        >
          VIP Product
          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs px-2 py-0.5 rounded-full">
            Hot
          </span>
        </button>
      </div>

      {/* Product Cards */}
      <div className="px-4 space-y-4">
        {(activeTab === "day" ? dayProducts : vipProducts).map(
          (product, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {activeTab === "day"
                      ? `Plan ${String.fromCharCode(65 + index)}`
                      : `VIP Plan ${index + 1}`}
                  </h3>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Each Price</span>
                      <span className="font-semibold">
                        ₹ {product.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Revenue</span>
                      <span className="font-semibold">
                        {product.duration} Days
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Daily Earnings</span>
                      <span className="font-semibold">
                        ₹ {product.dailyProfit.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Gain</span>
                      <span className="font-semibold">
                        ₹ {product.totalReturn.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <button
                    className="w-full mt-6 bg-red-600 text-white py-3 rounded-full font-semibold hover:bg-red-700 transition-colors"
                    disabled={investing}
                    onClick={() => handleInvest(product)}
                  >
                    {investing ? "Investing..." : "Invest Now"}
                  </button>
                </div>

                <div className="ml-4">
                  <div className="w-50 h-30 bg-gradient-to-br from-purple-600 to-purple-800 rounded-lg flex items-center justify-center  ">
                    <img
                      src={product.image}
                      alt={product.name}
                      className=" object-cover rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {/* Recharge Modal */}
      {showRecharge && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            className="bg-white p-6 rounded-lg shadow-lg w-80"
            onSubmit={handleRecharge}
          >
            <h2 className="text-lg font-bold mb-4">Recharge Wallet</h2>
            <input
              type="number"
              className="w-full border p-2 rounded mb-4"
              placeholder="Enter amount"
              value={rechargeAmount}
              onChange={(e) => setRechargeAmount(e.target.value)}
              min={1}
              required
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setShowRecharge(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Recharge
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdraw && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <form
            className="bg-white p-6 rounded-lg shadow-lg w-96"
            onSubmit={handleWithdraw}
          >
            <h2 className="text-lg font-bold mb-4">Withdraw Funds</h2>
            <input
              type="number"
              className="w-full border p-2 rounded mb-2"
              placeholder="Amount"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              min={1}
              required
            />
            <input
              type="text"
              className="w-full border p-2 rounded mb-2"
              placeholder="Account Number"
              value={withdrawBank.accountNumber}
              onChange={(e) =>
                setWithdrawBank({
                  ...withdrawBank,
                  accountNumber: e.target.value,
                })
              }
              required
            />
            <input
              type="text"
              className="w-full border p-2 rounded mb-2"
              placeholder="IFSC Code"
              value={withdrawBank.ifscCode}
              onChange={(e) =>
                setWithdrawBank({ ...withdrawBank, ifscCode: e.target.value })
              }
              required
            />
            <input
              type="text"
              className="w-full border p-2 rounded mb-4"
              placeholder="Account Holder Name"
              value={withdrawBank.accountHolder}
              onChange={(e) =>
                setWithdrawBank({
                  ...withdrawBank,
                  accountHolder: e.target.value,
                })
              }
              required
            />
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setShowWithdraw(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Withdraw
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Success/Error Message */}
      {message && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white border border-red-400 text-red-700 px-6 py-3 rounded shadow-lg z-50">
          {message}
          <button
            className="ml-4 text-xs text-gray-500"
            onClick={() => setMessage("")}
          >
            x
          </button>
        </div>
      )}

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2">
        <div className="flex justify-around">
          <button className="flex flex-col items-center space-y-1 p-2">
            <Home className="w-5 h-5 text-red-500" />
            <span className="text-xs text-red-500">Home</span>
          </button>
          <Link to="/task" className="flex flex-col items-center space-y-1 p-2">
            <CheckSquare className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Task</span>
          </Link>
          <button className="flex flex-col items-center space-y-1 p-2">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4 text-white" />
            </div>
          </button>
          <Link
            to="/about"
            className="flex flex-col items-center space-y-1 p-2"
          >
            <Info className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">About</span>
          </Link>
          <Link
            to="/profile"
            className="flex flex-col items-center space-y-1 p-2"
          >
            <User className="w-5 h-5 text-gray-400" />
            <span className="text-xs text-gray-400">Profile</span>
          </Link>
        </div>
      </div>

      {/* Bottom spacing for fixed navigation */}
      <div className="h-20"></div>
    </div>
  );
};

export default Dashboard;
