import React from "react";
import { SetIsCollapsed, SetShowSizes } from "../context/actions";
import { Context } from "../context/context";

import styles from "./Actions.module.css";

function Actions({ onExport }) {
  const [{ showSizes, isCollapsed }, dispatch] = React.useContext(Context);

  const handleOnShowSizesClick = () => dispatch(SetShowSizes(!showSizes));
  const handleOnCollapseClick = () => dispatch(SetIsCollapsed(isCollapsed + 1));
  const handleOnExpandClick = () => dispatch(SetIsCollapsed(false));

  const handleOnExportRawClick = () => onExport?.(0);
  const handleOnExportFormattedClick = () => onExport?.(2);

  return (
    <div className={styles.actions}>
      <span onClick={handleOnShowSizesClick}>
        {showSizes ? "hide sizes" : "show sizes"}
      </span>
      <span onClick={handleOnCollapseClick}>collapse</span>
      <span onClick={handleOnExpandClick}>expand</span>
      <div className={styles.right}>
        <span className={styles.selector}>
          +++
          <ul>
            <li onClick={handleOnExportRawClick}>export raw</li>
            <li onClick={handleOnExportFormattedClick}>export formatted</li>
          </ul>
        </span>
      </div>
    </div>
  );
}

export default Actions;
