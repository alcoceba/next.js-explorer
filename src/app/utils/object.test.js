import { getObjSize, getObjKeysCount, isObjectAndNotEmpty, exportJson } from './object';

describe('object utils', () => {
  beforeAll(() => {
    globalThis.URL.createObjectURL = jest.fn(() => 'blob:url');
  });
  it('getObjSize returns a number', () => {
    expect(typeof getObjSize({ a: 1 })).toBe('number');
  });
  it('getObjKeysCount returns a number', () => {
    expect(typeof getObjKeysCount({ a: 1, b: 2 })).toBe('number');
  });
  it('isObjectAndNotEmpty returns true for non-empty object', () => {
    expect(isObjectAndNotEmpty({ a: 1 })).toBe(true);
  });
  it('exportJson does not throw', () => {
    expect(() => exportJson({ a: 1 })).not.toThrow();
  });
});
