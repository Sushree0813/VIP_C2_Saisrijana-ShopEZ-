const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User"
    },
    orderItems: [
      {
        name: String,
        qty: Number,
        image: String,
        price: Number,
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        }
      }
    ],
    shippingAddress: {
      fullName: String,
      address: String,
      city: String,
      postalCode: String,
      country: String
    },
    paymentMethod: {
      type: String,
      default: "Cash on Delivery"
    },
    itemsPrice: {
      type: Number,
      required: true
    },
    shippingPrice: {
      type: Number,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    },
    isPaid: {
      type: Boolean,
      default: false
    },
    isDelivered: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
