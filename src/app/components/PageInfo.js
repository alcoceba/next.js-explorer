import React from 'react';
import { Context } from '../context/context';
import * as styles from './PageInfo.module.css';
import { DEFAULT_SIZE } from '../../helpers/constants';

function PageInfo() {
  const [{ appData }] = React.useContext(Context);
  const size = appData.pageDataSize;
  const keys = appData.pageDataKeys;
  const page = appData.nextjsPagePath;
  const query = appData.nextjsPageQuery;
  const assetPrefix = appData.nextjsPageAssetPrefix;
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

export default PageInfo;
