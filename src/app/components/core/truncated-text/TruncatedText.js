import React, { useState, memo } from 'react';
import PropTypes from 'prop-types';

import * as styles from './TruncatedText.module.css';

const TruncatedText = memo(({ text, maxLength = 35 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!text) return '-';

  const textStr = String(text);
  const isTruncated = textStr.length > maxLength;
  const displayText = isExpanded ? textStr : textStr.substring(0, maxLength);

  return (
    <span className={styles.container}>
      <span className={styles.text}>{displayText}</span>
      {isTruncated && (
        <>
          <span className={styles.ellipsis}>{isExpanded ? '' : '...'}</span>
          <button
            className={styles.toggleButton}
            onClick={() => setIsExpanded(!isExpanded)}
            title={isExpanded ? 'Show less' : 'Show more'}
          >
            {isExpanded ? 'show less' : 'show more'}
          </button>
        </>
      )}
    </span>
  );
});

TruncatedText.displayName = 'TruncatedText';

TruncatedText.propTypes = {
  text: PropTypes.any,
  maxLength: PropTypes.number,
};

export default TruncatedText;
