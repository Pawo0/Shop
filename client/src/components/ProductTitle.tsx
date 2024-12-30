import {Typography} from "@mui/material";
import {ProductsInterface} from "../interfaces.tsx";

export default  function ProductTitle({loading, notFound, product}: {loading: boolean, notFound: boolean, product: ProductsInterface | null}) {
  return (
    <Typography variant={"h4"} p={2}>{
      loading ?
        "Loading..."
        :
        notFound ?
          "Product not found"
          :
          product?.title
    }</Typography>
  )
}