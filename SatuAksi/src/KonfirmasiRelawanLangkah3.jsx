// Pastikan Anda telah mengimpor file CSS di sini:
// import './KonfirmasiLangkah3.css'; 

const KonfirmasiRelawanLangkah3 = () => {
  return (
    <div className="daftar-relawan-page">

      {/* 1. Header dan Judul Utama (Sesuai Desain Figma) */}
      {/* Jika header adalah komponen terpisah, Anda bisa menghapusnya dari sini */}
      <div className="header-container-wrapper">
          {/* Bagian Header/Navigasi dihilangkan karena biasanya komponen terpisah */}
          <div className="title-section">
              <div className="daftar-jadi-relawan-kami">Daftar Jadi Relawan Kami</div>
              <div className="subtitle-text">Isi formulir dibawah untuk memulai perjalanan anda sebagai bagian dari keluarga relawan kami.</div>
          </div>
      </div>

      <div className="main-content-wrapper">
          
          {/* 2. Program Info Card */}
          <div className="info-card-program">
              <div className="checkmark">✓</div>
              <div className="info-program-text">
                  <div className="anda-sedang-mendaftar-untuk-program">Anda Sedang Mendaftar Untuk Program:</div>
                  <div className="aksi-bersih-lingkungan">Aksi Bersih Lingkungan</div>
              </div>
          </div>
          
          {/* 3. Stepper Bar (Langkah 3) */}
          <div className="stepper-section">
              <div className="stepper-item completed-step">
                  <div className="stepper-circle">✓</div>
                  <div className="stepper-label">Langkah 1: Informasi Pribadi</div>
              </div>
              <div className="stepper-item completed-step">
                  <div className="stepper-circle">✓</div>
                  <div className="stepper-label">Langkah 2: Keahlian &amp; Minat</div>
              </div>
              <div className="stepper-item active-step">
                  <div className="stepper-circle">3</div>
                  <div className="stepper-label">Langkah 3: Konfirmasi &amp; Persetujuan</div>
              </div>
          </div>
          
          {/* 4. Konten Utama: Tinjau Ulang Data */}
          <div className="review-card-wrapper card-shadow">
              <div className="tinjau-ulang-data-anda">Tinjau Ulang Data Anda</div>
              
              <div className="review-data-grid">
                  {/* Kolom Kiri: Data Pribadi */}
                  <div className="review-column-left">
                      {/* Setiap Field Tinjauan Ulang */}
                      <ReviewField label="Nama Lengkap:" value="Zaskiah Angreani" />
                      <ReviewField label="Email Aktif:" value="Kiacantik@gmail.com" />
                      <ReviewField label="Nomor Telpon:" value="081234567" />
                      <ReviewField label="Alamat Lengkap:" value="Jalan Teladan No. 12 Blok AA" />
                      <ReviewField label="Portofolio / CV (Wajib) *" value="ZaskiahAngreani.pdf" />
                  </div>

                  {/* Garis Pemisah Vertikal */}
                  <div className="line-separator"></div>

                  {/* Kolom Kanan: Divisi & Motivasi */}
                  <div className="review-column-right">
                      
                      <div className="review-field">
                          <div className="review-label">Divisi yang Diminati*</div>
                          <div className="divisi-box">
                              <div className="checkmark">✓</div>
                              <div className="divisi-value">Human Resource Division</div>
                          </div>
                      </div>

                      <div className="review-field">
                          <div className="review-label">Motivasi Bergabung</div>
                          <div className="motivasi-box">
                              Alasan saya ikut program volunteer ini karena saya suka bersosialisai dengan masyarakat, saya senang berbagi dengan orang lain, dan saya tau program ini juga dari teman sayaa yaitu Zaskiah.
                          </div>
                      </div>
                  </div>
              </div>

              {/* Checkbox Persetujuan */}
              <div className="agreement-wrapper">
                  <label className="agreement-checkbox-group">
                      <input type="checkbox" className="agreement-checkbox" />
                      <div className="agreement-text">*Saya menyetujui syarat &amp; ketentuan yang berlaku.</div>
                  </label>
              </div>
          </div>
          
          {/* 5. Tombol Navigasi */}
          <div className="button-group-wrapper">
              <button className="button-kembali">KEMBALI KE LANGKAH SEBELUMNYA</button>
              <button className="button-lanjut" disabled>SELESAIKAN PENDAFTARAN</button>
          </div>

      </div>
    </div>
  );
};

// Component helper untuk field review data
const ReviewField = ({ label, value }) => (
    <div className="review-field">
        <div className="review-label">{label}</div>
        <div className="review-value-box">
            <div className="review-value">{value}</div>
        </div>
    </div>
);