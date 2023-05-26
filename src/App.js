import React, {
  Suspense,
  lazy,
  useCallback,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useForm } from "react-hook-form";

// @emotion
import { css } from "@emotion/css";

// @mui icons
import { Delete, Edit } from "@mui/icons-material/";

// @mui
import { ThemeProvider, CssBaseline } from "@mui/material";

// contexts
import { useLanguage } from "./context/LanguageProvider";

// theme
import dark from "./assets/theme/dark";

// components
import Loading from "./components/Loading/Loading";
const NewNote = lazy(() => import("./components/NewNote/NewNote"));
const Navbar = lazy(() => import("./components/Navbar/Navbar"));
const Sidebar = lazy(() => import("./components/Sidebar/Sidebar"));
const Container = lazy(() => import("./components/Container/Container"));

// @mui/components
const Paper = lazy(() => import("./components/MUI/Paper"));
const IconButton = lazy(() => import("./components/MUI/IconButton"));
const Typography = lazy(() => import("./components/MUI/Typography"));

const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const [showSidebar, setShowSidebar] = useState(true);

  const handleSidebar = useCallback(() => {
    return setShowSidebar(!showSidebar);
  }, [showSidebar]);

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

            {/* <Container
              sx={{
                marginTop: "20px",
                width: "100%",
              }}
            >
              <Container flexDirection="column" sx={{ width: "100%" }}>
                {notes.map((item, i) => (
                  <Paper
                    elevation={3}
                    sx={{
                      width: "100%",
                      marginTop: i > 0 ? "20px" : "0",
                      padding: "1.3rem",
                      animation: "scale 0.5s ease",
                    }}
                  >
                    <Container
                      flexDirection="column"
                      sx={{
                        width: "100%",
                      }}
                    >
                      <Container key={i} justifyContent="space-between">
                        <Typography variant="h5">{item.title}</Typography>
                        <Container>
                          <IconButton
                            onClick={onEdit}
                            id={`edit-${i}`}
                            color="primary"
                          >
                            <Edit id={`svgEdit-${i}`} />
                          </IconButton>
                          <IconButton
                            onClick={onDelete}
                            id={`delete-${i}`}
                            color="primary"
                          >
                            <Delete id={`svgDelete-${i}`} />
                          </IconButton>
                        </Container>
                      </Container>
                      <Typography variant="body1">{item.content}</Typography>
                    </Container>
                  </Paper>
                ))}
              </Container>
            </Container> */}
          </Container>
        </Container>
      </ThemeProvider>
    </Suspense>
  );
};

export default App;
