import PropTypes from 'prop-types';
import React, { useMemo, memo, useCallback } from 'react';
import { sanitize } from '../../../../utils/sanitize';

import * as styles from './Value.module.css';

const getValueType = (value) => {
  const type = typeof value;
  if (type === 'number' || type === 'bigint') return 'num';
  if (type === 'string' || type === 'symbol') return 'str';
  if (type === 'boolean') return 'bool';
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  if (type === 'object') return 'object';
  return 'unknown';
};

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

const styleMap = {
  num: styles.num,
  str: styles.str,
  bool: styles.bool,
  null: styles.null,
};

const HighlightedText = memo(({ text, search }) => {
  if (!search) return text;
  const parts = text.split(new RegExp(`(${search})`, 'gi'));
  return parts.map((part, i) =>
    part.toLowerCase() === search.toLowerCase() ? <mark key={i}>{part}</mark> : part
  );
});

HighlightedText.displayName = 'HighlightedText';

HighlightedText.propTypes = {
  search: PropTypes.string,
  text: PropTypes.string,
};

function Value({ index, value, onCopy, highlight = '', searchType = 'both' }) {
  const sanitized = useMemo(() => sanitize(value), [value]);
  const type = useMemo(() => getValueType(sanitized), [sanitized]);
  const formatted = useMemo(() => formatValue(sanitized, type), [sanitized, type]);
  const className = useMemo(() => styleMap[type] || '', [type]);
  const shouldHighlight = useMemo(
    () => highlight && (searchType === 'both' || searchType === 'values'),
    [highlight, searchType]
  );

  const handleDoubleClick = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      onCopy?.({ value });
    },
    [value, onCopy]
  );

  return (
    <li onDoubleClick={handleDoubleClick}>
      <span className={styles.key}>
        <HighlightedText text={index} search={shouldHighlight ? highlight : ''} />:
      </span>
      <span className={className}>
        <HighlightedText text={formatted} search={shouldHighlight ? highlight : ''} />
      </span>
    </li>
  );
}

Value.propTypes = {
  index: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  value: PropTypes.any,
  onCopy: PropTypes.func,
  highlight: PropTypes.string,
  searchType: PropTypes.oneOf(['keys', 'values', 'both']),
};

export default memo(Value);
