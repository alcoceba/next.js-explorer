export const sanitize = (str) => {
  if (typeof str !== "string") return str;
  return str.replace(/<\/?[^>]+>/gi, "");
};

export const decode = ({ appRawData, pagesRawData }) => {
  if (pagesRawData) {
    return JSON.parse(pagesRawData) || null;
  }

  if (appRawData) {
    const raw = appRawData
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

  return null;
};

