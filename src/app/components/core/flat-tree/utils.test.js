import { flattenJson, getAllPaths, getFirstLevelPaths } from './utils';

describe('FlatTree Utils', () => {
  const mockData = {
    name: 'John',
    age: 30,
    user: {
      email: 'john@example.com',
      profile: {
        bio: 'Developer',
      },
    },
  };

  describe('flattenJson', () => {
    it('should flatten simple object', () => {
      const result = flattenJson({ name: 'John' });
      expect(result.length).toBeGreaterThan(0);
      expect(result[0].key).toBe('name');
      expect(result[0].value).toBe('John');
    });

    it('should include line depth information', () => {
      const result = flattenJson({ nested: { value: 'test' } }, new Set(['nested']));
      expect(result.some((row) => row.depth === 0)).toBe(true);
      expect(result.some((row) => row.depth === 1)).toBe(true);
    });

    it('should mark expandable objects', () => {
      const result = flattenJson({ obj: { nested: 'value' } });
      const objRow = result.find((row) => row.key === 'obj');
      expect(objRow.expandable).toBe(true);
    });

    it('should mark non-expandable values', () => {
      const result = flattenJson({ name: 'John' });
      const nameRow = result.find((row) => row.key === 'name');
      expect(nameRow.expandable).toBe(false);
    });

    it('should include child count', () => {
      const result = flattenJson({ obj: { a: 1, b: 2, c: 3 } });
      const objRow = result.find((row) => row.key === 'obj');
      expect(objRow.childCount).toBe(3);
    });

    it('should expand paths when in expandedPaths set', () => {
      const expandedPaths = new Set(['user']);
      const result = flattenJson(mockData, expandedPaths);
      expect(result.some((row) => row.key === 'email')).toBe(true);
    });

    it('should not expand paths when not in expandedPaths set', () => {
      const result = flattenJson(mockData, new Set());
      expect(result.some((row) => row.key === 'email')).toBe(false);
    });

    it('should add closing bracket for expanded objects', () => {
      const result = flattenJson(mockData, new Set(['user']));
      expect(result.some((row) => row.isClosing && row.closingBracket === '}')).toBe(true);
    });

    it('should handle arrays', () => {
      const result = flattenJson(['item1', 'item2']);
      expect(result.some((row) => row.key === '0')).toBe(true);
      expect(result.some((row) => row.key === '1')).toBe(true);
    });

    it('should detect value types correctly', () => {
      const result = flattenJson({
        str: 'hello',
        num: 42,
        bool: true,
        null: null,
        arr: [],
        obj: {},
      });

      expect(result.find((r) => r.key === 'str').type).toBe('str');
      expect(result.find((r) => r.key === 'num').type).toBe('num');
      expect(result.find((r) => r.key === 'bool').type).toBe('bool');
      expect(result.find((r) => r.key === 'null').type).toBe('null');
      expect(result.find((r) => r.key === 'arr').type).toBe('array');
      expect(result.find((r) => r.key === 'obj').type).toBe('object');
    });

    it('should handle empty objects', () => {
      const result = flattenJson({});
      expect(result.length).toBe(0);
    });

    it('should handle deeply nested structures', () => {
      const result = flattenJson(mockData, new Set(['user', 'user.profile']));
      expect(result.some((row) => row.key === 'bio')).toBe(true);
    });
  });

  describe('getAllPaths', () => {
    it('should return all expandable paths', () => {
      const result = getAllPaths(mockData);
      expect(result.has('user')).toBe(true);
      expect(result.has('user.profile')).toBe(true);
    });

    it('should not include non-expandable paths', () => {
      const result = getAllPaths(mockData);
      expect(result.has('name')).toBe(false);
      expect(result.has('age')).toBe(false);
    });

    it('should return empty set for empty object', () => {
      const result = getAllPaths({});
      expect(result.size).toBe(0);
    });

    it('should return empty set for null', () => {
      const result = getAllPaths(null);
      expect(result.size).toBe(0);
    });

    it('should handle arrays', () => {
      const data = [{ nested: { value: 'test' } }];
      const result = getAllPaths(data);
      expect(result.has('0')).toBe(true);
      expect(result.has('0.nested')).toBe(true);
    });

    it('should handle mixed nested structures', () => {
      const data = {
        users: [
          { name: 'John', profile: { bio: 'Dev' } },
          { name: 'Jane', profile: { bio: 'Designer' } },
        ],
      };
      const result = getAllPaths(data);
      expect(result.has('users')).toBe(true);
      expect(result.has('users.0')).toBe(true);
      expect(result.has('users.0.profile')).toBe(true);
    });
  });

  describe('getFirstLevelPaths', () => {
    it('should return only first level expandable paths', () => {
      const result = getFirstLevelPaths(mockData);
      expect(result.has('user')).toBe(true);
      expect(result.has('user.profile')).not.toBe(true);
    });

    it('should not include non-expandable first level paths', () => {
      const result = getFirstLevelPaths(mockData);
      expect(result.has('name')).toBe(false);
      expect(result.has('age')).toBe(false);
    });

    it('should return empty set for empty object', () => {
      const result = getFirstLevelPaths({});
      expect(result.size).toBe(0);
    });

    it('should return empty set for null', () => {
      const result = getFirstLevelPaths(null);
      expect(result.size).toBe(0);
    });

    it('should handle arrays', () => {
      const data = [{ nested: { value: 'test' } }];
      const result = getFirstLevelPaths(data);
      expect(result.has('0')).toBe(true);
      expect(result.has('0.nested')).not.toBe(true);
    });

    it('should handle single level objects', () => {
      const data = { name: 'John', age: 30 };
      const result = getFirstLevelPaths(data);
      expect(result.size).toBe(0);
    });

    it('should handle multiple first level expandable objects', () => {
      const data = {
        user: { name: 'John' },
        settings: { theme: 'dark' },
        data: { items: [] },
      };
      const result = getFirstLevelPaths(data);
      expect(result.size).toBe(3);
      expect(result.has('user')).toBe(true);
      expect(result.has('settings')).toBe(true);
      expect(result.has('data')).toBe(true);
    });
  });
});
