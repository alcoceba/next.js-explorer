import browser from "webextension-polyfill";
import { DEFAULT_SIZE } from "../helpers/const";
import { setContext } from "../helpers/context";
import { getObjSize } from "../helpers/object";
import { getCurrentTab } from "../helpers/tabs";

const getIcon = (size, isAppRouter) => {
  if (isAppRouter) return "app";
  return size > DEFAULT_SIZE ? "ko" : "ok";
};

async function sendMessageToContent(action, data) {
  const tab = await getCurrentTab();
  browser.tabs.sendMessage(tab.id, {
    to: "content",
    action,
    data,
  });
}

const handleOnDomLoaded = async (data) => {
  console.log(data);
  if (data?.next?.data || data?.next?.isAppRouter) {
    const size = getObjSize(data?.next?.data) || 0;
    const tab = await getCurrentTab();
    const icon = getIcon(size, data?.next?.isAppRouter);
    browser.action.setIcon({
      path: {
        16: `./public/images/icon-${icon}-16.png`,
        32: `./public/images/icon-${icon}-32.png`,
        48: `./public/images/icon-${icon}-48.png`,
        128: `./public/images/icon-${icon}-128.png`,
      },
      tabId: tab.id,
    });
  }
};

const handleOnGetData = async (data) => {
  if (data?.next?.data || data?.next?.isAppRouter) {
    const tab = await getCurrentTab();
    await setContext({ [tab?.id]: data });
    browser.tabs.create({ url: `index.html?id=${tab?.id}` });
  } else {
    sendMessageToContent("show-message", "no-next");
  }
};

const handleOnIconClick = async () => {
  sendMessageToContent("get-data");
};

const handleOnMessage = (message) => {
  if (message?.to === "background") {
    switch (message?.action) {
      case "init":
        handleOnDomLoaded(message?.data);
        break;
      case "data":
        handleOnGetData(message?.data);
        break;
      default:
        throw new Error("Invalid action");
    }
  }
};

export async function init() {
  // await browser.storage.local.clear();
  browser.runtime.onMessage.addListener(handleOnMessage);
  browser.action.onClicked.addListener(handleOnIconClick);
}

browser.runtime.onInstalled.addListener(() => {
  init().then(() => {
    /* content loaded */
  });
});
