import React, { useCallback, useMemo } from "react";

import { sortBy } from "some-javascript-utils/array";

// @emotion/css
import { css } from "@emotion/css";

// @mui/material
import { useTheme } from "@mui/material/styles";

// @mui/icons-material
import { Add, ArrowBack, ArrowForward } from "@mui/icons-material";
import IconButton from "../MUI/IconButton";
import Button from "../MUI/Button";

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
  const { notesState, setNotesState } = useNotes();

  const bg = useMemo(() => {
    return css({ background: theme.palette.background.paper });
  }, [theme]);

  const { sidebar, ariaLabels } = useMemo(() => {
    return {
      sidebar: languageState.texts.sidebar,
      ariaLabels: languageState.texts.ariaLabels,
    };
  }, [languageState]);

  const printNotes = useCallback(() => {
    return sortBy(Object.values(notesState), "id", false).map((note) => (
      <Note key={note.id} {...note} />
    ));
  }, [notesState]);

  const createNewNote = useCallback(() => {
    setNotesState({
      type: "add",
      newNote: { id: new Date().getTime(), title: "", content: "" },
    });
  }, [setNotesState]);

  return (
    <div className={`${styles.sidebar} ${open ? "" : styles.translate} ${bg}`}>
      <div className={`${styles.titleRow}`}>
        <h2>{sidebar.title}</h2>
        <IconButton onClick={handleClose} color="primary">
          {open ? <ArrowBack /> : <ArrowForward />}
        </IconButton>
      </div>
      <Button
        ariaLabel={ariaLabels.newNote}
        onClick={createNewNote}
        variant="contained"
        sx={{ width: "100%" }}
      >
        <Add />
      </Button>
      <div>{printNotes()}</div>
    </div>
  );
}

export default Sidebar;
