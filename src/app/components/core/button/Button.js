import PropTypes from 'prop-types';
import React from 'react';
import * as styles from './Button.module.css';
import { classNames } from '../../../utils/classNames';

export const Variant = {
  DEFAULT: 'default',
  CRITICAL: 'critical',
  SECONDARY: 'secondary',
  ACCENT: 'accent',
};

export const Size = {
  DEFAULT: 'default',
  SMALL: 'small',
};

function Button({
  children,
  onClick,
  title,
  ariaLabel,
  className,
  variant = Variant.DEFAULT,
  size = Size.DEFAULT,
  disabled = false,
}) {
  const variantClass = styles[`button_${variant}`] || '';
  const sizeClass = styles[`button_${size}`] || '';

  return (
    <button
      onClick={onClick}
      className={classNames(styles.button, variantClass, sizeClass, className)}
      title={title}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string,
  ariaLabel: PropTypes.string,
  className: PropTypes.string,
  variant: PropTypes.oneOf(Object.values(Variant)),
  size: PropTypes.oneOf(Object.values(Size)),
  disabled: PropTypes.bool,
};

export default Button;
