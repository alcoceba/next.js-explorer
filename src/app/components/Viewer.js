import Tree from "./viewer/Tree";

import styles from "./Viewer.module.css";

function Viewer({ json }) {
  return (
    <div className={styles.viewer}>
      <pre>
        {!json ? (
          <div className={styles.loading}>Loading...</div>
        ) : (
          <Tree data={json} />
        )}
      </pre>
    </div>
  );
}

export default Viewer;
