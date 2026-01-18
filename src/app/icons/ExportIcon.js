import React from 'react';

const ExportIcon = (props) => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Document outline */}
    <rect
      x="3.5"
      y="3.5"
      width="11"
      height="11"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.5"
      fill="none"
    />
    {/* Arrow down (export) */}
    <path d="M9 7.5V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path
      d="M7 10.5L9 12.5L11 10.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default ExportIcon;
