import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Home,
  Users,
  Award,
  Image as ImageIcon,
  Info,
  Shield
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Home', icon: Home },
  { to: '/profile', label: 'Profil Kelas', icon: Users },
  { to: '/structure', label: 'Struktur', icon: Info },
  { to: '/achievements', label: 'Prestasi', icon: Award },
  { to: '/gallery', label: 'Galeri', icon: ImageIcon }
];

const Sidebar = () => {
  return (
    <aside
      className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/5 bg-[#161b22]/95 backdrop-blur-xl md:flex"
      aria-label="Sidebar navigasi XI RPL"
    >
      {/* Header brand */}
      <div className="flex items-center gap-3 px-6 pt-5 pb-4">
        <div className="h-9 w-9 rounded-2xl bg-gradient-to-tr from-primary to-accent-purple flex items-center justify-center shadow-glow-blue floating-element">
          <span className="text-lg font-semibold text-white">XI</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-text">XI RPL</p>
          <p className="text-xs text-text-muted">SMK Negeri 8</p>
        </div>
      </div>

      {/* Navigasi utama (public) */}
      <nav className="mt-2 flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                [
                  'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all',
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/40 shadow-glow-blue'
                    : 'text-text-muted hover:bg-white/5 hover:text-text'
                ].join(' ')
              }
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-text-muted group-hover:text-primary transition-colors">
                <Icon size={18} />
              </span>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bagian bawah: link Admin + info kecil */}
      <div className="px-4 pb-5 space-y-3">
        {/* Tombol ke admin (login / dashboard) */}
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            [
              'flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-all border',
              isActive
                ? 'bg-primary/15 text-primary border-primary/50 shadow-glow-blue'
                : 'bg-white/5 text-text-muted border-white/10 hover:bg-white/10 hover:text-text'
            ].join(' ')
          }
        >
          <span className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/30">
              <Shield size={16} />
            </span>
            <span>Admin Dashboard</span>
          </span>
          <span className="rounded-full bg-primary/20 px-2 py-0.5 text-[10px] text-primary">
            Login
          </span>
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;
