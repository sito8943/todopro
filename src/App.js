import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// @mui components
import { ThemeProvider, CssBaseline } from "@mui/material";

// theme
import dark from "./assets/theme/dark";
import light from "./assets/theme/light";

// views
import Home from "./views/Home/Home";
import Login from "./views/Login/Login";
import Register from "./views/Register/Register";

const App = () => {
  const [mode, setMode] = useState(false);

  const toggleMode = () => setMode(!mode);

  return (
    <ThemeProvider theme={mode ? light : dark}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={<Home toggleMode={toggleMode} mode={mode} />}
          />
          <Route exact path="/" element={<Login />} />
          <Route exact path="/" element={<Register />} />
        </Routes>
      </BrowserRouter>
      {/*<Notification
        visible={showNotification}
        type={notificationType}
        text={notificationText}
        onClose={handleNotificationClose}
      />*/}
    </ThemeProvider>
  );
};

export default App;
