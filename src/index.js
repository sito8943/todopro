import React from "react";
import ReactDOM from "react-dom/client";

// App
import App from "./App";

// styles
import "./index.css";

// context
import { NotificationProvider } from "./context/NotificationProvider";
import { LanguageProvider } from "./context/LanguageProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LanguageProvider>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </LanguageProvider>
);
