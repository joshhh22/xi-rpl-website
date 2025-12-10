import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { pageTransition, staggerContainer } from '../utils/animations';
import ScrollReveal from '../components/animations/ScrollReveal';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import api from '../utils/api';

const Structure = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStructure = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await api.get('/structure');
        setItems(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error('Gagal mengambil struktur:', err);
        setError('Gagal memuat data dari server.');
      } finally {
        setLoading(false);
      }
    };

    fetchStructure();
  }, []);

  const sorted = [...items].sort((a, b) => {
    const oa = a.orderNo ?? 999;
    const ob = b.orderNo ?? 999;
    if (oa === ob) return a.id - b.id;
    return oa - ob;
  });

  const core = sorted.slice(0, 2);
  const officers = sorted.slice(2);

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-8"
    >
      <section>
        <div className="mb-4">
          <h1 className="text-xl font-semibold text-text">
            Struktur Kelas XI RPL
          </h1>
          <p className="text-xs text-text-muted max-w-xl">
            Susunan pembimbing dan pengurus kelas XI RPL. Data diambil dari database
            melalui API backend sehingga dapat diperbarui lewat dashboard admin.
          </p>
        </div>

        {error && !loading && (
          <div className="mb-3 text-xs text-state-warning">
            {error}
          </div>
        )}

        {loading && (
          <div className="grid gap-4 md:grid-cols-2 mb-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="skeleton h-24" />
            ))}
          </div>
        )}

        {!loading && (
          <>
            {/* Pembimbing */}
            <ScrollReveal>
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold text-text">
                  Pembimbing Program & Wali Kelas
                </h2>
                <Badge variant="info">
                  Guru Pembimbing
                </Badge>
              </div>

              <motion.div
                variants={staggerContainer(0.08, 0)}
                initial="hidden"
                animate="visible"
                className="grid gap-4 md:grid-cols-2"
              >
                {core.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, y: 18 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.35,
                          delay: index * 0.05
                        }
                      }
                    }}
                  >
                    <Card className="flex items-center gap-3 p-4">
                      <div className="relative h-12 w-12 overflow-hidden rounded-full bg-card-soft">
                        <img
                          src={item.photo}
                          alt={item.name}
                          className="h-full w-full object-cover"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-[10px] text-text-muted">
                          {item.name
                            .split(' ')
                            .slice(0, 2)
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase()}
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-text">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-primary font-medium">
                          {item.position}
                        </p>
                        {item.motto && (
                          <p className="mt-1 text-[11px] text-text-muted">
                            “{item.motto}”
                          </p>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </ScrollReveal>

            {/* Pengurus lain */}
            <ScrollReveal delay={0.1} className="mt-8">
              <div className="mb-3 flex items-center justify-between gap-2">
                <h2 className="text-sm font-semibold text-text">
                  Pengurus Kelas
                </h2>
              </div>

              <motion.div
                variants={staggerContainer(0.06, 0)}
                initial="hidden"
                animate="visible"
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              >
                {officers.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: {
                          duration: 0.35,
                          delay: index * 0.04
                        }
                      }
                    }}
                  >
                    <Card className="flex flex-col gap-3 p-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-10 w-10 overflow-hidden rounded-full bg-card-soft">
                          <img
                            src={item.photo}
                            alt={item.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center text-[10px] text-text-muted">
                            {item.name
                              .split(' ')
                              .slice(0, 2)
                              .map((n) => n[0])
                              .join('')
                              .toUpperCase()}
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-text">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-text-muted">
                            {item.position}
                          </p>
                        </div>
                      </div>
                      {item.motto && (
                        <p className="text-[11px] text-text-muted">
                          “{item.motto}”
                        </p>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </ScrollReveal>
          </>
        )}
      </section>
    </motion.div>
  );
};

export default Structure;
