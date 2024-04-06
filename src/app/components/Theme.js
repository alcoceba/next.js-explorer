import useTheme from "../hooks/useTheme";

function Theme({ children }) {
  useTheme();
  return children;
}

export default Theme;
