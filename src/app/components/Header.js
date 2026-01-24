import PropTypes from 'prop-types';
import React from 'react';
import { classNames } from '../utils/classNames';
import { ROUTER, THEME } from '../../helpers/constants';
import { SetTheme } from '../context/actions';
import { Context } from '../context/context';

import * as styles from './Header.module.css';
import Badge, { Variant as BadgeVariant } from './core/badge/Badge';
import SunIcon from '../icons/SunIcon';
import MoonIcon from '../icons/MoonIcon';
import GitHubIcon from '../icons/GitHubIcon';

function Header({ router, version, react }) {
  const [{ theme }, dispatch] = React.useContext(Context);

  const handleOnThemeToggle = () => {
    dispatch(SetTheme(theme === THEME.Light ? THEME.Dark : THEME.Light));
  };

  return (
    <div className={styles.header}>
      <div className={styles.h1}>
        <div className={styles.github}>
          <div>
            <GitHubIcon width="30" height="30" style={{ color: 'var(--color-primary)' }} />
          </div>
          <div>
            Collaborate and contribute to this project on{' '}
            <a
              href="https://github.com/alcoceba/next.js-explorer"
              target="_blank"
              rel="noreferrer"
              title="Next.js Explorer GitHub Repository"
            >
              GitHub
            </a>
          </div>
        </div>
        <h1>Next.js 🚀 Explorer</h1>
      </div>

      <div className={styles.labels}>
        <Badge
          label="Using"
          variant={BadgeVariant.ACCENT}
          component="a"
          target="_blank"
          rel="noreferrer"
          href={`https://nextjs.org/docs/${router === ROUTER.App ? 'app' : 'pages'}`}
        >
          {router === ROUTER.App ? 'APP' : 'Pages'} Router
        </Badge>
        {version && (
          <Badge
            label="Next.js"
            component="a"
            target="_blank"
            rel="noreferrer"
            href={'https://nextjs.org/blog'}
          >
            v{version}
          </Badge>
        )}
        {react && (
          <Badge
            label="React"
            component="a"
            target="_blank"
            rel="noreferrer"
            href={'https://react.dev/'}
          >
            v{react}
          </Badge>
        )}
      </div>

      <div
        className={classNames(styles.box, styles.theme)}
        onClick={handleOnThemeToggle}
        role="button"
        tabIndex={0}
        aria-label="Toggle theme"
      >
        {theme === THEME.Light ? <SunIcon /> : <MoonIcon />}
      </div>
    </div>
  );
}

Header.propTypes = {
  router: PropTypes.oneOf([ROUTER.App, ROUTER.Pages]).isRequired,
  version: PropTypes.string,
  react: PropTypes.string,
};

export default Header;
