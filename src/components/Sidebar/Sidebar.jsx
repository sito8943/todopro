import React, { useMemo } from "react";

// @emotion/css
import { css } from "@emotion/css";

// @mui/material
import { useTheme } from "@mui/material/styles";

// contexts
import { useLanguage } from "../../context/LanguageProvider";
import { useNotes } from "../../context/NotesProvider";

// styles
import styles from "./styles.module.css";

function Sidebar() {
  const theme = useTheme();

  const { languageState } = useLanguage();
  const { notesState, setNotesState } = useNotes();

  const bg = useMemo(() => {
    return css({ background: theme.palette.background.paper });
  }, [theme]);

  return <div className={`${styles.sidebar} ${bg}`}>
    Typ
  </div>;
}

export default Sidebar;
