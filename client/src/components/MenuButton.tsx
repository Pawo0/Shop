import {Link} from "react-router-dom";
import {Button} from "@mui/material";
import {useContext} from "react";
import {SearchContext} from "../contexts/SearchContext.tsx";

export default function MenuButton({category}: { category: string }) {
  const searchContext = useContext(SearchContext)
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
    >
      {category}
    </Button>
  )
}