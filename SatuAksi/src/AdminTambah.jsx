import React, { useEffect, useState } from "react";
import { api } from "./api/api";
import { useNavigate } from "react-router-dom";
import ImageVolunteer3 from "./assets/volunteer3.jpg";

export default function AdminAktivitas() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadActivities();
  }, []);

  const loadActivities = async () => {
    try {
      const res = await api.get("/activities", token);
      const data = Array.isArray(res) ? res : res.data || [];

      const mapped = data.map((item) => ({
        id: item.id,
        title: item.title,
        description: item.description,
        image: item.imageUrl || ImageVolunteer3,
      }));

      setActivities(mapped);
    } catch (err) {
      console.error("Gagal load aktivitas:", err);
    }

    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Yakin hapus?")) return;

    try {
      await api.delete(`/activities/${id}`, token);
      alert("Berhasil dihapus!");
      loadActivities();
    } catch (err) {
      console.error("Gagal hapus:", err);
      alert("Gagal menghapus!");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Admin Panel — Kelola Aktivitas</h1>

      <button
        onClick={() => navigate("/admin/aktivitas/tambah")}
        style={{
          padding: "10px 15px",
          marginBottom: 20,
          background: "green",
          color: "white",
        }}
      >
        ➕ Tambah Aktivitas
      </button>

      {loading ? <p>Memuat...</p> : null}

      {activities.length === 0 ? (
        <p>Tidak ada aktivitas.</p>
      ) : (
        <div className="admin-list">
          {activities.map((a) => (
            <div key={a.id} className="admin-card">
              <img src={a.image} className="admin-thumb" />
              <div className="admin-info">
                <h3>{a.title}</h3>
              </div>

              <div className="admin-buttons">
                <button onClick={() => navigate(`/admin/aktivitas/edit/${a.id}`)}>
                  ✏ Edit
                </button>

                <button onClick={() => handleDelete(a.id)}>
                  🗑 Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
