import React from "react";
import browser from "webextension-polyfill";
import Popup from "./Popup";

let wData = null;
let isDataRequested = false;

const Messages = {
  "no-next": "This page doesn't appear to be using Next.js",
};

async function sendMessageToBackground(action, data) {
  try {
    await browser.runtime.sendMessage({
      to: "background",
      action,
      data,
    });
  } catch (e) {}
}

function App() {
  const [message, setMessage] = React.useState(null);

  const handleOnWindowMessage = async ({ data }) => {
    if (data?.type === "next-window-data") {
      wData = { ...data.data };
      await sendMessageToBackground("init", wData);
      if (isDataRequested) await sendMessageToBackground("data", wData);
    }
  };

  const handleOnMessageReceived = (message) => {
    if (message.to === "content") {
      switch (message?.action) {
        case "get-data":
          if (wData) sendMessageToBackground("data", wData);
          else isDataRequested = true;
          break;
        case "show-message":
          setMessage(Messages?.[message?.data]);
          break;
        default:
          break;
      }
    }
  };

  React.useEffect(() => {
    window.addEventListener("message", handleOnWindowMessage);
    window.postMessage({ type: "get-next-window-data" });
  }, []);

  React.useEffect(() => {
    browser.runtime.onMessage.addListener(handleOnMessageReceived);
  }, []);

  return (
    message && <Popup message={message} onClose={() => setMessage(null)} />
  );
}

export default App;
