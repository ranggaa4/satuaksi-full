// src/VolunteerDetailProgram.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './VolunteerDetailProgram.css';
import { api } from "./api/api";

// --- Logo asset (KEEP this, it's part of your design) ---
import LogoImage from './assets/gemini-logo-removebg-preview-2.png';

const VolunteerDetailProgram = () => {
    const { id } = useParams();
    const [kegiatan, setKegiatan] = useState(null);
    const [loading, setLoading] = useState(true);

    // 🔥 Load data from backend
    useEffect(() => {
        api.get(`volunteers/completed/${id}`).then((res) => {
            if (res.success) {
                setKegiatan(res.data || res);
            }
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return (
            <div className="detail-page-wrapper">
                <div className="content-area">
                    <h1 className="main-title">Memuat data...</h1>
                </div>
            </div>
        );
    }

    if (!kegiatan) {
        return (
            <div className="detail-page-wrapper error-page">
                <div className="content-area">
                    <h1 className="main-title">Kegiatan Tidak Ditemukan 😔</h1>
                    <p className="tagline">Silakan kembali ke daftar kegiatan.</p>
                    <div className="button-footer" style={{marginTop: '200px'}}>
                        <Link to="/volunteer-terealisasi" className="back-button">
                            Kembali ke Daftar
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="detail-page-wrapper">
            
            <header className="main-header">
                <div className="header-logo-wrapper">
                    <img src={LogoImage} alt="Logo" className="header-logo" />
                </div>
                <nav className="header-nav">
                    <Link to="/" className="nav-item">Beranda</Link>
                    <Link to="/tentang" className="nav-item">Tentang</Link>
                    <Link to="/aktivitas" className="nav-item">Aktivitas</Link>
                    <Link to="/kontak" className="nav-item">Kontak</Link>
                    <Link to="/login" className="nav-item login">Login</Link>
                </nav>
            </header>

            <div className="content-area">
                
                <h1 className="main-title">{kegiatan.judul}</h1>
                <h2 className="tagline">{kegiatan.tagline}</h2>
                
                <section className="summary-section">
                    <img 
                        src={kegiatan.imageUrl} 
                        alt={kegiatan.judul} 
                        className="summary-image" 
                    />
                    <p className="description-text">
                        {kegiatan.deskripsi}
                    </p>
                </section>

                <section className="detail-list">
                    {kegiatan.detailItems?.map((item, index) => (
                        <div key={index} className="detail-row">
                            <span className="detail-label">{item.label}:</span>
                            <span className="detail-value">{item.value}</span>
                        </div>
                    ))}
                </section>
                
                <div className="button-footer">
                    <Link to="/volunteer-terealisasi" className="back-button">
                        Kembali
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default VolunteerDetailProgram;
