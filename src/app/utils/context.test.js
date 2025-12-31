jest.mock('webextension-polyfill', () => ({
  storage: {
    local: {
      get: jest.fn(() => Promise.resolve({ context: { id: 'value' } })),
      set: jest.fn(() => Promise.resolve()),
    },
  },
}));

import * as context from './context';

describe('context utils', () => {
  it('getContext returns a Promise', () => {
    expect(context.getContext('id')).toBeInstanceOf(Promise);
  });
  it('setContext returns a Promise', () => {
    expect(context.setContext({})).toBeInstanceOf(Promise);
  });
});
