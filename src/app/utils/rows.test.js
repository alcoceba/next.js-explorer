import { getRowsInfo } from './rows';

describe('getRowsInfo', () => {
  it('returns array for object', () => {
    expect(Array.isArray(getRowsInfo({ a: 1 }))).toBe(true);
  });
});
