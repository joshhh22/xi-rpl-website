import React from 'react';
import PropTypes from 'prop-types';

const FilterDropdown = ({ label, value, onChange, options = [], className = '' }) => {
  return (
    <label className={`flex items-center gap-2 text-xs text-text-muted ${className}`}>
      <span className="whitespace-nowrap">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-xl border border-white/10 bg-background px-2 py-1 text-xs text-text focus:outline-none focus:ring-1 focus:ring-primary"
      >
        <option value="">Semua</option>
        {options.map((opt) => (
          <option key={opt.value || opt} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
    </label>
  );
};

FilterDropdown.propTypes = {
  label: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string
      })
    ])
  ),
  className: PropTypes.string
};

export default FilterDropdown;
