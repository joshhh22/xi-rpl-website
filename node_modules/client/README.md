# XI RPL Website – SMK Negeri 8

Website resmi kelas **XI Rekayasa Perangkat Lunak** di **SMK Negeri 8**. Dibangun dengan fokus pada **UI modern**, **animasi halus**, dan **arsitektur yang scalable**.

## Tech Stack

**Monorepo**

- Root: npm workspaces
- `client/`: React + Vite + Tailwind + Framer Motion
- `server/`: Express (Phase 2)

**Frontend**

- React 18
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- Lucide React (icons)
- PropTypes

**Backend (Phase 2)**

- Node.js + Express
- JWT Authentication
- (Database & ORM/ODM akan ditentukan kemudian)

## Fitur Utama

- Profil kelas XI RPL (36 siswa)
- Struktur kelas (Ka Prodi, Wali Kelas, Ketua, Wakil, Bendahara, Sekretaris, Koordinator)
- Prestasi siswa dengan filter (kategori, tahun, tingkat)
- Galeri/dokumentasi kegiatan kelas
- Halaman home dengan hero section, statistik, dan fitur preview
- Dark theme, glassmorphism, dan animasi halus (60fps)

## Struktur Folder

```bash
xi-rpl-website/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   ├── layout/
│   │   │   ├── animations/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── data/
│   │   └── styles/
└── server/
    ├── src/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   ├── middleware/
    │   └── utils/
