import React from "react";
import ReactDOM from "react-dom";
import "mobx-react/batchingForReactDom";

import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
