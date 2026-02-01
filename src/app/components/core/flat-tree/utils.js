/**
 * Utility functions for flattening JSON data into a flat tree structure
 */

const getValueType = (value) => {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  const type = typeof value;
  if (type === 'number' || type === 'bigint') return 'num';
  if (type === 'string' || type === 'symbol') return 'str';
  if (type === 'boolean') return 'bool';
  if (type === 'object') return 'object';
  return 'unknown';
};

const isExpandable = (value) => {
  if (value === null) return false;
  if (Array.isArray(value)) return value.length > 0;
  if (typeof value === 'object') return Object.keys(value).length > 0;
  return false;
};

const getChildCount = (value) => {
  if (value === null) return 0;
  if (Array.isArray(value)) return value.length;
  if (typeof value === 'object') return Object.keys(value).length;
  return 0;
};

/**
 * Flattens JSON data into an array of row objects
 * @param {object|array} data - The JSON data to flatten
 * @param {Set} expandedPaths - Set of paths that are expanded
 * @returns {Array} Array of row objects
 */
export function flattenJson(data, expandedPaths = new Set()) {
  const rows = [];

  const traverse = (obj, depth = 0, parentPath = '') => {
    if (!obj || typeof obj !== 'object') return;

    const entries = Array.isArray(obj) ? obj.map((v, i) => [i, v]) : Object.entries(obj);

    entries.forEach(([key, value]) => {
      const path = parentPath ? `${parentPath}.${key}` : String(key);
      const type = getValueType(value);
      const expandable = isExpandable(value);
      const childCount = getChildCount(value);
      const isExpanded = expandedPaths.has(path);

      rows.push({
        path,
        key: String(key),
        value,
        depth,
        type,
        expandable,
        childCount,
        isExpanded,
        isClosing: false,
      });

      if (expandable && isExpanded) {
        traverse(value, depth + 1, path);
        rows.push({
          path: `${path}.__closing`,
          key: '',
          value: null,
          depth,
          type: type === 'array' ? 'arrayClose' : 'objectClose',
          expandable: false,
          childCount: 0,
          isExpanded: false,
          isClosing: true,
          closingBracket: type === 'array' ? ']' : '}',
        });
      }
    });
  };

  traverse(data);
  return rows;
}

/**
 * Get all expandable paths from data
 * @param {object|array} data - The JSON data
 * @returns {Set} Set of all expandable paths
 */
export function getAllPaths(data) {
  const paths = new Set();

  const traverse = (obj, parentPath = '') => {
    if (!obj || typeof obj !== 'object') return;

    const entries = Array.isArray(obj) ? obj.map((v, i) => [i, v]) : Object.entries(obj);

    entries.forEach(([key, value]) => {
      const path = parentPath ? `${parentPath}.${key}` : String(key);
      if (isExpandable(value)) {
        paths.add(path);
        traverse(value, path);
      }
    });
  };

  traverse(data);
  return paths;
}

/**
 * Get first level paths only (for default collapsed state)
 * @param {object|array} data - The JSON data
 * @returns {Set} Set of first level expandable paths
 */
export function getFirstLevelPaths(data) {
  const paths = new Set();

  if (!data || typeof data !== 'object') return paths;

  const entries = Array.isArray(data) ? data.map((v, i) => [i, v]) : Object.entries(data);

  entries.forEach(([key, value]) => {
    if (isExpandable(value)) {
      paths.add(String(key));
    }
  });

  return paths;
}

/**
 * Find all paths in data that match the search term
 * @param {object|array} data - The JSON data
 * @param {string} search - Search term (lowercase)
 * @param {string} searchType - 'keys', 'values', or 'both'
 * @returns {Set} Set of all matching paths
 */
export function findMatchingPaths(data, search, searchType = 'both') {
  const matchingPaths = new Set();
  if (!search || !data) return matchingPaths;

  const searchLower = search.toLowerCase();
  const checkKeys = searchType === 'keys' || searchType === 'both';
  const checkValues = searchType === 'values' || searchType === 'both';

  const traverse = (obj, parentPath = '') => {
    if (!obj || typeof obj !== 'object') return;

    const entries = Array.isArray(obj) ? obj.map((v, i) => [i, v]) : Object.entries(obj);

    entries.forEach(([key, value]) => {
      const path = parentPath ? `${parentPath}.${key}` : String(key);
      const keyStr = String(key).toLowerCase();
      const valueStr = String(value).toLowerCase();

      let matches = false;
      if (checkKeys && keyStr.includes(searchLower)) {
        matches = true;
      }
      if (!matches && checkValues && valueStr.includes(searchLower)) {
        matches = true;
      }

      if (matches) {
        matchingPaths.add(path);
      }

      if (isExpandable(value)) {
        traverse(value, path);
      }
    });
  };

  traverse(data);
  return matchingPaths;
}
