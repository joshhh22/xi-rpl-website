import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import api from '../../utils/api';
import Modal from '../../components/common/Modal';

const AdminStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    gender: 'L',
    quote: ''
  });

  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get('/students');
      setStudents(res.data || []);
    } catch (err) {
      console.error('Gagal load students:', err);
      setError('Gagal memuat data siswa dari server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleOpenModal = () => {
    setForm({ name: '', gender: 'L', quote: '' });
    setModalOpen(true);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError('');
      await api.post('/students', {
        name: form.name,
        gender: form.gender,
        quote: form.quote
      });
      setModalOpen(false);
      await fetchStudents();
    } catch (err) {
      console.error('Gagal tambah siswa:', err);
      setError(
        err?.response?.data?.message || 'Gagal menambah siswa. Periksa server.'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm('Yakin ingin menghapus siswa ini?');
    if (!ok) return;

    try {
      await api.delete(`/students/${id}`);
      await fetchStudents();
    } catch (err) {
      console.error('Gagal hapus siswa:', err);
      alert('Gagal menghapus siswa.');
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h1 className="text-lg font-semibold text-text">
              Data Siswa XI RPL
            </h1>
            <p className="text-xs text-text-muted">
              Manajemen data siswa. Semua perubahan langsung tersimpan di database
              PostgreSQL melalui API backend.
            </p>
          </div>
          <Button onClick={handleOpenModal}>
            + Tambah Siswa
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
              <div key={idx} className="skeleton h-24" />
            ))}
          </div>
        ) : students.length === 0 ? (
          <div className="glass-card border border-white/5 p-4 text-xs text-text-muted">
            Belum ada data siswa di database. Tambahkan siswa baru melalui tombol
            &quot;Tambah Siswa&quot;.
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {students.map((s) => (
              <Card key={s.id} className="flex items-center justify-between p-3">
                <div className="flex items-center gap-3">
                  <div className="relative h-9 w-9 overflow-hidden rounded-full bg-card-soft">
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] text-text-muted">
                      {s.name
                        .split(' ')
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">
                      {s.name}
                    </p>
                    <p className="text-[11px] text-text-muted">
                      {s.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                    </p>
                    {s.quote && (
                      <p className="mt-1 text-[11px] text-text-muted line-clamp-1">
                        “{s.quote}”
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Badge variant="default" className="text-[10px]">
                    ID #{String(s.id).padStart(2, '0')}
                  </Badge>
                  <button
                    type="button"
                    onClick={() => handleDelete(s.id)}
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
          title="Tambah Siswa Baru"
        >
          <form onSubmit={handleCreate} className="space-y-3 text-sm">
            <div>
              <label className="mb-1 block text-[11px] text-text-muted">
                Nama Lengkap
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-white/10 bg-background px-3 py-2 text-sm text-text focus:outline-none focus:ring-1 focus:ring-primary"
                value={form.name}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, name: e.target.value }))
                }
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] text-text-muted">
                Jenis Kelamin
              </label>
              <select
                className="w-full rounded-xl border border-white/10 bg-background px-3 py-2 text-sm text-text focus:outline-none focus:ring-1 focus:ring-primary"
                value={form.gender}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, gender: e.target.value }))
                }
              >
                <option value="L">Laki-laki</option>
                <option value="P">Perempuan</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-[11px] text-text-muted">
                Quote / Motto (opsional)
              </label>
              <textarea
                className="w-full rounded-xl border border-white/10 bg-background px-3 py-2 text-sm text-text focus:outline-none focus:ring-1 focus:ring-primary"
                rows={3}
                value={form.quote}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, quote: e.target.value }))
                }
              />
            </div>
            <Button type="submit" variant="primary" disabled={saving}>
              {saving ? 'Menyimpan...' : 'Simpan'}
            </Button>
          </form>
        </Modal>
      </div>
    </AdminLayout>
  );
};

export default AdminStudents;
