import React from "react";

import styles from "./Message.module.css";

function Message({ children }) {
    return (
        <div className={styles.message}>
            <span>{children}</span>
        </div>
    );
}

export default Message;
