import React from 'react';

const Footer = () => (
  <footer className="mt-10 border-t border-white/5 pt-4 pb-6 text-xs text-text-muted">
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <p>
        © {new Date().getFullYear()} XI RPL – SMK Negeri 8. Dibuat dengan React, Tailwind, dan
        Framer Motion.
      </p>
      <p className="text-[11px]">
        Frontend Phase 1 – Backend, Admin Dashboard, dan News akan menyusul.
      </p>
    </div>
  </footer>
);

export default Footer;
