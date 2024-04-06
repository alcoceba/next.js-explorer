import React from "react";
import { Context } from "../context/context";

function useActions() {
  const [{ theme }, dispatch] = React.useContext(Context);

  return theme;
}

export default useTheme;
