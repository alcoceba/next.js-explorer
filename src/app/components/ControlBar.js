import React from 'react';
import PropTypes from 'prop-types';
import { getShowSizes, setShowSizes } from '../utils/config';
import { ROUTER } from '../../helpers/constants';
import { SetShowSizes } from '../context/actions';
import { Context } from '../context/context';
import Button from './core/button/Button';
import CollapseIcon from '../icons/CollapseIcon';
import ExpandIcon from '../icons/ExpandIcon';
import Tooltip, { Position } from './core/tooltip/Tooltip';
import CopyIcon from '../icons/CopyIcon';
import InfoIcon from '../icons/InfoIcon';
import SizesIcon from '../icons/SizesIcon';

import * as styles from './ControlBar.module.css';

function ControlBar({ onExport, onCopy, onShowInfo, onExpandAll, onCollapseAll }) {
  const [{ showSizes, appData, isSearching }, dispatch] = React.useContext(Context);
  const isPagesRouter = appData.nextjsRouter === ROUTER.Pages;

  const handleOnShowSizesClick = () => {
    setShowSizes(!showSizes);
    dispatch(SetShowSizes(!showSizes));
  };

  const handleOnCollapseClick = () => onCollapseAll?.();
  const handleOnExpandClick = () => onExpandAll?.();
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
      <Tooltip
        content={isSearching ? 'Collapse all (disabled during search)' : 'Collapse all'}
        position={Position.BOTTOM}
      >
        <Button onClick={handleOnCollapseClick} ariaLabel="Collapse all" disabled={isSearching}>
          <CollapseIcon />
        </Button>
      </Tooltip>
      <Tooltip
        content={isSearching ? 'Expand all (disabled during search)' : 'Expand all'}
        position={Position.BOTTOM}
      >
        <Button onClick={handleOnExpandClick} ariaLabel="Expand all" disabled={isSearching}>
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
  onExpandAll: PropTypes.func,
  onCollapseAll: PropTypes.func,
};

export default ControlBar;
