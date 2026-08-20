import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      await register(form.name, form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Could not create account");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 px-4">

      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl">

        <div className="text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-3xl font-bold text-white">
            R
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Create Account 🚀
          </h1>

          <p className="mt-2 text-gray-500">
            Join ResumeBuilder and create professional resumes in minutes.
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5"
        >

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Full Name
            </label>

            <div className="relative">

              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="John Doe"
                className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="relative">

              <Mail
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                minLength={6}
                placeholder="Minimum 6 characters"
                className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-12 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>

            </div>

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Confirm Password
            </label>

            <div className="relative">

              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Re-enter password"
                className="w-full rounded-xl border border-gray-300 py-3 pl-10 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />

            </div>

          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
          >
            Create Account
          </button>

        </form>

        <div className="mt-8 text-center text-gray-600">

          Already have an account?{" "}

          <Link
            to="/login"
            className="font-semibold text-blue-600 hover:underline"
          >
            Sign In
          </Link>

        </div>

      </div>

    </div>
  );
}