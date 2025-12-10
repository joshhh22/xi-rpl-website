import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { pageTransition, staggerContainer } from '../utils/animations';
import ScrollReveal from '../components/animations/ScrollReveal';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import SearchBar from '../components/common/SearchBar';
import FilterDropdown from '../components/common/FilterDropdown';
import api from '../utils/api';
import mockStudents from '../data/students';

const Profile = () => {
  const [search, setSearch] = useState('');
  const [gender, setGender] = useState('');
  const [students, setStudents] = useState(mockStudents);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch dari backend saat mount
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await api.get('/students');
        if (Array.isArray(res.data) && res.data.length > 0) {
          setStudents(res.data);
        } else {
          setStudents(mockStudents);
        }
      } catch (err) {
        console.error('Gagal mengambil data siswa:', err);
        setError('Gagal memuat data dari server, menampilkan data lokal.');
        setStudents(mockStudents);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchName = s.name.toLowerCase().includes(search.toLowerCase());
      const matchGender = gender ? s.gender === gender : true;
      return matchName && matchGender;
    });
  }, [students, search, gender]);

  return (
    <motion.div
      variants={pageTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="space-y-8"
    >
      <section>
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-text">
              Profil Kelas XI RPL
            </h1>
            <p className="text-xs text-text-muted max-w-xl">
              Daftar lengkap siswa XI Rekayasa Perangkat Lunak SMK Negeri 8. Data awal
              berasal dari database PostgreSQL, dengan fallback ke mock data jika server
              offline.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Cari nama siswa..."
              className="w-full sm:w-56"
            />
            <FilterDropdown
              label="Jenis kelamin"
              value={gender}
              onChange={setGender}
              options={[
                { value: 'L', label: 'Laki-laki' },
                { value: 'P', label: 'Perempuan' }
              ]}
            />
          </div>
        </div>

        <ScrollReveal>
          {loading && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-4">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="skeleton h-32" />
              ))}
            </div>
          )}

          {error && !loading && (
            <div className="mb-3 text-xs text-state-warning">
              {error}
            </div>
          )}

          {!loading && (
            <>
              <div className="mb-3 text-xs text-text-muted">
                Menampilkan{' '}
                <span className="font-semibold text-text">
                  {filteredStudents.length}
                </span>{' '}
                dari{' '}
                <span className="font-semibold text-text">
                  {students.length}
                </span>{' '}
                siswa.
              </div>

              {filteredStudents.length === 0 ? (
                <div className="glass-card border border-white/5 p-4 text-xs text-text-muted">
                  Tidak ada siswa yang cocok dengan pencarian/filter.
                </div>
              ) : (
                <motion.div
                  variants={staggerContainer(0.06, 0)}
                  initial="hidden"
                  animate="visible"
                  className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                  {filteredStudents.map((student, index) => (
                    <motion.div
                      key={student.id}
                      variants={{
                        hidden: { opacity: 0, y: 16 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: {
                            duration: 0.35,
                            delay: index * 0.03
                          }
                        }
                      }}
                    >
                      <Card className="flex flex-col gap-3 p-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-11 w-11 overflow-hidden rounded-full bg-card-soft">
                            <img
                              src={student.photo || student.photo_url}
                              alt={student.name}
                              className="h-full w-full object-cover"
                              loading="lazy"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center text-[10px] text-text-muted">
                              {student.name
                                .split(' ')
                                .slice(0, 2)
                                .map((n) => n[0])
                                .join('')
                                .toUpperCase()}
                            </div>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-text">
                              {student.name}
                            </p>
                            <p className="text-[11px] text-text-muted">
                              XI RPL • Siswa
                            </p>
                          </div>
                        </div>

                        <p className="text-[11px] text-text-muted line-clamp-2">
                          “{student.quote}”
                        </p>

                        <div className="mt-auto flex items-center justify-between gap-2">
                          <Badge
                            variant={student.gender === 'L' ? 'info' : 'purple'}
                          >
                            {student.gender === 'L' ? 'Laki-laki' : 'Perempuan'}
                          </Badge>
                          <Badge variant="default" className="text-[10px]">
                            ID #{String(student.id).padStart(2, '0')}
                          </Badge>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </>
          )}
        </ScrollReveal>
      </section>
    </motion.div>
  );
};

export default Profile;
