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

  const { notesState, setNotesState } = useNotes();

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
        setNotesState({ type: "set", previous: JSON.parse(previous) });
      } catch (err) {
        console.error(err);
      }
  }, [notesState, setNotesState]);

  const [widthViewport, setWidthViewport] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const handleResize = () => {
      setWidthViewport(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

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
                  <Sidebar
                    widthViewport={widthViewport}
                    open={showSidebar}
                    handleClose={handleSidebar}
                  />
                  <Container
                    className="main"
                    flexDirection="column"
                    sx={{
                      width: "100%",
                      transition: "all 500ms ease",
                      transform:
                        widthViewport < 600 || showSidebar
                          ? ""
                          : "translateX(-250px)",
                    }}
                  >
                    <Container
                      sx={{
                        flexDirection: "column",
                        transition: "all 500ms ease",
                        width:
                          widthViewport < 600 || showSidebar
                            ? "100%"
                            : "calc(100vw - 90px)",
                      }}
                    >
                      <Navbar
                        widthViewport={widthViewport}
                        showSidebar={showSidebar}
                        toggleSidebar={handleSidebar}
                      />
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
