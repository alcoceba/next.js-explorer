import browser from "webextension-polyfill";
import { DEFAULT_SIZE, ROUTER } from "../helpers/const";
import { setContext } from "../helpers/context";
import { getObjSize } from "../helpers/object";
import { getCurrentTab } from "../helpers/tabs";
import { decode } from "../helpers/utils";

let nextModel = null;

const getIcon = (size, isAppRouter) => {
  if (isAppRouter) return "app";
  return size > DEFAULT_SIZE ? "ko" : "ok";
};

const getRawData = async () => {
  const currentTab = await getCurrentTab();

  const handleScript = () => {
    try {
      const getReactVersion = () => {
        if (window?.React?.version) return window.React.version;
        if (!window?.__REACT_DEVTOOLS_GLOBAL_HOOK__) return null;
        return window.__REACT_DEVTOOLS_GLOBAL_HOOK__?.renderers?.get(1)?.version;
      }

      return {
        appRawData: window?.__next_f,
        pagesRawData: document.getElementById("__NEXT_DATA__")?.textContent,
        isAppRouter: !!window?.__next_f,
        reactVersion: getReactVersion(),
        nextVersion: window?.next?.version,
      };
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      return null;
    }
  };

  try {
    const [results] = await browser.scripting.executeScript({
      target: { tabId: currentTab?.id || 0 },
      func: handleScript,
      args: [],
      world: 'MAIN',
    });
    return results?.result;
    // eslint-disable-next-line no-unused-vars  
  } catch (e) {
    return null;
  }
};

const parseData = (data) => {
  const model = data && {
    data: {
      next: {
        router: data?.isAppRouter ? ROUTER.App : ROUTER.Pages,
        isAppRouter: !!data?.isAppRouter,
        data: decode({
          appRawData: data?.appRawData,
          pagesRawData: data?.pagesRawData,
        }),
        v: data?.nextVersion,
      },
      react: {
        v: data?.reactVersion,
      },
    }
  };

  nextModel = model;
}

const sendMessageToContent = async (action, data) => {
  const tab = await getCurrentTab();

  if (tab.id) {
    try {
      await browser.tabs.sendMessage(tab.id, {
        to: "content",
        action,
        data,
      });
      // eslint-disable-next-line no-unused-vars,no-empty
    } catch (e) {

    }
  }
}

const updateExtensionIcon = async () => {
  if (nextModel?.data?.next?.data) {
    const tab = await getCurrentTab();
    const size = getObjSize(nextModel?.data?.next?.data) || 0;
    const icon = getIcon(size, nextModel?.data?.next?.isAppRouter);

    try {
      browser.action.setIcon({
        path: {
          16: `./public/images/icon-${icon}-16.png`,
          32: `./public/images/icon-${icon}-32.png`,
          48: `./public/images/icon-${icon}-48.png`,
          128: `./public/images/icon-${icon}-128.png`,
        },
        tabId: tab.id,
      });
      // eslint-disable-next-line no-unused-vars,no-empty
    } catch (e) {

    }

  }
};

const handleOnIconClick = async () => {
  if (nextModel?.data?.next?.data) {
    try {
      const tab = await getCurrentTab();
      await setContext({ [tab?.id]: nextModel?.data });
      browser.tabs.create({ url: `index.html?id=${tab?.id}` });
      // eslint-disable-next-line no-unused-vars
    } catch (e) {
      sendMessageToContent("show-message", "no-next");
    }
  } else {
    sendMessageToContent("show-message", "no-next");
  }
};

const handleOnTabUpdated = async () => {
  const raw = await getRawData();
  parseData(raw);
  updateExtensionIcon();
};

const init = () => {
  try {
    browser.tabs.onUpdated.addListener(handleOnTabUpdated);
    browser.tabs.onActivated.addListener(handleOnTabUpdated);
    browser.action.onClicked.addListener(handleOnIconClick);
    // eslint-disable-next-line no-unused-vars,no-empty
  } catch (e) {
  }
};

init();