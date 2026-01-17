import PropTypes from 'prop-types';
import React from 'react';
import { getShowSizes, setShowSizes } from '../utils/config';
import { SetIsCollapsed, SetShowSizes } from '../context/actions';
import { Context } from '../context/context';

import * as styles from './ControlBar.module.css';

function ControlBar({ onExport, onCopy }) {
  const [{ showSizes, isCollapsed }, dispatch] = React.useContext(Context);

  const handleOnShowSizesClick = () => {
    setShowSizes(!showSizes);
    dispatch(SetShowSizes(!showSizes));
  };

  const handleOnCollapseClick = () => dispatch(SetIsCollapsed(isCollapsed + 1));
  const handleOnExpandClick = () => dispatch(SetIsCollapsed(false));
  const handleOnCopy = () => onCopy?.();

  const handleOnExportRawClick = () => onExport?.(0);
  const handleOnExportFormattedClick = () => onExport?.(2);

  React.useEffect(() => {
    const handleInit = async () => {
      const showSizes = await getShowSizes();
      dispatch(SetShowSizes(showSizes?.sizes));
    };

    handleInit();
  }, []);

  return (
    <div className={styles.actions}>
      <span onClick={handleOnShowSizesClick}>{showSizes ? 'hide sizes' : 'show sizes'}</span>
      &nbsp;|&nbsp;
      <span onClick={handleOnCollapseClick}>collapse</span>
      &nbsp;|&nbsp; <span onClick={handleOnExpandClick}>expand</span>
      &nbsp;|&nbsp;<span onClick={handleOnCopy}>copy JSON</span>
      <div className={styles.right}>
        <span onClick={handleOnExportRawClick}>export raw</span>
        &nbsp;|&nbsp;<span onClick={handleOnExportFormattedClick}>export formatted</span>
      </div>
    </div>
  );
}

ControlBar.propTypes = {
  onCopy: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
};

export default ControlBar;
