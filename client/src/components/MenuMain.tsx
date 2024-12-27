import {Box, Button, Menu, MenuItem, Toolbar} from "@mui/material";
import {ArrowDropDown} from "@mui/icons-material";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

export default function MenuMain({handleMenuClick, anchorEl, handleClose}: any) {
  const [categories, setCategories] = useState<string[]>([])
  const howManyCategories = 5

  useEffect(() => {
    fetch('http://localhost:5000/api/products/categories')
      .then(res => res.json())
      .then(data => {
        const cat = data.categories.filter((el: string) => (!el.match('^men') && !el.match('^women')))
        setCategories(cat)
      })
  }, []);

  return (
    <Toolbar sx={{bgcolor: "primary.main"}}>

      <Box>
        {['All', 'Women', 'Men', ...categories.slice(0, howManyCategories)].map(category => (
          <Button component={Link} to={`/category/${category.toLowerCase()}`} key={category} color={"secondary"}>
            {category}
          </Button>
        ))}
        { // if there are more than 5 categories, show the "Other" button
          categories.length > howManyCategories &&
            <>
                <Button onClick={handleMenuClick} color={"secondary"} aria-selected={true}>
                    Other
                    <ArrowDropDown/>
                </Button>

                <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>

                  {categories.slice(howManyCategories).map(el => (
                    <MenuItem key={el} onClick={handleClose}>
                      <Button component={Link} to={`/category/${el.toLowerCase()}`} color={"secondary"}>{el}</Button>
                    </MenuItem>
                  ))}
                </Menu>
            </>
        }
      </Box>
    </Toolbar>
  )
}