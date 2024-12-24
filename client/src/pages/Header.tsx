import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography
} from "@mui/material";
import {
  AccountBoxOutlined, ArrowDropDown,
  Favorite,
  FavoriteBorder, KeyboardReturn, LocalShipping, Schedule,
  Search,
  ShoppingCart,
  ShoppingCartOutlined
} from "@mui/icons-material";
import {Link, Outlet} from "react-router-dom"
import {useRef, useState} from "react";

export default function Header() {
  const [favoriteCnt, setFavoriteCnt] = useState(1)
  const [cartCnt, setCartCnt] = useState(0)

  const textFieldRef = useRef<HTMLInputElement | null>(null)

  const handleSearchClick = () => {
    textFieldRef.current?.focus();
  }


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
        <Toolbar sx={{bgcolor: "primary.light", display: "flex", justifyContent: "space-between"}}>
          <Button component={Link} to={"/"} sx={{color: "black"}} disableRipple>
            <Typography variant={"h1"} component={"div"}>
              Agro
            </Typography>
          </Button>
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
              inputRef={textFieldRef}
              variant={"outlined"}
              placeholder={"Search"}
              size={"small"}
              fullWidth
              sx={{
                'fieldset': {border: "none"}
              }}
            />
            <IconButton onClick={handleSearchClick}>
              <Search/>
            </IconButton>
          </Box>
          <Box sx={{display: "flex"}}>
            <IconButton sx={{position: "relative"}}>
              {
                favoriteCnt > 0 ?
                  <Badge badgeContent={favoriteCnt} color={"secondary"}><Favorite/></Badge> :
                  <FavoriteBorder/>
              }
            </IconButton>
            <IconButton>
              {
                cartCnt > 0 ?
                  <Badge badgeContent={cartCnt} color={"secondary"}><ShoppingCart/></Badge> :
                  <ShoppingCartOutlined/>
              }
            </IconButton>
            <Button endIcon={<AccountBoxOutlined/>} variant={"outlined"} sx={{color: "#676767"}}>
              My account
            </Button>
          </Box>
        </Toolbar>
        <Toolbar sx={{bgcolor: "primary.main"}}>
          <Box>
            {['Woman', 'Men', 'Beauty', 'Home', 'Kitchen', 'Sports accessories', 'Sunglasses'].map(el => (
              <Button key={el} color={"secondary"}>
                {el}
              </Button>
            ))}
            <Button onClick={handleMenuClick} color={"secondary"} aria-selected={true} >
              Other
              <ArrowDropDown/>
            </Button>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              <MenuItem>
                <Button color={"secondary"}>
                  xd
                </Button>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
        <Toolbar sx={{bgcolor: "secondary.main", display: "flex", justifyContent: "space-around", height:"30px"}}>
          <Box color={"white"}>
            <Typography>
              <KeyboardReturn/>
              Free refund
            </Typography>
          </Box>
          <Box color={"white"}>
            <Typography>
              <LocalShipping/>
              Fast delivery
            </Typography>
          </Box>
          <Box color={"white"}>
            <Typography>
              <Schedule/>
              Fast shipping
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet context={{favoriteCnt, setFavoriteCnt, cartCnt, setCartCnt}}/>
    </Container>
  )
}