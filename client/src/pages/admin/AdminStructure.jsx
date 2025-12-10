import React, { useEffect, useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Modal from '../../components/common/Modal';
import api from '../../utils/api';

const AdminStructure = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState({
    position: '',
    name: '',
    motto: '',
    orderNo: ''
  });

  const fetchStructure = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await api.get('/structure');
      const data = Array.isArray(res.data) ? res.data : [];
      data.sort((a, b) => {
        const oa = a.orderNo ?? 999;
        const ob = b.orderNo ?? 999;
        if (oa === ob) return a.id - b.id;
        return oa - ob;
      });
      setItems(data);
    } catch (err) {
      console.error('Gagal load struktur:', err);
      setError('Gagal memuat data struktur dari server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStructure();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setForm({
      position: '',
      name: '',
      motto: '',
      orderNo: items.length ? (items[items.length - 1].orderNo || items.length + 1) + 1 : 1
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setForm({
      position: item.position || '',
      name: item.name || '',
      motto: item.motto || '',
      orderNo: item.orderNo || ''
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError('');

      const payload = {
        position: form.position,
        name: form.name,
        motto: form.motto,
        orderNo: form.orderNo ? Number(form.orderNo) : null
      };

      if (editingItem) {
        await api.put(`/structure/${editingItem.id}`, payload);
      } else {
        await api.post('/structure', payload);
      }

      setModalOpen(false);
      setEditingItem(null);
      await fetchStructure();
    } catch (err) {
      console.error('Gagal menyimpan struktur:', err);
      setError(
        err?.response?.data?.message || 'Gagal menyimpan data struktur.'
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    const ok = window.confirm('Yakin ingin menghapus entri struktur ini?');
    if (!ok) return;

    try {
      await api.delete(`/structure/${id}`);
      await fetchStructure();
    } catch (err) {
      console.error('Gagal hapus struktur:', err);
      alert('Gagal menghapus entri struktur.');
    }
  };

  return (
    
      <div className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h1 className="text-lg font-semibold text-text">
              Struktur Pengurus XI RPL
            </h1>
            <p className="text-xs text-text-muted">
              Kelola data Ka Prodi, Wali Kelas, Ketua Kelas, dan pengurus lainnya. Data
              ini digunakan di halaman publik &quot;Struktur&quot;.
            </p>
          </div>
          <Button onClick={openCreateModal}>
            + Tambah Pengurus
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
        ) : items.length === 0 ? (
          <div className="glass-card border border-white/5 p-4 text-xs text-text-muted">
            Belum ada data struktur. Tambahkan pengurus baru melalui tombol &quot;Tambah
            Pengurus&quot;.
          </div>
        ) : (
          <div className="grid gap-3 md:grid-cols-2">
            {items.map((item) => (
              <Card key={item.id} className="p-3 flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-card-soft">
                    {item.photo && (
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    )}
                    <div className="absolute inset-0 flex items-center justify-center text-[10px] text-text-muted">
                      {item.name
                        .split(' ')
                        .slice(0, 2)
                        .map((n) => n[0])
                        .join('')
                        .toUpperCase()}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">
                      {item.name}
                    </p>
                    <p className="text-[11px] text-primary font-medium">
                      {item.position}
                    </p>
                    {item.motto && (
                      <p className="mt-1 text-[11px] text-text-muted line-clamp-2">
                        “{item.motto}”
                      </p>
                    )}
                    <Badge variant="default" className="mt-1 text-[10px]">
                      Urutan #{item.orderNo || '-'}
                    </Badge>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1 text-[11px]">
                  <button
                    type="button"
                    onClick={() => openEditModal(item)}
                    className="text-primary hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className="text-state-error hover:underline"
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
          onClose={() => {
            setModalOpen(false);
            setEditingItem(null);
          }}
          title={editingItem ? 'Edit Pengurus' : 'Tambah Pengurus Baru'}
        >
          <form onSubmit={handleSubmit} className="space-y-3 text-sm">
            <div>
              <label className="mb-1 block text-[11px] text-text-muted">
                Posisi
              </label>
              <input
                type="text"
                className="w-full rounded-xl border border-white/10 bg-background px-3 py-2 text-sm text-text focus:outline-none focus:ring-1 focus:ring-primary"
                value={form.position}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, position: e.target.value }))
                }
                placeholder="Contoh: Ketua Kelas"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] text-text-muted">
                Nama
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
                Motto / Catatan (opsional)
              </label>
              <textarea
                className="w-full rounded-xl border border-white/10 bg-background px-3 py-2 text-sm text-text focus:outline-none focus:ring-1 focus:ring-primary"
                rows={3}
                value={form.motto}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, motto: e.target.value }))
                }
              />
            </div>
            <div>
              <label className="mb-1 block text-[11px] text-text-muted">
                Urutan Tampilan
              </label>
              <input
                type="number"
                className="w-full rounded-xl border border-white/10 bg-background px-3 py-2 text-sm text-text focus:outline-none focus:ring-1 focus:ring-primary"
                value={form.orderNo}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, orderNo: e.target.value }))
                }
                placeholder="1 untuk Ka Prodi, 2 untuk Wali, dst."
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

export default AdminStructure;
