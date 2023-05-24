import React, { useCallback, useMemo } from "react";

// @emotion/css
import { css } from "@emotion/css";

// @mui/material
import { useTheme } from "@mui/material/styles";

// @mui/icons-material
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import IconButton from "../MUI/IconButton";

// contexts
import { useLanguage } from "../../context/LanguageProvider";
import { useNotes } from "../../context/NotesProvider";

// components
import Note from "./Note/Note";

// styles
import styles from "./styles.module.css";

function Sidebar({ open, handleClose }) {
  const theme = useTheme();

  const { languageState } = useLanguage();
  const { notesState } = useNotes();

  const bg = useMemo(() => {
    return css({ background: theme.palette.background.paper });
  }, [theme]);

  const sidebar = useMemo(() => {
    return languageState.texts.sidebar;
  }, [languageState]);

  const printNotes = useCallback(() => {
    return Object.values(notesState).map((note) => (
      <Note key={note.id} {...note} />
    ));
  }, [notesState]);

  return (
    <div className={`${styles.sidebar} ${open ? "" : styles.translate} ${bg}`}>
      <div className={`${styles.titleRow}`}>
        <h2>{sidebar.title}</h2>
        <IconButton onClick={handleClose} color="primary">
          {open ? <ArrowBack /> : <ArrowForward />}
        </IconButton>
      </div>
      <div>{printNotes()}</div>
    </div>
  );
}

export default Sidebar;
