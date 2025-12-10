import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import api from '../../utils/api';

const AdminAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    title: '',
    studentName: '',
    category: '',
    level: '',
    year: new Date().getFullYear(),
    description: ''
  });

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get('/achievements');
      setAchievements(res.data || []);
    } catch (err) {
      console.error('Gagal load achievements:', err);
      setError('Gagal memuat data prestasi dari server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const handleOpenModal = () => {
    setForm({
      title: '',
      studentName: '',
      category: '',
      level: '',
      year: new Date().getFullYear(),
      description: ''
    });
    setModalOpen(true);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError('');
      await api.post('/achievements', form);
      setModalOpen(false);
      await fetchAchievements();
    } catch (err) {
      console.error('Gagal tambah prestasi:', err);
      setError(
        err?.response?.data?.message || 'Gagal menambah prestasi. Periksa server.'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm('Yakin ingin menghapus prestasi ini?');
    if (!ok) return;

    try {
      await api.delete(`/achievements/${id}`);
      await fetchAchievements();
    } catch (err) {
      console.error('Gagal hapus prestasi:', err);
      alert('Gagal menghapus prestasi.');
    }
  };

  return (
    
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h1 className="text-lg font-semibold text-text">
              Prestasi Siswa XI RPL
            </h1>
            <p className="text-xs text-text-muted">
              Kelola data prestasi siswa. Data ini digunakan di halaman publik &quot;Prestasi&quot;.
            </p>
          </div>
          <Button onClick={handleOpenModal}>
            + Tambah Prestasi
          </Button>
        </div>

        {error && (
          <div className="rounded-xl bg-state-error/10 px-3 py-2 text-[11px] text-state-error border border-state-error/40">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid gap-3 md:grid-cols-2">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="skeleton h-28" />
            ))}
          </div>
        ) : achievements.length === 0 ? (
          <div className="glass-card border border-white/5 p-4 text-xs text-text-muted">
            Belum ada prestasi. Tambahkan prestasi baru melalui tombol &quot;Tambah Prestasi&quot;.
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {achievements.map((a) => (
              <Card key={a.id} className="p-3 flex flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-text">
                      {a.title}
                    </p>
                    <p className="text-[11px] text-text-muted">
                      {a.studentName}
                    </p>
                  </div>
                  <div className="text-right text-[11px]">
                    <Badge variant="info" className="mb-1">
                      {a.category || 'Tanpa kategori'}
                    </Badge>
                    <div className="flex justify-end gap-1">
                      {a.level && (
                        <Badge variant="purple">
                          {a.level}
                        </Badge>
                      )}
                      {a.year && (
                        <Badge variant="success">
                          {a.year}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                {a.description && (
                  <p className="text-[11px] text-text-muted line-clamp-2">
                    {a.description}
                  </p>
                )}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleDelete(a.id)}
                    className="text-[11px] text-state-error hover:underline"
                  >
                    Hapus
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}

        <Modal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Tambah Prestasi Baru"
        >
          <form onSubmit={handleCreate} className="space-y-3 text-sm">
            <div>
              <label className="mb-1 block text-[11px] text-text-muted">
                Judul Prestasi
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-white/10 bg-background px-3 py-2 text-sm text-text focus:outline-none focus:ring-1 focus:ring-primary"
                value={form.title}
                onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] text-text-muted">
                Nama Siswa
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-white/10 bg-background px-3 py-2 text-sm text-text focus:outline-none focus:ring-1 focus:ring-primary"
                value={form.studentName}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, studentName: e.target.value }))
                }
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-1">
                <label className="mb-1 block text-[11px] text-text-muted">
                  Kategori
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-white/10 bg-background px-2 py-2 text-xs text-text focus:outline-none focus:ring-1 focus:ring-primary"
                  value={form.category}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, category: e.target.value }))
                  }
                  placeholder="Web, UI/UX, dll"
                />
              </div>
              <div className="col-span-1">
                <label className="mb-1 block text-[11px] text-text-muted">
                  Tingkat
                </label>
                <input
                  type="text"
                  className="w-full rounded-xl border border-white/10 bg-background px-2 py-2 text-xs text-text focus:outline-none focus:ring-1 focus:ring-primary"
                  value={form.level}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, level: e.target.value }))
                  }
                  placeholder="Sekolah, Kota, Provinsi"
                />
              </div>
              <div className="col-span-1">
                <label className="mb-1 block text-[11px] text-text-muted">
                  Tahun
                </label>
                <input
                  type="number"
                  className="w-full rounded-xl border border-white/10 bg-background px-2 py-2 text-xs text-text focus:outline-none focus:ring-1 focus:ring-primary"
                  value={form.year}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, year: e.target.value }))
                  }
                />
              </div>
            </div>
            <div>
              <label className="mb-1 block text-[11px] text-text-muted">
                Deskripsi
              </label>
              <textarea
                className="w-full rounded-xl border border-white/10 bg-background px-3 py-2 text-sm text-text focus:outline-none focus:ring-1 focus:ring-primary"
                rows={3}
                value={form.description}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, description: e.target.value }))
                }
              />
            </div>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </form>
        </Modal>
      </div>
    
  );
};

export default AdminAchievements;
