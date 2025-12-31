import PropTypes from 'prop-types';
import React from 'react';
import { classNames } from '../../../../../helpers/classNames';
import { isObjectAndNotEmpty } from '../../../../../helpers/object';
import Key from '../key/Key';
import Value from '../value/Value';

import * as styles from './Tree.module.css';

function Tree({ data, isRoot, onCopy }) {
  return (
    <ul className={classNames(styles.wrapper, isRoot && styles.root)}>
      {Object.keys(data).map((key) => {
        if (!isObjectAndNotEmpty(data[key])) {
          return <Value key={key} index={key} value={data[key]} onCopy={onCopy} />;
        }

        return (
          <Key key={key} index={key} tree={data[key]}>
            <Tree data={data[key]} onCopy={onCopy} />
          </Key>
        );
      })}
    </ul>
  );
}

Tree.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  isRoot: PropTypes.bool,
  onCopy: PropTypes.func,
};

export default Tree;
