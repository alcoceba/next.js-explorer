import React from "react";
import styles from "./Table.module.css";

function Table({ rows }) {
  const [showMore, setShowMore] = React.useState(false);

  return (
    rows?.length && (
      <div className={styles.table}>
        <table>
          <tbody>
            {rows?.map(
              ({ key, value, isVisible }) =>
                (isVisible || showMore) && (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                )
            )}
          </tbody>
        </table>

        <div className={styles.button} onClick={() => setShowMore(!showMore)}>
          {!showMore ? "+ show more" : "- show less"}
        </div>
      </div>
    )
  );
}

export default Table;
