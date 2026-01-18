import PropTypes from 'prop-types';
import React from 'react';
import * as styles from './Input.module.css';
import { classNames } from '../../../utils/classNames';

const Input = React.memo(
  React.forwardRef(
    (
      { value, onChange, onFocus, onBlur, placeholder, contentLeft, contentRight, isFocused },
      ref
    ) => (
      <div className={classNames(styles.container, isFocused && styles.focused)}>
        {contentLeft && contentLeft}
        <input
          ref={ref}
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={styles.input}
        />
        {contentRight && contentRight}
      </div>
    )
  )
);

Input.displayName = 'Input';

Input.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  contentLeft: PropTypes.node,
  contentRight: PropTypes.node,
  isFocused: PropTypes.bool,
};

export default Input;
