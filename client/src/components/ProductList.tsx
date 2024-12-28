import {Grid2} from "@mui/material";
import ProductCard from "./ProductCard.tsx";
import {ProductsInterface} from "../interfaces.tsx";

export default function ProductList({products}: { products: ProductsInterface[] }) {
  return (
    <Grid2 container spacing={2} p={2}>
      {
        products.map(product => (
          <Grid2 key={product.id} size={2.4}>
            <ProductCard product={product}/>
          </Grid2>
        ))
      }
    </Grid2>
  )
}