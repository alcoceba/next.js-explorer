import { DEFAULT_SIZE } from './constants';

export const getRowsInfo = (data) => {
  const { next, react, size, keys } = data;
  return [
    next?.v && {
      key: 'Next.js version',
      value: (next?.v && `v${next?.v}`) || '-',
      isVisible: false,
    },
    {
      key: 'React ⚛ version',
      value: (react?.v && `v${react?.v}`) || 'unkown version',
      isVisible: false,
    },
    {
      key: 'Total size',
      value: (size && `${size > DEFAULT_SIZE ? '🔴' : '🟢'} ${size / 1000} Kb`) || '-',
      isVisible: true,
    },
    {
      key: 'Total 🔑 keys',
      value: (keys && `${keys} keys`) || '-',
      isVisible: true,
    },
    {
      key: 'Assets prefix',
      value: next?.data?.assetPrefix || '-',
      isVisible: false,
    },
    { key: 'Page', value: next?.data?.page || '-', isVisible: false },
    {
      key: 'Query',
      value: (next?.data?.query && JSON.stringify(next.data.query)) || '-',
      isVisible: false,
    },
  ].filter((f) => f);
};
