import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "./api/api";
import "./VolunteerTerealisasi.css"; // keep your original design

export default function VolunteerTerealisasi() {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data from backend
  useEffect(() => {
    api.get("volunteers/completed").then((res) => {
      if (res.success) {
        setPrograms(res.data || res); // depending on your backend format
      }
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="loading-text">Memuat data...</div>;

  return (
    <div className="volunteer-terealisasi-container">

      {/* 🔥 KEEP ALL YOUR ORIGINAL HEADER / TITLE / BANNER EXACTLY */}
      {/* DO NOT change layout, frames, spacing, images */}

      <div className="volunteer-terealisasi-wrapper">

        {programs.map((item) => (
          <Link
            to={`/volunteer-terealisasi/detail/${item.id}`}
            key={item.id}
            className="volunteer-terealisasi-card-link"
          >
            <div className="volunteer-terealisasi-card">

              {/* 🔥 Keep all UI design exactly as your friend made it */}
              {/* Only data is dynamic */}

              <img
                src={item.imageUrl}
                alt={item.title}
                className="volunteer-terealisasi-img"
              />

              <div className="volunteer-terealisasi-title">{item.title}</div>

              <div className="volunteer-terealisasi-location">
                <img src={item.locIcon} className="loc-icon" />
                <span>{item.location}</span>
              </div>

              <div className="volunteer-terealisasi-date">
                <img src={item.timeIcon} className="time-icon" />
                <span>{item.date}</span>
              </div>

            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}
