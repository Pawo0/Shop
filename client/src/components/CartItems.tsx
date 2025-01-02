import {Box, Card, CardActions, CardContent, CardMedia, Divider, Grid2, IconButton, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {Add, Delete, Remove} from "@mui/icons-material";
import {useContext} from "react";
import {ShoppingContext} from "../contexts/ShoppingContext.tsx";

export default function CartItems() {
  const shoppingContext = useContext(ShoppingContext)!;
  const {
    cart,
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
  return (
    <>
      {
        cart.map((product, index) => (
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
                  <Typography component={Link} to={`/product/${product.productId}`} variant="body1" color="text.secondary">
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
        ))
      }
    </>
  )
}