import React, { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// @mui
import { ThemeProvider, CssBaseline } from "@mui/material";

// contexts
import { useNotes } from "./context/NotesProvider";
import { useLanguage } from "./context/LanguageProvider";

// theme
import dark from "./assets/theme/dark";

// components
import Loading from "./components/Loading/Loading";
const NewNote = lazy(() => import("./components/NewNote/NewNote"));
const Navbar = lazy(() => import("./components/Navbar/Navbar"));
const Sidebar = lazy(() => import("./components/Sidebar/Sidebar"));
const Container = lazy(() => import("./components/Container/Container"));

const App = () => {
  const [loading, setLoading] = useState(true);

  const { notesState, setNotesStates } = useNotes();

  useEffect(() => {
    setLoading(false);
  }, []);

  const [showSidebar, setShowSidebar] = useState(true);

  const handleSidebar = useCallback(() => {
    return setShowSidebar(!showSidebar);
  }, [showSidebar]);

  useEffect(() => {
    if (notesState && Object.values(notesState).length)
      localStorage.setItem("to-do-pro-notes", JSON.stringify(notesState));
    if (
      (!notesState || !Object.values(notesState).length) &&
      localStorage.getItem("to-do-pro-notes") !== "null"
    )
      try {
        const previous = localStorage.getItem("to-do-pro-notes");
        setNotesStates({ type: "set", previous: JSON.parse(previous) });
      } catch (err) {
        console.error(err);
      }
  }, [notesState, setNotesStates]);

  return (
    <Suspense
      fallback={
        <Loading
          sx={{
            width: "100%",
            height: "100vh",
            position: "absolute",
            left: 0,
            top: 0,
            zIndex: 99,
          }}
        />
      }
    >
      <ThemeProvider theme={dark}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route
              path="/*"
              element={
                <Container
                  sx={{
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    width: "100vw",
                    height: "100vh",
                  }}
                >
                  {loading ? (
                    <Loading
                      sx={{
                        width: "100%",
                        height: "100%",
                        position: "fixed",
                        left: 0,
                        top: 0,
                        zIndex: 99,
                      }}
                    />
                  ) : null}
                  <Sidebar open={showSidebar} handleClose={handleSidebar} />
                  <Container
                    flexDirection="column"
                    sx={{
                      width: "100%",
                      padding: "8px 20px",
                      transition: "all 500ms ease",
                      transform: showSidebar ? "" : "translateX(-250px)",
                    }}
                  >
                    <Container
                      sx={{
                        flexDirection: "column",
                        transition: "all 500ms ease",
                        width: showSidebar ? "100%" : "calc(100vw - 90px)",
                      }}
                    >
                      <Navbar showSidebar={showSidebar} />
                      <NewNote showSidebar={showSidebar} />
                    </Container>
                  </Container>
                </Container>
              }
            />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
