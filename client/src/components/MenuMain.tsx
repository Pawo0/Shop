import {Box, Button, Menu, MenuItem, Toolbar} from "@mui/material";
import {ArrowDropDown} from "@mui/icons-material";
import MenuButton from "./MenuButton.tsx";
import useCategories from "./hooks/useCategories.ts";

export default function MenuMain({handleMenuClick, anchorEl, handleClose}: any) {
  const howManyCategories = 8
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
                      <MenuButton category={category}/>
                    </MenuItem>
                  ))}
                </Menu>
            </>
        }
      </Box>
    </Toolbar>
  )
}