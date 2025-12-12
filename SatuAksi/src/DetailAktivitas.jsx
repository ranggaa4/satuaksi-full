// src/DetailAktivitas.jsx

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { api } from "./api/api";
import "./DetailAktivitas.css";

export default function DetailAktivitas() {
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDetail = async () => {
      try {
        const res = await api.get(`activities/${id}`);
        if (res && res.id) {
          setActivity(res);
        }
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    loadDetail();
  }, [id]);

  if (loading) return <div className="detail-loading">Memuat data...</div>;

  if (!activity)
    return <div className="detail-notfound">Aktivitas tidak ditemukan.</div>;

  return (
    <div className="detail-activity-container">

      {/* TITLE + CATEGORY */}
      <div className="detail-header">
        <h1>{activity.title}</h1>
        <span className="detail-category">{activity.category}</span>
      </div>

      {/* IMAGE */}
      <div className="detail-image-wrapper">
        <img
          src={activity.imageUrl}
          alt={activity.title}
          className="detail-image"
        />
      </div>

      {/* DESCRIPTION */}
      <p className="detail-description">{activity.description}</p>

      {/* INFO CARD */}
      <div className="detail-info-card">
        <div><strong>Lokasi:</strong> {activity.location}</div>
        <div><strong>Tanggal:</strong> {activity.date}</div>
        <div><strong>Waktu:</strong> {activity.time}</div>
        <div><strong>Status:</strong> {activity.status}</div>
        <div>
          <strong>Harga:</strong>{" "}
          {activity.priceType === "free" ? "Gratis" : activity.price}
        </div>
      </div>

      {/* CTA BUTTON */}
      <Link to={`/daftar/${activity.id}`} className="detail-volunteer-btn">
        Daftar Jadi Relawan
      </Link>

    </div>
  );
}
