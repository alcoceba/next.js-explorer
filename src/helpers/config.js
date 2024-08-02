import browser from "webextension-polyfill";

export const getTheme = async () => browser.storage.local.get("theme");
export const setTheme = async (theme) => browser.storage.local.set({ theme });

export const getShowSizes = async () => browser.storage.local.get("sizes");
export const setShowSizes = async (sizes) => browser.storage.local.set({ sizes });
