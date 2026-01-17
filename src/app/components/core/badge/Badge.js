import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './Badge.module.css';

export const Variant = {
  DEFAULT: 'default',
  PRIMARY: 'primary',
  ACCENT: 'accent',
};

function Badge({
  label,
  children,
  component: Component = 'div',
  variant = Variant.DEFAULT,
  ...props
}) {
  const variantClass = styles[`badge_${variant}`] || '';

  return (
    <Component className={`${styles.badge} ${variantClass}`} {...props}>
      <div className={styles.label}>{label}</div>
      <div className={styles.children}>{children}</div>
    </Component>
  );
}

Badge.propTypes = {
  label: PropTypes.string,
  children: PropTypes.any,
  component: PropTypes.elementType,
  variant: PropTypes.oneOf(Object.values(Variant)),
};

export default Badge;
