import HeaderFirstPart from "./HeaderFirstPart.tsx";
import MenuMain from "./MenuMain.tsx";
import InfoBar from "./InfoBar.tsx";
import {AppBar} from "@mui/material";


export default function Header({handleMenuClick, anchorEl, handleClose}:any) {
  return(
    <AppBar position={"static"} sx={{bgcolor: "white"}}>
      <HeaderFirstPart />
      <MenuMain
        handleMenuClick={handleMenuClick}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
      <InfoBar/>
    </AppBar>
    )

}