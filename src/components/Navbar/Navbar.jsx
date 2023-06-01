import React, { useCallback, useMemo, useState } from "react";
import { Link } from "react-router-dom";

// @emotion/css
import { css } from "@emotion/css";

// @mui/icons-material
import { Menu, Person } from "@mui/icons-material";

// @mui/material
import { useTheme } from "@mui/material/styles";
// @mui/components
import Button from "../MUI/Button";
import IconButton from "../MUI/IconButton";

// contexts
import { useLanguage } from "../../context/LanguageProvider";

// components
import AuthDialog from "../Dialog/AuthDialog";

// styles
import styles from "./styles.module.css";

function Navbar({ showSidebar, toggleSidebar, widthViewport }) {
  const theme = useTheme();

  const { languageState } = useLanguage();

  const bg = useMemo(() => {
    return css({
      background: widthViewport < 600 ? theme.palette.background.paper : "",
    });
  }, [theme, widthViewport]);

  const { appName } = useMemo(() => {
    return {
      appName: languageState.texts.appName,
      ariaLabels: languageState.texts.ariaLabels,
      tooltips: languageState.texts.tooltips,
    };
  }, [languageState]);

  const [showLogin, setShowLogin] = useState(false);
  const handleLogin = useCallback(() => {
    setShowLogin(!showLogin);
  }, [showLogin]);

  return (
    <>
      <AuthDialog visible={showLogin} onClose={handleLogin} />
      <div
        className={`${styles.navbar} ${
          widthViewport < 600 || !showSidebar ? styles.full : ""
        } ${bg}`}
      >
        <h1>
          <IconButton
            onClick={toggleSidebar}
            color="primary"
            className={styles.menuButton}
          >
            <Menu />
          </IconButton>
          {appName}
        </h1>
        <div>
          <Link to="/auth/sign-in">
            <Button
              onClick={handleLogin}
              variant="contained"
              sx={{
                borderRadius: "100%",
                minWidth: 0,
                minHeight: 0,
                padding: 0,
                width: "35px",
                height: "35px",
              }}
            >
              <Person />
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
