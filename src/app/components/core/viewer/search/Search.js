import PropTypes from 'prop-types';
import React from 'react';

import * as styles from './Search.module.css';
import Input from '../../input/Input';
import RadioGroup from '../../radio-group/RadioGroup';
import Checkbox from '../../checkbox/Checkbox';
import Button, { Variant, Size } from '../../button/Button';
import Tooltip, { Position } from '../../tooltip/Tooltip';
import SearchIcon from '../../../../icons/SearchIcon';

const searchTypeOptions = [
  { value: 'keys', label: 'Keys' },
  { value: 'values', label: 'Values' },
  { value: 'both', label: 'Keys & Values' },
];

const Search = React.memo(
  ({
    searchTerm,
    onSearchChange,
    totalResults,
    onSearchTypeChange,
    searchType = 'both',
    keepExpanded = false,
    onKeepExpandedChange,
  }) => {
    const [isFocused, setIsFocused] = React.useState(false);

    const handleClear = React.useCallback(() => {
      onSearchChange('');
    }, [onSearchChange]);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);

    const searchIcon = (
      <span className={styles.icon} aria-hidden="true">
        <SearchIcon />
      </span>
    );

    const controls = searchTerm && (
      <div className={styles.controls}>
        <div className={styles.resultCount}>
          <span>
            {totalResults} result{totalResults === 1 ? '' : 's'} found
          </span>
        </div>
        <RadioGroup options={searchTypeOptions} value={searchType} onChange={onSearchTypeChange} />
        <div style={{ display: 'none' }}>
          <Checkbox label="Keep expanded" checked={keepExpanded} onChange={onKeepExpandedChange} />
        </div>
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
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search keys and values..."
          contentLeft={searchIcon}
          contentRight={controls}
          isFocused={isFocused || !!searchTerm}
        />
      </div>
    );
  }
);

Search.propTypes = {
  searchTerm: PropTypes.string,
  onSearchChange: PropTypes.func.isRequired,
  totalResults: PropTypes.number,
  onSearchTypeChange: PropTypes.func,
  searchType: PropTypes.oneOf(['keys', 'values', 'both']),
  keepExpanded: PropTypes.bool,
  onKeepExpandedChange: PropTypes.func,
};

Search.displayName = 'Search';

export default Search;
