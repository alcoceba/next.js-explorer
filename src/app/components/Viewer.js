import React, { useMemo, memo, useState, useCallback, useDeferredValue, useContext } from 'react';
import PropTypes from 'prop-types';
import Modal from './core/modal/Modal';
import PageInfo from './PageInfo';
import Search from './core/viewer/search/Search';
import ControlBar from './ControlBar';
import Tree from './core/viewer/tree/Tree';
import { Context } from '../context/context';
import { SetShowPageInfo } from '../context/actions';
import * as styles from './Viewer.module.css';

function countMatches(data, search, searchType = 'both') {
  if (!data || typeof data !== 'object') return 0;
  let count = 0;
  Object.entries(data).forEach(([key, value]) => {
    const keyStr = String(key).toLowerCase();
    const valueStr = String(value).toLowerCase();
    let directMatch = false;
    if (search) {
      if (searchType === 'keys') {
        directMatch = keyStr.includes(search);
      } else if (searchType === 'values') {
        directMatch = valueStr.includes(search);
      } else {
        directMatch = keyStr.includes(search) || valueStr.includes(search);
      }
    }
    const hasChildren = value && typeof value === 'object' && Object.keys(value).length > 0;
    if (directMatch) count++;
    if (hasChildren) count += countMatches(value, search, searchType);
  });
  return count;
}

function Viewer({ json, onCopy, onExport, onCopyJson, pageInfoProps }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('both');
  const [keepExpanded, setKeepExpanded] = useState(false);
  const [{ showPageInfo }, dispatch] = useContext(Context);
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const isEmpty = useMemo(() => !json || !Object.entries(json)?.length, [json]);

  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term.toLowerCase());
  }, []);

  const handleSearchTypeChange = useCallback((type) => {
    setSearchType(type);
  }, []);

  const handleKeepExpandedChange = useCallback((expanded) => {
    setKeepExpanded(expanded);
  }, []);

  const normalizedSearchTerm = useMemo(() => deferredSearchTerm, [deferredSearchTerm]);

  const totalResults = useMemo(() => {
    if (!normalizedSearchTerm) return 0;
    return countMatches(json, normalizedSearchTerm, searchType);
  }, [json, normalizedSearchTerm, searchType]);

  return (
    <div className={styles.viewer}>
      {!isEmpty && (
        <>
          <div className={styles.controls}>
            <Search
              searchTerm={searchTerm}
              onSearchChange={handleSearchChange}
              totalResults={totalResults}
              searchType={searchType}
              onSearchTypeChange={handleSearchTypeChange}
              keepExpanded={keepExpanded}
              onKeepExpandedChange={handleKeepExpandedChange}
            />
            <ControlBar
              onExport={onExport}
              onCopy={onCopyJson}
              onShowInfo={() => dispatch(SetShowPageInfo(true))}
              isPagesRouter={!!pageInfoProps}
            />
          </div>

          <Modal open={!!showPageInfo} onClose={() => dispatch(SetShowPageInfo(false))}>
            <PageInfo {...(pageInfoProps || {})} />
          </Modal>
        </>
      )}
      {isEmpty || (normalizedSearchTerm && !totalResults) ? (
        <div className={styles.loading}>No data was found</div>
      ) : (
        <pre>
          <Tree
            data={json}
            onCopy={onCopy}
            isRoot
            search={normalizedSearchTerm}
            searchType={searchType}
            keepExpanded={keepExpanded && !!normalizedSearchTerm}
          />
        </pre>
      )}
    </div>
  );
}

Viewer.propTypes = {
  json: PropTypes.object,
  onCopy: PropTypes.func,
  onExport: PropTypes.func,
  onCopyJson: PropTypes.func,
  pageInfoProps: PropTypes.object,
};

export default memo(Viewer);
