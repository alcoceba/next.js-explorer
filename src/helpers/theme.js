import browser from "webextension-polyfill";

export const getTheme = async () => browser.storage.local.get("theme");
export const setTheme = async (theme) => browser.storage.local.set({ theme });
