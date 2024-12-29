import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {useContext} from "react";
import {SearchContext} from "../contexts/SearchContext.tsx";

export default function MenuButton({category, fullWidth}: { category: string, fullWidth?: boolean }) {
  const searchContext = useContext(SearchContext)
  const fullWidthStyle = fullWidth ? {justifyContent:"flex-start"} : {}

  if (!searchContext) {
    throw new Error("SearchContext must be used within a SearchProvider");
  }
  const {setSearchQuery} = searchContext;
  return (
    <Button
      component={Link}
      to={`/category/${category.toLowerCase()}`}
      color={"secondary"}
      onClick={() => setSearchQuery("")}
      fullWidth={fullWidth}
      sx={fullWidthStyle}
    >
      {category}
    </Button>
  )
}