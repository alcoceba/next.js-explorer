import React from 'react';
import PropTypes from 'prop-types';
import * as styles from './Spinner.module.css';

const Spinner = ({ size = 'medium' }) => (
  <div className={`${styles.spinner} ${styles[size]}`} aria-hidden="true">
    <svg viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle
        cx="9"
        cy="9"
        r="7"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        opacity="0.2"
      />
      <circle
        cx="9"
        cy="9"
        r="7"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeDasharray="11"
        strokeDashoffset="0"
        className={styles.circle}
      />
    </svg>
  </div>
);

Spinner.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
};

export default Spinner;
