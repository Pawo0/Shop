import {useContext} from "react";
import {ShoppingContext} from "../contexts/ShoppingContext.tsx";
import {
  Card,
  CardMedia,
  Typography,
  Container,
  IconButton,
  Box,
  Grid2, CardContent, CardActions, Divider,
} from "@mui/material";
import {Add, Remove, Delete} from "@mui/icons-material";

export default function Cart() {
  const shoppingContext = useContext(ShoppingContext)!;
  const {
    cart,
    cartTotalQuantity,
    cartTotalProducts,
    cartTotalPrice,
    decreaseQuantity,
    increaseQuantity,
    deleteProduct
  } = shoppingContext;

  const handleRemove = (productId: string) => {
    decreaseQuantity(productId);
  };

  const handleAdd = (productId: string) => {
    increaseQuantity(productId);
  }

  const handleDelete = (productId: string) => {
    deleteProduct(productId);
  }
  const cartElements = cart.map((product, index) => (
    <Grid2 size={12} key={index}>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "16px",
          borderRadius: "8px",
        }}
      >
        <CardMedia
          component="img"
          sx={{width: 100, height: 100, borderRadius: "8px"}}
          image={product.thumbnail}
          alt={product.title}
        />
        <CardContent sx={{display: "flex", alignItems: "center", flex: 1, justifyContent: "space-between"}}>
          <Box>
            <Typography variant="body1" color="text.secondary">
              {product.title}
            </Typography>
          </Box>
          <Divider orientation={"vertical"} flexItem/>
          <Box sx={{textAlign: "right"}}>
            <Typography variant="body1" sx={{fontWeight: "bold"}}>
              {(product.price * product.quantity).toFixed(2)} PLN
            </Typography>
            {
              product.quantity > 1 &&
                <Typography variant={"caption"} color={"text.secondary"}>
                    per unit {product.price.toFixed(2)} PLN
                </Typography>
            }
          </Box>


        </CardContent>
        <CardActions>
          <Box sx={{textAlign: "center"}}>

            <Box sx={{display: "flex", alignItems: "center"}}>
              <IconButton color="primary" onClick={() => handleRemove(product.productId)}>
                <Remove/>
              </IconButton>

              <Typography variant="body1" sx={{marginX: "8px"}}>
                {product.quantity}
              </Typography>
              <IconButton color="primary" onClick={() => handleAdd(product.productId)}>
                <Add/>
              </IconButton>
            </Box>
          </Box>
          <IconButton color="error" onClick={() => handleDelete(product.productId)}>
            <Delete/>
          </IconButton>
        </CardActions>
      </Card>
    </Grid2>
  ));

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={8} container>
          {cartElements}
        </Grid2>
        <Grid2 size={4}>
          <Card sx={{padding: "16px", borderRadius: "8px"}}>
            <Typography variant="h6" gutterBottom>
              Summary
            </Typography>
            <Divider/>
            <Box sx={{display: "flex", justifyContent: "space-between", my: 1}}>
              <Typography variant="body1" color="text.secondary">
                Total products
              </Typography>
              <Typography variant="body1" sx={{fontWeight: "bold"}}>
                {cartTotalProducts}
              </Typography>
            </Box>
            <Box sx={{display: "flex", justifyContent: "space-between", my: 1}}>
              <Typography variant="body1" color="text.secondary">
                Total quantity
              </Typography>
              <Typography variant="body1" sx={{fontWeight: "bold"}}>
                {cartTotalQuantity}
              </Typography>
            </Box>
            <Divider/>
            <Box sx={{display: "flex", justifyContent: "space-between", my: 1}}>
              <Typography variant="body1" color="text.secondary">
                Total
              </Typography>
              <Typography variant="body1" sx={{fontWeight: "bold"}}>
                {cartTotalPrice.toFixed(2)} PLN
              </Typography>
            </Box>
          </Card>
        </Grid2>
      </Grid2>
    </Container>
  );
}
