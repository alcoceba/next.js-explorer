import React from 'react';

const SunIcon = (props) => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 22 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Switch to dark mode"
    {...props}
  >
    <circle cx="11" cy="11" r="6" fill="#FFD600" stroke="#FFD600" strokeWidth="2" />
    <g stroke="#FFD600" strokeWidth="2">
      <line x1="11" y1="1" x2="11" y2="4" />
      <line x1="11" y1="18" x2="11" y2="21" />
      <line x1="1" y1="11" x2="4" y2="11" />
      <line x1="18" y1="11" x2="21" y2="11" />
      <line x1="4.93" y1="4.93" x2="6.76" y2="6.76" />
      <line x1="15.24" y1="15.24" x2="17.07" y2="17.07" />
      <line x1="4.93" y1="17.07" x2="6.76" y2="15.24" />
      <line x1="15.24" y1="6.76" x2="17.07" y2="4.93" />
    </g>
  </svg>
);

export default SunIcon;
