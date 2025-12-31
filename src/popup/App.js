import React from 'react';
import browser from 'webextension-polyfill';
import Popup from './Popup';

const Messages = {
  'no-next': "This page doesn't appear to be using Next.js",
};

function App() {
  const [message, setMessage] = React.useState(null);

  const handleOnMessageReceived = (message) => {
    if (message.to === 'content') {
      switch (message?.action) {
        case 'show-message':
          setMessage(Messages?.[message?.data]);
          break;
        default:
          break;
      }
    }
  };

  React.useEffect(() => {
    browser.runtime.onMessage.addListener(handleOnMessageReceived);
  }, []);

  return message && <Popup message={message} onClose={() => setMessage(null)} />;
}

export default App;
