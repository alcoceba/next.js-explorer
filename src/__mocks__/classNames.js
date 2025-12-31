/* eslint-disable no-undef */
module.exports = {
  classNames: jest.fn((...args) => {
    return args
      .filter((arg) => {
        if (typeof arg === 'string') return !!arg;
        if (typeof arg === 'object') {
          return Object.keys(arg).some((key) => arg[key]);
        }
        return false;
      })
      .flatMap((arg) => {
        if (typeof arg === 'string') return arg;
        if (typeof arg === 'object') {
          return Object.keys(arg).filter((key) => arg[key]);
        }
        return [];
      })
      .join(' ');
  }),
};
