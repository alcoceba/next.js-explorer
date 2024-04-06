import { DEFAULT_SIZE } from "./const";

export const getRowsInfo = ({ next, version, react, size, keys }) => {
  return [
    version && {
      key: "Next.js version",
      value: (version && `v${version}`) || "-",
      isVisible: false,
    },
    {
      key: "React ⚛ version",
      value: (react?.version && `v${react?.version}`) || "unkown version",
      isVisible: react?.version,
    },
    {
      key: "Total size",
      value:
        (size && `${size > DEFAULT_SIZE ? "🔴" : "🟢"} ${size / 1000} Kb`) ||
        "-",
      isVisible: true,
    },
    {
      key: "Total 🔑 keys",
      value: (keys && `${keys} keys`) || "-",
      isVisible: true,
    },
    {
      key: "Assets prefix",
      value: next?.assetPrefix || "-",
      isVisible: false,
    },
    { key: "Page", value: next?.page || "-", isVisible: false },
    {
      key: "Query",
      value: (next?.query && JSON.stringify(next?.query)) || "-",
      isVisible: false,
    },
  ].filter((f) => f);
};
