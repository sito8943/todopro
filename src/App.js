import { useState, useReducer } from "react";
import { useForm } from "react-hook-form";

// @emotion
import { css } from "@emotion/css";

// sito components
import SitoContainer from "sito-container";

// @mui icons
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import IosShareIcon from "@mui/icons-material/IosShare";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from "@mui/icons-material/Cancel";

// @mui components
import {
  ThemeProvider,
  CssBaseline,
  Box,
  Paper,
  Tooltip,
  Button,
  IconButton,
  Typography,
  TextField,
} from "@mui/material";

// theme
import dark from "./assets/theme/dark";

// own components
import TabView from "./components/TabView/TabView";
import FabButtons from "./components/FabButtons/FabButtons";

// contexts
import { useLanguage } from "./context/LanguageProvider";

// styles
import { radialButton } from "./components/FabButtons/style";

const App = () => {
  const { register, handleSubmit, reset, setValue, getValues } = useForm();
  const { languageState } = useLanguage();

  const [editing, setEditing] = useState(false);

  const noteBoxesReducer = (noteBoxesState, action) => {
    const { type } = action;
    switch (type) {
      case "init": {
        return [];
      }
      case "delete": {
        const newNoteBoxes = [...noteBoxesState];
        const { index } = action;
        newNoteBoxes.splice(index, 1);
        return newNoteBoxes;
      }
      case "deleteNote": {
        const newNoteBoxes = [...noteBoxesState];
        const { index, id } = action;
        newNoteBoxes[index].content.splice(
          newNoteBoxes[index].content.indexOf(id),
          1
        );
        return newNoteBoxes;
      }
      case "add": {
        let newNoteBoxes = [];
        const { index } = action;
        if (index) {
          // from 0 to index
          for (let i = 0; i <= index; i += 1)
            newNoteBoxes.push(noteBoxesState[i]);
          // add new element
          newNoteBoxes.push({
            title: languageState.texts.NewNote,
            content: [],
          });
          // from index + 1 to length
          for (let i = index + 1; i < noteBoxesState.length; i += 1)
            newNoteBoxes.push(noteBoxesState[i]);
        } else {
          newNoteBoxes = [...noteBoxesState];
          newNoteBoxes.push({
            title: languageState.texts.NewNote,
            content: [],
          });
        }
        return newNoteBoxes;
      }
      case "changeTitle": {
        const newNoteBoxes = [...noteBoxesState];
        const { index, newValue } = action;
        newNoteBoxes[index].title = newValue;
        return newNoteBoxes;
      }
      case "saveNote": {
        const newNoteBoxes = [...noteBoxesState];
        const { index, newNote } = action;
        const filter = newNoteBoxes[index].content.filter((item) => {
          if (item.id === newNote.id) return item;
          return null;
        });
        if (!filter.length) newNoteBoxes[index].content.push(newNote.id);
        return newNoteBoxes;
      }
      default:
        return [{ title: languageState.texts.NewNote, content: [] }];
    }
  };
  const [noteBoxes, setNoteBoxes] = useReducer(noteBoxesReducer, [
    { title: languageState.texts.NewNote, content: [] },
  ]);

  const notesReducer = (noteState, action) => {
    const { type } = action;
    switch (type) {
      case "readyToDeleteNote": {
        const newNoteState = [...noteState];
        const { id } = action;
        const filter = newNoteState.filter((item) => {
          console.log(item, id);
          if (item.id === id) return item;
          return null;
        });
        if (filter.length) filter[0].deleted = true;
        return newNoteState;
      }
      case "deleteNote": {
        const newNoteState = [...noteState];
        const { id } = action;
        let index = -1;
        const filter = newNoteState.filter((item, i) => {
          if (item.id === id) {
            index = i;
            return item;
          }
          return null;
        });
        if (filter.length) newNoteState.splice(index, 1);
        return newNoteState;
      }
      case "saveNote": {
        const newNoteState = [...noteState];
        const { newNote, editing } = action;
        if (editing) {
          let index = -1;
          const filter = newNoteState.filter((item, i) => {
            if (item.id === newNote.id) {
              index = i;
              return item;
            }
            return null;
          });
          if (filter.length) newNoteState[index] = newNote;
        } else {
          const filter = newNoteState.filter((item) => {
            if (item.id === newNote.id) return item;
            return null;
          });
          if (!filter.length) newNoteState.push(newNote);
        }
        return newNoteState;
      }
      default:
        return [];
    }
  };
  const [notes, setNotes] = useReducer(notesReducer, []);

  const inputSx = [{ width: "100%" }, { marginTop: "20px", width: "100%" }];

  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleForm = (d) => {
    const { title, content, id } = d;
    console.log(id);
    if (!id && id !== 0)
      setNoteBoxes({
        type: "saveNote",
        index: tab,
        newNote: { id: noteBoxes[tab].content.length },
      });
    setNotes({
      type: "saveNote",
      newNote: {
        id: id || id === 0 ? id : noteBoxes[tab].content.length,
        title,
        content,
      },
      editing,
    });
    reset({ title: "", content: "" });
    setEditing(false);
  };

  const formCss = css({
    width: "100%",
  });

  const cancelEdit = () => {
    setEditing(false);
    reset({ title: "", content: "" });
  };

  const onEditNote = (id) => {
    const filter = notes.filter((item) => {
      if (item.id === id) return item;
      return null;
    });
    if (filter.length) {
      setValue("title", filter[0].title);
      setValue("content", filter[0].content);
      setValue("id", id);
      setEditing(true);
    }
  };

  const onDeleteNote = (id) => {
    setNotes({ type: "readyToDeleteNote", id });
    setTimeout(() => {
      setNotes({ type: "deleteNote", id });
      setNoteBoxes({ type: "deleteNote", index: tab });
      setEditing(false);
    }, 500);
  };

  const addNoteBox = () => setNoteBoxes({ type: "add" });

  const deleteNoteBox = (index) => setNoteBoxes({ type: "delete", index });

  const shareNoteBox = (index) => {};

  const showSettings = () => {};

  const showAbout = () => {};

  return (
    <ThemeProvider theme={dark}>
      <CssBaseline />
      {/*<Notification
        visible={showNotification}
        type={notificationType}
        text={notificationText}
        onClose={handleNotificationClose}
      />*/}
      <FabButtons
        onAdd={addNoteBox}
        onDelete={deleteNoteBox}
        onShare={shareNoteBox}
        onSettings={showSettings}
        onAbout={showAbout}
      />
      <Box
        sx={{
          padding: "20px",
          width: "100vw",
        }}
      >
        <Typography variant="h4">{languageState.texts.Title}</Typography>
        <TabView
          value={tab}
          onChange={handleChange}
          tabs={noteBoxes.map((item, i) => item.title)}
          content={noteBoxes.map((item, i) => (
            <Box
              flexDirection="column"
              key={i}
              sx={{ width: { xs: "320px", md: "400px" }, margin: "10px 20px" }}
            >
              <SitoContainer alignItems="center" sx={{ marginBottom: "20px" }}>
                <TextField
                  label={languageState.texts.NoteTitleInput.Label}
                  placeholder={languageState.texts.NoteTitleInput.Placeholder}
                  value={item.title}
                  onChange={(e) => {
                    setNoteBoxes({
                      type: "changeTitle",
                      index: i,
                      newValue: e.target.value,
                    });
                  }}
                />
                <Tooltip title={languageState.texts.Tooltips.ShareNoteBox}>
                  <Button
                    onClick={shareNoteBox}
                    variant="contained"
                    color="primary"
                    sx={{ ...radialButton, marginTop: 0, marginLeft: "20px" }}
                  >
                    <IosShareIcon />
                  </Button>
                </Tooltip>
                <Tooltip title={languageState.texts.Tooltips.DeleteNoteBox}>
                  <Button
                    onClick={() => deleteNoteBox(i)}
                    variant="contained"
                    color="error"
                    sx={{ ...radialButton, marginTop: 0, marginLeft: "20px" }}
                  >
                    <DeleteIcon />
                  </Button>
                </Tooltip>
              </SitoContainer>
              <form className={formCss} onSubmit={handleSubmit(handleForm)}>
                {languageState.texts.Inputs.map((item, i) => (
                  <SitoContainer
                    key={item.id}
                    sx={{ position: i === 0 ? "relative" : undefined }}
                  >
                    <TextField
                      label={item.label}
                      id={item.id}
                      type={item.type}
                      multiline={item.multiline}
                      minRows={item.minRows}
                      maxRows={item.maxRows}
                      placeholder={item.placeholder}
                      sx={inputSx[i]}
                      {...register(item.id)}
                      required
                    />
                    {i === 0 && (
                      <>
                        <Tooltip title={languageState.texts.Tooltips.SaveNote}>
                          <IconButton
                            tabIndex={-1}
                            type="submit"
                            color="primary"
                            sx={{
                              position: "absolute",
                              transform: "translateY(-50%)",
                              top: "50%",
                              right: editing ? "40px" : "0px",
                            }}
                          >
                            {editing ? <SaveIcon /> : <AddCircleIcon />}
                          </IconButton>
                        </Tooltip>
                        {editing && (
                          <Tooltip title={languageState.texts.Tooltips.Cancel}>
                            <IconButton
                              tabIndex={-1}
                              type="submit"
                              color="error"
                              onClick={cancelEdit}
                              sx={{
                                position: "absolute",
                                transform: "translateY(-50%)",
                                top: "50%",
                                right: "0px",
                              }}
                            >
                              <CancelIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </>
                    )}
                  </SitoContainer>
                ))}
              </form>
              <SitoContainer
                sx={{
                  marginTop: "20px",
                  width: "100%",
                }}
              >
                <SitoContainer flexDirection="column" sx={{ width: "100%" }}>
                  {notes
                    .filter((ktem) => {
                      if (noteBoxes[i].content.indexOf(ktem.id) > -1)
                        return ktem;
                      return null;
                    })
                    .map((jtem, j) => (
                      <Paper
                        elevation={3}
                        key={jtem.id}
                        sx={{
                          width: "100%",
                          marginTop: j > 0 ? "20px" : "0",
                          padding: "1.3rem",
                          animation: jtem.deleted
                            ? "remove 0.5s ease"
                            : "scale 0.5s ease",
                        }}
                      >
                        <SitoContainer
                          flexDirection="column"
                          sx={{
                            width: "100%",
                          }}
                        >
                          <SitoContainer key={i} justifyContent="space-between">
                            <Typography variant="h5">{jtem.title}</Typography>
                            <SitoContainer>
                              <Tooltip
                                title={languageState.texts.Tooltips.EditNote}
                              >
                                <IconButton
                                  onClick={() => onEditNote(jtem.id)}
                                  id={`edit-${j}`}
                                  color="primary"
                                >
                                  <EditIcon id={`svgEdit-${j}`} />
                                </IconButton>
                              </Tooltip>
                              <Tooltip
                                title={languageState.texts.Tooltips.DeleteNote}
                              >
                                <IconButton
                                  onClick={() => onDeleteNote(jtem.id)}
                                  id={`delete-${i}`}
                                  color="primary"
                                >
                                  <DeleteIcon id={`svgDelete-${j}`} />
                                </IconButton>
                              </Tooltip>
                            </SitoContainer>
                          </SitoContainer>
                          <Typography variant="body1">
                            {jtem.content}
                          </Typography>
                        </SitoContainer>
                      </Paper>
                    ))}
                </SitoContainer>
              </SitoContainer>
            </Box>
          ))}
        />
      </Box>
    </ThemeProvider>
  );
};

export default App;
