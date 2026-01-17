import PropTypes from 'prop-types';
import React, { useMemo, memo } from 'react';
import { classNames } from '../../../../utils/classNames';
import { isObjectAndNotEmpty } from '../../../../utils/object';
import Key from '../key/Key';
import Value from '../value/Value';

import * as styles from './Tree.module.css';

const matchesSearch = (key, value, search) => {
  if (!search) return true;
  const keyStr = String(key).toLowerCase();
  const valueStr = String(value).toLowerCase();
  return keyStr.includes(search) || valueStr.includes(search);
};

const hasMatchingDescendants = (value, search) => {
  if (!search || !isObjectAndNotEmpty(value)) return false;
  return Object.entries(value).some(([k, v]) => {
    if (matchesSearch(k, v, search)) return true;
    return hasMatchingDescendants(v, search);
  });
};

function Tree({ data, isRoot, onCopy, search = '' }) {
  const entries = useMemo(() => Object.keys(data), [data]);
  const className = useMemo(() => classNames(styles.wrapper, isRoot && styles.root), [isRoot]);

  const nodes = useMemo(
    () =>
      entries
        .map((key) => {
          const value = data[key];
          const directMatch = matchesSearch(key, value, search);
          const hasChildren = isObjectAndNotEmpty(value);
          const descendantMatch = hasChildren && hasMatchingDescendants(value, search);
          const matches = directMatch || descendantMatch;

          if (!hasChildren) {
            return matches ? (
              <Value key={key} index={key} value={value} onCopy={onCopy} highlight={search} />
            ) : null;
          }

          return matches ? (
            <Key key={key} index={key} tree={value} highlight={search} matches={directMatch}>
              <Tree data={value} onCopy={onCopy} search={directMatch ? '' : search} />
            </Key>
          ) : null;
        })
        .filter(Boolean),
    [entries, data, onCopy, search]
  );

  return (
    <ul className={className} role="tree">
      {nodes}
    </ul>
  );
}

Tree.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isRoot: PropTypes.bool,
  onCopy: PropTypes.func,
  search: PropTypes.string,
};

export default memo(Tree);
