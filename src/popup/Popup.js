import PropTypes from "prop-types";
import React from "react";
import { classNames } from "../helpers/classNames";

import * as styles from "./Popup.module.css";

const TIMEOUT = 3000;

function Popup({ message, timeout = TIMEOUT, onClose }) {
  const [isExit, setIsExit] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);

  const handleOnClose = () => {
    setIsVisible(false);
    onClose?.();
  };

  React.useEffect(() => {
    const timer1 = setTimeout(() => setIsExit(true), timeout);
    const timer2 = setTimeout(() => onClose?.(), timeout + 250);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [timeout, onClose]);

  return (
    <div
      className={classNames(
        styles.popup,
        isVisible && styles.show,
        isExit && styles.exit
      )}
    >
      <span className={styles.close} onClick={handleOnClose}>
        &times;
      </span>
      <span>{message}</span>
    </div>
  );
}

Popup.propTypes = {
  message: PropTypes.string,
  timeout: PropTypes.number,
  onClose: PropTypes.func,
};

export default Popup;
