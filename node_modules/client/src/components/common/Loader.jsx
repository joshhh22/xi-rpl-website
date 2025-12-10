import React from 'react';

const Loader = () => (
  <div
    className="inline-flex h-8 items-center justify-center gap-2 rounded-full bg-white/5 px-3 text-xs text-text-muted"
    aria-label="Loading"
  >
    <span className="relative flex h-4 w-4">
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60 opacity-75" />
      <span className="relative inline-flex h-4 w-4 rounded-full bg-primary" />
    </span>
    <span>Sedang memuat…</span>
  </div>
);

export default Loader;
