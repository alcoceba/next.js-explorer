import browser from "webextension-polyfill";

export async function getCurrentTab() {
  try {
    const list = await browser.tabs.query({ active: true, currentWindow: true });
    return list[0];
    // eslint-disable-next-line no-unused-vars
  } catch (e) {
    return 0;
  }
}
