import React from "react";
import { classNames } from "../../helpers/classNames";
import { THEME } from "../../helpers/const";
import { SetTheme } from "../context/actions";
import { Context } from "../context/context";
import Switch from "./Switch";

import styles from "./Header.module.css";

function Header({ isAppRouter, version }) {
  const [{ theme }, dispatch] = React.useContext(Context);

  const handleOnThemeToggle = () => {
    dispatch(SetTheme(theme === THEME.Light ? THEME.Dark : THEME.Light));
  };

  return (
    <div className={styles.header}>
      <h1>Next.js 🚀 Explorer</h1>
      <div className={classNames(styles.section, isAppRouter && styles.app)}>
        {version && (
          <a
            target="_blank"
            rel="noreferrer"
            href={"https://nextjs.org/blog"}
            className={styles.version}
          >
            Next.js v{version}
          </a>
        )}
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://nextjs.org/docs/${isAppRouter ? "app" : "pages"}`}
          className={styles.router}
        >
          {isAppRouter ? "APP" : "Pages"} Router
        </a>
      </div>
      <div className={styles.switch}>
        <Switch
          id="theme"
          onClick={handleOnThemeToggle}
          isActive={theme === THEME.Light}
        >
          -
        </Switch>
      </div>{" "}
    </div>
  );
}

export default Header;
