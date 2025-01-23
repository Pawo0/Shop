import {Container, Divider, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import axios from "axios";

export default function Footer() {
  const [year, setYear] = useState("2025");
  const [sponsor, setSponsor] = useState("sponosr")
  const location = useLocation()

  useEffect(() => {
    axios.get('http://localhost:5000/getyear')
      .then(response => {
        setYear(response.data.year_string)
        setSponsor(response.data.sponsored_by)
      })
      .catch(err => console.error('Error fetching year:', err))


  }, [location])
  return (
    <Container sx={{p:5, display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column", gap: 4}}>
      <Divider flexItem/>
      <Typography>&copy; {year} - {sponsor}</Typography>
    </Container>
  )
}