import { useEffect, useState } from "react";
import API from "../api.js";
import { useShop } from "../context/ShopContext.jsx";

const emptyProduct = {
  name: "",
  description: "",
  price: "",
  image: "",
  category: "",
  countInStock: ""
};

const AdminDashboard = () => {
  const { user } = useShop();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(emptyProduct);
  const [editId, setEditId] = useState(null);
  const [message, setMessage] = useState("");

  const loadData = async () => {
    const productsRes = await API.get("/api/products");
    setProducts(productsRes.data);

    if (user?.isAdmin) {
      const ordersRes = await API.get("/api/orders");
      setOrders(ordersRes.data);
    }
  };

  useEffect(() => {
    if (user?.isAdmin) {
      loadData();
    }
  }, [user]);

  if (!user?.isAdmin) {
    return <p className="notice">Admin login is required to open this page.</p>;
  }

  const changeHandler = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const productData = {
      ...form,
      price: Number(form.price),
      countInStock: Number(form.countInStock)
    };

    try {
      if (editId) {
        await API.put(`/api/products/${editId}`, productData);
        setMessage("Product updated");
      } else {
        await API.post("/api/products", productData);
        setMessage("Product added");
      }

      setForm(emptyProduct);
      setEditId(null);
      loadData();
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  const editProduct = (product) => {
    setEditId(product._id);
    setForm({
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
      countInStock: product.countInStock
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const deleteProduct = async (id) => {
    if (confirm("Delete this product?")) {
      await API.delete(`/api/products/${id}`);
      loadData();
    }
  };

  const deliverOrder = async (id) => {
    await API.put(`/api/orders/${id}/deliver`);
    loadData();
  };

  return (
    <section>
      <h1>Admin Dashboard</h1>
      <div className="stats">
        <div>
          <span>Total Products</span>
          <strong>{products.length}</strong>
        </div>
        <div>
          <span>Total Orders</span>
          <strong>{orders.length}</strong>
        </div>
        <div>
          <span>Revenue</span>
          <strong>Rs. {orders.reduce((total, order) => total + order.totalPrice, 0)}</strong>
        </div>
      </div>

      <form className="admin-form" onSubmit={submitHandler}>
        <h2>{editId ? "Edit Product" : "Add Product"}</h2>
        {message && <p className="notice">{message}</p>}
        <input name="name" placeholder="Product name" value={form.name} onChange={changeHandler} required />
        <input name="category" placeholder="Category" value={form.category} onChange={changeHandler} required />
        <input name="price" type="number" placeholder="Price" value={form.price} onChange={changeHandler} required />
        <input name="countInStock" type="number" placeholder="Stock" value={form.countInStock} onChange={changeHandler} required />
        <input name="image" placeholder="Image URL" value={form.image} onChange={changeHandler} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={changeHandler} required />
        <button>{editId ? "Update Product" : "Add Product"}</button>
      </form>

      <div className="table-box">
        <h2>Products</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product.name}</td>
                <td>Rs. {product.price}</td>
                <td>{product.countInStock}</td>
                <td>
                  <button onClick={() => editProduct(product)}>Edit</button>
                  <button className="danger" onClick={() => deleteProduct(product._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="table-box">
        <h2>Orders</h2>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Total</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order.user?.name || "User"}</td>
                <td>Rs. {order.totalPrice}</td>
                <td>{order.isDelivered ? "Delivered" : "Processing"}</td>
                <td>
                  {!order.isDelivered && <button onClick={() => deliverOrder(order._id)}>Mark Delivered</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminDashboard;
