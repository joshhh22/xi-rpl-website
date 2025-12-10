import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import Badge from '../../components/common/Badge';

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="space-y-4">
        <div>
          <h1 className="text-xl font-semibold text-text">
            Admin Dashboard – XI RPL
          </h1>
          <p className="text-xs text-text-muted">
            Kelola data siswa, prestasi, dan galeri dari satu tempat. Ini adalah panel
            internal untuk wali kelas dan pengurus.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="glass-card p-4">
            <p className="text-xs text-text-muted mb-1">Modul</p>
            <p className="text-sm font-semibold text-text">Data Siswa</p>
            <p className="mt-1 text-[11px] text-text-muted">
              Tambah, ubah, dan hapus informasi siswa XI RPL.
            </p>
            <Badge variant="info" className="mt-2">
              CRUD • PostgreSQL
            </Badge>
          </div>
          <div className="glass-card p-4 opacity-70">
            <p className="text-xs text-text-muted mb-1">Modul</p>
            <p className="text-sm font-semibold text-text">Prestasi</p>
            <p className="mt-1 text-[11px] text-text-muted">
              Akan dibuat di tahap berikutnya (CRUD prestasi).
            </p>
          </div>
          <div className="glass-card p-4 opacity-70">
            <p className="text-xs text-text-muted mb-1">Modul</p>
            <p className="text-sm font-semibold text-text">Galeri</p>
            <p className="mt-1 text-[11px] text-text-muted">
              Akan dibuat di tahap berikutnya (upload foto & kategori).
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
