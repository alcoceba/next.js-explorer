export const sanitize = (str) => {
  if (typeof str !== 'string') return str;
  return str.replace(/<\/?[^>]+>/gi, '');
};
