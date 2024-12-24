import {AppBar, Box, Button, Container, IconButton, TextField, Toolbar, Typography} from "@mui/material";
import {
  AccountBoxOutlined,
  Favorite,
  FavoriteBorder,
  Search,
  ShoppingCart,
  ShoppingCartOutlined
} from "@mui/icons-material";
import {Outlet} from "react-router-dom"
import {useState} from "react";

export default function Header() {
  const cntStyles = {
    position: "absolute",
    bgcolor: "secondary.main",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    color: "white",
    fontSize: "1rem",
    top: 0,
    right: 0
  }
  const [favoriteCnt, setFavoriteCnt] = useState(1)
  const [cartCnt, setCartCnt] = useState(0)
  return (
    <Container sx={{bgcolor: "tomato", height: "100vh"}}>
      <AppBar position={"static"} sx={{bgcolor: "white"}}>
        <Toolbar sx={{bgcolor: "primary.light", display: "flex", justifyContent: "space-between"}}>
          <Typography variant={"h1"} component={"div"}>
            Agro
          </Typography>
          <Box sx={{
            mx: 2,
            bgcolor: "white",
            boxShadow: 1,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            flexGrow: 1,
            maxWidth: "550px"
          }}>
            <TextField
              variant={"outlined"}
              placeholder={"Search"}
              size={"small"}
              fullWidth
              sx={{
                '& fieldset': {border: "none"}
              }}
            />
            <IconButton>
              <Search/>
            </IconButton>
          </Box>
          <Box sx={{display: "flex"}}>
            <IconButton sx={{position: "relative"}}>
              {
                favoriteCnt > 0 ?
                  <><Favorite/><Box sx={cntStyles}>{favoriteCnt}</Box></> :
                  <FavoriteBorder/>
              }
            </IconButton>
            <IconButton>
              {
                cartCnt > 0 ?
                  <><ShoppingCart/><Box sx={cntStyles}>{cartCnt}</Box></> :
                  <ShoppingCartOutlined/>
              }
            </IconButton>
            <Button endIcon={<AccountBoxOutlined/>} variant={"outlined"} sx={{color: "#676767"}}>
              My account
            </Button>
          </Box>
        </Toolbar>
        <Toolbar sx={{bgcolor: "primary.main"}}>

        </Toolbar>
        <Toolbar sx={{bgcolor: "secondary.main"}}>

        </Toolbar>
      </AppBar>
      <Outlet context={{favoriteCnt, setFavoriteCnt, cartCnt, setCartCnt}}/>
    </Container>
  )
}