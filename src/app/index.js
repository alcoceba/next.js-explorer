import ReactDOM from "react-dom/client";
import App from "./components/App";

import "./index.css";
import "./theme.css";

const div = document.createElement("div");
document.body.appendChild(div);

const root = ReactDOM.createRoot(div);
root.render(<App />);
