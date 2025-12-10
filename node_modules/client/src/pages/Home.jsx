import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { pageTransition, staggerContainer } from '../utils/animations';
import ScrollReveal from '../components/animations/ScrollReveal';
import FadeIn from '../components/animations/FadeIn';
import ScaleIn from '../components/animations/ScaleIn';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import useCounter from '../hooks/useCounter';
import api from '../utils/api';
import achievementsMock from '../data/achievements';
import studentsMock from '../data/students';
import galleryMock from '../data/gallery';

const Home = () => {
  const [stats, setStats] = useState({
    students: studentsMock.length,
    achievements: achievementsMock.length,
    gallery: galleryMock.length
  });
  const [loadingStats, setLoadingStats] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setLoadingStats(true);
        const [studentsRes, achievementsRes, galleryRes] = await Promise.all([
          api.get('/students'),
          api.get('/achievements'),
          api.get('/gallery')
        ]);

        setStats({
          students: Array.isArray(studentsRes.data)
            ? studentsRes.data.length
            : studentsMock.length,
          achievements: Array.isArray(achievementsRes.data)
            ? achievementsRes.data.length
            : achievementsMock.length,
          gallery: Array.isArray(galleryRes.data)
            ? galleryRes.data.length
            : galleryMock.length
        });
      } catch (err) {
        console.error('Gagal memuat statistik, gunakan mock:', err);
        setStats({
          students: studentsMock.length,
          achievements: achievementsMock.length,
          gallery: galleryMock.length
        });
      } finally {
        setLoadingStats(false);
      }
    };

    fetchStats();
  }, []);

  const studentsCount = useCounter(stats.students, 1000, !loadingStats);
  const achievementsCount = useCounter(stats.achievements, 1000, !loadingStats);
  const galleryCount = useCounter(stats.gallery, 1000, !loadingStats);

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-10"
    >
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-hero p-6 sm:p-8 lg:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.8),transparent_55%),radial-gradient(circle_at_bottom,_rgba(15,23,42,0.9),transparent_55%)]" />

        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[minmax(0,1.5fr),minmax(0,1fr)]">
          <div>
            <FadeIn delay={0}>
              <Badge variant="info" className="mb-4">
                NEW • Dashboard XI RPL
              </Badge>
            </FadeIn>

            <motion.div
              variants={staggerContainer(0.08, 0.05)}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              <motion.h1
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5 }
                  }
                }}
                className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
              >
                Ruang Digital
                <span className="block bg-gradient-to-r from-primary via-accent-purple to-accent-green bg-clip-text text-transparent">
                  XI Rekayasa Perangkat Lunak
                </span>
              </motion.h1>

              <motion.p
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: 0.08 }
                  }
                }}
                className="max-w-xl text-sm leading-relaxed text-text-muted sm:text-base"
              >
                Website resmi kelas XI RPL SMK Negeri 8. Jelajahi profil kelas, struktur
                pengurus, prestasi siswa, dan dokumentasi kegiatan dalam satu dashboard yang
                modern, dinamis, dan responsif.
              </motion.p>

              <motion.div
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.5, delay: 0.15 }
                  }
                }}
                className="mt-4 flex flex-wrap items-center gap-3"
              >
                <Button variant="primary">
                  Lihat Profil Kelas
                </Button>
                <Button variant="secondary">
                  Lihat Prestasi
                </Button>
                <span className="text-xs text-text-muted">
                  Dibangun dengan React, Tailwind, dan Framer Motion.
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Hero illustration / stats */}
          <ScaleIn delay={0.2}>
            <div className="relative h-full">
              <div className="glass-card relative z-10 border border-white/10 p-4 shadow-glow-blue">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
                    Statistik Kelas
                  </p>
                  <Badge variant="purple">
                    XI RPL • 2024/2025
                  </Badge>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center text-xs">
                  <div className="rounded-2xl bg-black/20 px-3 py-3">
                    <p className="text-[10px] text-text-muted">Total Siswa</p>
                    <p className="mt-1 text-lg font-semibold text-text">
                      {loadingStats ? '…' : studentsCount}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-black/20 px-3 py-3">
                    <p className="text-[10px] text-text-muted">Total Prestasi</p>
                    <p className="mt-1 text-lg font-semibold text-text">
                      {loadingStats ? '…' : `${achievementsCount}+`}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-black/20 px-3 py-3">
                    <p className="text-[10px] text-text-muted">Dokumentasi</p>
                    <p className="mt-1 text-lg font-semibold text-text">
                      {loadingStats ? '…' : galleryCount}
                    </p>
                  </div>
                </div>

                <div className="mt-3 rounded-2xl bg-gradient-to-r from-primary/20 via-accent-purple/20 to-accent-green/20 p-3 text-[11px] text-text-muted">
                  <p>
                    Frontend Phase 1: UI/UX, animasi, dan logika akan disempurnakan sebelum
                    terhubung penuh ke backend & database.
                  </p>
                </div>
              </div>

              <div className="floating-element pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-3xl bg-gradient-to-br from-primary/60 to-accent-purple/60 blur-xl opacity-70" />
            </div>
          </ScaleIn>
        </div>
      </section>

      {/* FEATURES PREVIEW */}
      <ScrollReveal>
        <section>
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-text">
                Fitur Utama Dashboard Kelas
              </h2>
              <p className="text-xs text-text-muted">
                Semua informasi penting XI RPL tersusun dalam layout kartu yang modern.
              </p>
            </div>
            <Badge variant="success">
              Data dari API + Mock
            </Badge>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <h3 className="mb-1 text-sm font-semibold">Profil & Struktur Kelas</h3>
              <p className="mb-3 text-xs text-text-muted">
                Lihat daftar lengkap 36 siswa XI RPL dan struktur pengurus kelas: Ketua,
                Wakil, Bendahara, Sekretaris, dan Koordinator.
              </p>
              <Badge variant="info">
                Avatar • Grid • Filter
              </Badge>
            </Card>

            <Card>
              <h3 className="mb-1 text-sm font-semibold">Prestasi Terintegrasi</h3>
              <p className="mb-3 text-xs text-text-muted">
                Dokumentasi prestasi siswa dengan filter berdasarkan kategori, tahun, dan
                tingkat lomba.
              </p>
              <Badge variant="success">
                Filter • Modal • Badges
              </Badge>
            </Card>

            <Card>
              <h3 className="mb-1 text-sm font-semibold">Galeri Kegiatan</h3>
              <p className="mb-3 text-xs text-text-muted">
                Gallery dengan layout responsif, efek hover, dan lightbox untuk melihat
                dokumentasi lebih detail.
              </p>
              <Badge variant="purple">
                Masonry • Lightbox • Lazy
              </Badge>
            </Card>
          </div>
        </section>
      </ScrollReveal>
    </motion.div>
  );
};

export default Home;
