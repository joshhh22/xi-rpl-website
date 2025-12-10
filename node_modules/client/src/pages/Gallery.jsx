import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '../utils/animations';
import ScrollReveal from '../components/animations/ScrollReveal';
import Badge from '../components/common/Badge';
import FilterDropdown from '../components/common/FilterDropdown';
import Modal from '../components/common/Modal';
import api from '../utils/api';
import galleryMock from '../data/gallery';

const Gallery = () => {
  const [category, setCategory] = useState('');
  const [items, setItems] = useState(galleryMock);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await api.get('/gallery');
        if (Array.isArray(res.data) && res.data.length > 0) {
          setItems(res.data);
        } else {
          setItems(galleryMock);
        }
      } catch (err) {
        console.error('Gagal mengambil galeri:', err);
        setError('Gagal memuat data dari server, menampilkan data lokal.');
        setItems(galleryMock);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(items.map((g) => g.category))).filter(Boolean),
    [items]
  );

  const filtered = useMemo(
    () => items.filter((g) => (category ? g.category === category : true)),
    [items, category]
  );

  const handleOpen = (item) => setSelectedImage(item);
  const handleClose = () => setSelectedImage(null);

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-8"
    >
      <section>
        <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-text">
              Galeri Kegiatan XI RPL
            </h1>
            <p className="text-xs text-text-muted max-w-xl">
              Dokumentasi berbagai momen kelas XI RPL: kegiatan belajar, lomba, PKL,
              kebersamaan, hingga event sekolah. Data siap diambil dari backend.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <FilterDropdown
              label="Kategori"
              value={category}
              onChange={setCategory}
              options={categories.map((c) => ({ value: c, label: c }))}
            />
            <Badge variant="info">
              {filtered.length} foto
            </Badge>
          </div>
        </div>

        {error && !loading && (
          <div className="mb-3 text-xs text-state-warning">
            {error}
          </div>
        )}

        <ScrollReveal>
          {loading ? (
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="mb-4 skeleton h-40" />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="glass-card border border-white/5 p-4 text-xs text-text-muted">
              Belum ada dokumentasi untuk kategori ini.
            </div>
          ) : (
            <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
              {filtered.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className="mb-4 block w-full overflow-hidden rounded-2xl border border-white/5 bg-card-soft/60 hover:border-primary/60 hover:shadow-glow-blue transition-all break-inside-avoid"
                  onClick={() => handleOpen(item)}
                >
                  <div className="relative">
                    <img
                      src={item.url}
                      alt={item.caption}
                      loading="lazy"
                      className="h-full w-full transform object-cover transition-transform duration-300 hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-transparent opacity-80" />
                    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col gap-1 p-2 text-left">
                      <p className="line-clamp-2 text-[11px] text-white">
                        {item.caption}
                      </p>
                      <Badge variant="default" className="w-max text-[10px]">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </ScrollReveal>

        <Modal
          isOpen={!!selectedImage}
          onClose={handleClose}
          title={selectedImage?.category || 'Detail Foto'}
        >
          {selectedImage && (
            <div className="space-y-3">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/50">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.caption}
                  className="w-full max-h-[60vh] object-contain"
                />
              </div>
              <p className="text-[13px] text-text-muted">
                {selectedImage.caption}
              </p>
            </div>
          )}
        </Modal>
      </section>
    </motion.div>
  );
};

export default Gallery;
