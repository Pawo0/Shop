import SearchBar from "./SearchBar.tsx";
import MenuMain from "./MenuMain.tsx";
import InfoBar from "./InfoBar.tsx";
import {AppBar} from "@mui/material";

export default function Header({favoriteCnt, cartCnt, handleMenuClick, anchorEl, handleClose}:any) {
  return(
    <AppBar position={"static"} sx={{bgcolor: "white"}}>
      <SearchBar
        favoriteCnt={favoriteCnt}
        cartCnt={cartCnt}
      />
      <MenuMain
        handleMenuClick={handleMenuClick}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
      <InfoBar/>
    </AppBar>
    )

}