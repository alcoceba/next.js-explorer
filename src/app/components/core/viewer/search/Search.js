import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './Search.module.css';
import { classNames } from '../../../../utils/classNames';

const Search = React.memo(({ searchTerm, onSearchChange, totalResults }) => {
  const [isFocused, setIsFocused] = React.useState(false);

  const handleClear = React.useCallback(() => {
    onSearchChange('');
  }, [onSearchChange]);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div
      className={classNames(styles.container, (searchTerm || isFocused) && styles.focused)}
      htmlFor="search-input"
    >
      <input
        id="search-input"
        type="text"
        placeholder="Search keys and values..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={styles.searchInput}
      />

      {searchTerm && (
        <span className={styles.resultCount}>
          {totalResults} result{totalResults === 1 ? '' : 's'} found
        </span>
      )}

      {searchTerm && (
        <button
          onClick={handleClear}
          className={styles.clearButton}
          title="Clear search"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
});

Search.propTypes = {
  searchTerm: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired,
  totalResults: PropTypes.number,
};

Search.displayName = 'Search';

export default Search;
