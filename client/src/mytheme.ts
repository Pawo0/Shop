import {createTheme} from "@mui/material";
import {grey} from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: grey[500]
    },
    secondary: {
      main: '#134ab0',
    },
  },
  typography: {
    fontFamily: [
      "Open Sans",
      "serif",
    ].join(','),
    h1: {
      fontSize: "3rem",
      fontWeight: 600
    }
  }
})

export {theme}