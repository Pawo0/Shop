import {Badge, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {
  AccountBoxOutlined,
  Favorite,
  FavoriteBorder,
  ShoppingCart,
  ShoppingCartOutlined
} from "@mui/icons-material";
import SearchBar from "./SearchBar.tsx";

export default function HeaderFirstPart({favoriteCnt, cartCnt}: any) {


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

      <SearchBar />


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
        My&nbsp;account
      </Button>
    </Box>
  </Toolbar>)
}