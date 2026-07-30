import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    try {
      await register(form.name, form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Could not create account");
    }
  }

  return (
    <div className="page" style={{ maxWidth: 380 }}>
      <h2>Create account</h2>
      <form onSubmit={handleSubmit} className="card">
        <label><span>Name</span><input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /></label>
        <label><span>Email</span><input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
        <label><span>Password</span><input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={6} /></label>
        {error && <p style={{ color: "#a32d2d", fontSize: "0.85rem" }}>{error}</p>}
        <button className="btn btn-primary" type="submit">Create account</button>
      </form>
      <p style={{ fontSize: "0.85rem" }}>Already have an account? <Link to="/login">Sign in</Link></p>
    </div>
  );
}
