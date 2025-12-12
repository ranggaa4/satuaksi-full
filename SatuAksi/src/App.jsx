// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- IMPORT PAGE COMPONENTS ---
import Navbar from './Navbar.jsx'; 
import Home from './Home.jsx';
import Tentang from './Tentang.jsx'; 
import Aktivitas from './Aktivitas.jsx'; 
import Kontak from './Kontak.jsx'; 
import DetailAktivitas from './DetailAktivitas.jsx'; 
import DaftarRelawan from './DaftarRelawan.jsx';
import DaftarRelawanLangkah2 from './DaftarRelawanLangkah2.jsx';
import KonfirmasiPendaftaran from './KonfirmasiPendaftaran.jsx';
import LoginPage from './LoginPage.jsx';
import RegisterPage from './RegisterPage.jsx';
import VolunteerTerealisasi from './VolunteerTerealisasi.jsx';
import DetailVolunteer from './DetailVolunteer.jsx';

// HAPUS "Profile" yang salah
// import Profile from "./Profile.jsx";

// YANG BENAR:
import ProfilePage from "./ProfilePage.jsx";

// --- IMPORT CSS ---
import './App.css';
import './Home.css';
import './Tentang.css';
import './Aktivitas.css';
import './Kontak.css';
import './DetailAktivitas.css';
import './DaftarRelawan.css';
import './LoginPage.css';
import './Navbar.css';
import './VolunteerTerealisasi.css';
import AdminRoute from "./AdminRoute.jsx";
import AdminAktivitas from "./AdminAktivitas.jsx";
import AdminTambah from "./AdminTambah.jsx";
import AdminEdit from "./AdminEdit.jsx";




function App() {
    return (
        <div className="app-container">
            <Router>
                <Navbar />

                <Routes>
                    {/* GENERAL PAGES */}
                    <Route path="/" element={<Home />} />
                    <Route path="/tentang" element={<Tentang />} />
                    <Route path="/aktivitas" element={<Aktivitas />} />
                    <Route path="/aktivitas/:id" element={<DetailAktivitas />} />
                    <Route path="/kontak" element={<Kontak />} />
                    <Route path="/admin/aktivitas" element={<AdminAktivitas />} />
                    <Route

                    
  path="/admin"
  element={
    <AdminRoute>
      <AdminAktivitas />
    </AdminRoute>
  }
/>
<Route
  path="/admin/aktivitas"
  element={
    <AdminRoute>
      <AdminAktivitas />
    </AdminRoute>
  }
/>

<Route
  path="/admin/aktivitas/tambah"
  element={
    <AdminRoute>
      <AdminTambah />
    </AdminRoute>
  }
/>

<Route
  path="/admin/aktivitas/edit/:id"
  element={
    <AdminRoute>
      <AdminEdit />
    </AdminRoute>
  }
/>


                    {/* VOLUNTEER */}
                    <Route path="/volunteer-terealisasi" element={<VolunteerTerealisasi />} />
                    <Route path="/volunteer-terealisasi/detail/:id" element={<DetailVolunteer />} />

                    {/* AUTH */}
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    {/* PROFIL */}
                    <Route path="/profile" element={<ProfilePage />} />

                    {/* RELAWAN MULTISTEP */}
                    <Route path="/daftar/:activityId" element={<DaftarRelawan />} />
                    <Route path="/keahlian/:activityId" element={<DaftarRelawanLangkah2 />} />
                    <Route path="/konfirmasi/:activityId" element={<KonfirmasiPendaftaran />} />

                    {/* 404 */}
                    <Route path="*" element={<h1>404 Halaman Tidak Ditemukan</h1>} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
