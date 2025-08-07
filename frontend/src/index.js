import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <App />
  </StrictMode>
);
