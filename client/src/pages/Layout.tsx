import {
  Container,
} from "@mui/material";

import {Outlet} from "react-router-dom"
import Header from "../components/Header.tsx";

export default function Layout() {
  return (
    <Container sx={{minHeight: "100vh", overflow: "auto"}}>
      <Header />
      <Outlet />
    </Container>
  )
}