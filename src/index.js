import React from "react";
import ReactDOM from "react-dom/client";

// styles
import "./index.css";
import App from "./App";

// context
import { NotificationProvider } from "./context/NotificationProvider";
import { LanguageProvider } from "./context/LanguageProvider";
import { NotesProvider } from "./context/NotesProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LanguageProvider>
    <NotificationProvider>
      <NotesProvider>
        <App />
      </NotesProvider>
    </NotificationProvider>
  </LanguageProvider>
);
