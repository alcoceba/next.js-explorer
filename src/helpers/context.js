import browser from "webextension-polyfill";

export const getContext = async (id) => {
  const { context } = await browser.storage.local.get("context");
  return context?.[id];
};

export const setContext = async (context) =>
  browser.storage.local.set({ context });
