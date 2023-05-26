import React, { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
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

function Sidebar({ open, handleClose, widthViewport }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const { languageState } = useLanguage();
  const { notesState, setNotesState } = useNotes();

  const bg = useMemo(() => {
    return css({
      background: theme.palette.background.paper,
    });
  }, [theme]);

  const bgRow = useMemo(() => {
    return css({
      background:
        widthViewport < 600
          ? theme.palette.background.default
          : theme.palette.background.paper,
    });
  }, [theme, widthViewport]);

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
    const date = new Date().getTime();
    setNotesState({
      type: "add",
      newNote: { id: date, title: "", content: "" },
    });
    navigate(`/edit?id=${date}`);
  }, [setNotesState, navigate]);

  const handleFullClick = useCallback(() => {
    if (widthViewport < 600) handleClose();
  }, [widthViewport, handleClose]);

  return (
    <>
      <div
        onClick={handleFullClick}
        className={`${styles.sidebar} ${
          open ? "" : styles.translate
        } ${bg} ${css({
          position: widthViewport < 600 ? "absolute" : "relative",
        })}`}
      >
        <div className={`${styles.titleRow} ${bgRow}`}>
          <h2>{sidebar.title}</h2>
          <IconButton onClick={handleClose} color="primary">
            {open ? <ArrowBack /> : <ArrowForward />}
          </IconButton>
        </div>
        <div>{printNotes()}</div>
      </div>
      <Button
        variant="contained"
        sx={{
          zIndex: 100,
          position: "fixed",
          bottom: "20px",
          right: "10px",
          minWidth: 0,
          minHeight: 0,
          borderRadius: "100%",
          padding: 0,
          width: "40px",
          height: "40px",
          marginRight: "10px",
        }}
        color="primary"
        aria-label={ariaLabels.newNote}
        onClick={createNewNote}
      >
        <Add />
      </Button>
    </>
  );
}

export default Sidebar;
