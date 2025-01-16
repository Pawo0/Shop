import {Badge, Box, Button, IconButton} from "@mui/material";
import {Link} from "react-router-dom";
import {AccountBoxOutlined, ReceiptLong, ShoppingCart, ShoppingCartOutlined} from "@mui/icons-material";
import {useContext} from "react";
import {ShoppingContext} from "../contexts/ShoppingContext.tsx";
import {UserContext} from "../contexts/UserContext.tsx";
import useScreenSize from "../hooks/useScreenSzie.ts";

export default function HeaderButtons() {
  const shoppingContext = useContext(ShoppingContext)
  const {cartTotalQuantity} = shoppingContext!

  const {isExtraSmallScreen} = useScreenSize()

  const userContext = useContext(UserContext)
  const {username} = userContext!
  return (
    <Box>
      <IconButton component={Link} to={username ? "/orderhist" : "/signin?redirect=/orderhist"}>
        <ReceiptLong/>
      </IconButton>
      <IconButton component={Link} to={username ? "/cart" : "/signin?redirect=/cart"}>
        {
          cartTotalQuantity > 0 ?
            <Badge badgeContent={cartTotalQuantity} color={"secondary"}><ShoppingCart/></Badge> :
            <ShoppingCartOutlined/>
        }
      </IconButton>
      {
        isExtraSmallScreen ?
          <IconButton component={Link} to={username ? "/user" : "/signin"}>
            <AccountBoxOutlined />
          </IconButton>
          :
        <Button component={Link}
                to={username ? "/user" : "/signin"}
                endIcon={<AccountBoxOutlined/>}
                variant={"outlined"}
                sx={{color: "#676767", ml:1}}>
          {username ? username : "My account"}
        </Button>

      }

    </Box>
  )
}