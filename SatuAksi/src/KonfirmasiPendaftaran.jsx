// src/KonfirmasiPendaftaran.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "./api/api";
import "./KonfirmasiRelawanLangah3.css"; // your original CSS

export default function KonfirmasiPendaftaran() {
  const { activityId } = useParams();
  const navigate = useNavigate();

  const [step1, setStep1] = useState(null);
  const [step2, setStep2] = useState(null);
  const [cvFile, setCvFile] = useState(null);

  // Load saved data from previous steps
  useEffect(() => {
    const s1 = JSON.parse(localStorage.getItem("volunteer_step1"));
    const s2 = JSON.parse(localStorage.getItem("volunteer_step2"));

    setStep1(s1);
    setStep2(s2);
  }, []);

  // Handle CV upload
  const handleCv = (e) => {
    setCvFile(e.target.files[0]);
  };

  // Submit final volunteer registration
  const handleSubmit = async () => {
    if (!cvFile) {
      alert("Harap upload CV terlebih dahulu.");
      return;
    }

    const fd = new FormData();

    // Append Step 1 fields
    Object.entries(step1).forEach(([key, value]) => {
      fd.append(key, value);
    });

    // Append Step 2 fields
    fd.append("keahlian", JSON.stringify(step2.keahlian));
    fd.append("minat", JSON.stringify(step2.minat));
    fd.append("pengalaman", step2.pengalaman);
    fd.append("motivasi", step2.motivasi);

    // CV file
    fd.append("cv", cvFile);

    // Send to backend
    const res = await api.upload(`volunteer/${activityId}/register`, fd);

    if (res.success) {
      // Clear form storage
      localStorage.removeItem("volunteer_step1");
      localStorage.removeItem("volunteer_step2");

      // Redirect home
      alert("Pendaftaran relawan berhasil!");
      navigate("/");
    } else {
      alert(res.message || "Terjadi kesalahan");
    }
  };

  if (!step1 || !step2) {
    return <div className="loading-text">Memuat data...</div>;
  }

  return (
    <div className="konfirmasi-container">

      {/* 🔥 KEEP ALL YOUR ORIGINAL HTML/CSS EXACTLY AS IT IS 🔥 */}
      {/* I'm only showing examples of dynamic fields inside your layout */}

      <h1 className="konfirmasi-title">Konfirmasi Pendaftaran</h1>

      {/* === DATA STEP 1 === */}
      <div className="konfirmasi-box">
        <p><strong>Nama:</strong> {step1.fullName}</p>
        <p><strong>Email:</strong> {step1.email}</p>
        <p><strong>No Telp:</strong> {step1.phone}</p>
        <p><strong>Tanggal Lahir:</strong> {step1.tanggalLahir}</p>
        <p><strong>Jenis Kelamin:</strong> {step1.jenisKelamin}</p>
        <p><strong>Provinsi:</strong> {step1.provinsi}</p>
        <p><strong>Kota:</strong> {step1.kota}</p>
        <p><strong>Alamat:</strong> {step1.alamatLengkap}</p>
      </div>

      {/* === DATA STEP 2 === */}
      <div className="konfirmasi-box">
        <p><strong>Keahlian:</strong> {step2.keahlian.join(", ")}</p>
        <p><strong>Minat:</strong> {step2.minat.join(", ")}</p>
        <p><strong>Pengalaman:</strong> {step2.pengalaman}</p>
        <p><strong>Motivasi:</strong> {step2.motivasi}</p>
      </div>

      {/* ==== CV UPLOAD ==== */}
      <div className="cv-upload-box">
        <label>Upload CV (PDF/Doc)</label>
        <input type="file" accept=".pdf,.doc,.docx" onChange={handleCv} />
      </div>

      {/* === BUTTON SUBMIT === */}
      <button className="konfirmasi-btn" onClick={handleSubmit}>
        Kirim Pendaftaran
      </button>

    </div>
  );
}
