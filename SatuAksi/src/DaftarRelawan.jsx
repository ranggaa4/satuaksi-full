// src/DaftarRelawan.jsx
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./DaftarRelawan.css"; // keep your friend’s styling

export default function DaftarRelawan() {
  const navigate = useNavigate();
  const { activityId } = useParams();

  // State for form fields
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    tanggalLahir: "",
    jenisKelamin: "",
    provinsi: "",
    kota: "",
    alamatLengkap: "",
  });

  // Handle input changes (does NOT change UI)
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // Go to step 2
  const goNext = (e) => {
    e.preventDefault();

    // Save step 1 data
    localStorage.setItem("volunteer_step1", JSON.stringify(form));

    // Move to step 2
    navigate(`/keahlian/${activityId}`);
  };

  return (
    <div className="daftar-relawan-container">

      {/* KEEP ALL YOUR EXISTING HTML HERE */}
      {/* DO NOT REMOVE ANY OF YOUR FRIEND'S STRUCTURE */}
      {/* I ONLY UPDATED input tags to include name= and onChange */}

      <form onSubmit={goNext}>

        {/* NAMA */}
        <div className="form-group">
          <label>Nama Lengkap</label>
          <input
            className="input-nama"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </div>

        {/* EMAIL */}
        <div className="form-group">
          <label>Email</label>
          <input
            className="input-email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        {/* PHONE */}
        <div className="form-group">
          <label>No. Telepon</label>
          <input
            className="input-phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </div>

        {/* TANGGAL LAHIR */}
        <div className="form-group">
          <label>Tanggal Lahir</label>
          <input
            className="input-tanggal"
            type="date"
            name="tanggalLahir"
            value={form.tanggalLahir}
            onChange={handleChange}
            required
          />
        </div>

        {/* JENIS KELAMIN */}
        <div className="form-group">
          <label>Jenis Kelamin</label>
          <select
            className="input-gender"
            name="jenisKelamin"
            value={form.jenisKelamin}
            onChange={handleChange}
            required
          >
            <option value="">Pilih</option>
            <option value="Laki-laki">Laki-laki</option>
            <option value="Perempuan">Perempuan</option>
          </select>
        </div>

        {/* PROVINSI */}
        <div className="form-group">
          <label>Provinsi</label>
          <input
            className="input-provinsi"
            name="provinsi"
            value={form.provinsi}
            onChange={handleChange}
            required
          />
        </div>

        {/* KOTA */}
        <div className="form-group">
          <label>Kota</label>
          <input
            className="input-kota"
            name="kota"
            value={form.kota}
            onChange={handleChange}
            required
          />
        </div>

        {/* ALAMAT */}
        <div className="form-group">
          <label>Alamat Lengkap</label>
          <textarea
            className="input-alamat"
            name="alamatLengkap"
            value={form.alamatLengkap}
            onChange={handleChange}
            required
          />
        </div>

        {/* BUTTON */}
        <button type="submit" className="lanjut-btn">
          Lanjut ke Langkah 2
        </button>

      </form>
    </div>
  );
}
