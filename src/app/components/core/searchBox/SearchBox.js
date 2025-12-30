import PropTypes from "prop-types";
import React from "react";

import * as styles from "./SearchBox.module.css";

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

SearchBox.propTypes = {
  onChange: PropTypes.func,
};

export default SearchBox;
