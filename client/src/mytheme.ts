import {createTheme} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      light: "#e0e0e0",
      main: '#D9D9D9',
      dark: "#979797"
    },
    secondary: {
      light: '#4b61a1',
      main: '#1E3A8A',
      dark: '#152860'
    },
  },
  typography: {
    h1: {
      fontSize: "3rem",
      fontWeight: 600
    }
  }
})

export {theme}