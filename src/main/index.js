import {
  getNextVersion,
  getReactVersion,
  getNextRouter,
  getNextData,
} from "../helpers/utils";

window.addEventListener("message", ({ data }) => {
  if (data?.type === "get-next-window-data") {
    window.postMessage({
      type: "next-window-data",
      data: {
        next: {
          data: getNextData(),
          isAppRouter: getNextRouter(),
          v: getNextVersion(),
        },
        react: { v: getReactVersion() },
      },
    });
  }
});
