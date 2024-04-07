import Tree from "./viewer/Tree";

import styles from "./Viewer.module.css";

function Viewer({ json }) {
  return (
    <div className={styles.viewer}>
      <pre>
        {!json || (json && !Object.entries(json)?.length) ? (
          <div className={styles.loading}>No data was found</div>
        ) : (
          <Tree data={json} isRoot />
        )}
      </pre>
    </div>
  );
}

export default Viewer;
