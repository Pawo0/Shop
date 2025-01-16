import {Box, IconButton, Toolbar} from "@mui/material";
import {Close, Search} from "@mui/icons-material";
import SearchBar from "./SearchBar.tsx";
import {useEffect, useState} from "react";

import useScreenSize from "../hooks/useScreenSzie.ts";
import Logo from "./Logo.tsx";
import HeaderButtons from "./HeaderButtons.tsx";


export default function HeaderFirstPart() {


  const [searchOpen, setSearchOpen] = useState(false)

  const {isExtraSmallScreen, isSmallScreen, isMediumScreen} = useScreenSize()

  useEffect(() => {
    if (isMediumScreen) setSearchOpen(false)
  }, [isMediumScreen]);

  const handleSearchToggle = () => {
    setSearchOpen(prev => !prev)
  }

  return (<Toolbar sx={{
    bgcolor: "primary.light",
    display: "flex",
    justifyContent: searchOpen ? "center" : "space-between",
    padding: 2,
    borderTopRightRadius: "15px",
    borderTopLeftRadius: "15px"
  }}>
    {!searchOpen && <Logo/>}

    {!(isExtraSmallScreen || isSmallScreen) && <SearchBar/>}

    <Box sx={{display: "flex", gap: 1}}>
      {
        (isExtraSmallScreen || isSmallScreen) &&
          <Box sx={{display: "flex"}}>
            {searchOpen && <SearchBar/>}
              <IconButton onClick={handleSearchToggle}>
                {searchOpen ? <Close/> : <Search/>}
              </IconButton>
          </Box>
      }

      {!searchOpen && <HeaderButtons/>
      }
    </Box>
  </Toolbar>)
}