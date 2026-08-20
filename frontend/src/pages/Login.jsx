import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 flex items-center justify-center px-4">

      <div className="w-full max-w-md rounded-3xl bg-white shadow-2xl p-8">

        <div className="text-center">

          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 text-3xl font-bold text-white">
            R
          </div>

          <h1 className="text-3xl font-bold text-gray-800">
            Welcome Back 👋
          </h1>

          <p className="mt-2 text-gray-500">
            Sign in to continue building your professional resume.
          </p>

        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          <div>

            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email Address
            </label>

            <div className="relative">

              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <input
                type={showPassword ? "text" : "password"}
                required
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
          >
            Sign In
          </button>

        </form>

        <div className="mt-8 text-center text-gray-600">

          Don't have an account?{" "}

          <Link
            to="/register"
            className="font-semibold text-blue-600 hover:underline"
          >
            Create one
          </Link>

        </div>

      </div>

    </div>
  );
}