import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { CtrlContextProvider } from "./context/CtrlContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <CtrlContextProvider>
      <App />
    </CtrlContextProvider>
  </AuthContextProvider>
);
