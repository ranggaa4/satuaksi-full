import React, { useState } from "react";
import { api } from "./api/api";
import "./LoginPage.css";

export default function LoginPage() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("LOGIN SUBMIT TERPANGGIL");

    const res = await api.post("auth/login", form);
    console.log("HASIL FETCH LOGIN:", res);

    if (res.success) {

      // ==== FIX USER DATA HERE ====
      const cleanUser = {
        id: res.user.id,
        name: res.user.name,
        email: res.user.email,
        createdAt: res.user.createdAt,
        role: res.user.role ?? "user",
      };
      // ============================

      alert("Login berhasil!");

      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(cleanUser));

      window.location.href = "/";
    } else {
      alert(res.message || "Login gagal.");
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-card">
        <h1 className="login-title">Masuk</h1>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-input-group">
            <label className="login-label">Email</label>
            <input
              type="email"
              className="login-input"
              placeholder="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="login-input-group">
            <label className="login-label">Kata Sandi</label>
            <input
              type="password"
              className="login-input"
              placeholder="Kata Sandi"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="login-button">
            Masuk
          </button>

          <div className="login-register-text">
            Belum punya akun?{" "}
            <a href="/register" className="login-register-link">
              Daftar di sini
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
