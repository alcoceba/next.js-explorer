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
      .reduce((p, n) => {
        const isValid = 1
        return isValid ? [...p, n[1]] : p;
      }, [])
      .filter(Boolean)
      .join("");

    const matches = raw.match(/\[[^\[\]]*\]/g);

    const totals = matches
      ?.filter(Boolean)
      .map(match => {
        try {
          return JSON.parse(match)
        } catch (e) {
          return null;
        }
      });

    return totals.filter((f) => !!f && f?.length)
  };

  return null;
};
