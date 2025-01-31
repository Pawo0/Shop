import {
  Box,
  Button,
  Card,
  CardContent, CardHeader,
  CircularProgress,
  Divider, Grid2,
  IconButton, Rating,
  TextField,
  Typography
} from "@mui/material";
import {Add, Remove} from "@mui/icons-material";
import {ProductsInterface} from "../interfaces.tsx";
import {useNavigate} from "react-router-dom";
import React, {Dispatch, SetStateAction, useContext} from "react";
import {AuthContext} from "../contexts/AuthContext.tsx";
import {ShoppingContext} from "../contexts/ShoppingContext.tsx";

export default function ProductDetails({
                                         size,
                                         product,
                                         loading,
                                         notFound,
                                         quantity,
                                         handleDecrease,
                                         handleIncrease,
                                         setQuantity
                                       }: {
  size: number | { xs?: number, sm?: number, md?: number, lg?: number },
  product: ProductsInterface | null,
  loading: boolean,
  notFound: boolean,
  quantity: number,
  handleDecrease: () => void,
  handleIncrease: () => void,
  setQuantity: Dispatch<SetStateAction<number>>
}) {

  const navigate = useNavigate()

  const authContext = useContext(AuthContext)!
  const {userId} = authContext

  const shoppingContext = useContext(ShoppingContext)!
  const {addProduct, cart} = shoppingContext
  const productInCart = cart.filter(el => el.productId == product?._id)
  let productQuantityInCart = 0;
  if (productInCart.length > 0) productQuantityInCart = productInCart[0].quantity

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = Number(e.currentTarget.value)
    if (product && newQuantity > 1 && newQuantity < product.stock - productQuantityInCart) setQuantity(newQuantity)
    else if (product && newQuantity > product.stock - productQuantityInCart) setQuantity(Math.max(1, product.stock - productQuantityInCart))
    else if (!newQuantity || newQuantity < 1) setQuantity(1)
  }

  const handleButtonClick = (productId: string) => {
    if (userId) {
      addProduct(productId, quantity)
      setQuantity(1)
    } else {
      navigate(`/signin?redirect=/product/${productId}`)
    }
  }

  return (
    <Grid2 size={size}>
      <Card>
        <CardContent>
          {loading ? (
            <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: 500}}>
              <CircularProgress/>
            </Box>
          ) : notFound ? (
            <Typography variant="h5" p={2}>Product not found</Typography>
          ) : (
            product && (
              <Box>
                <Typography variant="h6" gutterBottom>Price: {product.price} PLN</Typography>
                <Typography variant="h6" gutterBottom>Category: {product.category}</Typography>
                <Typography variant="h6" gutterBottom>Brand: {product.brand ? product.brand : "unknown"}</Typography>
                <Box sx={{display: "flex", alignItems: "center", mb: 2}}>
                  <Rating value={product.rating} readOnly/>
                  <Typography variant="body1" sx={{ml: 1}}>{product.rating}</Typography>
                </Box>
                <Typography variant="body1" component={"p"}>{product.description}</Typography>
                <Divider sx={{my: 2}}/>
                <Box sx={{display: "flex", alignItems: "center", mb: 2}}>
                  <IconButton disabled={quantity <= 1} onClick={handleDecrease}>
                    <Remove/>
                  </IconButton>
                  <TextField value={quantity} onChange={handleChange} sx={{width: 50, textAlign: "center"}}/>
                  <IconButton disabled={quantity >= product.stock - productQuantityInCart} onClick={handleIncrease}>
                    <Add/>
                  </IconButton>
                  <Typography variant="body1" sx={{ml: 2}}>
                    {product.stock} in stock
                    <Typography component={"span"} variant={"body2"}>
                      {productQuantityInCart > 0 && ` (${productQuantityInCart} in cart)`}
                    </Typography>
                  </Typography>
                </Box>
                <Button variant="contained" color="secondary" fullWidth
                        disabled={product.stock - productQuantityInCart === 0}
                        onClick={() => handleButtonClick(product._id)}
                        sx={{
                          '&:active': {
                            transform: "scale(0.95)"
                          }
                        }}
                >
                  Add to cart
                </Button>
              </Box>
            )
          )}
        </CardContent>
      </Card>

      <Card sx={{mt: 5}}>
        <CardContent>
          <Typography variant="h5" gutterBottom>Shipping information</Typography>
          <Divider sx={{mb: 2}}/>
          <Typography variant="body1" component={"p"}>{product?.shippingInformation}</Typography>
          <Divider sx={{my: 2}}/>
          <Typography variant="h5" gutterBottom>Return policy</Typography>
          <Divider sx={{mb: 2}}/>
          <Typography variant="body1" component={"p"}>{product?.returnPolicy}</Typography>
        </CardContent>
      </Card>

      <Card sx={{mt: 5}}>
        <CardHeader title={"Product details"}/>
        <Divider/>
        <CardContent>
          <Typography variant={"h6"} gutterBottom>Weight</Typography>
          <Typography variant={"body1"}>{product?.weight} kg</Typography>
          <Divider sx={{my: 2}}/>
          <Typography variant={"h6"} gutterBottom>Dimensions</Typography>
          <Typography variant={"body1"}>Width: {product?.dimensions.width} cm</Typography>
          <Typography variant={"body1"}>Height: {product?.dimensions.height} cm</Typography>
          <Typography variant={"body1"}>Depth: {product?.dimensions.depth} cm</Typography>
          <Divider sx={{my: 2}}/>
          <Typography variant={"h6"} gutterBottom>Availability status</Typography>
          <Typography variant={"body1"}>{product?.availabilityStatus}</Typography>

        </CardContent>
      </Card>
    </Grid2>
  )
}