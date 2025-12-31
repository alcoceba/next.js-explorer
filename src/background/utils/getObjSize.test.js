import { getObjSize } from './getObjSize';

describe('getObjSize (background)', () => {
  it('returns a number for an object', () => {
    expect(typeof getObjSize({ a: 1 })).toBe('number');
  });
  it('returns null for null', () => {
    expect(getObjSize(null)).toBeNull();
  });
});
