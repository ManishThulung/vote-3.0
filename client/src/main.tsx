import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { SmartContractProvider } from "./context/SmartContractProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <SmartContractProvider>
      <App />
    </SmartContractProvider>
  </React.StrictMode>
);
