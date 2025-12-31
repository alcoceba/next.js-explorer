/* eslint-disable no-undef */
require('@testing-library/jest-dom');
const { TextEncoder } = require('util');

// Polyfill TextEncoder for jsdom
global.TextEncoder = TextEncoder;

// Suppress non-critical act() warnings in tests
// These warnings occur from async state updates in useEffect and don't indicate test failures
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (
      typeof args[0] === 'string' &&
      args[0].includes('An update to') &&
      args[0].includes('was not wrapped in act(...)')
    ) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});

// Mock webextension-polyfill
jest.mock('webextension-polyfill', () => ({
  browser: {
    tabs: {
      query: jest.fn(),
      sendMessage: jest.fn(),
    },
    extension: {
      getURL: jest.fn((path) => `chrome-extension://mock/${path}`),
    },
    runtime: {
      onMessage: {
        addListener: jest.fn(),
      },
      sendMessage: jest.fn(),
    },
  },
}));

// Mock chrome API for global access
global.chrome = {
  tabs: {
    query: jest.fn(),
    sendMessage: jest.fn(),
  },
  extension: {
    getURL: jest.fn((path) => `chrome-extension://mock/${path}`),
  },
  runtime: {
    onMessage: {
      addListener: jest.fn(),
    },
    sendMessage: jest.fn(),
  },
};
