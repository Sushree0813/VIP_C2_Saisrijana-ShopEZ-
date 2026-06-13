import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api.js";
import { useShop } from "../context/ShopContext.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useShop();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/api/auth/login", { email, password });
      setUser(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <section className="form-page">
      <form onSubmit={submitHandler} className="form-card">
        <h1>Login</h1>
        {error && <p className="error">{error}</p>}
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button>Login</button>
        <p>
          New user? <Link to="/register">Create account</Link>
        </p>
      </form>
    </section>
  );
};

export default Login;
