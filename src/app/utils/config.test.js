jest.mock('webextension-polyfill', () => ({
  storage: {
    local: {
      get: jest.fn(() => Promise.resolve({})),
      set: jest.fn(() => Promise.resolve()),
    },
  },
}));

import * as config from './config';

describe('config utils', () => {
  it('getTheme returns a Promise', () => {
    expect(config.getTheme()).toBeInstanceOf(Promise);
  });
  it('setTheme returns a Promise', () => {
    expect(config.setTheme('dark')).toBeInstanceOf(Promise);
  });
  it('getShowSizes returns a Promise', () => {
    expect(config.getShowSizes()).toBeInstanceOf(Promise);
  });
  it('setShowSizes returns a Promise', () => {
    expect(config.setShowSizes(true)).toBeInstanceOf(Promise);
  });
});
