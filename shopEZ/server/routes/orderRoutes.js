const express = require("express");
const { createOrder, getMyOrders, getAllOrders, markDelivered } = require("../controller/orderController");
const { protect, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, admin, getAllOrders);
router.get("/mine", protect, getMyOrders);
router.put("/:id/deliver", protect, admin, markDelivered);

module.exports = router;
