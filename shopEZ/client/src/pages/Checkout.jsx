import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api.js";
import { useShop } from "../context/ShopContext.jsx";

const Checkout = () => {
  const navigate = useNavigate();
  const { user, cart, cartTotal, clearCart } = useShop();
  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "India"
  });
  const [message, setMessage] = useState("");

  const shippingPrice = cartTotal > 2000 ? 0 : 99;
  const totalPrice = cartTotal + shippingPrice;

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    try {
      await API.post("/api/orders", {
        orderItems: cart.map((item) => ({
          name: item.name,
          qty: item.qty,
          image: item.image,
          price: item.price,
          product: item._id
        })),
        shippingAddress: form,
        paymentMethod: "Cash on Delivery",
        itemsPrice: cartTotal,
        shippingPrice,
        totalPrice
      });

      clearCart();
      setMessage("Order placed successfully");
      setTimeout(() => navigate("/orders"), 800);
    } catch (error) {
      setMessage(error.response?.data?.message || "Order failed");
    }
  };

  return (
    <section className="form-page">
      <form onSubmit={placeOrder} className="form-card">
        <h1>Checkout</h1>
        {message && <p className="notice">{message}</p>}
        <input name="fullName" placeholder="Full name" value={form.fullName} onChange={changeHandler} required />
        <input name="address" placeholder="Address" value={form.address} onChange={changeHandler} required />
        <input name="city" placeholder="City" value={form.city} onChange={changeHandler} required />
        <input name="postalCode" placeholder="Postal code" value={form.postalCode} onChange={changeHandler} required />
        <input name="country" placeholder="Country" value={form.country} onChange={changeHandler} required />
        <div className="checkout-total">
          <p>Items: Rs. {cartTotal}</p>
          <p>Shipping: Rs. {shippingPrice}</p>
          <h3>Total: Rs. {totalPrice}</h3>
        </div>
        <button disabled={cart.length === 0}>Place Order</button>
      </form>
    </section>
  );
};

export default Checkout;
