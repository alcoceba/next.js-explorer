import PropTypes from "prop-types";
import React from 'react';
import { sanitize } from "../../../helpers/utils";

import styles from "./Value.module.css";

const highlight = (value) => {
  switch (typeof value) {
    case "number":
    case "bigint":
      return <span className={styles.num}>{value}</span>;
    case "string":
    case "symbol":
      return <span className={styles.str}>&quot;{value.length ? value : ""}&quot;</span>;
    case "boolean":
      return <span className={styles.bool}>{value ? "true" : "false"}</span>;
    case "object":
    default:
      if (value === null) return <span className={styles.null}>null</span>;
      else if (Array.isArray(value)) return <span>[]</span>
      return <span>{'{}'}</span>;
  }
};

function Value({ index, value, onCopy }) {
  const handleOnClickValue = (e) => {
    if (e?.detail === 2) {
      e.preventDefault();
      onCopy?.({ value });
    }
  }

  return (
    <li onClick={handleOnClickValue}>
      <span className={styles.key}>{index}:</span> {highlight(sanitize(value))}
    </li>
  );
}

Value.propTypes = {
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.any,
  onCopy: PropTypes.func,
};

export default Value;
