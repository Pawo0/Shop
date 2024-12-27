import {Box, Button, Menu, MenuItem, Tabs, Toolbar} from "@mui/material";
import {ArrowDropDown} from "@mui/icons-material";
import {Link} from "react-router-dom";

export default function MenuMain({handleMenuClick, anchorEl, handleClose}: any) {
  return (
    <Toolbar sx={{bgcolor: "primary.main"}}>
      <Tabs>

      </Tabs>

      <Box>
        {['All','Women', 'Men', 'Beauty', 'Home', 'Kitchen', 'Sports', 'Fragrances', 'Furniture', 'Groceries','Tops'].map(el => (
          <Button component={Link} to={`/category/${el.toLowerCase()}`} key={el} color={"secondary"}>
            {el}
          </Button>
        ))}
        <Button onClick={handleMenuClick} color={"secondary"} aria-selected={true}>
          Other
          <ArrowDropDown/>
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          {['Laptops', 'Sunglasses', 'Smartphones', 'Skin-care', 'Vehicle', 'Motorcycle', 'Mobile-accessories'].map(el => (
            <MenuItem key={el} onClick={handleClose}>
              <Button component={Link} to={`/category/${el.toLowerCase()}`} color={"secondary"}>{el}</Button>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Toolbar>
  )
}