import HeaderFirstPart from "./HeaderFirstPart.tsx";
import MenuMain from "./MenuMain.tsx";
import InfoBar from "./InfoBar.tsx";
import {AppBar} from "@mui/material";
import React, {useState} from "react";


export default function Header() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <AppBar position={"static"}
            sx={{bgcolor: "white", mt: 2, borderTopRightRadius: "15px", borderTopLeftRadius: "15px"}}>
      <HeaderFirstPart/>
      <MenuMain
        handleMenuClick={handleMenuClick}
        anchorEl={anchorEl}
        handleClose={handleClose}
      />
      <InfoBar/>
    </AppBar>
  )

}