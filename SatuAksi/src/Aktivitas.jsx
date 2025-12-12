// src/Aktivitas.jsx

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "./api/api";

import "./Aktivitas.css";
import ImageVolunteer3 from "./assets/volunteer3.jpg";

export default function Aktivitas() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        // HARUS PAKAI SLASH!
        const res = await api.get("/activities");

        console.log("RES =", res);

        // BACKEND kamu return ARRAY langsung
        const data = Array.isArray(res) ? res : [];

        const mapped = data.map((item) => ({
          id: item.id,
          title: item.title,
          category: item.category || "Umum",
          description: item.description || "",
          image: item.imageUrl || ImageVolunteer3,
          location: item.location || "-",
          time: item.time || item.date || "-",
          priceType: item.priceType === "paid" ? "Berbayar" : "Gratis",
          price: item.priceType === "paid" ? `Rp ${item.price}` : "Gratis",

        }));

        setActivities(mapped);

      } catch (err) {
        console.error("Gagal fetch aktivitas:", err);
        setActivities([]);
      }

      setLoading(false);
    };

    loadActivities();
  }, []);

  if (loading) {
    return <div style={{ padding: 40 }}>Memuat aktivitas...</div>;
  }

  return (
    <div className="aktivitas-page">
      {/* SEARCH SECTION */}
      <section className="search-filter-section">
        <div className="search-text-group">
          <h2 className="search-headline">Jelajahi Peluang Volunteer</h2>
          <p className="search-subtext">Temukan Peran yang sesuai dengan minat anda</p>
          <p className="search-subtext-2">Mari buat dampak positif!</p>
        </div>

        <div className="search-bar-group">
          <div className="search-bar-wrapper">
            <div className="search-icon">🔍</div>
            <input
              type="text"
              className="search-input"
              placeholder="Cari aktivitas, lokasi, atau kategori..."
            />
          </div>
          <button className="search-button">Cari</button>
        </div>
      </section>

      {/* GRID */}
      <section className="activities-grid-section">
        <h2 className="grid-title">Daftar Semua Aktivitas</h2>

        <div className="activities-grid">
          {activities.map((activity) => (
            <Link
              to={`/aktivitas/${activity.id}`}
              className="activity-card-link"
              key={activity.id}
            >
              <div className="activity-card">

                <div className="card-image-wrapper">
                  <img className="card-image" src={activity.image} alt={activity.title} />
                  <div
                    className={
                      activity.priceType === "Berbayar"
                        ? "price-tag-paid"
                        : "price-tag-gratis"
                    }
                  >
                    {activity.price}
                  </div>
                </div>

                <div className="card-content">
                  <h3 className="activity-title">{activity.title}</h3>

                  <div className={`category-button category-${activity.category.toLowerCase()}`}>
                    {activity.category}
                  </div>

                  <div className="activity-description">
                    <p>{activity.description.substring(0, 80)}...</p>
                  </div>

                  <div className="activity-meta-row">
                    <div className="meta-item">
                      <span className="meta-icon">📍</span>
                      <span className="meta-text">{activity.location}</span>
                    </div>
                  </div>

                  <div className="activity-meta-row">
                    <div className="meta-item">
                      <span className="meta-icon">🗓️</span>
                      <span className="meta-text">{activity.time}</span>
                    </div>
                  </div>

                </div>

              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <section className="footer-section">
        <div className="footer-content">
          <h1 className="logo-text" style={{ fontSize: 24 }}>
            SatuAksi
          </h1>
          <p>© {new Date().getFullYear()} SatuAksi</p>
        </div>
      </section>
    </div>
  );
}
