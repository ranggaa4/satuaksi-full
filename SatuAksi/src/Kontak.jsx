import React, { useState } from "react";
import { api } from "./api/api";
import "./Kontak.css";

export default function Kontak() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await api.post("contact", form);
    if (res.success) {
      alert("Pesan berhasil dikirim!");
      setForm({ name: "", email: "", subject: "", message: "" });
    } else {
      alert(res.message || "Gagal mengirim pesan.");
    }
  };

  return (
    <div className="contact-page">

      {/* CARD */}
      <div className="contact-card">

        <h2 className="contact-title">Kirim Pesan</h2>

        <form onSubmit={handleSubmit} className="contact-form">

          {/* NAMA */}
          <div className="form-group">
            <label className="form-label">Nama</label>
            <input
              name="name"
              className="form-input"
              placeholder="Nama"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>

          {/* EMAIL */}
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              name="email"
              type="email"
              className="form-input"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* SUBJEK */}
          <div className="form-group">
            <label className="form-label">Subjek</label>
            <input
              name="subject"
              className="form-input"
              placeholder="Subjek"
              value={form.subject}
              onChange={handleChange}
              required
            />
          </div>

          {/* PESAN */}
          <div className="form-group">
            <label className="form-label">Pesan</label>
            <textarea
              name="message"
              className="form-textarea"
              placeholder="Pesan"
              value={form.message}
              onChange={handleChange}
              required
            />
          </div>

          {/* BUTTON */}
          <button type="submit" className="form-button">
            Kirim Pesan
          </button>

        </form>
      </div>
    </div>
  );
}
