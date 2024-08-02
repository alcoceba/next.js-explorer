import { classNames } from "../../../helpers/classNames";
import { isObjectAndNotEmpty } from "../../../helpers/object";
import Key from "./Key";
import Value from "./Value";

import styles from "./Tree.module.css";

function Tree({ data, isRoot, onCopy }) {
  return (
    <ul className={classNames(styles.wrapper, isRoot && styles.root)}>
      {Object.keys(data).map((key) => {
        if (!isObjectAndNotEmpty(data[key])) {
          return <Value key={key} index={key} value={data[key]} onCopy={onCopy} />;
        }

        return (
          <Key key={key} index={key} tree={data[key]}>
            <Tree data={data[key]} onCopy={onCopy} />
          </Key>
        );
      })}
    </ul>
  );
}

export default Tree;
