import {Box, Divider, FormControl, IconButton, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import {Search} from "@mui/icons-material";
import React, {useContext, useState} from "react";
import {SearchContext} from "../contexts/SearchContext.tsx";
import useCategories from "../hooks/useCategories.ts";
import {useNavigate} from "react-router-dom";

export default function SearchBar() {
  const [search, setSearch] = useState<string>("")
  const [category, setCategory] = useState<string>("all")
  const searchContext = useContext(SearchContext);
  const navigate = useNavigate()

  const categories = useCategories()

  if (!searchContext) {
    throw new Error("SearchContext must be used within a SearchProvider");
  }
  const {setSearchQuery} = searchContext;
  const handleSearch = () => {
    setSearchQuery(search)
    navigate(`/category/${category}`)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <Box sx={{
      mx: 2,
      bgcolor: "white",
      boxShadow: 1,
      borderRadius: 2,
      display: "flex",
      alignItems: "center",
      flex: 1,
      maxWidth: "550px"
    }}>
      <TextField
        variant={"outlined"}
        placeholder={"Search"}
        size={"small"}
        fullWidth
        sx={{
          'fieldset': {border: "none"}
        }}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
        value={search}
      />
      <Divider orientation={"vertical"} flexItem/>
      <FormControl variant={"standard"} sx={{width: "250px"}}>

        <InputLabel id="demo-simple-select-label">category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          label="Category"
          sx={{padding: "0 5px"}}
          size={"small"}
        >
          {
            categories.map(cat => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
      <Divider orientation={"vertical"} flexItem/>
      <IconButton onClick={handleSearch}>
        <Search/>
      </IconButton>
    </Box>
  )
}