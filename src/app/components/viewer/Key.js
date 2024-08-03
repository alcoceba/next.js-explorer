import React from "react";
import PropTypes from "prop-types";
import { classNames } from "../../../helpers/classNames";
import { DEFAULT_SIZE } from "../../../helpers/const";
import { getObjSize } from "../../../helpers/object";
import { Context } from "../../context/context";

import styles from "./Key.module.css";

const color = (size) => {
  if (size > DEFAULT_SIZE) return styles.critical;
  else if (size > DEFAULT_SIZE * 0.5) return styles.alert;
  else if (size > DEFAULT_SIZE * 0.2) return styles.warn;
  else return "";
};

function Key({ index, tree, children }) {
  const [isHidden, setIsHidden] = React.useState(true);
  const [{ showSizes, isCollapsed }] = React.useContext(Context);
  const [size, length] = React.useMemo(() => [getObjSize(tree), Object.keys(tree)?.length], [tree]);

  const handleOnKeyClick = (e) => {
    e.stopPropagation();
    setIsHidden(!isHidden);
  };

  React.useEffect(() => setIsHidden(!isCollapsed), [isCollapsed]);

  return (
    <li className={classNames(!isHidden && styles.hidden)}>
      <span onClick={handleOnKeyClick} className={styles.collapsible}>
        {index}
      </span>

      <span className={styles.open}>{Array.isArray(tree) ? "[" : "{"}</span>

      {showSizes && (
        <span className={styles.info}>
          {length} keys /&nbsp;
          <span className={color(size)}>
            {size < 1000 ? `${size} bytes` : `${size / 1000} Kb`}
          </span>
        </span>
      )}

      <div className={styles.tree}>{children}</div>
      <span onClick={handleOnKeyClick} className={styles.ellipsis}> ... </span>

      <span className={styles.close}>{Array.isArray(tree) ? "]" : "}"}</span>
    </li>
  );
}

Key.propTypes = {
  index: PropTypes.string,
  tree: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.element,
};

export default Key;
