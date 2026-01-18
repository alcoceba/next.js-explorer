import React from 'react';
import PropTypes from 'prop-types';

import { classNames } from '../../../utils/classNames';
import * as styles from './Tooltip.module.css';

export const Position = {
  TOP: 'top',
  BOTTOM: 'bottom',
  LEFT: 'left',
  RIGHT: 'right',
};

const Tooltip = ({ children, content, position = Position.TOP }) => (
  <span className={styles.wrapper}>
    {children}
    <span className={classNames(styles.tooltip, styles[position])}>{content}</span>
  </span>
);

Tooltip.propTypes = {
  children: PropTypes.node.isRequired,
  content: PropTypes.node.isRequired,
  position: PropTypes.oneOf(Object.values(Position)),
};

export default Tooltip;
