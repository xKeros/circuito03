import React from "react";
import { Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./components/static/NavBar";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000000",
    },
    primary: {
      main: "#90caf9",
    },
    secondary: {
      main: "#f48fb1",
    },
    text: {
      primary: "#ffffff",
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: "#424242",
        },
      },
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Outlet /> {/* Aquí se renderizará el contenido de las rutas */}
    </ThemeProvider>
  );
};

export default App;
