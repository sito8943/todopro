import React, { memo, useMemo } from "react";
import { Link } from "react-router-dom";

// @emotion/css
import { css } from "@emotion/css";

// @mui/icons-material
import { Edit, Delete } from "@mui/icons-material";
import IconButton from "../../MUI/IconButton";

// contexts
import { useNotes } from "../../../context/NotesProvider";
import { useLanguage } from "../../../context/LanguageProvider";

function Note({ id, title, content }) {
  const { setNotesState } = useNotes();

  const { languageState } = useLanguage();

  const noMargin = useMemo(() => {
    return css({ margin: 0 });
  }, []);

  const titleCss = useMemo(() => {
    return css({ fontSize: "18px" });
  }, []);

  const contentCss = useMemo(() => {
    return css({ fontSize: "15px", fontStyle: "italic" });
  }, []);

  const container = useMemo(() => {
    return css({
      margin: "20px 0",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    });
  }, []);

  const note = useMemo(() => {
    return languageState.texts.note;
  }, [languageState]);

  const deleteNote = () => setNotesState({ type: "remove", id });

  return (
    <div className={container}>
      <div>
        <p className={`${noMargin} ${titleCss}`}>
          {title && title.length ? title : note.noTitle}
        </p>
        <p className={`${noMargin} ${contentCss}`}>
          {content && content.length ? content : note.noContent}
        </p>
      </div>
      <div>
        <Link to={`/edit?id=${id}`}>
          <IconButton color="primary">
            <Edit />
          </IconButton>
        </Link>
        <IconButton onClick={deleteNote} color="error">
          <Delete />
        </IconButton>
      </div>
    </div>
  );
}

const NoteMemo = memo((props) => <Note {...props} />, arePropsEqual);

function arePropsEqual(oldProps, newProps) {
  return (
    oldProps.id === newProps.id &&
    oldProps.title === newProps.title &&
    oldProps.content === newProps.content
  );
}

export default NoteMemo;
