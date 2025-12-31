import PropTypes from 'prop-types';
import React from 'react';
import { classNames } from '../../helpers/classNames';
import { ROUTER, THEME } from '../../helpers/constants';
import { SetTheme } from '../context/actions';
import { Context } from '../context/context';
import SearchBox from './core/searchBox/SearchBox';

import * as styles from './Header.module.css';

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
          href={`https://nextjs.org/docs/${router === ROUTER.App ? 'app' : 'pages'}`}
          className={styles.router}
        >
          {router === ROUTER.App ? 'APP' : 'Pages'} Router
        </a>
        <div className={styles.versions}>
          {version && (
            <a target="_blank" rel="noreferrer" href={'https://nextjs.org/blog'}>
              Next.js v{version}
            </a>
          )}
          {react && (
            <a target="_blank" rel="noreferrer" href={'https://react.dev/'}>
              React {react}
            </a>
          )}
        </div>
      </div>

      <div className={styles.box}>
        <SearchBox onChange={(v) => onSearch?.(v)} />
      </div>

      <div className={classNames(styles.box, styles.theme, theme === THEME.Light && styles.light)}>
        <span onClick={handleOnThemeToggle}>&nbsp;</span>
      </div>
    </div>
  );
}

Header.propTypes = {
  router: PropTypes.oneOf([ROUTER.App, ROUTER.Pages]),
  version: PropTypes.string,
  react: PropTypes.string,
  onSearch: PropTypes.func,
};

export default Header;
