import React, { useMemo, memo, useState, useCallback, useContext, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Modal from './core/modal/Modal';
import PageInfo from './PageInfo';
import ControlBar from './ControlBar';
import { FlatTree } from './core/flat-tree';
import Search from './core/search';
import { Context } from '../context/context';
import { SetShowPageInfo, SetIsSearching } from '../context/actions';
import { getObjSize } from '../utils/object';
import { THRESHOLD_MODEL_SIZE } from '../../helpers/constants';
import * as styles from './Viewer.module.css';

const SEARCH_DEBOUNCE_INITIAL_MS = 400;
const SEARCH_DEBOUNCE_MS = 200;

const SEARCH_TYPE_OPTIONS = [
  { value: 'keys', label: 'Keys', tooltip: 'Search in keys only' },
  { value: 'values', label: 'Values', tooltip: 'Search in values only' },
  { value: 'both', label: 'Keys & Values', tooltip: 'Search in both keys and values' },
];

const getSizeColor = (size) => {
  if (size > THRESHOLD_MODEL_SIZE.CRITICAL) return styles.critical;
  if (size > THRESHOLD_MODEL_SIZE.ALERT) return styles.alert;
  if (size > THRESHOLD_MODEL_SIZE.WARN) return styles.warn;
  return '';
};

const formatSize = (size) => (size < 1000 ? `${size} bytes` : `${(size / 1000).toFixed(1)} Kb`);

// Custom debounce hook with dynamic delay based on input length
function useDebouncedValue(value, initialDelay, shortDelay, threshold = 3) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Clear on empty to show results immediately when clearing
    if (!value) {
      setDebouncedValue(value);
      return;
    }

    // Use longer delay for short search terms (more expensive)
    const delay = value.length <= threshold ? initialDelay : shortDelay;

    timeoutRef.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [value, initialDelay, shortDelay, threshold]);

  return debouncedValue;
}

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

function Viewer({
  json,
  onCopy,
  onExport,
  onCopyJson,
  expandedPaths,
  onTogglePath,
  onExpandAll,
  onCollapseAll,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('both');
  const [{ showPageInfo, showSizes }, dispatch] = useContext(Context);

  // Debounce search: 400ms for first 4 chars, 200ms after
  const debouncedSearchTerm = useDebouncedValue(
    searchTerm,
    SEARCH_DEBOUNCE_INITIAL_MS,
    SEARCH_DEBOUNCE_MS
  );

  const isEmpty = useMemo(() => !json || !Object.entries(json)?.length, [json]);

  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term.toLowerCase());
  }, []);

  const handleSearchTypeChange = useCallback((type) => {
    setSearchType(type);
  }, []);

  const totalResults = useMemo(() => {
    if (!debouncedSearchTerm) return 0;
    return countMatches(json, debouncedSearchTerm, searchType);
  }, [json, debouncedSearchTerm, searchType]);

  useEffect(() => {
    dispatch(SetIsSearching(!!debouncedSearchTerm));
  }, [debouncedSearchTerm, dispatch]);

  return (
    <div className={styles.viewer}>
      {!isEmpty && (
        <>
          <div className={styles.controls}>
            <Search
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search keys and values..."
              totalResults={totalResults}
              filterOptions={SEARCH_TYPE_OPTIONS}
              filterValue={searchType}
              onFilterChange={handleSearchTypeChange}
              isSearching={searchTerm !== debouncedSearchTerm && !!searchTerm}
            />
            <ControlBar
              onExport={onExport}
              onCopy={onCopyJson}
              onShowInfo={() => dispatch(SetShowPageInfo(true))}
              onExpandAll={onExpandAll}
              onCollapseAll={onCollapseAll}
            />
          </div>

          <Modal open={!!showPageInfo} onClose={() => dispatch(SetShowPageInfo(false))}>
            <PageInfo />
          </Modal>
        </>
      )}

      {isEmpty || (debouncedSearchTerm && !totalResults) ? (
        <div className={styles.loading}>No data was found</div>
      ) : (
        <div className={styles.treeWrapper}>
          <FlatTree
            data={json}
            onCopy={onCopy}
            search={debouncedSearchTerm}
            searchType={searchType}
            expandedPaths={expandedPaths}
            onTogglePath={onTogglePath}
            showSizes={showSizes}
            getSizeColor={getSizeColor}
            formatSize={formatSize}
            getSize={getObjSize}
            copyableTypes={['str']}
          />
        </div>
      )}
    </div>
  );
}

Viewer.propTypes = {
  json: PropTypes.object,
  onCopy: PropTypes.func,
  onExport: PropTypes.func,
  onCopyJson: PropTypes.func,
  expandedPaths: PropTypes.instanceOf(Set),
  onTogglePath: PropTypes.func,
  onExpandAll: PropTypes.func,
  onCollapseAll: PropTypes.func,
};

export default memo(Viewer);
