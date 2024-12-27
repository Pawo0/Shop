import {Badge, Box, Button, IconButton, TextField, Toolbar, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {
  AccountBoxOutlined,
  Favorite,
  FavoriteBorder,
  Search,
  ShoppingCart,
  ShoppingCartOutlined
} from "@mui/icons-material";
import {useRef} from "react";

export default function HeaderFirstPart({favoriteCnt, cartCnt }:any){
  const textFieldRef = useRef<HTMLInputElement | null>(null)

  const handleSearchClick = () => {
    textFieldRef.current?.focus();
  }
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
        My&nbsp;account
      </Button>
    </Box>
  </Toolbar>)
}