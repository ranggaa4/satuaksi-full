import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "./api/api";
import "./DetailVolunteer.css"; // KEEP your original CSS

export default function DetailVolunteer() {
  const { id } = useParams();

  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load detail volunteer program
  useEffect(() => {
    api.get(`volunteers/completed/${id}`).then((res) => {
      if (res.success) {
        setDetail(res.data || res); 
      }
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="loading-text">Memuat data...</div>;

  if (!detail)
    return <div className="error-text">Data tidak ditemukan.</div>;

  return (
    <div className="detail-volunteer-container">

      {/* 🔥 KEEP 100% OF YOUR FRIEND’S LAYOUT EXACTLY 🔥 */}
      {/* Only change where you insert dynamic values */}

      <img
        src={detail.imageUrl}
        className="detail-volunteer-header-img"
        alt={detail.title}
      />

      <h1 className="detail-volunteer-title">
        {detail.title}
      </h1>

      <div className="detail-volunteer-info">

        <div className="detail-volunteer-location">
          <img src={detail.locIcon} className="location-icon" />
          <span>{detail.location}</span>
        </div>

        <div className="detail-volunteer-date">
          <img src={detail.timeIcon} className="date-icon" />
          <span>{detail.date}</span>
        </div>

      </div>

      <div className="detail-volunteer-description">
        {detail.description}
      </div>

      {/* If your friend has more sections (e.g., timeline, stats, outcomes),
          just replace the static text with dynamic fields like: */}
      {/* <p>{detail.outcome}</p> */}
      {/* <p>{detail.summary}</p> */}
      {/* <img src={detail.galleryImage1} /> */}

      {/* KEEP EVERYTHING ELSE IN YOUR ORIGINAL LAYOUT */}

    </div>
  );
}
