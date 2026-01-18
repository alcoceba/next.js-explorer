import React from 'react';
import PropTypes from 'prop-types';
import Portal from '../portal/Portal';
import * as styles from './Modal.module.css';

function Modal({ open, onClose, children }) {
  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <Portal>
      <div className={styles.overlay} onClick={onClose} />
      <div className={styles.modal}>
        <button className={styles.close} onClick={onClose} aria-label="Close modal">
          ✕
        </button>
        {children}
      </div>
    </Portal>
  );
}

Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
