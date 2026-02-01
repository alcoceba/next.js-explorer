import PropTypes from 'prop-types';
import React from 'react';
import * as styles from './RadioGroup.module.css';
import Tooltip, { Position } from '../tooltip/Tooltip';

function RadioGroup({ options, value, onChange, label }) {
  return (
    <div className={styles.container}>
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.group}>
        {options.map((option) => {
          const buttonContent = <span className={styles.button}>{option.label}</span>;

          const isChecked = value === option.value;
          return (
            <label
              key={option.value}
              className={`${styles.option} ${isChecked ? styles.checked : ''}`}
            >
              <input
                type="radio"
                name={label}
                value={option.value}
                checked={isChecked}
                onChange={(e) => onChange(e.target.value)}
                className={styles.input}
              />
              {option.tooltip ? (
                <Tooltip content={option.tooltip} position={Position.BOTTOM}>
                  {buttonContent}
                </Tooltip>
              ) : (
                buttonContent
              )}
            </label>
          );
        })}
      </div>
    </div>
  );
}

RadioGroup.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      tooltip: PropTypes.string,
    })
  ).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default RadioGroup;
