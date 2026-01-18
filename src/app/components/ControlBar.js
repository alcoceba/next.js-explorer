import PropTypes from 'prop-types';
import React from 'react';
import { getShowSizes, setShowSizes } from '../utils/config';
import { SetIsCollapsed, SetShowSizes } from '../context/actions';
import { Context } from '../context/context';
import Button from './core/button/Button';
import CollapseIcon from '../icons/CollapseIcon';
import ExpandIcon from '../icons/ExpandIcon';
import Tooltip, { Position } from './core/tooltip/Tooltip';
import CopyIcon from '../icons/CopyIcon';
import InfoIcon from '../icons/InfoIcon';
import SizesIcon from '../icons/SizesIcon';

import * as styles from './ControlBar.module.css';

function ControlBar({ onExport, onCopy, onShowInfo, isPagesRouter }) {
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
      {isPagesRouter && (
        <Tooltip content="Show page details" position={Position.BOTTOM}>
          <Button onClick={onShowInfo} ariaLabel="Show page details">
            <InfoIcon />
          </Button>
        </Tooltip>
      )}
      <Tooltip
        content={showSizes ? 'Hide sizes in tree' : 'Show sizes in tree'}
        position={Position.BOTTOM}
      >
        <Button
          onClick={handleOnShowSizesClick}
          ariaLabel={showSizes ? 'Hide sizes' : 'Show sizes'}
        >
          <SizesIcon />
        </Button>
      </Tooltip>
      <Tooltip content="Collapse all" position={Position.BOTTOM}>
        <Button onClick={handleOnCollapseClick} ariaLabel="Collapse all">
          <CollapseIcon />
        </Button>
      </Tooltip>
      <Tooltip content="Expand all" position={Position.BOTTOM}>
        <Button onClick={handleOnExpandClick} ariaLabel="Expand all">
          <ExpandIcon />
        </Button>
      </Tooltip>
      <Tooltip content="Copy JSON" position={Position.BOTTOM}>
        <Button onClick={handleOnCopy} ariaLabel="Copy JSON">
          <CopyIcon />
        </Button>
      </Tooltip>
      <Button onClick={handleOnExportRawClick} ariaLabel="Export raw">
        export raw
      </Button>
      <Button onClick={handleOnExportFormattedClick} ariaLabel="Export formatted JSON">
        export formatted
      </Button>
    </div>
  );
}

ControlBar.propTypes = {
  onCopy: PropTypes.func.isRequired,
  onExport: PropTypes.func.isRequired,
  onShowInfo: PropTypes.func,
  isPagesRouter: PropTypes.bool,
};

export default ControlBar;
