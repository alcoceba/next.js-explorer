import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './Search.module.css';
import Input from '../input/Input';
import RadioGroup from '../radio-group/RadioGroup';
import Button, { Variant, Size } from '../button/Button';
import Tooltip, { Position } from '../tooltip/Tooltip';
import SearchIcon from '../../../icons/SearchIcon';
import Spinner from '../spinner';

const Search = React.memo(
  ({
    value,
    onChange,
    placeholder = 'Search...',
    totalResults,
    filterOptions,
    filterValue,
    onFilterChange,
    isSearching = false,
  }) => {
    const [isFocused, setIsFocused] = React.useState(false);
    const [isClearing, setIsClearing] = React.useState(false);

    const handleClear = React.useCallback(() => {
      setIsClearing(true);
      onChange('');
    }, [onChange]);

    React.useEffect(() => {
      if (isClearing && !value) {
        const timer = setTimeout(() => setIsClearing(false), 300);
        return () => clearTimeout(timer);
      }
    }, [isClearing, value]);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const showSpinner = isSearching || isClearing;
    const searchIcon = showSpinner ? (
      <span className={styles.icon} aria-hidden="true">
        <Spinner />
      </span>
    ) : (
      <span className={styles.icon} aria-hidden="true">
        <SearchIcon />
      </span>
    );

    const controls = value && (
      <div className={styles.controls}>
        {totalResults !== undefined && (
          <div className={styles.resultCount}>
            <span>
              {totalResults} result{totalResults === 1 ? '' : 's'} found
            </span>
          </div>
        )}
        {filterOptions && onFilterChange && (
          <RadioGroup options={filterOptions} value={filterValue} onChange={onFilterChange} />
        )}

        <Tooltip content="Clear search" position={Position.BOTTOM}>
          <Button
            onClick={handleClear}
            ariaLabel="Clear search"
            variant={Variant.ACCENT}
            size={Size.SMALL}
          >
            ✕
          </Button>
        </Tooltip>
      </div>
    );

    return (
      <div className={styles.container}>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          contentLeft={searchIcon}
          contentRight={controls}
          isFocused={isFocused || !!value}
        />
      </div>
    );
  }
);

Search.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  totalResults: PropTypes.number,
  filterOptions: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      tooltip: PropTypes.string,
    })
  ),
  filterValue: PropTypes.string,
  onFilterChange: PropTypes.func,
  isSearching: PropTypes.bool,
};

Search.displayName = 'Search';

export default Search;
