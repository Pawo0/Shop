import {Outlet} from "react-router-dom";
import {Card, Container} from "@mui/material";

export default function User() {
  return (
    <Container>
      <Card sx={{mt: 2, boxShadow: 6}}>
        <Outlet/>
      </Card>
    </Container>
  )
}