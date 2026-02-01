import PropTypes from 'prop-types';
import React, { memo, useMemo, useCallback } from 'react';
import FlatRow from './FlatRow';
import { flattenJson, findMatchingPaths } from './utils';

import * as styles from './FlatTree.module.css';

const DEFAULT_COPYABLE_TYPES = ['str'];

function FlatTree({
  data,
  onCopy,
  search = '',
  searchType = 'both',
  expandedPaths = new Set(),
  onTogglePath,
  showSizes = false,
  getSizeColor,
  formatSize,
  getSize,
  copyableTypes = DEFAULT_COPYABLE_TYPES,
}) {
  const effectivePaths = useMemo(() => expandedPaths, [expandedPaths]);

  const rows = useMemo(() => flattenJson(data, effectivePaths), [data, effectivePaths]);

  // Compute matching paths from full data structure (not just visible rows)
  const matchingPaths = useMemo(
    () => findMatchingPaths(data, search, searchType),
    [data, search, searchType]
  );

  const displayRows = useMemo(() => {
    if (!search) return rows;

    const visiblePaths = new Set();
    const pathsWithChildren = new Set();

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      if (row.isClosing) continue;

      const path = row.path;

      const isMatch = matchingPaths.has(path);

      let isDescendant = false;
      for (const matchPath of matchingPaths) {
        if (path.startsWith(matchPath + '.')) {
          isDescendant = true;
          break;
        }
      }

      let isAncestor = false;
      for (const matchPath of matchingPaths) {
        if (matchPath.startsWith(path + '.')) {
          isAncestor = true;
          break;
        }
      }

      if (isMatch || isDescendant || isAncestor) {
        visiblePaths.add(path);

        // Mark for closing bracket if expanded
        if (row.expandable && row.isExpanded) {
          pathsWithChildren.add(path);
        }
      }
    }

    return rows.filter((row) => {
      if (row.isClosing) {
        const parentPath = row.path.slice(0, -10); // Remove '.__closing' (10 chars)
        return pathsWithChildren.has(parentPath);
      }
      return visiblePaths.has(row.path);
    });
  }, [rows, search, matchingPaths]);

  const handleToggle = useCallback(
    (path) => {
      onTogglePath?.(path);
    },
    [onTogglePath]
  );

  const handleCopy = useCallback(
    (data) => {
      onCopy?.(data);
    },
    [onCopy]
  );

  return (
    <div className={styles.container}>
      {displayRows.map((row, index) => (
        <FlatRow
          key={row.path}
          lineNumber={index + 1}
          row={row}
          onToggle={handleToggle}
          onCopy={handleCopy}
          search={search}
          searchType={searchType}
          showSizes={showSizes}
          getSizeColor={getSizeColor}
          formatSize={formatSize}
          getSize={getSize}
          copyableTypes={copyableTypes}
        />
      ))}
    </div>
  );
}

FlatTree.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onCopy: PropTypes.func,
  search: PropTypes.string,
  searchType: PropTypes.oneOf(['keys', 'values', 'both']),
  expandedPaths: PropTypes.instanceOf(Set),
  onTogglePath: PropTypes.func,
  showSizes: PropTypes.bool,
  getSizeColor: PropTypes.func,
  formatSize: PropTypes.func,
  getSize: PropTypes.func,
  copyableTypes: PropTypes.arrayOf(PropTypes.string),
};

export default memo(FlatTree);
