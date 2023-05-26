import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDebounce } from "use-lodash-debounce";

// @emotion/css
import { css } from "@emotion/css";

// contexts
import { useLanguage } from "../../context/LanguageProvider";

// @mui/material
import TextField from "../MUI/TextField";

// components
import Container from "../Container/Container";

function NewNote({ showSidebar }) {
  const location = useLocation();

  const [title, setTitle] = useState("");
  const debouncedTitle = useDebounce(title, 1000);

  const handleTitle = useCallback((e) => setTitle(e.target.value), []);

  const [content, setContent] = useState("");
  const debouncedContent = useDebounce(content, 1000);

  const handleContent = useCallback((e) => setContent(e.target.value), []);

  useEffect(() => {}, [debouncedContent, debouncedTitle]);

  useEffect(() => {}, [location]);

  const { languageState } = useLanguage();

  const inputs = useMemo(() => {
    return languageState.texts.Inputs;
  }, [languageState]);

  const inputSx = [{ width: "100%" }, { marginTop: "20px", width: "100%" }];

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
    <form className={formCss} onSubmit={handleForm}>
      <Container sx={{ position: "relative" }}>
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
          maxRows={inputs.content.maxRows}
          placeholder={inputs.content.placeholder}
          value={content}
          sx={inputSx[1]}
          onChange={handleContent}
          required
        />
      </Container>
    </form>
  );
}

export default NewNote;
