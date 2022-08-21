import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// @emotion
import { css } from "@emotion/css";

// sito components
import SitoContainer from "sito-container";

// @mui icons
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

// @mui components
import {
  ThemeProvider,
  CssBaseline,
  Paper,
  IconButton,
  Typography,
  TextField,
} from "@mui/material";

// theme
import dark from "./assets/theme/dark";

// own components
import FabButtons from "./components/FabButtons/FabButtons";

// contexts
import { useLanguage } from "./context/LanguageProvider";

// context
import { useNotification } from "./context/NotificationProvider";

const App = () => {
  const { register, handleSubmit, reset } = useForm();
  const { languageState } = useLanguage();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [notes, setNotes] = useState([]);

  const inputSx = [{ width: "100%" }, { marginTop: "20px", width: "100%" }];

  const handleForm = (d) => {
    const { title, content } = d;
    setCount(count + 1);
    setTitle(title);
    setContent(content);
  };

  const formCss = css({
    width: "100%",
  });

  const onEdit = (e) => {
    const { id } = e.target;
    const parsedId = id.split("-");
    const numberId = Number(parsedId[1]);
  };

  const onDelete = (e) => {
    let node = e.target;
    if (e.target.nodeName.toLowerCase() === "path") node = e.target.parentNode;
    const { id } = node;
    const parsedId = id.split("-");
    const numberId = Number(parsedId[1]);
    setCount(count - 1);
    notes[numberId].deleted = true;
    setTimeout(() => {
      setCount(count + 1);
      notes.splice(numberId, 1);
    }, 500);
  };

  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log(notes);
  }, []);

  useEffect(() => {
    console.log(count);
    if (title !== "" && content !== "") {
      notes.push({ title, content });
      setTitle("");
      setContent("");
      reset({ title: "", content: "" });
    }
  }, [count]);

  const addNoteBox = () => {};

  const deleteNoteBox = () => {};

  const shareNoteBox = () => {};

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
      <SitoContainer
        justifyContent="center"
        sx={{ paddingTop: "1.5rem", width: "100vw", height: "100vh" }}
        className="App"
      >
        <SitoContainer
          flexDirection="column"
          sx={{ width: "80%", maxWidth: "400px" }}
        >
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
                  <IconButton
                    type="submit"
                    color="primary"
                    sx={{
                      position: "absolute",
                      transform: "translateY(-50%)",
                      top: "50%",
                      right: "0px",
                    }}
                  >
                    <AddCircleIcon />
                  </IconButton>
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
              {notes.map((item, i) => (
                <Paper
                  elevation={3}
                  sx={{
                    width: "100%",
                    marginTop: i > 0 ? "20px" : "0",
                    padding: "1.3rem",
                    animation: item.deleted
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
                      <Typography variant="h5">{item.title}</Typography>
                      <SitoContainer>
                        <IconButton
                          onClick={onEdit}
                          id={`edit-${i}`}
                          color="primary"
                        >
                          <EditIcon id={`svgEdit-${i}`} />
                        </IconButton>
                        <IconButton
                          onClick={onDelete}
                          id={`delete-${i}`}
                          color="primary"
                        >
                          <DeleteIcon id={`svgDelete-${i}`} />
                        </IconButton>
                      </SitoContainer>
                    </SitoContainer>
                    <Typography variant="body1">{item.content}</Typography>
                  </SitoContainer>
                </Paper>
              ))}
            </SitoContainer>
          </SitoContainer>
        </SitoContainer>
      </SitoContainer>
    </ThemeProvider>
  );
};

export default App;
