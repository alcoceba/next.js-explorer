import React from 'react';
import PropTypes from 'prop-types';
import TruncatedText from './core/truncated-text/TruncatedText';

import * as styles from './PageInfo.module.css';

function PageInfo({ page, query, assetPrefix }) {
  return (
    <div className={styles.info}>
      <strong>Page</strong>: <TruncatedText text={page} />
      &nbsp;|&nbsp;
      <strong>Query</strong>: <TruncatedText text={query && JSON.stringify(query)} />
      &nbsp;|&nbsp;
      <strong>Assets prefix</strong>: <TruncatedText text={assetPrefix} />
    </div>
  );
}

PageInfo.propTypes = {
  page: PropTypes.string,
  query: PropTypes.object,
  assetPrefix: PropTypes.string,
};

export default PageInfo;
