// src/AdminAktivitas.jsx

import React, { useEffect, useState } from "react";
import { api } from "./api/api";

export default function AdminAktivitas() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);

  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
    date: "",
    time: "",
    priceType: "free",
    price: "",
    status: "open",
  });

  const [imageFile, setImageFile] = useState(null);

  // ============================================
  // LOAD
  // ============================================
  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const res = await api.get("/activities");
      const data = Array.isArray(res) ? res : res.data;
      setActivities(data);
    } catch (err) {
      console.error("Gagal load aktivitas:", err);
    }
    setLoading(false);
  };

  // ============================================
  // SAVE (CREATE + UPDATE)
  // ============================================
  const saveActivity = async () => {
    const fd = new FormData();

    Object.keys(form).forEach((key) => {
      fd.append(key, form[key]);
    });

    if (imageFile) fd.append("image", imageFile);

    try {
      if (editingId) {
        console.log("PUT → /activities/" + editingId);

        // UPDATE uses PUT
        await api.uploadPut(`/activities/${editingId}`, fd, token);

        alert("Aktivitas berhasil diupdate!");
      } else {
        console.log("POST → /activities");

        // CREATE uses POST
        await api.upload("/activities", fd, token);

        alert("Aktivitas baru berhasil ditambahkan!");
      }

      resetForm();
      loadActivities();
    } catch (err) {
      console.error("Gagal simpan:", err);
      alert("Gagal menyimpan data!");
    }
  };

  // ============================================
  // RESET FORM
  // ============================================
  const resetForm = () => {
    setEditingId(null);
    setForm({
      title: "",
      category: "",
      location: "",
      description: "",
      date: "",
      time: "",
      priceType: "free",
      price: "",
      status: "open",
    });
    setImageFile(null);
  };

  // ============================================
  // DELETE
  // ============================================
  const handleDelete = async (id) => {
    if (!confirm("Yakin ingin menghapus aktivitas ini?")) return;

    try {
      await api.delete(`/activities/${id}`, token);
      alert("Berhasil menghapus!");
      loadActivities();
    } catch (err) {
      console.error("Gagal hapus:", err);
      alert("Gagal menghapus aktivitas");
    }
  };

  // ============================================
  // EDIT LOAD
  // ============================================
  const handleEdit = (a) => {
    setEditingId(a.id);
    setForm({
      title: a.title,
      category: a.category,
      location: a.location,
      description: a.description,
      date: a.date,
      time: a.time,
      priceType: a.priceType,
      price: a.price,
      status: a.status,
    });
    setImageFile(null);
  };

  // ============================================
  // RENDER
  // ============================================
  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Panel — Kelola Aktivitas</h1>
      <h2>{editingId ? "Edit Aktivitas" : "Tambah Aktivitas"}</h2>

      <div className="admin-form">

        <label>Title</label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <label>Category</label>
        <input
          type="text"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        />

        <label>Location</label>
        <input
          type="text"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
        />

        <label>Description</label>
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <label>Date</label>
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

        <label>Time</label>
        <input
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />

        <label>Price Type</label>
        <select
          value={form.priceType}
          onChange={(e) => setForm({ ...form, priceType: e.target.value })}
        >
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>

        {form.priceType === "paid" && (
          <>
            <label>Price</label>
            <input
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </>
        )}

        <label>Status</label>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
        >
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>

        <label>Gambar</label>
        <input type="file" onChange={(e) => setImageFile(e.target.files[0])} />

        <button onClick={saveActivity}>
          {editingId ? "Simpan Perubahan" : "Tambah Aktivitas"}
        </button>
      </div>

      <h2>Daftar Aktivitas</h2>

      {loading ? (
        <p>Memuat...</p>
      ) : (
        activities.map((a) => (
          <div key={a.id} className="activity-row">
            <img src={a.imageUrl} className="thumb" />
            <div className="info">
              <h3>{a.title}</h3>
              <p>{a.location}</p>
            </div>

            <button onClick={() => handleEdit(a)}>Edit</button>
            <button onClick={() => handleDelete(a.id)}>Hapus</button>
          </div>
        ))
      )}
    </div>
  );
}
