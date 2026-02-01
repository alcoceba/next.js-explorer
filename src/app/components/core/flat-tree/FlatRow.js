import PropTypes from 'prop-types';
import React, { memo, useCallback, useMemo } from 'react';
import { classNames } from '../../../utils/classNames';
import CopyIcon from '../../../icons/CopyIcon';
import HighlightedText from '../highlighted-text';

import * as styles from './FlatRow.module.css';

const formatValue = (value, type) => {
  switch (type) {
    case 'num':
    case 'bigint':
      return String(value);
    case 'str':
    case 'symbol':
      return `"${value.length ? value : ''}"`;
    case 'bool':
      return value ? 'true' : 'false';
    case 'null':
      return 'null';
    case 'array':
      return '[]';
    case 'object':
      return '{}';
    default:
      return '';
  }
};

const defaultFormatSize = (size) =>
  size < 1000 ? `${size} bytes` : `${(size / 1000).toFixed(1)} Kb`;

// Memoized closing bracket row - very simple, rarely changes
const ClosingRow = memo(function ClosingRow({ lineNumber, depth, closingBracket }) {
  const guides = useMemo(
    () => Array.from({ length: depth }, (_, i) => <span key={i} className={styles.guide} />),
    [depth]
  );
  return (
    <div className={styles.row}>
      <span className={styles.lineNumber}>{lineNumber}</span>
      <span className={styles.content}>
        {guides}
        <span className={classNames(styles.value, styles.closing)}>{closingBracket}</span>
      </span>
    </div>
  );
});

ClosingRow.propTypes = {
  lineNumber: PropTypes.number.isRequired,
  depth: PropTypes.number.isRequired,
  closingBracket: PropTypes.string.isRequired,
};

function FlatRow({
  lineNumber,
  row,
  onToggle,
  onCopy,
  search = '',
  searchType = 'both',
  showSizes = false,
  getSizeColor,
  formatSize = defaultFormatSize,
  getSize,
  copyableTypes = ['str'],
}) {
  const {
    path,
    key,
    value,
    depth,
    type,
    expandable,
    childCount,
    isExpanded,
    isClosing,
    closingBracket,
  } = row;

  // Early return for closing brackets - use simpler component
  if (isClosing) {
    return <ClosingRow lineNumber={lineNumber} depth={depth} closingBracket={closingBracket} />;
  }

  // Memoize computed values
  const shouldHighlightKey = useMemo(
    () => search && (searchType === 'both' || searchType === 'keys'),
    [search, searchType]
  );
  const shouldHighlightValue = useMemo(
    () => search && (searchType === 'both' || searchType === 'values'),
    [search, searchType]
  );

  // Memoize size calculation - expensive for large objects
  const sizeInfo = useMemo(() => {
    if (!expandable || !showSizes || !getSize) return null;
    const size = getSize(value);
    if (!size) return null;
    const sizeText = formatSize(size);
    const sizeColor = getSizeColor ? getSizeColor(size) : '';
    return { size, sizeText, sizeColor, childCount };
  }, [expandable, showSizes, getSize, value, formatSize, getSizeColor, childCount]);

  // Memoize formatted value
  const formattedValue = useMemo(() => {
    if (expandable) {
      const bracket = type === 'array' ? '[' : '{';
      return isExpanded ? bracket : `${bracket}${childCount}${type === 'array' ? ']' : '}'}`;
    }
    return formatValue(value, type);
  }, [expandable, type, isExpanded, childCount, value]);

  // Stable callback references
  const handleClick = useCallback(() => {
    if (expandable && onToggle) {
      onToggle(path);
    }
  }, [expandable, onToggle, path]);

  const handleDoubleClick = useCallback(
    (e) => {
      if (!expandable && onCopy) {
        e.preventDefault();
        e.stopPropagation();
        onCopy({ value });
      }
    },
    [expandable, value, onCopy]
  );

  const handleCopyClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      onCopy?.({ value });
    },
    [value, onCopy]
  );

  // Memoize styles
  const valueClassName = useMemo(
    () => (expandable ? styles.expandable : styles[type] || ''),
    [expandable, type]
  );
  const keyClassName = useMemo(
    () => classNames(styles.key, expandable ? styles.keyExpandable : styles.keyNonExpandable),
    [expandable]
  );
  const rowClassName = useMemo(
    () => classNames(styles.row, expandable && styles.clickable),
    [expandable]
  );
  const arrowClassName = useMemo(
    () => classNames(styles.arrow, isExpanded && styles.expanded),
    [isExpanded]
  );

  // Create indentation guides
  const guides = useMemo(
    () => Array.from({ length: depth }, (_, i) => <span key={i} className={styles.guide} />),
    [depth]
  );

  const isCopyable = copyableTypes.includes(type) && onCopy;

  return (
    <div className={rowClassName} onClick={handleClick} onDoubleClick={handleDoubleClick}>
      <span className={styles.lineNumber}>{lineNumber}</span>
      <span className={styles.content}>
        {guides}
        {expandable && <span className={arrowClassName}>▶</span>}
        <span className={keyClassName}>
          <HighlightedText text={key} search={shouldHighlightKey ? search : ''} />
        </span>
        <span className={styles.colon}>:</span>
        <span className={classNames(styles.value, valueClassName)}>
          <HighlightedText text={formattedValue} search={shouldHighlightValue ? search : ''} />
        </span>
        {sizeInfo && (
          <span className={styles.sizeInfo}>
            {sizeInfo.childCount} keys /{' '}
            <span className={sizeInfo.sizeColor}>{sizeInfo.sizeText}</span>
          </span>
        )}
        {isCopyable && (
          <button className={styles.copy} onClick={handleCopyClick} aria-label="Copy value">
            <CopyIcon width="12" height="12" className={styles.copyIcon} />
            <span>copy</span>
          </button>
        )}
      </span>
    </div>
  );
}

FlatRow.propTypes = {
  lineNumber: PropTypes.number.isRequired,
  row: PropTypes.shape({
    path: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
    value: PropTypes.any,
    depth: PropTypes.number.isRequired,
    type: PropTypes.string.isRequired,
    expandable: PropTypes.bool.isRequired,
    childCount: PropTypes.number.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    isClosing: PropTypes.bool,
    closingBracket: PropTypes.string,
  }).isRequired,
  onToggle: PropTypes.func,
  onCopy: PropTypes.func,
  search: PropTypes.string,
  searchType: PropTypes.oneOf(['keys', 'values', 'both']),
  showSizes: PropTypes.bool,
  getSizeColor: PropTypes.func,
  formatSize: PropTypes.func,
  getSize: PropTypes.func,
  copyableTypes: PropTypes.arrayOf(PropTypes.string),
};

// Custom comparison for memo - only re-render when relevant props change
const areEqual = (prevProps, nextProps) => {
  // Always re-render if row data changed
  if (prevProps.row !== nextProps.row) return false;
  if (prevProps.lineNumber !== nextProps.lineNumber) return false;

  // Search-related changes
  if (prevProps.search !== nextProps.search) return false;
  if (prevProps.searchType !== nextProps.searchType) return false;

  // Size display changes
  if (prevProps.showSizes !== nextProps.showSizes) return false;

  // Callbacks are stable if memoized in parent
  return true;
};

export default memo(FlatRow, areEqual);
