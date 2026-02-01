import PropTypes from 'prop-types';

import * as styles from './Message.module.css';

function Message({ children }) {
  return (
    <div className={styles.message}>
      <span>{children}</span>
    </div>
  );
}

Message.propTypes = {
  children: PropTypes.any,
};

export default Message;
