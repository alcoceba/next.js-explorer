import React from 'react';
import { ROUTER } from '../../helpers/constants';
import { getContext } from '../utils/context';
import { copyToClipboard } from '../utils/copy';
import { exportJson, getObjKeysCount, getObjSize } from '../utils/object';
import ContextProvider from '../context/context';
import Footer from './Footer';
import Header from './Header';
import Loading from './core/loading/Loading';
import Message from './core/message/Message';
import Portal from './core/portal/Portal';
import Theme from './Theme';
import Viewer from './Viewer';

import * as styles from './App.module.css';

function App() {
  const timeout = React.useRef(null);
  const [isInit, setIsInit] = React.useState(false);
  const [context, setContext] = React.useState(null);
  const [showMessage, setShowMessage] = React.useState({});

  const json = context?.next?.data?.props || context?.next?.data;

  const handleOnExport = (space) => exportJson(context?.next, space);

  const handleOnCopy = async ({ value }) => {
    const result = await copyToClipboard(value);
    setShowMessage({
      id: result * Math.random(),
      text: 'Value copied to clipboard!',
    });
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setShowMessage(false), 2000);
  };

  const handleOnCopyJson = async () => {
    const result = await copyToClipboard(JSON.stringify(json));
    setShowMessage({
      id: result * Math.random(),
      text: 'JSON copied to clipboard!',
    });
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setShowMessage(false), 2000);
  };

  React.useEffect(() => {
    const load = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const context = await getContext(urlParams.get('id'));

      setContext({
        ...context,
        keys: getObjKeysCount(context?.next?.data?.props),
        size: getObjSize(context?.next?.data?.props),
      });

      setIsInit(true);
    };

    load();
  }, []);

  return (
    <ContextProvider>
      <Theme>
        <Loading isLoading={!isInit}>
          <div className={styles.header}>
            <Header
              version={context?.next?.v}
              react={context?.react?.v}
              router={context?.next?.router}
            />
          </div>

          {context?.next?.router === ROUTER.App && !json ? (
            <div className={styles.notice}>
              🔴 Sorry, but we have not been able to unpack the bundles sent to the client
            </div>
          ) : (
            <>
              <Viewer
                json={json}
                onCopy={handleOnCopy}
                onCopyJson={handleOnCopyJson}
                onExport={handleOnExport}
                pageInfoProps={
                  context?.next?.router === ROUTER.Pages
                    ? {
                        keys: context?.keys,
                        size: context?.size,
                        page: context?.next?.data?.page,
                        query: context?.next?.data?.query,
                        assetPrefix: context?.next?.data?.assetPrefix,
                      }
                    : undefined
                }
              />

              {!!showMessage?.id && (
                <Portal key={showMessage.id}>
                  <Message>{showMessage.text}</Message>
                </Portal>
              )}
            </>
          )}

          <Footer />
        </Loading>
      </Theme>
    </ContextProvider>
  );
}

export default App;
