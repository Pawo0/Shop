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
      <ProductCarousel products={"http://localhost:5000/api/products?limit=16&lowStock=true"} title={"Low stock"}/>
      <ProductCarousel products={"http://localhost:5000/api/products?limit=16&rating=4.9"} title={"Best rated"}/>
      <ProductCarousel products={"http://localhost:5000/api/products?limit=16&maxWeight=1"} title={"Under 1 kilo"}/>
    </Box>
  );
}