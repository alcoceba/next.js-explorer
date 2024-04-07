import { ROUTER } from "./const";

export const sanitize = (str) => {
  if (typeof str !== "string") return str;
  return str.replace(/<\/?[^>]+>/gi, "");
};

export const getReactVersion = () => {
  if (window?.React?.version) return window.React.version;
  if (!window?.__REACT_DEVTOOLS_GLOBAL_HOOK__) return null;
  return window.__REACT_DEVTOOLS_GLOBAL_HOOK__?.renderers?.get(1)?.version;
};

export const decodeData = (router) => {
  if (router === ROUTER.Pages) {
    const data = JSON.parse(
      document.getElementById("__NEXT_DATA__")?.textContent || null
    );

    return data || null;
  }

  if (router === ROUTER.App) {
    if (window?.__next_f) {
      const raw = window.__next_f
        .reduce((p, n) => [...p, n[1]], [])
        .filter(Boolean)
        .join("");

      const appData = raw
        .replace(/^.*?\[|\][^\]]*$/g, "")
        .replace(/\n+[^[\n{]*/g, ",")
        .replace(/,,/g, ",")
        .replace(/\\\\/g, "/")
        .replace(/\/\//g, "/");

      try {
        return JSON.parse(`[[${appData}]]`);
      } catch (e) {
        return null;
      }
    }
  }

  return null;
};

export const getNextVersion = () => window?.next?.version;
export const isAppRouter = () => !!window?.next?.appDir;
