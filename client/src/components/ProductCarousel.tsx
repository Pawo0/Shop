import {Box, Divider, Typography} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import ProductCard from "./ProductCard.tsx";

import {ProductsInterface} from "../interfaces.tsx"
import {useState} from "react";
import useFetchWithInterval from "../hooks/useFetchWithInterval.ts";

export default function ProductCarousel(props: { products: string, title: string }) {
  const [products, setProducts] = useState<ProductsInterface[]>([])
  const [loading, setLoading] = useState(true)

  useFetchWithInterval({
    url: props.products,
    onFetchData: (data: any) => {
      setProducts(data.products)
    },
    interval: 5000,
    loading,
    setLoading
  })


  const {title} = props
  const itemsPerPage = 4
  const pages = Math.ceil(products.length / itemsPerPage)
  return (
    <Box sx={{bgcolor: "primary.light", p: 4, margin: "24px 0"}}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Divider/>
      <Carousel interval={5000} navButtonsAlwaysVisible sx={{padding: "10px 64px"}}>
        {
          products.length > 0 ?
            [...Array(pages).keys()].map(page => (
              <Box key={page} id={"xdd"} sx={{display: "flex", justifyContent: "center", gap: 2}}>
                {products.slice(page * itemsPerPage, (page + 1) * itemsPerPage).map(product => (
                  <ProductCard key={product.id} product={product}/>
                ))}
              </Box>
            )) :
            [...Array(2).keys()].map(idx => (
              <Box key={idx} sx={{display: "flex", justifyContent: "center", gap: 2}}>
                {[...Array(4).keys()].map((idx2) => (
                  <ProductCard key={idx2} empty={true}/>
                ))}
              </Box>
            ))


        }

      </Carousel>
    </Box>
  )
}