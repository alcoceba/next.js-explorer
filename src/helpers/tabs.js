import browser from "webextension-polyfill";

export async function getCurrentTab() {
  const list = await browser.tabs.query({ active: true, currentWindow: true });
  return list[0];
}
