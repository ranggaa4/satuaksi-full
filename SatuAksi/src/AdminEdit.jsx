import React, { useEffect, useState } from "react";
import { api } from "./api/api";
import { useParams } from "react-router-dom";

export default function AdminEdit() {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [image, setImage] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const res = await api.get(`/activities/${id}`);
    setForm(res);
  };

  const save = async () => {
    const fd = new FormData();

    Object.keys(form).forEach((key) => fd.append(key, form[key]));

    if (image) fd.append("image", image);

    await api.upload(`/activities/${id}`, fd, token);

    alert("Berhasil diupdate!");
    window.location.href = "/admin/aktivitas";
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Edit Aktivitas</h1>

      {Object.keys(form).map((key) => (
        <div key={key}>
          <label>{key}</label>
          <input
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          />
        </div>
      ))}

      <div>
        <label>Gambar Baru</label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      </div>

      <button onClick={save}>Simpan Perubahan</button>
    </div>
  );
}
