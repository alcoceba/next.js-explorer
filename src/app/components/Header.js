import React from "react";
import { ROUTER, THEME } from "../../helpers/const";
import { SetTheme } from "../context/actions";
import { Context } from "../context/context";
import Switch from "./Switch";
import SearchBox from "./SearchBox";

import styles from "./Header.module.css";

function Header({ router, version, react, onSearch }) {
  const [{ theme }, dispatch] = React.useContext(Context);

  const handleOnThemeToggle = () => {
    dispatch(SetTheme(theme === THEME.Light ? THEME.Dark : THEME.Light));
  };

  return (
    <div className={styles.header}>
      <h1>Next.js 🚀 Explorer</h1>
      <div className={styles.section}>
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://nextjs.org/docs/${
            router === ROUTER.App ? "app" : "pages"
          }`}
          className={styles.router}
        >
          {router === ROUTER.App ? "APP" : "Pages"} Router
        </a>
        <div className={styles.versions}>
          {version && (
            <a
              target="_blank"
              rel="noreferrer"
              href={"https://nextjs.org/blog"}
            >
              Next.js v{version}
            </a>
          )}
          {react && (
            <a target="_blank" rel="noreferrer" href={"https://react.dev/"}>
              React {react}
            </a>
          )}
        </div>
      </div>

      <div className={styles.box}>
        <SearchBox onChange={(v) => onSearch?.(v)} />
      </div>

      <div className={styles.switch}>
        <Switch
          id="theme"
          onClick={handleOnThemeToggle}
          isActive={theme === THEME.Light}
        >
          -
        </Switch>
      </div>
    </div>
  );
}

export default Header;
