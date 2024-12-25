import {Box, Typography} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import ProductCard from "./ProductCard.tsx";

import {ProductsInterface} from "../interfaces.tsx"

export default function ProductCarousel(props: { products: ProductsInterface[], title: string }) {
  const {products, title} = props
  const itemsPerPage = 4
  const pages = Math.ceil(products.length / itemsPerPage)
  return (
    <Box sx={{bgcolor: "primary.light", p: 4, margin: "24px 0"}}>
      <Typography variant="h5" gutterBottom >
        {title}
      </Typography>
      <Carousel navButtonsAlwaysVisible sx={{padding: "10px 64px"}}>

        {
          [...Array(pages).keys()].map(page => (
            <Box id={"xdd"} sx={{display:"flex", justifyContent:"center", gap:2}}>
              {products.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map(product => (

                <ProductCard product={product}/>
              ))}
            </Box>
          ))
        }

        {/*{products.map((product) => (*/}
        {/*  <ProductCard product={product} />*/}
        {/*))}*/}
      </Carousel>
    </Box>
  )
}