import PropTypes from "prop-types";
import React from "react";

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

Loading.propTypes = {
  isLoading: PropTypes.bool,
  children: PropTypes.any,
};

export default Loading;
