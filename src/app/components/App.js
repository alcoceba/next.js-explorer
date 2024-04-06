import React from "react";
import { getContext } from "../../helpers/context";
import { exportJson, getObjKeysCount, getObjSize } from "../../helpers/object";
import { getRowsInfo } from "../../helpers/rows";
import ContextProvider from "../context/context";
import Actions from "./Actions";
import Footer from "./Footer";
import Header from "./Header";
import Loading from "./Loading";
import Table from "./Table";
import Theme from "./Theme";
import Viewer from "./Viewer";

import styles from "./App.module.css";

function App() {
  const [context, setContext] = React.useState(null);
  const [rowsInfo, setRowsInfo] = React.useState(getRowsInfo({}));
  const [isInit, setIsInit] = React.useState(false);

  const handleOnExport = (space) => exportJson(context?.next, space);

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
              isAppRouter={context?.next?.isAppRouter}
            />
            <Table rows={rowsInfo} />
            <hr />
            {!context?.next?.isAppRouter && (
              <Actions onExport={handleOnExport} />
            )}
          </div>
          {(!context?.next?.isAppRouter && (
            <Viewer json={context?.next?.data?.props} />
          )) || (
            <div className={styles.notice}>
              The extension is not currently available for APP Router
              {context?.next?.v ? ` - v${context?.next?.v}` : ``}
            </div>
          )}
          <Footer />
        </Loading>
      </Theme>
    </ContextProvider>
  );
}

export default App;
