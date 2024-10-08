import React from "react";

import styles from "./Footer.module.css";

const Hearts = ["❤️", "🧡", "💛", "💚", "💙", "💜", "❤️‍🔥", "🔥", "🍆"];

function Footer() {
  const [icon, setIcon] = React.useState(Hearts[0]);

  const handleOnIconClick = () => {
    const index = Math.floor(Math.random() * Hearts.length);
    setIcon(Hearts[index]);
  };

  return (
    <div className={styles.footer} onClick={handleOnIconClick}>
      made with <span>{icon}</span> for all developers - v1.6.1 / 1.0.3
    </div>
  );
}

export default Footer;
