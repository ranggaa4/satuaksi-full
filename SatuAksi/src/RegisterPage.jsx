import React, { useState } from "react";
import { api } from "./api/api";
import "./LoginPage.css";  // gunakan CSS login

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Kata sandi tidak cocok!");
      return;
    }

    const res = await api.post("auth/register", form);

    if (res.success) {
      alert("Registrasi berhasil!");
      window.location.href = "/login";
    } else {
      alert(res.message || "Registrasi gagal.");
    }
  };

  return (
    <div className="login-page-container">

      <div className="login-card">
        <h1 className="login-title">Daftar</h1>

        <form onSubmit={handleSubmit} className="login-form">

          {/* Nama */}
          <div className="login-input-group">
            <label className="login-label">Nama Lengkap</label>
            <input
              type="text"
              name="name"
              placeholder="Nama Lengkap"
              className="login-input"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* Email */}
          <div className="login-input-group">
            <label className="login-label">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="login-input"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="login-input-group">
            <label className="login-label">Kata Sandi</label>
            <input
              type="password"
              name="password"
              placeholder="Kata Sandi"
              className="login-input"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="login-input-group">
            <label className="login-label">Konfirmasi Kata Sandi</label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Konfirmasi Kata Sandi"
              className="login-input"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {/* Tombol */}
          <div className="login-button-wrapper">
            <button type="submit" className="login-button">
              Daftar
            </button>
          </div>

          <div className="login-register-text">
            Sudah punya akun?{" "}
            <a href="/login" className="login-register-link">
              Masuk di sini
            </a>
          </div>

        </form>
      </div>
    </div>
  );
}
