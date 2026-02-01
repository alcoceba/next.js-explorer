import { copyToClipboard } from './copy';

globalThis.navigator = {};
globalThis.navigator.clipboard = {
  writeText: jest.fn(() => Promise.resolve()),
};

describe('copy util', () => {
  it('copyToClipboard is a function', () => {
    expect(typeof copyToClipboard).toBe('function');
  });

  it('copyToClipboard resolves true on success', async () => {
    const result = await copyToClipboard('test');
    expect(result).toBe(true);
  });

  it('copyToClipboard resolves false on error', async () => {
    globalThis.navigator.clipboard.writeText = jest.fn(() => Promise.reject(new Error('fail')));
    const result = await copyToClipboard('test');
    expect(result).toBe(false);
  });
});
