import {Box, Divider, Typography} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import ProductCard from "./ProductCard.tsx";

import {ProductsInterface} from "../interfaces.tsx"
import {useState} from "react";
import useFetchWithInterval from "../hooks/useFetchWithInterval.ts";
import useScreenSize from "../hooks/useScreenSzie.ts";
import LoadingProductCard from "./LoadingProductCard.tsx";

export default function ProductCarousel(props: { products: string, title: string }) {
  const [products, setProducts] = useState<ProductsInterface[]>([])
  const [loading, setLoading] = useState(true)

  useFetchWithInterval({
    url: props.products,
    onFetchData: (data) => {
      setProducts(data.products)
    },
    interval: 5000,
    loading,
    setLoading
  })

  const {isSmallScreen, isMediumScreen, isLargeScreen} = useScreenSize()

  const {title} = props
  const itemsPerPage = isLargeScreen ? 4 : isMediumScreen ? 3 : isSmallScreen ? 2 : 1
  const pages = Math.ceil(products.length / itemsPerPage)
  return (
    <Box sx={{boxShadow: 6, p: 4, margin: "24px 0"}}>
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
                  <LoadingProductCard key={idx2}/>
                ))}
              </Box>
            ))


        }

      </Carousel>
    </Box>
  )
}