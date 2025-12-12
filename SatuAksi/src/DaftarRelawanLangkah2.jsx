// src/DaftarRelawanLangkah2.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DaftarRelawanLangkah2.css";

export default function DaftarRelawanLangkah2() {
  const navigate = useNavigate();
  const { activityId } = useParams();

  // FORM STATE
  const [keahlian, setKeahlian] = useState([]);
  const [minat, setMinat] = useState([]);
  const [pengalaman, setPengalaman] = useState("");
  const [motivasi, setMotivasi] = useState("");

  // Toggle checkbox array values
  const toggleArray = (array, setArray, value) => {
    if (array.includes(value)) {
      setArray(array.filter((v) => v !== value));
    } else {
      setArray([...array, value]);
    }
  };

  // Go to confirmation page
  const nextStep = (e) => {
    e.preventDefault();

    const data = {
      keahlian,
      minat,
      pengalaman,
      motivasi,
    };

    localStorage.setItem("volunteer_step2", JSON.stringify(data));

    navigate(`/konfirmasi/${activityId}`);
  };

  return (
    <div className="daftar-relawan2-container">

      {/* 🔥🔥 KEEP YOUR ORIGINAL LAYOUT EXACTLY AS IS 🔥🔥 */}
      {/* I am only showing EXAMPLES of where to add onChange — 
          you should keep all your divs, classes, frames, etc. */}

      <form onSubmit={nextStep}>

        {/* KEAHLIAN (skills) */}
        <div className="form-group">
          <label>Keahlian</label>

          <label>
            <input
              type="checkbox"
              onChange={() => toggleArray(keahlian, setKeahlian, "Komunikasi")}
            />
            Komunikasi
          </label>

          <label>
            <input
              type="checkbox"
              onChange={() => toggleArray(keahlian, setKeahlian, "Public Speaking")}
            />
            Public Speaking
          </label>

          <label>
            <input
              type="checkbox"
              onChange={() => toggleArray(keahlian, setKeahlian, "Mengajar")}
            />
            Mengajar
          </label>
        </div>

        {/* MINAT (interests) */}
        <div className="form-group">
          <label>Minat</label>

          <label>
            <input
              type="checkbox"
              onChange={() => toggleArray(minat, setMinat, "Lingkungan")}
            />
            Lingkungan
          </label>

          <label>
            <input
              type="checkbox"
              onChange={() => toggleArray(minat, setMinat, "Sosial")}
            />
            Sosial
          </label>

          <label>
            <input
              type="checkbox"
              onChange={() => toggleArray(minat, setMinat, "Edukasi")}
            />
            Edukasi
          </label>
        </div>

        {/* PENGALAMAN */}
        <div className="form-group">
          <label>Pengalaman</label>
          <textarea
            className="input-pengalaman"
            value={pengalaman}
            onChange={(e) => setPengalaman(e.target.value)}
            required
          />
        </div>

        {/* MOTIVASI */}
        <div className="form-group">
          <label>Motivasi Bergabung</label>
          <textarea
            className="input-motivasi"
            value={motivasi}
            onChange={(e) => setMotivasi(e.target.value)}
            required
          />
        </div>

        {/* NEXT BUTTON */}
        <button type="submit" className="lanjut-btn">
          Lanjut ke Konfirmasi
        </button>

      </form>
    </div>
  );
}
