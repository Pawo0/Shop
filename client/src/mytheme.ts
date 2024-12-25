import {createTheme} from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: '#D9D9D9'
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