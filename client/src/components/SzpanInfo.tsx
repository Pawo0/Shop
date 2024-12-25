import {Box, Toolbar, Typography} from "@mui/material";
import {KeyboardReturn, LocalShipping, Schedule} from "@mui/icons-material";

export default function SzpanInfo() {
  const typoStyle = {display: "flex", fontSize:14}
  return (
    <Toolbar variant={"dense"} sx={{
      bgcolor: "secondary.main",
      display: "flex",
      justifyContent: "space-around"
    }}>
        <Box color={"white"}>
          <Typography sx={typoStyle}>
            <KeyboardReturn fontSize={"small"}/>
            Free refund
          </Typography>
        </Box>
        <Box color={"white"}>
          <Typography sx={typoStyle} >
            <LocalShipping fontSize={"small"} />
            Fast delivery
          </Typography>
        </Box>
        <Box color={"white"}>
          <Typography sx={typoStyle}>
            <Schedule fontSize={"small"}/>
            Fast shipping
          </Typography>
        </Box>
    </Toolbar>
  )
}