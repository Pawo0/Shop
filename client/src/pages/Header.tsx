import {
  AppBar,
  Container,
} from "@mui/material";

import {Outlet} from "react-router-dom"
import React, {useState} from "react";
import SearchBar from "../components/SearchBar.tsx";
import MenuMain from "../components/MenuMain.tsx";
import SzpanInfo from "../components/SzpanInfo.tsx";

export default function Header() {
  const [favoriteCnt, setFavoriteCnt] = useState(1)
  const [cartCnt, setCartCnt] = useState(0)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container sx={{minHeight: "100vh", overflow: "auto"}}>
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
        <SzpanInfo/>
      </AppBar>
      <Outlet context={{favoriteCnt, setFavoriteCnt, cartCnt, setCartCnt}}/>
    </Container>
  )
}