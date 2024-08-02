import browser from "webextension-polyfill";

export async function getCurrentTab() {
  try {
    const list = await browser.tabs.query({ active: true, currentWindow: true });
    return list[0];
  } catch (e) {
    return 0;
  }
}
