export const sanitize = (str) => {
  if (typeof str !== "string") return str;
  return str.replace(/<\/?[^>]+>/gi, "");
};

export const getReactVersion = () => {
  if (window?.React?.version) return window.React.version;
  if (!window?.__REACT_DEVTOOLS_GLOBAL_HOOK__) return null;
  return window.__REACT_DEVTOOLS_GLOBAL_HOOK__?.renderers?.get(1)?.version;
};

export const getNextData = () => {
  const data = JSON.parse(
    document.getElementById("__NEXT_DATA__")?.textContent || null
  );
  return data;
};

export const getNextVersion = () => window?.next?.version;
export const getNextRouter = () => !!window?.next?.appDir;
