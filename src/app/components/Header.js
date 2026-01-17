import PropTypes from 'prop-types';
import React from 'react';
import { classNames } from '../utils/classNames';
import { DEFAULT_SIZE, ROUTER, THEME } from '../../helpers/constants';
import { SetTheme } from '../context/actions';
import { Context } from '../context/context';

import * as styles from './Header.module.css';
import Badge, { Variant as BadgeVariant } from './core/badge/Badge';

function Header({ router, version, react, keys, size }) {
  const [{ theme }, dispatch] = React.useContext(Context);

  const handleOnThemeToggle = () => {
    dispatch(SetTheme(theme === THEME.Light ? THEME.Dark : THEME.Light));
  };

  return (
    <div className={styles.header}>
      <h1>Next.js 🚀 Explorer</h1>

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
        {keys && size && (
          <Badge
            label="Size"
            variant={BadgeVariant.PRIMARY}
            title={`${size > DEFAULT_SIZE ? 'Large size' : 'Normal size'}`}
          >
            {size && `${size > DEFAULT_SIZE ? '🔴' : '🟢'} ${size / 1000} Kb`} /
            {keys && `${keys} keys`}
          </Badge>
        )}
      </div>

      <div className={classNames(styles.box, styles.theme, theme === THEME.Light && styles.light)}>
        <span onClick={handleOnThemeToggle}>&nbsp;</span>
      </div>
    </div>
  );
}

Header.propTypes = {
  router: PropTypes.oneOf([ROUTER.App, ROUTER.Pages]).isRequired,
  version: PropTypes.string,
  react: PropTypes.string,
  keys: PropTypes.number,
  size: PropTypes.number,
};

export default Header;
