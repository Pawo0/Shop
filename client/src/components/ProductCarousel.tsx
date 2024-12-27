import {Box, Typography} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import ProductCard from "./ProductCard.tsx";

import {ProductsInterface} from "../interfaces.tsx"
import {useEffect, useState} from "react";

export default function ProductCarousel(props: {products: string , title: string }) {
  const [products, setProducts] = useState<ProductsInterface[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = () => {
      console.log("fetching data")
      fetch(props.products)
        .then(res => res.json())
        .then(data => {
          setProducts(data)
          setLoading(false)
        })
        .catch(err => {
          console.error('Błąd pobierania danych:', err)
        })
    }

    fetchData()

    const intervalId = setInterval(() => {
      if (loading) {
        fetchData()
      } else {
        clearInterval(intervalId)
      }
    }, 5000) // Próbuj co 5 sekund

    return () => clearInterval(intervalId)
  }, [loading])

  const { title} = props
  const itemsPerPage = 4
  const pages = Math.ceil(products.length / itemsPerPage)
  return (
    <Box sx={{bgcolor: "primary.light", p: 4, margin: "24px 0"}}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
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