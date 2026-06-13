import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext.jsx";

const Cart = () => {
  const { cart, removeFromCart, updateQty, cartTotal } = useShop();

  return (
    <section>
      <h1>Your Cart</h1>
      {cart.length === 0 ? (
        <p className="notice">
          Cart is empty. <Link to="/">Go shopping</Link>
        </p>
      ) : (
        <div className="cart-layout">
          <div className="cart-list">
            {cart.map((item) => (
              <div className="cart-item" key={item._id}>
                <img src={item.image} alt={item.name} />
                <div>
                  <h3>{item.name}</h3>
                  <p>Rs. {item.price}</p>
                </div>
                <input
                  type="number"
                  min="1"
                  max={item.countInStock}
                  value={item.qty}
                  onChange={(e) => updateQty(item._id, Number(e.target.value))}
                />
                <button className="danger" onClick={() => removeFromCart(item._id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
          <aside className="summary">
            <h2>Summary</h2>
            <p>Total items: {cart.reduce((total, item) => total + item.qty, 0)}</p>
            <h3>Rs. {cartTotal}</h3>
            <Link className="button" to="/checkout">
              Checkout
            </Link>
          </aside>
        </div>
      )}
    </section>
  );
};

export default Cart;
