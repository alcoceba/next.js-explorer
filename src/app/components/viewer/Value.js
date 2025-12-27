import PropTypes from "prop-types";
import React from 'react';
import { sanitize } from "../../../helpers/utils";

import * as styles from "./Value.module.css";

const highlight = ({ value }) => {
  switch (typeof value) {
    case "number":
    case "bigint":
      return [value, styles.num];
    case "string":
    case "symbol":
      return [`&quot;${value.length ? value : ""}&quot;`, styles.str];
    case "boolean":
      return [value ? "true" : "false", styles.bool];
    case "object":
    default:
      if (value === null) return ['null', styles.null];
      else if (Array.isArray(value)) return ['[]', undefined];
      return ['{}', undefined];
  }
};

function Value({ index, value, onCopy }) {
  const refValue = React.useRef(null);

  const [formattedValue, valueStyle] = highlight({ value: sanitize(value) });

  const selectText = () => {
    const range = document.createRange();
    range.selectNodeContents(refValue?.current);

    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
  }

  const handleOnClickValue = (e) => {
    if (e?.detail === 2) {
      e.preventDefault();
      onCopy?.({ value });
      selectText();
    }
  }

  return (
    <li onClick={handleOnClickValue}>
      <span className={styles.key}>{index}:</span>
      {' '}
      <span
        ref={refValue}
        className={valueStyle}
        dangerouslySetInnerHTML={{ __html: formattedValue }}
      />
    </li>
  );
}

Value.propTypes = {
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.any,
  onCopy: PropTypes.func,
};

export default Value;
