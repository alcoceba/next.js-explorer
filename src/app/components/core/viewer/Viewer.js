import PropTypes from 'prop-types';
import React, { useMemo, memo, useState, useCallback, useDeferredValue } from 'react';
import Tree from './tree/Tree';
import Search from './search/Search';

import * as styles from './Viewer.module.css';

const EmptyState = memo(() => <div className={styles.loading}>No data was found</div>);
EmptyState.displayName = 'EmptyState';

function countMatches(data, search) {
  if (!data || typeof data !== 'object') return 0;
  let count = 0;
  Object.entries(data).forEach(([key, value]) => {
    const keyStr = String(key).toLowerCase();
    const valueStr = String(value).toLowerCase();
    const directMatch = search && (keyStr.includes(search) || valueStr.includes(search));
    const hasChildren = value && typeof value === 'object' && Object.keys(value).length > 0;
    if (directMatch) count++;
    if (hasChildren) count += countMatches(value, search);
  });
  return count;
}

function Viewer({ json, onCopy }) {
  const [searchTerm, setSearchTerm] = useState('');
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const isEmpty = useMemo(() => !json || !Object.entries(json)?.length, [json]);

  const handleSearchChange = useCallback((term) => {
    setSearchTerm(term.toLowerCase());
  }, []);

  const normalizedSearchTerm = useMemo(() => deferredSearchTerm, [deferredSearchTerm]);

  const totalResults = useMemo(() => {
    if (!normalizedSearchTerm) return 0;
    return countMatches(json, normalizedSearchTerm);
  }, [json, normalizedSearchTerm]);

  return (
    <div className={styles.viewer}>
      {!isEmpty && (
        <Search
          searchTerm={searchTerm}
          onSearchChange={handleSearchChange}
          totalResults={totalResults}
        />
      )}
      <pre>
        {isEmpty || (normalizedSearchTerm && !totalResults) ? (
          <EmptyState />
        ) : (
          <Tree data={json} onCopy={onCopy} isRoot search={normalizedSearchTerm} />
        )}
      </pre>
    </div>
  );
}

Viewer.propTypes = {
  json: PropTypes.object,
  onCopy: PropTypes.func,
};

export default memo(Viewer);
