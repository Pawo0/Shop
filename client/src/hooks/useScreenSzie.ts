import {useMediaQuery, useTheme} from "@mui/material";

export default function useScreenSize() {
  const theme = useTheme();
  const isExtraSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMediumScreen = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  return {isExtraSmallScreen, isSmallScreen, isMediumScreen, isLargeScreen}
}
