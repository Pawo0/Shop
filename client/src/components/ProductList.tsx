import {Grid2} from "@mui/material";
import ProductCard from "./ProductCard.tsx";
import {ProductsInterface} from "../interfaces.tsx";

export default function ProductList({products}: { products: ProductsInterface[] }) {
  return (
    <Grid2 container spacing={2} p={2}>
      {
        products.map(product => (
          <Grid2 key={product.id} display={"flex"} justifyContent={"center"} size={{xs: 12, sm: 4, md: 3, lg: 2.4}}>
            <ProductCard product={product}/>
          </Grid2>
        ))
      }
    </Grid2>
  )
}