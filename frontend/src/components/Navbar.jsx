import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  FileText,
  Plus,
  User,
  LogOut,
  LayoutTemplate,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setOpen(false);
  };

  const navItem = ({ isActive }) =>
    `flex items-center gap-2 rounded-lg px-4 py-2 transition ${
      isActive
        ? "bg-blue-100 text-blue-600 font-semibold"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Logo */}
        <Link
          to="/dashboard"
          className="flex items-center gap-3 text-2xl font-bold"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg">
            R
          </div>

          <span>
            Resume
            <span className="text-blue-600">Builder</span>
          </span>
        </Link>

        {user && (
          <>
            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-2 md:flex">
              <NavLink to="/dashboard" className={navItem}>
                <LayoutDashboard size={18} />
                Dashboard
              </NavLink>

              <NavLink to="/my-resumes" className={navItem}>
                <FileText size={18} />
                My Resumes
              </NavLink>

              <NavLink to="/choose-template" className={navItem}>
                <LayoutTemplate size={18} />
                Templates
              </NavLink>
            </nav>

            {/* Right Side */}
            <div className="hidden items-center gap-4 md:flex">

              <Link
                to="/create"
                className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 font-medium text-white shadow-lg transition hover:scale-105"
              >
                + Create Resume
              </Link>

              <Link
                to="/account"
                className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2 shadow-sm transition hover:shadow-md"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-bold text-white">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    {user?.name}
                  </p>

                  <p className="text-xs text-gray-500">
                    My Account
                  </p>
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-xl border border-red-200 px-4 py-2 text-red-600 transition hover:bg-red-50"
              >
                <LogOut size={18} />
              </button>

            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setOpen(!open)}
              className="rounded-lg p-2 hover:bg-gray-100 md:hidden"
            >
              {open ? <X /> : <Menu />}
            </button>
          </>
        )}
      </div>

      {/* Mobile Menu */}
      {open && user && (
        <div className="border-t border-gray-200 bg-white md:hidden">

          <nav className="space-y-2 p-4">

            <NavLink
              to="/dashboard"
              className={navItem}
              onClick={() => setOpen(false)}
            >
              <LayoutDashboard size={18} />
              Dashboard
            </NavLink>

            <NavLink
              to="/my-resumes"
              className={navItem}
              onClick={() => setOpen(false)}
            >
              <FileText size={18} />
              My Resumes
            </NavLink>

            <NavLink
              to="/choose-template"
              className={navItem}
              onClick={() => setOpen(false)}
            >
              <LayoutTemplate size={18} />
              Templates
            </NavLink>

            <NavLink
              to="/create"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white"
            >
              <Plus size={18} />
              Create Resume
            </NavLink>

            <NavLink
              to="/account"
              className={navItem}
              onClick={() => setOpen(false)}
            >
              <User size={18} />
              Account
            </NavLink>

            <button
              onClick={handleLogout}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-3 font-semibold text-red-600"
            >
              <LogOut size={18} />
              Log Out
            </button>

          </nav>
        </div>
      )}
    </header>
  );
}