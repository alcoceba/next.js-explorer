import PropTypes from 'prop-types';
import React from 'react';
import * as styles from './Checkbox.module.css';

function Checkbox({ label, checked, onChange }) {
  return (
    <label className={styles.container}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={styles.input}
      />
      <span className={styles.checkmark} />
      <span className={styles.label}>{label}</span>
    </label>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Checkbox;
