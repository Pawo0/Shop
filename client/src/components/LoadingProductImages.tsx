import {Box, CircularProgress} from "@mui/material";

export default function LoadingProductImages() {
  return (
    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: 500}}>
      <CircularProgress/>
    </Box>
  )
}