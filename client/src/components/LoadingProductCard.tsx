import {Box, Card, CircularProgress,} from "@mui/material";

export default function LoadingProductCard() {

  return (
    <Card sx={{bgcolor: "primary.light", color: "white", minWidth: 200, width: 200}}>
      <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: 350}}>
        <CircularProgress/>
      </Box>
    </Card>
  )

}
