import React from 'react';
import { Menu } from 'lucide-react';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-30 border-b border-white/5 bg-background/80 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 py-3 md:px-8">
        {/* Mobile brand + toggle (toggle belum diimplementasi, next step) */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            aria-label="Toggle sidebar"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-white/5 text-text hover:bg-white/10"
          >
            <Menu size={18} />
          </button>
          <div>
            <p className="text-sm font-semibold text-text">XI RPL</p>
            <p className="text-xs text-text-muted">SMK Negeri 8</p>
          </div>
        </div>

        {/* Desktop brand */}
        <div className="hidden md:flex flex-col">
          <span className="text-xs uppercase tracking-widest text-primary/80 font-semibold">
            XI Rekayasa Perangkat Lunak
          </span>
          <span className="text-sm text-text-muted">
            SMK Negeri 8 – Dashboard kelas
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs text-text-muted">Tema</p>
            <p className="text-sm font-medium text-text">Dark • Glassmorphism</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-primary/80 flex items-center justify-center text-xs font-semibold shadow-glow-blue">
            XI
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
