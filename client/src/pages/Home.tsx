import ProductCarousel from "../components/ProductCarousel.tsx";
import {Box} from "@mui/material";


export default function Home() {


  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
        padding: "24px 0"
      }}
    >
      <ProductCarousel products={"http://localhost:5000/api/products?limit=8"} title={"Currently hot"}/>
      <ProductCarousel products={"http://localhost:5000/api/products?limit=8&category=groceries"} title={"NOT  hot"}/>
    </Box>
  );
}