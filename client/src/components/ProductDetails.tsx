import {
  Box,
  Button,
  Card,
  CardContent,
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
          {/*todo ładniejsze wyswietlanie - brand na pewno nie jako cos głownego*/}
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
                <Typography variant={"h6"} p={2}>Rating: {product.rating} <Rating value={product.rating} readOnly/></Typography>
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
  )
}