import React from 'react';

const SearchIcon = (props) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    {...props}
  >
    <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" />
    <line
      x1="12"
      y1="12"
      x2="15"
      y2="15"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

export default SearchIcon;
