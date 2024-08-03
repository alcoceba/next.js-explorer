import PropTypes from "prop-types";
import React from "react";
import Tree from "./viewer/Tree";

import styles from "./Viewer.module.css";

function Viewer({ json, onCopy }) {
  return (
    <div className={styles.viewer}>
      <pre>
        {!json || (json && !Object.entries(json)?.length) ? (
          <div className={styles.loading}>No data was found</div>
        ) : (
          <Tree data={json} onCopy={onCopy} isRoot />
        )}
      </pre>
    </div>
  );
}

Viewer.propTypes = {
  json: PropTypes.object,
  onCopy: PropTypes.func,
};

export default Viewer;
