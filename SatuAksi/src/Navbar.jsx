import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Gagal parse user:", err);
      }
    }
  }, [location.pathname]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  // Helper active check
  const isActive = (path) => location.pathname === path;
  const isActivityPage =
    location.pathname === "/aktivitas" ||
    location.pathname.startsWith("/aktivitas/");

  return (
    <div className="frame-56">
      
      {/* LOGO */}
      <Link to="/" className="logo-text">SatuAksi</Link>

      {/* NAVIGATION TABS */}
      <div className="nav-links">
        <Link to="/" className={isActive("/") ? "active" : ""}>
          Beranda
        </Link>

        <Link to="/tentang" className={isActive("/tentang") ? "active" : ""}>
          Tentang
        </Link>

        <Link to="/aktivitas" className={isActivityPage ? "active" : ""}>
          Aktivitas
        </Link>

        <Link to="/kontak" className={isActive("/kontak") ? "active" : ""}>
          Kontak
        </Link>

        {/* ADMIN BUTTON */}
        {user?.role === "admin" && (
          <Link
            to="/admin"
            className="profile-button"
            style={{ background: "#28a745" }}
          >
            Admin Panel
          </Link>
        )}
      </div>

      {/* USER AREA */}
      {!user ? (
        <Link to="/login" className="login-button">Masuk / Daftar</Link>
      ) : (
        <div className="navbar-user-box">
          <span className="navbar-user-name">Hi, {user.name}</span>
          <Link to="/profile" className="profile-button">Profil</Link>
          <button onClick={handleLogout} className="login-button logout-btn">
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
