import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api.js";
import { useShop } from "../context/ShopContext.jsx";

const Orders = () => {
  const { user } = useShop();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadOrders = async () => {
      if (!user) {
        return;
      }

      const { data } = await API.get("/api/orders/mine");
      setOrders(data);
    };

    loadOrders();
  }, [user]);

  if (!user) {
    return (
      <p className="notice">
        Please <Link to="/login">login</Link> to see orders.
      </p>
    );
  }

  return (
    <section>
      <h1>My Orders</h1>
      {orders.length === 0 ? (
        <p className="notice">No orders yet.</p>
      ) : (
        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id.slice(-8)}</td>
                  <td>Rs. {order.totalPrice}</td>
                  <td>{order.isDelivered ? "Delivered" : "Processing"}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default Orders;
