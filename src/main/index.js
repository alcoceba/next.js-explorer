import { ROUTER } from "../helpers/const";
import {
  decodeData,
  getNextVersion,
  getReactVersion,
  isAppRouter,
} from "../helpers/utils";

window.addEventListener("message", ({ data }) => {
  if (data?.type === "get-next-window-data") {
    const router = isAppRouter() ? ROUTER.App : ROUTER.Pages;
    window.postMessage({
      type: "next-window-data",
      data: {
        next: {
          router,
          isAppRouter: isAppRouter(),
          data: decodeData(router),
          v: getNextVersion(),
        },
        react: { v: getReactVersion() },
      },
    });
  }
});
