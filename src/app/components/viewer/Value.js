import { sanitize } from "../../../helpers/utils";

import styles from "./Value.module.css";

const highlight = (value) => {
  switch (typeof value) {
    case "number":
    case "bigint":
      return <span className={styles.num}>{value}</span>;
    case "string":
    case "symbol":
      return <span className={styles.str}>"{value.length ? value : ""}"</span>;
    case "boolean":
      return <span className={styles.bool}>{value ? "true" : "false"}</span>;
    case "object":
    default:
      if (value === null) return <span className={styles.null}>null</span>;
      return <span>{}</span>;
  }
};

function Value({ index, value }) {
  return (
    <li>
      <span className={styles.key}>{index}:</span> {highlight(sanitize(value))}
    </li>
  );
}

export default Value;
