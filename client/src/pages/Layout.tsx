import {
  Container,
} from "@mui/material";

import {Outlet} from "react-router-dom"
import React, {useState} from "react";
import Header from "../components/Header.tsx";

export default function Layout() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleMenuClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(e.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Container sx={{minHeight: "100vh", overflow: "auto"}}>
      <Header
        anchorEl={anchorEl}
        handleMenuClick={handleMenuClick}
        handleClose={handleClose}
      />
      <Outlet />
    </Container>
  )
}