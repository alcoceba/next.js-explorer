import React from 'react';

import GitHubIcon from '../icons/GitHubIcon';
import * as styles from './Footer.module.css';

const Hearts = ['❤️', '🧡', '💛', '💚', '💙', '💜', '❤️‍🔥', '🔥', '🍆'];

function Footer() {
  const [icon, setIcon] = React.useState(Hearts[0]);

  const handleOnIconClick = () => {
    const index = Math.floor(Math.random() * Hearts.length);
    setIcon(Hearts[index]);
  };

  return (
    <div className={styles.footer} onClick={handleOnIconClick}>
      <span className={styles.text}>
        Made with <span>{icon}</span> for all developers
      </span>
      <span className={styles.divider}> · </span>
      <span>v1.10.0 / 1.4.0</span>
      <span className={styles.divider}> · </span>
      <a
        className={styles.github}
        href="https://github.com/alcoceba/next.js-explorer"
        target="_blank"
        rel="noreferrer"
        title="Next.js Explorer GitHub Repository"
        onClick={(event) => event.stopPropagation()}
      >
        <GitHubIcon width="14" height="14" />
        View the source code on GitHub
      </a>
    </div>
  );
}

export default Footer;
