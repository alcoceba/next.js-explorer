import React from 'react';
import { ROUTER } from '../../helpers/constants';
import { getContext } from '../utils/context';
import { copyToClipboard } from '../utils/copy';
import { exportJson, getObjKeysCount, getObjSize } from '../utils/object';
import { getAllPaths } from './core/flat-tree';
import ContextProvider, { Context } from '../context/context';
import {
  SetAppData,
  SetShowMessage,
  ToggleExpandedPath,
  SetExpandedPaths,
  SetIsInit,
} from '../context/actions';
import Footer from './Footer';
import Header from './Header';
import Loading from './core/loading/Loading';
import Message from './core/message/Message';
import Portal from './core/portal/Portal';
import Theme from './Theme';
import Viewer from './Viewer';

import * as styles from './App.module.css';

function AppContent() {
  const [{ appData, showMessage, expandedPaths }, dispatch] = React.useContext(Context);
  const timeout = React.useRef(null);

  const json = appData.nextjsPageData;

  const handleOnCopy = async ({ value }) => {
    dispatch(
      SetShowMessage({
        id: Math.random(),
        text: 'Value copied to clipboard!',
      })
    );
    await copyToClipboard(value);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => dispatch(SetShowMessage({})), 2000);
  };

  const handleOnCopyJson = async () => {
    dispatch(
      SetShowMessage({
        id: Math.random(),
        text: 'JSON copied to clipboard!',
      })
    );
    await copyToClipboard(JSON.stringify(json));
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => dispatch(SetShowMessage({})), 2000);
  };

  const handleTogglePath = React.useCallback(
    (path) => {
      dispatch(ToggleExpandedPath(path));
    },
    [dispatch]
  );

  const handleExpandAll = React.useCallback(() => {
    if (json) {
      dispatch(SetExpandedPaths(getAllPaths(json)));
    }
  }, [json, dispatch]);

  const handleCollapseAll = React.useCallback(() => {
    dispatch(SetExpandedPaths(new Set()));
  }, [dispatch]);

  React.useEffect(() => {
    const load = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const rawAppData = await getContext(urlParams.get('id'));

      const jsonData = rawAppData?.next?.data?.props || rawAppData?.next?.data;
      dispatch(
        SetAppData({
          nextjsVersion: rawAppData?.next?.v,
          nextjsRouter: rawAppData?.next?.router,
          nextjsPageData: jsonData,
          nextjsPagePath: rawAppData?.next?.data?.page,
          nextjsPageQuery: rawAppData?.next?.data?.query,
          nextjsPageAssetPrefix: rawAppData?.next?.data?.assetPrefix,
          reactVersion: rawAppData?.react?.v,
          pageDataKeys: getObjKeysCount(rawAppData?.next?.data?.props),
          pageDataSize: getObjSize(rawAppData?.next?.data?.props),
        })
      );

      if (jsonData) {
        dispatch(SetExpandedPaths(getAllPaths(jsonData)));
      }

      dispatch(SetIsInit(true));
    };

    load();
  }, [dispatch]);

  return (
    <>
      <div className={styles.header}>
        <Header />
      </div>

      {appData?.nextjsRouter === ROUTER.App && !json ? (
        <div className={styles.notice}>
          🔴 Sorry, but we have not been able to unpack the bundles sent to the client
        </div>
      ) : (
        <>
          <Viewer
            json={json}
            onCopy={handleOnCopy}
            onCopyJson={handleOnCopyJson}
            onExport={(space) =>
              exportJson(
                { next: { v: appData.nextjsVersion, router: appData.nextjsRouter } },
                space
              )
            }
            expandedPaths={expandedPaths}
            onTogglePath={handleTogglePath}
            onExpandAll={handleExpandAll}
            onCollapseAll={handleCollapseAll}
          />

          {!!showMessage?.id && (
            <Portal key={showMessage.id}>
              <Message>{showMessage.text}</Message>
            </Portal>
          )}
        </>
      )}

      <Footer />
    </>
  );
}

function App() {
  return (
    <ContextProvider>
      <Theme>
        <AppLoadingWrapper />
      </Theme>
    </ContextProvider>
  );
}

function AppLoadingWrapper() {
  const [{ isInit }] = React.useContext(Context);
  return (
    <Loading isLoading={!isInit}>
      <AppContent />
    </Loading>
  );
}

export default App;
