import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

// context
import { NotificationProvider } from "./context/NotificationProvider";
import { LanguageProvider } from "./context/LanguageProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <NotificationProvider>
        <App />
      </NotificationProvider>
    </LanguageProvider>
  </React.StrictMode>
);
