import React, { useState } from "react";
import axiosClient from "../api/axiosClient";
import { useAuth } from "../context/AuthContext";

export default function AccountSettings() {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [nameMsg, setNameMsg] = useState("");
  const [pwForm, setPwForm] = useState({ currentPassword: "", newPassword: "" });
  const [pwMsg, setPwMsg] = useState("");
  const [pwError, setPwError] = useState("");

  async function saveName(e) {
    e.preventDefault();
    setNameMsg("");
    const { data } = await axiosClient.put("/auth/me", { name });
    const stored = JSON.parse(localStorage.getItem("rb_user"));
    const updated = { ...stored, name: data.name };
    localStorage.setItem("rb_user", JSON.stringify(updated));
    setUser(updated);
    setNameMsg("Name updated.");
  }

  async function savePassword(e) {
    e.preventDefault();
    setPwError("");
    setPwMsg("");
    try {
      await axiosClient.put("/auth/me/password", pwForm);
      setPwMsg("Password updated.");
      setPwForm({ currentPassword: "", newPassword: "" });
    } catch (err) {
      setPwError(err.response?.data?.message || "Could not update password.");
    }
  }

  return (
    <div className="page">
      <h2>Account settings</h2>
      <p className="page-subtitle">Update your name or change your password.</p>

      <form className="card" onSubmit={saveName}>
        <label><span>Full name</span><input value={name} onChange={(e) => setName(e.target.value)} /></label>
        {nameMsg && <p className="hint-text">{nameMsg}</p>}
        <button className="btn btn-primary" type="submit">Save name</button>
      </form>

      <form className="card" onSubmit={savePassword}>
        <label><span>Current password</span><input type="password" value={pwForm.currentPassword} onChange={(e) => setPwForm({ ...pwForm, currentPassword: e.target.value })} required /></label>
        <label><span>New password</span><input type="password" value={pwForm.newPassword} onChange={(e) => setPwForm({ ...pwForm, newPassword: e.target.value })} required minLength={6} /></label>
        {pwError && <p className="error-text">{pwError}</p>}
        {pwMsg && <p className="hint-text">{pwMsg}</p>}
        <button className="btn btn-primary" type="submit">Change password</button>
      </form>
    </div>
  );
}
