import React, { useMemo } from "react";

// @emotion/css
import { css } from "@emotion/css";

// @mui/icons-material
import { Menu } from "@mui/icons-material";

// @mui/material
import { useTheme } from "@mui/material/styles";
// @mui/components
import IconButton from "../MUI/IconButton";

// contexts
import { useLanguage } from "../../context/LanguageProvider";

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

  return (
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
    </div>
  );
}

export default Navbar;
