import React from 'react';
import PropTypes from 'prop-types';

import * as styles from './PageInfo.module.css';
import { DEFAULT_SIZE } from '../../helpers/constants';

function PageInfo({ size, keys, page, query, assetPrefix }) {
  return (
    <table className={styles.info}>
      <tbody>
        <tr>
          <th align="left">Size</th>
          <td>
            {size && size > DEFAULT_SIZE ? '🔴' : '🟢'} {size / 1000} Kb / {keys} keys
          </td>
        </tr>
        <tr>
          <th align="left">Page</th>
          <td>{page}</td>
        </tr>
        <tr>
          <th align="left">Query</th>
          <td>{query && JSON.stringify(query)}</td>
        </tr>
        <tr>
          <th align="left">Assets</th>
          <td>{assetPrefix}</td>
        </tr>
      </tbody>
    </table>
  );
}

PageInfo.propTypes = {
  size: PropTypes.number,
  keys: PropTypes.number,
  page: PropTypes.string,
  query: PropTypes.object,
  assetPrefix: PropTypes.string,
};

export default PageInfo;
