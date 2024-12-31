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

export default function ProductDetails({size, product, loading, notFound, quantity, handleDecrease, handleIncrease}: {
  size: number,
  product: ProductsInterface | null,
  loading: boolean,
  notFound: boolean,
  quantity: number,
  handleDecrease: () => void,
  handleIncrease: () => void
}) {
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
                <Typography variant="h6" gutterBottom>Price: {product.price} zł</Typography>
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
                  <TextField value={quantity} sx={{width: 50, textAlign: "center"}}/>
                  <IconButton disabled={quantity >= product.stock} onClick={handleIncrease}>
                    <Add/>
                  </IconButton>
                  <Typography variant="body1" sx={{ml: 2}}>
                    {product.stock} in stock
                  </Typography>
                </Box>
                <Button variant="contained" color="secondary" fullWidth
                        disabled={product.stock === 0}>
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