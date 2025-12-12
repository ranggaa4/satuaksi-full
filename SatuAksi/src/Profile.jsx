import React, { useEffect, useState } from "react";
import "./Profile.css";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      try {
        setUser(JSON.parse(saved));
      } catch (err) {
        console.error("Error parsing user", err);
      }
    }
  }, []);

  if (!user) {
    return (
      <div className="profile-container">
        <div className="profile-card">
          <h1 className="profile-title">Profil Tidak Ditemukan</h1>
          <p>Anda belum login atau data tidak tersimpan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h1 className="profile-title">Profil Saya</h1>

        <div className="profile-info">
          <p><strong>Nama:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
          <p><strong>Dibuat:</strong> {new Date(user.createdAt).toLocaleString()}</p>
        </div>

        <div className="profile-actions">
          <button
            className="profile-btn"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
