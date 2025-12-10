// client/src/components/admin/AdminLayout.jsx
import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { clearAuth } from '../../utils/auth';
import {
  LayoutDashboard,
  Users,
  Award,
  Image as ImageIcon,
  Shield,
  LogOut
} from 'lucide-react';

const adminNav = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/students', label: 'Data Siswa', icon: Users },
  { to: '/admin/structure', label: 'Struktur Kelas', icon: Shield },
  { to: '/admin/achievements', label: 'Prestasi', icon: Award },
  { to: '/admin/gallery', label: 'Galeri', icon: ImageIcon }
];

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen flex bg-[#0f1419] text-text">
      {/* SIDEBAR ADMIN */}
      <aside className="w-64 border-r border-white/5 bg-[#161b22]/95 backdrop-blur-xl hidden md:flex md:flex-col">
        <div className="px-5 pt-5 pb-4 border-b border-white/5">
          <p className="text-xs font-semibold text-text-muted uppercase tracking-wide">
            XI RPL • Admin
          </p>
          <p className="text-sm font-semibold text-text mt-1">
            Panel Admin Kelas
          </p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {adminNav.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/admin'}
                className={({ isActive }) =>
                  [
                    'group flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium transition-all',
                    isActive
                      ? 'bg-primary/15 text-primary border border-primary/40 shadow-glow-blue'
                      : 'text-text-muted hover:bg-white/5 hover:text-text'
                  ].join(' ')
                }
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-text-muted group-hover:text-primary transition-colors">
                  <Icon size={16} />
                </span>
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="px-4 pb-5 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-state-error/40 bg-state-error/10 px-3 py-2 text-[11px] font-medium text-state-error hover:bg-state-error/20 transition-colors"
          >
            <LogOut size={14} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* KONTEN ADMIN */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="flex items-center justify-between px-4 py-3 border-b border-white/5 md:hidden">
          <div className="text-xs text-text-muted">
            Panel Admin XI RPL
          </div>
          <button
            onClick={handleLogout}
            className="text-xs text-state-error hover:underline"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
