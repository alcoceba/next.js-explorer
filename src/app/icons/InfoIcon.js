import React from 'react';

const InfoIcon = (props) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1" fill="none" />
    <rect x="8.25" y="7.5" width="1.5" height="5" rx="0.75" fill="currentColor" />
    <rect x="8.25" y="4.5" width="1.5" height="1.5" rx="0.75" fill="currentColor" />
  </svg>
);

export default InfoIcon;
