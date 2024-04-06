import styles from "./Loading.module.css";

function Loading({ isLoading, children }) {
  return (
    <>
      {isLoading && (
        <div className={styles.loading}>
          <div className={styles.text}>loading ...</div>
        </div>
      )}
      {children}
    </>
  );
}

export default Loading;
