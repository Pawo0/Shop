import {Box, Button, Menu, MenuItem, Tabs, Toolbar} from "@mui/material";
import {ArrowDropDown} from "@mui/icons-material";

export default function MenuMain({handleMenuClick, anchorEl, handleClose}: any) {
  return (
    <Toolbar sx={{bgcolor: "primary.main"}}>
      <Tabs>

      </Tabs>

      <Box>
        {['Woman', 'Men', 'Beauty', 'Home', 'Kitchen', 'Sports accessories', 'Fragrances', 'Furniture', 'Groceries'].map(el => (
          <Button key={el} color={"secondary"}>
            {el}
          </Button>
        ))}
        <Button onClick={handleMenuClick} color={"secondary"} aria-selected={true}>
          Other
          <ArrowDropDown/>
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          {['Laptops', 'Sunglasses', 'Smartphones', 'Skin-care', 'Tops', 'Vehicle', 'Motorcycle', 'Mobile-accessories'].map(el => (
            <MenuItem key={el} onClick={handleClose}>
              <Button color={"secondary"}>{el}</Button>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Toolbar>
  )
}