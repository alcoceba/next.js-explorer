import styles from "./SearchBox.module.css";

function SearchBox({ onChange }) {
  return (
    <input
      className={styles.box}
      type="text"
      placeholder="Type to search..."
      onChange={(e) => onChange?.(e?.target?.value)}
    />
  );
}

export default SearchBox;
