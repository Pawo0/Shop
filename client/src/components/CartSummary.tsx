import {Box, Card, Divider, Typography} from "@mui/material";
import {useContext} from "react";
import {ShoppingContext} from "../contexts/ShoppingContext.tsx";

export default function CartSummary(){
  const shoppingContext = useContext(ShoppingContext)!;
  const {
    cartTotalQuantity,
    cartTotalProducts,
    cartTotalPrice,
  } = shoppingContext;

  return (
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
  )
}