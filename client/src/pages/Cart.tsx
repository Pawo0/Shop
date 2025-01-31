import {useContext} from "react";
import {ShoppingContext} from "../contexts/ShoppingContext.tsx";
import {
  Typography,
  Container,
  Grid2, Button,
} from "@mui/material";
import CartItems from "../components/CartItems.tsx";
import CartSummary from "../components/CartSummary.tsx";

export default function Cart() {
  const shoppingContext = useContext(ShoppingContext)!;
  const {cart, checkoutCart} = shoppingContext;


  return (
    <Container sx={{mt:2}}>
      <Typography variant="h4" p={1}>
        Cart
      </Typography>
      <Grid2 container spacing={2}>
        <Grid2 size={{xs:12, md:8}} container>
          {cart.length !== 0 ? <CartItems/> : <Typography variant="h5">Nothing to see here</Typography>}
        </Grid2>
        <Grid2 size={{xs: 12, md:4}}>
          <CartSummary/>
          <Button variant={"contained"} onClick={checkoutCart} disabled={cart.length === 0} fullWidth sx={{mt: 2}}>Confirm</Button>
        </Grid2>
      </Grid2>
    </Container>
  );
}
