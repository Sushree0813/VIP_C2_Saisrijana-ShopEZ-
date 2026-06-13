import { Link, NavLink, useNavigate } from "react-router-dom";
import { useShop } from "../context/ShopContext.jsx";

const Navbar = () => {
  const { user, logout, cartCount } = useShop();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        ShopEZ
      </Link>
      <nav>
        <NavLink to="/">Products</NavLink>
        <NavLink to="/cart">Cart ({cartCount})</NavLink>
        {user && <NavLink to="/orders">Orders</NavLink>}
        {user?.isAdmin && <NavLink to="/admin">Admin</NavLink>}
        {user ? (
          <button className="link-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
