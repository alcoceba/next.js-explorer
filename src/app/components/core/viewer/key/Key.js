import React, { useState, useContext, useMemo, memo, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { classNames } from '../../../../utils/classNames';
import { DEFAULT_SIZE } from '../../../../../helpers/constants';
import { getObjSize } from '../../../../utils/object';
import { Context } from '../../../../context/context';

import * as styles from './Key.module.css';

const getSizeColor = (size) => {
  if (size > DEFAULT_SIZE) return styles.critical;
  if (size > DEFAULT_SIZE * 0.5) return styles.alert;
  if (size > DEFAULT_SIZE * 0.2) return styles.warn;
  return '';
};

const formatSize = (size) => (size < 1000 ? `${size} bytes` : `${(size / 1000).toFixed(1)} Kb`);

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

const SizeInfo = memo(({ size, length }) => {
  const color = useMemo(() => getSizeColor(size), [size]);
  const text = useMemo(() => formatSize(size), [size]);
  return (
    <span className={styles.info}>
      {length} keys / <span className={color}>{text}</span>
    </span>
  );
});
SizeInfo.displayName = 'SizeInfo';

SizeInfo.propTypes = {
  size: PropTypes.number,
  length: PropTypes.number,
};

function Key({ index, tree, children, highlight = '', matches = true }) {
  const [isHidden, setIsHidden] = useState(false);
  const contextValue = useContext(Context);
  const { showSizes, isCollapsed } = useMemo(() => contextValue?.[0] || {}, [contextValue]);

  const { size, length, isArray } = useMemo(
    () => ({
      size: getObjSize(tree),
      length: Object.keys(tree)?.length,
      isArray: Array.isArray(tree),
    }),
    [tree]
  );

  const bracket = useMemo(() => (isArray ? '[' : '{'), [isArray]);
  const closeBracket = useMemo(() => (isArray ? ']' : '}'), [isArray]);
  const className = useMemo(
    () => classNames(styles.li, isHidden && styles.hidden),
    [isHidden, matches, highlight]
  );

  const handleToggle = useCallback((e) => {
    e.stopPropagation();
    setIsHidden((prev) => !prev);
  }, []);

  useEffect(() => {
    setIsHidden(isCollapsed);
  }, [isCollapsed]);

  // Auto-expand when search matches
  useEffect(() => {
    if (highlight && matches) {
      setIsHidden(false);
    }
  }, [highlight, matches]);

  return (
    <li onClick={handleToggle} className={className} role="treeitem" aria-expanded={!isHidden}>
      <span className={styles.collapsible} />
      <span>
        <HighlightedText text={index} search={highlight} />
      </span>
      <span className={styles.open}>{bracket}</span>
      {showSizes && <SizeInfo size={size} length={length} />}
      <div className={styles.tree} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
      <span className={styles.ellipsis}>...</span>
      <span className={styles.close}>{closeBracket}</span>
    </li>
  );
}

Key.propTypes = {
  index: PropTypes.string,
  tree: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  children: PropTypes.element,
  highlight: PropTypes.string,
  matches: PropTypes.bool,
};

export default memo(Key);
