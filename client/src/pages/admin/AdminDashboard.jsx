// client/src/pages/admin/AdminDashboard.jsx
import React from 'react';
import Card from '../../components/common/Card';

const AdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-text">
          Admin Dashboard – XI RPL
        </h1>
        <p className="text-xs text-text-muted">
          Kelola data siswa, struktur kelas, prestasi, dan galeri dari satu tempat.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-4 flex flex-col gap-2">
          <p className="text-xs font-semibold text-primary">Modul</p>
          <h2 className="text-sm font-semibold text-text">Data Siswa</h2>
          <p className="text-[11px] text-text-muted">
            Tambah, ubah, dan hapus informasi siswa XI RPL.
          </p>
          <p className="mt-auto text-[11px] text-primary/80">
            CRUD • PostgreSQL
          </p>
        </Card>

        <Card className="p-4 flex flex-col gap-2 opacity-60">
          <p className="text-xs font-semibold text-primary">Modul</p>
          <h2 className="text-sm font-semibold text-text">Prestasi</h2>
          <p className="text-[11px] text-text-muted">
            Kelola daftar prestasi siswa berdasarkan kategori, tingkat, dan tahun.
          </p>
          <p className="mt-auto text-[11px] text-text-muted">
            Aktif • CRUD prestasi
          </p>
        </Card>

        <Card className="p-4 flex flex-col gap-2 opacity-60">
          <p className="text-xs font-semibold text-primary">Modul</p>
          <h2 className="text-sm font-semibold text-text">Galeri</h2>
          <p className="text-[11px] text-text-muted">
            Kelola dokumentasi foto kegiatan kelas XI RPL.
          </p>
          <p className="mt-auto text-[11px] text-text-muted">
            Aktif • Upload & kategori
          </p>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
