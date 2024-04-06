import React from "react";
import { THEME } from "../../helpers/const";
import reducer from "./reducer";

const InitialState = {
  theme: THEME.Dark,
  showSizes: false,
  isCollapsed: false,
};

export const Context = React.createContext();

const ContextProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, InitialState);
  return (
    <Context.Provider value={[state, dispatch]}>{children}</Context.Provider>
  );
};

export default ContextProvider;
