// src/ProfilePage.jsx

import React, { useEffect, useState } from "react";
import "./ProfilePage.css";

export default function ProfilePage() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log("PROFILE PAGE LOADED!");

    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Gagal parse user:", err);
      }
    }
  }, []);

  if (!user) {
    return <div className="profile-loading">Memuat profil...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        
        {/* Avatar bulat */}
        <div className="profile-avatar">
          {user.name ? user.name[0].toUpperCase() : "U"}
        </div>

        <h2 className="profile-title">Profil Pengguna</h2>

        <div className="profile-info">
          <p><span>ID:</span> {user.id}</p>
          <p><span>Nama:</span> {user.name}</p>
          <p><span>Email:</span> {user.email}</p>
          <p><span>Role:</span> {user.role}</p>
        </div>

        <button 
          className="profile-logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
