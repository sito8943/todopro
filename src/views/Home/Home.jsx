import {useState, useReducer, useEffect, useCallback} from "react";
import {useForm} from "react-hook-form";
import {Link} from "react-router-dom";

import PropTypes from "prop-types";

// in-viewport
import inViewport from "in-viewport";

// @emotion
import {css} from "@emotion/css";

// sito components
import SitoContainer from "sito-container";

// @mui icons
import AddCircleIcon from "@mui/icons-material/AddCircle";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import SaveIcon from "@mui/icons-material/Save";
import IosShareIcon from "@mui/icons-material/IosShare";
import DeleteIcon from "@mui/icons-material/Delete";
import CancelIcon from "@mui/icons-material/Cancel";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LoginIcon from "@mui/icons-material/Login";

// @mui components
import {
    Box,
    Paper,
    Tooltip,
    IconButton,
    Typography,
    TextField,
} from "@mui/material";

// own components
import TabView from "../../components/TabView/TabView";
import Accordion from "../../components/Accordion/Accordion";
import FabButtons from "../../components/FabButtons/FabButtons";
import RadialButton from "../../components/RadialButton/RadialButton";

// contexts
import {useLanguage} from "../../context/LanguageProvider";

const Home = (props) => {
    const {toggleMode, mode} = props;
    const {register, handleSubmit, reset, setValue} = useForm();
    const {languageState} = useLanguage();

    const [editing, setEditing] = useState(false);

    const noteBoxesReducer = (noteBoxesState, action) => {
        const {type} = action;
        switch (type) {
            case "init": {
                return [];
            }
            case "delete": {
                const newNoteBoxes = [...noteBoxesState];
                const {index} = action;
                newNoteBoxes.splice(index, 1);
                return newNoteBoxes;
            }
            case "deleteNote": {
                const newNoteBoxes = [...noteBoxesState];
                const {index, id} = action;
                newNoteBoxes[index].content.splice(
                    newNoteBoxes[index].content.indexOf(id),
                    1
                );
                return newNoteBoxes;
            }
            case "add": {
                let newNoteBoxes = [];
                const {index} = action;
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
                const {index, newValue} = action;
                newNoteBoxes[index].title = newValue;
                return newNoteBoxes;
            }
            case "saveNote": {
                const newNoteBoxes = [...noteBoxesState];
                const {index, newNote} = action;
                const filter = newNoteBoxes[index].content.filter((item) => {
                    if (item.id === newNote.id) return item;
                    return null;
                });
                if (!filter.length) newNoteBoxes[index].content.push(newNote.id);
                return newNoteBoxes;
            }
            default:
                return [{title: languageState.texts.NewNote, content: []}];
        }
    };
    const [noteBoxes, setNoteBoxes] = useReducer(noteBoxesReducer, [
        {title: languageState.texts.NewNote, content: []},
    ]);

    const notesReducer = (noteState, action) => {
        const {type} = action;
        switch (type) {
            case "readyToDeleteNote": {
                const newNoteState = [...noteState];
                const {id} = action;
                const filter = newNoteState.filter((item) => {
                    if (item.id === id) return item;
                    return null;
                });
                if (filter.length) filter[0].deleted = true;
                return newNoteState;
            }
            case "deleteNote": {
                const newNoteState = [...noteState];
                const {id} = action;
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
                const {newNote, editing} = action;
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

    const inputSx = [{width: "100%"}, {marginTop: "20px", width: "100%"}];

    const [tab, setTab] = useState(0);

    const handleChange = (event, newValue) => {
        setTab(newValue);
        if (newValue === noteBoxes.length) setNoteBoxes({type: "add"});
    };

    const handleForm = (d) => {
        const {title, content, id} = d;
        if (!id && id !== 0)
            setNoteBoxes({
                type: "saveNote",
                index: tab,
                newNote: {id: noteBoxes[tab].content.length},
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
        reset({title: "", content: ""});
        setEditing(false);
    };

    const formCss = css({
        width: "100%",
    });

    const cancelEdit = () => {
        setEditing(false);
        reset({title: "", content: ""});
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
        setNotes({type: "readyToDeleteNote", id});
        setTimeout(() => {
            setNotes({type: "deleteNote", id});
            setNoteBoxes({type: "deleteNote", index: tab});
            setEditing(false);
        }, 500);
    };

    const addNoteBox = () => {
        setNoteBoxes({type: "add"});
        setTab(tab + 1);
    };

    const deleteNoteBox = (index) => {
        setNoteBoxes({type: "delete", index});
        if (index === noteBoxes.length - 1) setTab(tab - 1);
    };

    const shareNoteBox = (index) => {
    };

    const showSettings = () => {
    };

    const showAbout = () => {
    };

    const [modeFixed, setModeFixed] = useState(false);
    const [tabsFixed, setTabsFixed] = useState(false);
    const [showAddNote, setShowAddNote] = useState(false);
    const [showForm, setShowForm] = useState(false);

    const onScroll = useCallback(
        (e) => {
            //* checking for app-title
            const titleApp = document.getElementById("app-title");
            if (titleApp) {
                const isTitleVisible = inViewport(titleApp);
                if (isTitleVisible) setModeFixed(false);
                else setModeFixed(true);
            }
            //* checking for form
            const form = document.getElementById("form");
            if (form) {
                const isFormVisible = inViewport(form);
                if (isFormVisible) {
                    setShowAddNote(false);
                    setShowForm(false);
                } else setShowAddNote(true);
            }
            //* checking for tabs
            const tabsDOM = document.getElementById("tabs");
            if (tabsDOM) {
                const isTabsVisible = inViewport(tabsDOM);
                if (isTabsVisible) setTabsFixed(false);
                else setTabsFixed(true);
            }
        },
        [setModeFixed, setShowAddNote]
    );

    useEffect(() => {
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [onScroll]);

    return (
        <>
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
                <SitoContainer
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{width: "100%", marginLeft: "20px"}}
                >
                    <Typography id="app-title" variant="h4">
                        {languageState.texts.Title}
                    </Typography>
                    <SitoContainer>
                        <Tooltip
                            title={
                                mode
                                    ? languageState.texts.Tooltips.Mode.ToDark
                                    : languageState.texts.Tooltips.Mode.ToLight
                            }
                        >
                            <RadialButton
                                sx={{
                                    marginTop: 0,
                                    position: modeFixed ? "fixed" : "relative",
                                    top: modeFixed ? "55px" : 0,
                                    right: modeFixed ? "20px" : "20px",
                                    zIndex: 20,
                                    transition: "top 500ms ease",
                                }}
                                onClick={toggleMode}
                                icon={mode ? <DarkModeIcon/> : <LightModeIcon/>}
                            />
                        </Tooltip>
                        <Link to="/login">
                            <Tooltip title={languageState.texts.Tooltips.Login}>
                                <RadialButton
                                    sx={{
                                        marginTop: 0,
                                        position: modeFixed ? "fixed" : "relative",
                                        top: modeFixed ? "55px" : 0,
                                        right: modeFixed ? "70px" : "110px",
                                        zIndex: 20,
                                        transition: "top 500ms ease",
                                    }}
                                    icon={<LoginIcon/>}
                                />
                            </Tooltip>
                        </Link>
                        <Tooltip title={languageState.texts.Tooltips.AddNoteBox}>
                            <RadialButton
                                sx={{
                                    marginTop: 0,
                                    position: "fixed",
                                    top: "55px",
                                    right: "120px",
                                    zIndex: showAddNote ? 20 : -1,
                                    transition: "all 500ms ease",
                                    transform: showAddNote ? "scale(1)" : "scale(0)",
                                }}
                                onClick={() => setShowForm(true)}
                                icon={<NoteAddIcon/>}
                            />
                        </Tooltip>
                    </SitoContainer>
                </SitoContainer>

                <TabView
                    value={tab}
                    onFixedTabs={tabsFixed}
                    onChange={handleChange}
                    tabs={noteBoxes.map((item, i) => item.title)}
                    content={noteBoxes.map((item, i) => (
                        <Box
                            key={i}
                            sx={{
                                margin: "10px 0",
                                display: "flex",
                                flexDirection: {md: "row", xs: "column"},
                            }}
                        >
                            <SitoContainer
                                flexDirection="column"
                                sx={{width: {xs: "320px", md: "400px"}}}
                            >
                                <Paper
                                    elevation={3}
                                    sx={{
                                        marginBottom: "20px",
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "20px",
                                    }}
                                >
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
                                        <RadialButton
                                            onClick={shareNoteBox}
                                            sx={{marginTop: 0, marginLeft: "20px"}}
                                            icon={<IosShareIcon/>}
                                        />
                                    </Tooltip>
                                    <Tooltip title={languageState.texts.Tooltips.DeleteNoteBox}>
                                        <RadialButton
                                            onClick={() => deleteNoteBox(i)}
                                            sx={{marginTop: 0, marginLeft: "20px"}}
                                            color="error"
                                            icon={<DeleteIcon/>}
                                        />
                                    </Tooltip>
                                </Paper>
                                <form
                                    id="form"
                                    className={formCss}
                                    onSubmit={handleSubmit(handleForm)}
                                >
                                    <Paper
                                        elevation={3}
                                        sx={{
                                            padding: "20px",
                                            position: showForm ? "fixed" : "relative",
                                            zIndex: 10,
                                        }}
                                    >
                                        {languageState.texts.Inputs.map((item, i) => (
                                            <SitoContainer
                                                key={item.id}
                                                sx={{position: i === 0 ? "relative" : undefined}}
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
                                                />
                                                {i === 0 && (
                                                    <>
                                                        <Tooltip
                                                            title={languageState.texts.Tooltips.SaveNote}
                                                        >
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
                                                                {editing ? <SaveIcon/> : <AddCircleIcon/>}
                                                            </IconButton>
                                                        </Tooltip>
                                                        {editing && (
                                                            <Tooltip
                                                                title={languageState.texts.Tooltips.Cancel}
                                                            >
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
                                                                    <CancelIcon/>
                                                                </IconButton>
                                                            </Tooltip>
                                                        )}
                                                    </>
                                                )}
                                            </SitoContainer>
                                        ))}
                                    </Paper>
                                </form>
                            </SitoContainer>
                            <Box
                                sx={{
                                    flex: 1,
                                    display: "flex",
                                    marginLeft: {md: "20px", xs: 0},
                                    marginTop: {xs: "20px", md: 0},
                                    width: "100%",
                                }}
                            >
                                <SitoContainer flexDirection="column" sx={{width: "100%"}}>
                                    {notes
                                        .filter((ktem) => {
                                            if (noteBoxes[i].content.indexOf(ktem.id) > -1)
                                                return ktem;
                                            return null;
                                        })
                                        .map((jtem, j) => (
                                            <Accordion
                                                jtem={jtem}
                                                j={j}
                                                onEditNote={onEditNote}
                                                onDeleteNote={onDeleteNote}
                                            />
                                        ))}
                                </SitoContainer>
                            </Box>
                        </Box>
                    ))}
                />
            </Box>
        </>
    );
};

Home.propTypes = {
    toggleMode: PropTypes.func.isRequired,
    mode: PropTypes.bool.isRequired,
};

export default Home;
