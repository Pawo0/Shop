import {Link} from "react-router-dom";
import {Button, Typography} from "@mui/material";

export default function Logo(){
  return (
    <Button
      component={Link}
      to={"/"}
      sx={{
        display: "flex",
        alignItems: "center",
        color: "black",
        textDecoration: "none",
      }}
      disableRipple
    >
      <Typography
        variant="h4"
        component="div"
        sx={{
          fontWeight: "bold",
          letterSpacing: 1,
          color: "secondary.main",
          fontSize: "2.5rem",
        }}
      >
        Szop
      </Typography>
    </Button>
  )
}