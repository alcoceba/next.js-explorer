import { DEFAULT_SIZE, THEME, ROUTER } from './constants';

describe('constants', () => {
  it('DEFAULT_SIZE is a number', () => {
    expect(typeof DEFAULT_SIZE).toBe('number');
  });
  it('THEME is an object with Light/Dark', () => {
    expect(THEME).toHaveProperty('Light');
    expect(THEME).toHaveProperty('Dark');
  });
  it('ROUTER is an object with App/Pages', () => {
    expect(ROUTER).toHaveProperty('App');
    expect(ROUTER).toHaveProperty('Pages');
  });
});
