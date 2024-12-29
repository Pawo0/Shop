import {
  Card,
  CardMedia,
  Grid2,
  Typography,
  Box,
  Divider,
  CircularProgress,
  CardContent,
  Button,
  IconButton, TextField
} from "@mui/material";
import {useEffect, useState} from "react";
import {ProductsInterface} from "../interfaces.tsx";
import {useParams} from "react-router-dom";
import {Add, Remove} from "@mui/icons-material";

export default function Product() {
  const params = useParams()
  const [product, setProduct] = useState<ProductsInterface | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const [quantity, setQuantity] = useState(1)

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prevState => prevState - 1)
    }
  }

  const handleIncrease = () => {
    if (product && quantity < product?.stock) {
      setQuantity(prevState => prevState + 1)
    }
  }

  useEffect(() => {
    const fetchData = () => {
      fetch(`http://localhost:5000/api/products/${params.id}`)
        .then(res => {
          if (res.status === 404) {
            setNotFound(true)
            setLoading(false)
          }
          return res.json()
        })
        .then(data => {
          setProduct(data.product)
          setSelectedImage(data.product.images[0])
          setLoading(false)
        })
        .catch(err => {
          console.error('Error with loading data:', err)
        })
    }
    fetchData()
    const intervalId = setInterval(() => {
      if (loading) {
        fetchData()
      } else {
        clearInterval(intervalId)
      }
    }, 5000)
    return () => {
      clearInterval(intervalId)
    }
  }, [loading]);

  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image)
  }

  return (
    <Grid2 container spacing={3} padding={3}>
      <Grid2 size={8}>
        <Card sx={{boxShadow: 6}}>
          <Typography variant={"h4"} p={2}>{
            loading ?
              "Loading..."
              :
              notFound ?
                "Product not found"
                :
                product?.title
          }</Typography>
          <Divider/>
          {loading ? (
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: 500}}>
              <CircularProgress/>
            </Box>
          ) : (
            product && selectedImage &&
            <Box sx={{display: "flex", flexDirection: "row"}}>
                <Box display="flex" justifyContent="center" m={2} flexDirection={"column"}>
                  {
                    product.images.map((image, index) => (
                      <CardMedia
                        key={index}
                        component="img"
                        height="100"
                        image={image}
                        alt={`${product.title} thumbnail ${index + 1}`}
                        onClick={() => handleThumbnailClick(image)}
                        sx={{
                          cursor: "pointer",
                          border: selectedImage === image ? "2px solid blue" : "2px solid transparent",
                          margin: "0 5px"
                        }}
                      />
                    ))
                  }
                </Box>
                <CardMedia component="img" height="500" image={selectedImage} alt={product.title}/>
            </Box>
          )}
        </Card>
      </Grid2>
      <Grid2 size={4}>
        <Card>
          <CardContent>

            <Typography variant={"h5"} p={2}>{
              loading ?
                "Loading..."
                :
                notFound ?
                  "Producent not found"
                  :
                  <><Typography component={"span"} sx={{fontSize: "1rem"}}>from</Typography> {product?.brand}</>
            }</Typography>
            <Divider/>
            {loading ? (
              <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: 500}}>
                <CircularProgress/>
              </Box>
            ) : (
              product &&
              <Box sx={{display: "flex", flexDirection: "column"}}>
                  <Typography variant={"h6"} p={2}>Price: {product.price} zł</Typography>
                  <Typography variant={"h6"} p={2}>Category: {product.category}</Typography>
                  <Typography variant={"h6"} p={2}>Brand: {product.brand}</Typography>
                  <Typography variant={"h6"} p={2}>Rating: {product.rating}</Typography>
                  <Divider/>
                  <Box sx={{display: "flex", alignItems: "center", m: 2}}>
                      <IconButton disabled={quantity === 1} onClick={handleDecrease}>
                          <Remove/>
                      </IconButton>
                      <TextField value={quantity} sx={{width: 50, justifyContent:"center", display:"flex"}}/>
                      <IconButton disabled={quantity === product?.stock} onClick={handleIncrease}>
                          <Add />
                      </IconButton>
                      <Typography variant={"body1"} >
                          {product.stock} in stock
                      </Typography>
                  </Box>
                  <Button variant={"contained"} color={"secondary"}>
                      Add to cart
                  </Button>
              </Box>
            )}
          </CardContent>
        </Card>
      </Grid2>
    </Grid2>
  )
}