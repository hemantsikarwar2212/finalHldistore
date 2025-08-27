const Product = require('../models/Product');

exports.getProductsByType = async (req, res) => {
  try {
    const { type } = req.params;
    if (!['day', 'vip'].includes(type)) {
      return res.status(400).json({ message: 'Invalid product type' });
    }
    const products = await Product.find({ type, isActive: true });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.initializeProducts = async () => {
  const productCount = await Product.countDocuments();
  if (productCount === 0) {
    const dayProducts = [
      { name: "Plan A - Aju Mixture", price: 590, dailyProfit: 75, duration: 120, totalReturn: 9000, type: "day" },
      { name: "Plan B - Khatta Meetha", price: 1990, dailyProfit: 310, duration: 105, totalReturn: 32550, type: "day" },
      { name: "Plan C - Navrattan Mix", price: 4900, dailyProfit: 840, duration: 90, totalReturn: 75600, type: "day" },
      { name: "Plan D - Premium Mix", price: 9700, dailyProfit: 1620, duration: 75, totalReturn: 121500, type: "day" },
      { name: "Plan E - Royal Mixture", price: 15980, dailyProfit: 3960, duration: 50, totalReturn: 198000, type: "day" },
      { name: "Plan F - Elite Selection", price: 21000, dailyProfit: 6500, duration: 50, totalReturn: 325000, type: "day" },
      { name: "Plan G - Platinum Collection", price: 34900, dailyProfit: 11000, duration: 50, totalReturn: 550000, type: "day" }
    ];
    const vipProducts = [
      { name: "VIP Plan 1 - Express Mix", price: 5000, dailyProfit: 3100, duration: 7, totalReturn: 21700, type: "vip" },
      { name: "VIP Plan 2 - Supreme Collection", price: 12000, dailyProfit: 7200, duration: 7, totalReturn: 50400, type: "vip" },
      { name: "VIP Plan 3 - Ultimate Premium", price: 25000, dailyProfit: 14500, duration: 7, totalReturn: 101500, type: "vip" }
    ];
    await Product.insertMany([...dayProducts, ...vipProducts]);
    console.log('Default products initialized');
  }
};
