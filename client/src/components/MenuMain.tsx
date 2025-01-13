import {Box, Button, Menu, MenuItem, Toolbar} from "@mui/material";
import {ArrowDropDown} from "@mui/icons-material";
import MenuButton from "./MenuButton.tsx";
import useCategories from "../hooks/useCategories.ts";
import React from "react";
import useScreenSize from "../hooks/useScreenSzie.ts";

export default function MenuMain({handleMenuClick, anchorEl, handleClose}: {
  handleMenuClick: (e: React.MouseEvent<HTMLButtonElement>) => void,
  anchorEl: HTMLElement | null,
  handleClose: () => void
}) {
  const {isExtraSmallScreen, isSmallScreen, isMediumScreen} = useScreenSize()
  let howManyCategories;
  if (isExtraSmallScreen) {
    howManyCategories = 3;
  }else if (isSmallScreen){
    howManyCategories = 5
  } else if (isMediumScreen) {
    howManyCategories = 7;
  } else {
    howManyCategories = 8;
  }
  const categories = useCategories()

  return (
    <Toolbar sx={{bgcolor: "primary.main"}}>

      <Box>
        {categories.slice(0, howManyCategories).map(category => (
          <MenuButton category={category} key={category}/>
        ))}
        { // if there are more than 5 categories, show the "Other" button
          categories.length > howManyCategories &&
            <>
                <Button onClick={handleMenuClick} color={"secondary"} aria-selected={true}>
                    Other
                    <ArrowDropDown/>
                </Button>

                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>

                  {categories.slice(howManyCategories).map(category => (
                    <MenuItem key={category} onClick={handleClose}>
                      <MenuButton category={category} fullWidth={true}/>
                    </MenuItem>
                  ))}
                </Menu>
            </>
        }
      </Box>
    </Toolbar>
  )
}