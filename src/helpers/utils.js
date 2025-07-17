import parseFlightPushData from "./parseFlightData";

export const sanitize = (str) => {
  if (typeof str !== "string") return str;
  return str.replace(/<\/?[^>]+>/gi, "");
};

export const decode = ({ appRawData, pagesRawData }) => {
  if (pagesRawData) {
    return JSON.parse(pagesRawData) || null;
  }
  if (appRawData) {
    const flightRawData = [];

    for (const chunk of appRawData) {
      if (typeof chunk === 'string') {
        flightRawData.push(chunk);
      } else if (Array.isArray(chunk)) {
        for (const inner of chunk) {
          if (typeof inner === 'string') {
            flightRawData.push(inner);
          }
        }
      }
    }

    const flightString = flightRawData.join('\n');

    return parseFlightPushData(flightString);
  };

  return null;
};
