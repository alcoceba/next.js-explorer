import PropTypes from 'prop-types';
import React, { memo, useMemo } from 'react';

function HighlightedText({ text, search }) {
  const result = useMemo(() => {
    if (!search || !text) return text;

    const textLower = text.toLowerCase();
    const searchLower = search.toLowerCase();

    const firstIndex = textLower.indexOf(searchLower);
    if (firstIndex === -1) return text;

    const parts = [];
    let lastIndex = 0;
    let index = firstIndex;
    const searchLen = search.length;
    let keyCounter = 0;

    while (index !== -1) {
      if (index > lastIndex) {
        parts.push(text.slice(lastIndex, index));
      }
      parts.push(<mark key={keyCounter++}>{text.slice(index, index + searchLen)}</mark>);
      lastIndex = index + searchLen;
      index = textLower.indexOf(searchLower, lastIndex);
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts;
  }, [text, search]);

  return result;
}

HighlightedText.displayName = 'HighlightedText';

HighlightedText.propTypes = {
  search: PropTypes.string,
  text: PropTypes.string,
};

export default memo(HighlightedText);
