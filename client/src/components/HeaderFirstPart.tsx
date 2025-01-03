import {Badge, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {
  AccountBoxOutlined,
  ReceiptLong,
  ShoppingCart,
  ShoppingCartOutlined
} from "@mui/icons-material";
import SearchBar from "./SearchBar.tsx";
import {useContext} from "react";
import {ShoppingContext} from "../contexts/ShoppingContext.tsx";
import {UserContext} from "../contexts/UserContext.tsx";


export default function HeaderFirstPart() {
  const shoppingContext = useContext(ShoppingContext)
  const {cartTotalQuantity} = shoppingContext!

  const userContext = useContext(UserContext)
  const {username} = userContext!


  return (<Toolbar sx={{bgcolor: "primary.light", display: "flex", justifyContent: "space-between"}}>
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

      <SearchBar/>


    </Box>

    <Box sx={{display: "flex", gap: 1}}>
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