import {Badge, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {
  AccountBoxOutlined,
  ReceiptLong, Search,
  ShoppingCart,
  ShoppingCartOutlined
} from "@mui/icons-material";
import SearchBar from "./SearchBar.tsx";
import {useContext} from "react";
import {ShoppingContext} from "../contexts/ShoppingContext.tsx";
import {UserContext} from "../contexts/UserContext.tsx";
import useScreenSize from "../hooks/useScreenSzie.ts";


export default function HeaderFirstPart() {
  const shoppingContext = useContext(ShoppingContext)
  const {cartTotalQuantity} = shoppingContext!

  const userContext = useContext(UserContext)
  const {username} = userContext!

  const {isExtraSmallScreen, isSmallScreen} = useScreenSize()


  return (<Toolbar sx={{bgcolor: "primary.light", display: "flex", justifyContent: "space-between", padding: 2}}>
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
    {!(isExtraSmallScreen || isSmallScreen) && <Box sx={{
      mx: 2,
      bgcolor: "white",
      boxShadow: 1,
      borderRadius: 2,
      display: "flex",
      alignItems: "center",
      flexGrow: 1,
      maxWidth: "550px"
    }}>

        <SearchBar/>


    </Box>
    }

    <Box sx={{display: "flex", gap: 1}}>
      {
        (isExtraSmallScreen || isSmallScreen) &&
          <IconButton>
              <Search/>
          </IconButton>
      }
      <IconButton component={Link} to={username ? "/orderhist" : "/signin?redirect=/orderhist"}>
        <ReceiptLong/>
      </IconButton>
      <IconButton component={Link} to={username ? "/cart" : "/signin?redirect=/cart"}>
        {
          cartTotalQuantity > 0 ?
            <Badge badgeContent={cartTotalQuantity} color={"secondary"}><ShoppingCart/></Badge> :
            <ShoppingCartOutlined/>
        }
      </IconButton>{username ?
      <Button component={Link} to={"/user"} endIcon={<AccountBoxOutlined/>} variant={"outlined"}
              sx={{color: "#676767"}}>{username}</Button> :
      <Button component={Link} to={"/signin"} endIcon={<AccountBoxOutlined/>} variant={"outlined"}
              sx={{color: "#676767"}}>
        My&nbsp;account
      </Button>}
    </Box>
  </Toolbar>)
}