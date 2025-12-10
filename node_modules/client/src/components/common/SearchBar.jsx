import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({ value, onChange, placeholder = 'Cari...', className = '' }) => {
  return (
    <div
      className={`flex items-center rounded-2xl bg-white/5 px-3 py-2 text-sm text-text ${className}`}
    >
      <span className="mr-2 text-xs text-text-muted">🔍</span>
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-text placeholder:text-text-muted focus:outline-none"
        aria-label={placeholder}
      />
    </div>
  );
};

SearchBar.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  className: PropTypes.string
};

export default SearchBar;
