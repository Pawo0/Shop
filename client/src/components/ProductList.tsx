import {Grid2} from "@mui/material";
import ProductCard from "./ProductCard.tsx";
import {ProductsInterface} from "../interfaces.tsx";
import LoadingProductCard from "./LoadingProductCard.tsx";

export default function ProductList({products, loading, productsPerPage}: {
  products: ProductsInterface[],
  loading: boolean,
  productsPerPage: number
}) {
  return (
    <Grid2 container spacing={2} p={2}>
      {
        !loading ?
          products.map(product => (
            <Grid2 key={product.id} display={"flex"} justifyContent={"center"} size={{xs: 12, sm: 4, md: 3, lg: 2.4}}>
              <ProductCard product={product}/>
            </Grid2>
          )) :
          [...Array(productsPerPage).keys()].map(idx => (
            <Grid2 key={idx} display={"flex"} justifyContent={"center"} size={{xs: 12, sm: 4, md: 3, lg: 2.4}}>
              <LoadingProductCard/>
            </Grid2>
          ))
      }
    </Grid2>
  )
}