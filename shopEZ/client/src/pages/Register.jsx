import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api.js";
import { useShop } from "../context/ShopContext.jsx";

const Register = () => {
  const navigate = useNavigate();
  const { setUser } = useShop();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/api/auth/register", { name, email, password });
      setUser(data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <section className="form-page">
      <form onSubmit={submitHandler} className="form-card">
        <h1>Create Account</h1>
        {error && <p className="error">{error}</p>}
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button>Register</button>
        <p>
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
};

export default Register;
