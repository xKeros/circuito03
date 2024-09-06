import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NavBar from "./components/static/NavBar";
import { useDispatch } from "react-redux";
import { setAuthTokens } from "./components/Users/authSlice";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#000000",
    },
    primary: {
      main: "#151717",
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
  const dispatch = useDispatch();
  useEffect(() => {
    // Cargar el userId desde LocalStorage si existe
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      dispatch(setAuthTokens({ userId: storedUserId }));
    }
  }, [dispatch]);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Outlet /> {/* Aquí se renderizará el contenido de las rutas */}
    </ThemeProvider>
  );
};

export default App;
