import { classNames } from "../../../helpers/classNames";
import { isObjectAndNotEmpty } from "../../../helpers/object";
import Key from "./Key";
import Value from "./Value";

import styles from "./Tree.module.css";

function Tree({ data, isRoot }) {
  return (
    <ul className={classNames(styles.wrapper, isRoot && styles.root)}>
      {Object.keys(data).map((key) => {
        if (!isObjectAndNotEmpty(data[key]))
          return <Value key={key} index={key} value={data[key]} />;
        return (
          <Key key={key} index={key} tree={data[key]}>
            <Tree data={data[key]} />
          </Key>
        );
      })}
    </ul>
  );
}

export default Tree;
