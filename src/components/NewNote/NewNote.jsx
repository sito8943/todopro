import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDebounce } from "use-lodash-debounce";

import { parseQueries } from "some-javascript-utils/browser.js";

// @emotion/css
import { css } from "@emotion/css";

// contexts
import { useNotes } from "../../context/NotesProvider";
import { useLanguage } from "../../context/LanguageProvider";

// @mui/material
import TextField from "../MUI/TextField";

// components
import Container from "../Container/Container";

// styles
import styles from "./styles.module.css";

function NewNote({ widthViewport }) {
  const location = useLocation();

  const { notesState, setNotesState } = useNotes();

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const debouncedTitle = useDebounce(title, 1000);

  const handleTitle = useCallback(
    (e) => {
      if (id && id.length && notesState[id])
        setNotesState({ type: "editing", id });
      setTitle(e.target.value);
    },
    [id, notesState, setNotesState]
  );

  const [content, setContent] = useState("");
  const debouncedContent = useDebounce(content, 1000);

  const handleContent = useCallback(
    (e) => {
      if (id && id.length && notesState[id])
        setNotesState({ type: "editing", id });
      setContent(e.target.value);
    },
    [id, notesState, setNotesState]
  );

  useEffect(() => {
    if (id && id.length)
      setNotesState({
        type: "add",
        newNote: { id, title: debouncedTitle, content: debouncedContent },
      });
  }, [debouncedContent, debouncedTitle, setNotesState]);

  useEffect(() => {
    if (id && id.length && notesState[id]) {
      setTitle(notesState[id].title);
      setContent(notesState[id].content);
    } else {
      setTitle("");
      setContent("");
    }
  }, [id]);

  useEffect(() => {
    const { search } = location;
    const query = parseQueries(search);
    if (query.id) setId(query.id);
  }, [location]);

  const { languageState } = useLanguage();

  const inputs = useMemo(() => {
    return languageState.texts.Inputs;
  }, [languageState]);

  const inputSx = [
    { width: "100%" },
    { marginTop: "20px", width: "100%", height: "100%" },
  ];

  const handleForm = (e) => {
    e.preventDefault();
  };

  const formCss = useMemo(
    () =>
      css({
        transition: "all 500ms ease",
        width: "100%",
        paddingTop: "1.5rem",
      }),
    []
  );

  return (
    <form className={`${formCss} ${styles.main}`} onSubmit={handleForm}>
      <Container
        sx={{
          position: "relative",
          marginTop: widthViewport < 600 ? "20px" : 0,
        }}
      >
        <TextField
          label={inputs.title.label}
          id={inputs.title.id}
          type={inputs.title.type}
          multiline={inputs.title.multiline}
          minRows={inputs.title.minRows}
          maxRows={inputs.title.maxRows}
          placeholder={inputs.title.placeholder}
          value={title}
          sx={inputSx[0]}
          disabled={!id || !id.length}
          onChange={handleTitle}
          required
        />
      </Container>
      <Container sx={{ position: "relative" }}>
        <TextField
          label={inputs.content.label}
          id={inputs.content.id}
          type={inputs.content.type}
          multiline={inputs.content.multiline}
          minRows={inputs.content.minRows}
          placeholder={inputs.content.placeholder}
          value={content}
          sx={inputSx[1]}
          disabled={!id || !id.length}
          onChange={handleContent}
          required
        />
      </Container>
    </form>
  );
}

export default NewNote;
