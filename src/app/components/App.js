import React from "react";
import { ROUTER } from "../../helpers/const";
import { getContext } from "../../helpers/context";
import copy from "../../helpers/copy";
import {
  exportJson,
  filterJson,
  getObjKeysCount,
  getObjSize,
} from "../../helpers/object";
import { getRowsInfo } from "../../helpers/rows";
import ContextProvider from "../context/context";
import Actions from "./Actions";
import Footer from "./Footer";
import Header from "./Header";
import Loading from "./Loading";
import Message from "./Message";
import Portal from "./Portal";
import Table from "./Table";
import Theme from "./Theme";
import Viewer from "./Viewer";

import styles from "./App.module.css";

function App() {
  const timeout = React.useRef(null);

  const [json, setJson] = React.useState(null);
  const [isInit, setIsInit] = React.useState(false);
  const [context, setContext] = React.useState(null);
  const [rowsInfo, setRowsInfo] = React.useState(getRowsInfo({}));
  const [showMessage, setShowMessage] = React.useState({});

  const handleOnExport = (space) => exportJson(context?.next, space);

  const handleOnCopy = async ({ value }) => {
    const result = await copy(value);
    setShowMessage({
      id: result * Math.random(),
      text: 'Value copied to clipboard!',
    });
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setShowMessage(false), 2000);
  };

  const handleOnCopyJson = async () => {
    const result = await copy(JSON.stringify(json));
    setShowMessage({
      id: result * Math.random(),
      text: 'JSON copied to clipboard!',
    });
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => setShowMessage(false), 2000);
  };

  const handleOnSearch = (value) => {
    const data = context?.next?.data?.props || context?.next?.data;
    const clone = JSON.parse(JSON.stringify(data));
    const json = filterJson(clone, value.toLowerCase());
    setJson(json);
  };

  React.useEffect(() => {
    if (context) setRowsInfo(getRowsInfo(context));
  }, [context]);

  React.useEffect(() => {
    const load = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const context = await getContext(urlParams.get("id"));

      setContext({
        ...context,
        keys: getObjKeysCount(context?.next?.data?.props),
        size: getObjSize(context?.next?.data?.props),
      });

      setJson(context?.next?.data?.props || context?.next?.data);
      setIsInit(true);
    };
    load();
  }, []);

  return (
    <ContextProvider>
      <Theme>
        <Loading isLoading={!isInit}>
          <div className={styles.sticky}>
            <Header
              version={context?.next?.v}
              react={context?.react?.v}
              router={context?.next?.router}
              onSearch={handleOnSearch}
            />
            {context?.next?.router === ROUTER.Pages && (
              <div className={styles.table}>
                <Table rows={rowsInfo} />
              </div>
            )}
            <Actions
              onExport={handleOnExport}
              onCopy={(value) => handleOnCopyJson(value)}
            />
          </div>

          {context?.next?.router === ROUTER.App && (
            <div className={styles.notice}>
              {json
                ? "This is the data included in the bundle and sent to the client"
                : "🔴 Sorry, but we haven't been able to unpack the bundles sent to the client"}
            </div>
          )}

          <Viewer
            json={json}
            onCopy={handleOnCopy}
          />

          {showMessage && (
            <Portal key={showMessage.id}>
              <Message>{showMessage.text}</Message>
            </Portal>
          )}

          <Footer />
        </Loading>
      </Theme>
    </ContextProvider>
  );
}

export default App;
