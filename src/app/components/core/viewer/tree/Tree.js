import PropTypes from 'prop-types';
import React, { useMemo, memo } from 'react';
import { classNames } from '../../../../utils/classNames';
import { isObjectAndNotEmpty } from '../../../../utils/object';
import Key from '../key/Key';
import Value from '../value/Value';

import * as styles from './Tree.module.css';

const matchesSearch = (key, value, search, searchType = 'both') => {
  if (!search) return true;
  const keyStr = String(key).toLowerCase();
  const valueStr = String(value).toLowerCase();

  if (searchType === 'keys') {
    return keyStr.includes(search);
  } else if (searchType === 'values') {
    return valueStr.includes(search);
  } else {
    return keyStr.includes(search) || valueStr.includes(search);
  }
};

const hasMatchingDescendants = (value, search, searchType = 'both') => {
  if (!search || !isObjectAndNotEmpty(value)) return false;
  return Object.entries(value).some(([k, v]) => {
    if (matchesSearch(k, v, search, searchType)) return true;
    return hasMatchingDescendants(v, search, searchType);
  });
};

function Tree({ data, isRoot, onCopy, search = '', searchType = 'both', keepExpanded = false }) {
  const entries = useMemo(() => Object.keys(data), [data]);
  const className = useMemo(() => classNames(styles.wrapper, isRoot && styles.root), [isRoot]);

  const nodes = useMemo(
    () =>
      entries
        .map((key) => {
          const value = data[key];
          const directMatch = matchesSearch(key, value, search, searchType);
          const hasChildren = isObjectAndNotEmpty(value);
          const descendantMatch = hasChildren && hasMatchingDescendants(value, search, searchType);
          const matches = directMatch || descendantMatch;
          const shouldShow = keepExpanded && search ? true : matches;

          if (!hasChildren) {
            return shouldShow ? (
              <Value
                key={key}
                index={key}
                value={value}
                onCopy={onCopy}
                highlight={search}
                searchType={searchType}
              />
            ) : null;
          }

          return shouldShow ? (
            <Key
              key={key}
              index={key}
              tree={value}
              highlight={search}
              matches={directMatch}
              searchType={searchType}
              keepExpanded={keepExpanded && search ? true : false}
            >
              <Tree
                data={value}
                onCopy={onCopy}
                search={keepExpanded && search ? '' : directMatch ? '' : search}
                searchType={searchType}
                keepExpanded={keepExpanded}
              />
            </Key>
          ) : null;
        })
        .filter(Boolean),
    [entries, data, onCopy, search, searchType, keepExpanded]
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
  searchType: PropTypes.oneOf(['keys', 'values', 'both']),
  keepExpanded: PropTypes.bool,
};

export default memo(Tree);
