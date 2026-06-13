const dotenv = require("dotenv");
const connectDB = require("./config/db");
const User = require("./model/User");
const Product = require("./model/Product");
const Order = require("./model/Order");

dotenv.config();
connectDB();

const products = [
  {
    name: "Classic Sneakers",
    description: "Comfortable everyday sneakers for college, office and casual use.",
    price: 2499,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
    category: "Shoes",
    countInStock: 14,
    featured: true
  },
  {
    name: "Smart Watch",
    description: "Tracks steps, heart rate and notifications with a clean display.",
    price: 3999,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
    category: "Electronics",
    countInStock: 9,
    featured: true
  },
  {
    name: "Laptop Backpack",
    description: "Water resistant backpack with padded laptop space and extra pockets.",
    price: 1599,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
    category: "Bags",
    countInStock: 22
  },
  {
    name: "Wireless Headphones",
    description: "Good bass, soft ear cushions and long battery life.",
    price: 2999,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
    category: "Electronics",
    countInStock: 11
  }
];

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    await User.create({
      name: "Admin User",
      email: "admin@shopez.com",
      password: "admin123",
      isAdmin: true
    });

    await User.create({
      name: "Student User",
      email: "student@shopez.com",
      password: "student123"
    });

    await Product.insertMany(products);

    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

importData();
