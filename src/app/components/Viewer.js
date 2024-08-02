import React from "react";
import Tree from "./viewer/Tree";
import Message from "./Message";
import Portal from "./Portal";
import copy from "../../helpers/copy";

import styles from "./Viewer.module.css";

function Viewer({ json }) {
  const timeout = React.useRef(null);
  const [showMessage, setShowMessage] = React.useState(null);

  const handleOnCopy = async ({ value }) => {
    const result = await copy(value);
    setShowMessage(result * Math.random());

    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setShowMessage(false), 2000);
  };

  return (
    <div className={styles.viewer}>
      <pre>
        {!json || (json && !Object.entries(json)?.length) ? (
          <div className={styles.loading}>No data was found</div>
        ) : (
          <Tree data={json} onCopy={handleOnCopy} isRoot />
        )}
      </pre>

      {showMessage && (
        <Portal key={showMessage}>
          <Message>Value copied to clipboard!</Message>
        </Portal>
      )}

    </div>
  );
}

export default Viewer;
