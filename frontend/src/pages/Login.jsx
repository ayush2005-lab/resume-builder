import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Could not sign in");
    }
  }

  return (
    <div className="page" style={{ maxWidth: 380 }}>
      <h2>Sign in</h2>
      <form onSubmit={handleSubmit} className="card">
        <label><span>Email</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></label>
        <label><span>Password</span><input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></label>
        {error && <p style={{ color: "#a32d2d", fontSize: "0.85rem" }}>{error}</p>}
        <button className="btn btn-primary" type="submit">Sign in</button>
      </form>
      <p style={{ fontSize: "0.85rem" }}>No account? <Link to="/register">Create one</Link></p>
    </div>
  );
}
