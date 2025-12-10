import React from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { clearAuth, getUser } from '../../utils/auth';

const AdminLayout = ({ children }) => {
    const user = getUser();

    const handleLogout = () => {
        clearAuth();
        window.location.href = '/admin/login';
    };

    return (
        <div className="min-h-screen bg-background text-text">
            <header className="border-b border-white/5 bg-background/90 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <Link to="/" className="text-sm font-semibold text-primary">
                        XI RPL • Public
                    </Link>
                    <span className="text-xs text-text-muted">/</span>
                    <span className="text-sm text-text-muted">Admin Dashboard</span>
                </div>
                <div className="flex items-center gap-3 text-xs">
                    {user && (
                        <div className="text-right">
                            <p className="font-semibold text-text">{user.name}</p>
                            <p className="text-[11px] text-text-muted">{user.email}</p>
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={handleLogout}
                        className="rounded-xl bg-white/5 px-3 py-1 text-[11px] text-text-muted hover:bg-white/10"
                    >
                        Logout
                    </button>
                </div>
            </header>

            <div className="flex">
                <aside className="hidden md:block w-56 border-r border-white/5 bg-[#161b22]/90 min-h-[calc(100vh-48px)] px-3 py-4">
                    <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-text-muted">
                        Admin Menu
                    </p>
                    <nav className="space-y-1 text-sm">
                        <NavLink
                            to="/admin"
                            end
                            className={({ isActive }) =>
                                `block rounded-lg px-3 py-2 ${
                                    isActive ? 'bg-primary/15 text-primary' : 'text-text-muted hover:bg-white/5 hover:text-text'
                                }`
                            }
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/admin/students"
                            className={({ isActive }) =>
                                `block rounded-lg px-3 py-2 ${
                                    isActive ? 'bg-primary/15 text-primary' : 'text-text-muted hover:bg-white/5 hover:text-text'
                                }`
                            }
                        >
                            Data Siswa
                        </NavLink>
                        <NavLink
                            to="/admin/achievements"
                            className={({ isActive }) =>
                                `block rounded-lg px-3 py-2 ${
                                    isActive ? 'bg-primary/15 text-primary' : 'text-text-muted hover:bg-white/5 hover:text-text'
                                }`
                            }
                        >
                            Prestasi
                        </NavLink>
                        <NavLink
                            to="/admin/gallery"
                            className={({ isActive }) =>
                                `block rounded-lg px-3 py-2 ${
                                    isActive ? 'bg-primary/15 text-primary' : 'text-text-muted hover:bg-white/5 hover:text-text'
                                }`
                            }
                        >
                            Galeri
                        </NavLink>
                        <NavLink
                            to="/admin/structure"
                            className={({ isActive }) =>
                                `block rounded-lg px-3 py-2 ${
                                    isActive ? 'bg-primary/15 text-primary' : 'text-text-muted hover:bg-white/5 hover:text-text'
                                }`
                            }
                        >
                            Struktur Kelas
                        </NavLink>

                    </nav>
                </aside>

                <main className="flex-1 p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
};

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminLayout;
