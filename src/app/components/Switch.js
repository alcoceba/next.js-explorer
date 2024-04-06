import styles from "./Switch.module.css";

function Switch({ children, id, isActive, onClick }) {
  return (
    <label className={styles.switch} htmlFor={id}>
      <input
        onChange={() => onClick?.()}
        type="checkbox"
        id={id}
        checked={isActive}
      />
      <span className={styles.slider}>
        <span className={styles.ball}>{children}</span>
      </span>
    </label>
  );
}

export default Switch;
