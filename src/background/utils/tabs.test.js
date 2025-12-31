import * as tabs from './tabs';

describe('tabs util', () => {
  it('should export at least one function', () => {
    expect(Object.keys(tabs).length).toBeGreaterThan(0);
  });
});
import { getCurrentTab } from './tabs';

jest.mock('webextension-polyfill', () => ({
  tabs: {
    query: jest.fn(),
  },
}));
import browser from 'webextension-polyfill';

describe('getCurrentTab', () => {
  it('returns the first tab when successful', async () => {
    browser.tabs.query.mockResolvedValue([{ id: 1, title: 'Tab1' }]);
    const tab = await getCurrentTab();
    expect(tab).toEqual({ id: 1, title: 'Tab1' });
    expect(browser.tabs.query).toHaveBeenCalledWith({ active: true, currentWindow: true });
  });

  it('returns 0 on error', async () => {
    browser.tabs.query.mockRejectedValue(new Error('fail'));
    const tab = await getCurrentTab();
    expect(tab).toBe(0);
  });
});
