import {Container, Divider, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";

export default function Footer() {
  const [year, setYear] = useState("2025");
  const [sponsor, setSponsor] = useState("sponosr")
  const location = useLocation()
  useEffect(() => {
    // todo error with cors api
    fetch('https://cors-anywhere.herokuapp.com/https://getfullyear.com/api/year')
      .then(response => response.json())
      .then(data => {
        setYear(data.year_string)
        setSponsor(data.sponsored_by)
      });

  }, [location])
  return (
    <Container sx={{p:5, display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", gap: 4}}>
      <Divider flexItem/>
      <Typography>&copy; {year} - {sponsor}</Typography>
    </Container>
  )
}