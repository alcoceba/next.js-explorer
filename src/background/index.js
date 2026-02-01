import browser from 'webextension-polyfill';
import { DEFAULT_SIZE, ROUTER } from '../helpers/constants';
import { getObjSize } from './utils/getObjSize';
import { getCurrentTab } from './utils/tabs';
import decode from './utils/decode';
import { setContext } from '../app/utils/context';

let nextModel = null;

const getIcon = (size, isAppRouter) => {
  if (isAppRouter) return 'app';
  return size > DEFAULT_SIZE ? 'ko' : 'ok';
};

const getRawData = async () => {
  const currentTab = await getCurrentTab();

  const handleScript = () => {
    try {
      const getReactVersion = () => {
        if (window?.React?.version) return window.React.version;
        if (!window?.__REACT_DEVTOOLS_GLOBAL_HOOK__) return null;
        return window.__REACT_DEVTOOLS_GLOBAL_HOOK__?.renderers?.get(1)?.version;
      };

      // Try to get data from window.__next_f first (Next.js 15 and earlier)
      let appRawData = window?.__next_f;

      // If __next_f is empty or undefined, extract from script tags (Next.js 16+)
      // In Next.js 16, the data is pushed via script tags but may be consumed/cleared
      if (!appRawData || appRawData.length === 0) {
        const scriptTags = document.querySelectorAll('script');
        const flightData = [];

        for (const script of scriptTags) {
          const content = script.textContent || '';
          const pushMatches = content.matchAll(/self\.__next_f\.push\(\s*(\[[\s\S]*?\])\s*\)/g);

          for (const match of pushMatches) {
            try {
              const parsed = JSON.parse(match[1]);
              flightData.push(parsed);
            } catch {
              try {
                const arrayContent = match[1];
                const parsed = new Function('return ' + arrayContent)();
                if (Array.isArray(parsed)) {
                  flightData.push(parsed);
                }
              } catch {
                // Skip malformed entries
              }
            }
          }
        }

        if (flightData.length > 0) {
          appRawData = flightData;
        }
      }

      const isAppRouter = !!(
        appRawData?.length > 0 ||
        document.querySelector('script[data-next-rsc-inline]') ||
        window?.__next_f
      );

      return {
        appRawData: appRawData,
        pagesRawData: document.getElementById('__NEXT_DATA__')?.textContent,
        isAppRouter: isAppRouter,
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
    },
  };

  nextModel = model;
};

const sendMessageToContent = async (action, data) => {
  const tab = await getCurrentTab();

  if (tab.id) {
    try {
      await browser.tabs.sendMessage(tab.id, {
        to: 'content',
        action,
        data,
      });
      // eslint-disable-next-line no-unused-vars,no-empty
    } catch (e) {}
  }
};

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
    } catch (e) {}
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
      sendMessageToContent('show-message', 'no-next');
    }
  } else {
    sendMessageToContent('show-message', 'no-next');
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
  } catch (e) {}
};

init();
