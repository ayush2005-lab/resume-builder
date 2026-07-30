import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  function handleLogout() {
    logout();
    setMenuOpen(false);
    navigate("/login");
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Brand */}
        <Link to="/dashboard" className="brand" onClick={closeMenu}>
          <span className="brand-mark">R</span>
          <span>
            Resume<span className="brand-highlight">Builder</span>
          </span>
        </Link>

        {user && (
          <>
            {/* Desktop Navigation */}
            <nav className="desktop-nav">
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/my-resumes"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                My Resumes
              </NavLink>

              <NavLink
                to="/create"
                className="create-nav-button"
              >
                <span>＋</span>
                Create Resume
              </NavLink>
            </nav>

            {/* Desktop User Area */}
            <div className="desktop-user-area">
              <Link to="/account" className="user-profile">
                <div className="user-avatar">
                  {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </div>

                <div className="user-info">
                  <strong>{user?.name || "User"}</strong>
                  <span>Account</span>
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="logout-button"
                title="Log out"
              >
                Log out
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="mobile-menu-button"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle navigation menu"
            >
              <span className={menuOpen ? "bar rotate-one" : "bar"}></span>
              <span className={menuOpen ? "bar hide-bar" : "bar"}></span>
              <span className={menuOpen ? "bar rotate-two" : "bar"}></span>
            </button>

            {/* Mobile Navigation */}
            {menuOpen && (
              <div className="mobile-nav">
                <NavLink
                  to="/dashboard"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive ? "mobile-nav-link active" : "mobile-nav-link"
                  }
                >
                  🏠 Dashboard
                </NavLink>

                <NavLink
                  to="/my-resumes"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive ? "mobile-nav-link active" : "mobile-nav-link"
                  }
                >
                  📄 My Resumes
                </NavLink>

                <NavLink
                  to="/create"
                  onClick={closeMenu}
                  className="mobile-create-link"
                >
                  ＋ Create Resume
                </NavLink>

                <NavLink
                  to="/improve"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive ? "mobile-nav-link active" : "mobile-nav-link"
                  }
                >
                  ✨ Improve Resume
                </NavLink>

                <NavLink
                  to="/account"
                  onClick={closeMenu}
                  className={({ isActive }) =>
                    isActive ? "mobile-nav-link active" : "mobile-nav-link"
                  }
                >
                  ⚙️ Account Settings
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="mobile-logout-button"
                >
                  Log out
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}