import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import api from '../../utils/api';

const AdminGallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({
    url: '',
    category: '',
    caption: '',
    takenAt: ''
  });

  const fetchGallery = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get('/gallery');
      setItems(res.data || []);
    } catch (err) {
      console.error('Gagal load galeri:', err);
      setError('Gagal memuat data galeri dari server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  const handleOpenModal = () => {
    setForm({
      url: '',
      category: '',
      caption: '',
      takenAt: ''
    });
    setModalOpen(true);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError('');
      await api.post('/gallery', form);
      setModalOpen(false);
      await fetchGallery();
    } catch (err) {
      console.error('Gagal tambah foto:', err);
      setError(
        err?.response?.data?.message || 'Gagal menambah foto. Periksa server.'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm('Yakin ingin menghapus foto ini?');
    if (!ok) return;

    try {
      await api.delete(`/gallery/${id}`);
      await fetchGallery();
    } catch (err) {
      console.error('Gagal hapus foto:', err);
      alert('Gagal menghapus foto.');
    }
  };

  return (
    
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h1 className="text-lg font-semibold text-text">
              Galeri Kegiatan XI RPL
            </h1>
            <p className="text-xs text-text-muted">
              Kelola foto galeri yang tampil di halaman publik &quot;Galeri&quot;. Saat ini
              menggunakan URL gambar, upload file bisa ditambahkan di tahap berikutnya.
            </p>
          </div>
          <Button onClick={handleOpenModal}>
            + Tambah Foto
          </Button>
        </div>

        {error && (
          <div className="rounded-xl bg-state-error/10 px-3 py-2 text-[11px] text-state-error border border-state-error/40">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid gap-3 md:grid-cols-3">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="skeleton h-40" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="glass-card border border-white/5 p-4 text-xs text-text-muted">
            Belum ada foto di galeri. Tambahkan foto baru melalui tombol &quot;Tambah Foto&quot;.
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-3">
            {items.map((g) => (
              <Card key={g.id} className="p-2 flex flex-col gap-2">
                <div className="relative h-32 w-full overflow-hidden rounded-xl bg-card-soft">
                  {g.url && (
                    <img
                      src={g.url}
                      alt={g.caption}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-[11px] text-text-muted line-clamp-2 mb-1">
                    {g.caption || '(Tidak ada caption)'}
                  </p>
                  <div className="flex items-center justify-between text-[11px]">
                    <Badge variant="info">
                      {g.category || 'Tanpa kategori'}
                    </Badge>
                    {g.takenAt && (
                      <span className="text-text-muted">
                        {g.takenAt}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleDelete(g.id)}
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
          title="Tambah Foto Galeri"
        >
          <form onSubmit={handleCreate} className="space-y-3 text-sm">
            <div>
              <label className="mb-1 block text-[11px] text-text-muted">
                URL Gambar
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-white/10 bg-background px-3 py-2 text-sm text-text focus:outline-none focus:ring-1 focus:ring-primary"
                value={form.url}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, url: e.target.value }))
                }
                placeholder="https://..."
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] text-text-muted">
                Kategori
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-white/10 bg-background px-3 py-2 text-sm text-text focus:outline-none focus:ring-1 focus:ring-primary"
                value={form.category}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, category: e.target.value }))
                }
                placeholder="Kegiatan Kelas, Lomba, dll"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] text-text-muted">
                Caption
              </label>
              <textarea
                className="w-full rounded-xl border border-white/10 bg-background px-3 py-2 text-sm text-text focus:outline-none focus:ring-1 focus:ring-primary"
                rows={3}
                value={form.caption}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, caption: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] text-text-muted">
                Tanggal (opsional)
              </label>
              <input
                type="date"
                className="w-full rounded-xl border border-white/10 bg-background px-3 py-2 text-sm text-text focus:outline-none focus:ring-1 focus:ring-primary"
                value={form.takenAt}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, takenAt: e.target.value }))
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

export default AdminGallery;
