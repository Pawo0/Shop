import {
  Container,
  List,
  ListItemText,
  Divider,
  ListItem,
  Accordion,
  AccordionSummary,
  AccordionDetails, ListItemAvatar, ListItemButton, Typography
} from "@mui/material";
import {useContext} from "react";
import {OrderHistContext} from "../contexts/OrderHistContext.tsx";
import { ExpandMore} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";
import {format} from "date-fns";

export default function OrderHist() {
  const {carts} = useContext(OrderHistContext)!;

  const navigate = useNavigate()

  const handleClick = (id: string) => {
    navigate(`/product/${id}`)
  }

  return (
    <Container sx={{mt: 2}}>
      <Typography variant="h4" p={1}> Order History</Typography>
      {
        carts.length !== 0 ?
        carts.map(order => (
          <List sx={{boxShadow:6, m:2}} key={order._id}>
            <ListItem>
              <ListItemText
                primary={`Order ID: ${order._id}`}
                secondary={`Order Date: ${ format(order.createdAt, 'dd/MM/yyyy')} | Total Price: ${order.total.toFixed(2)} PLN | Total Quantity: ${order.totalQuantity}`}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <Accordion sx={{width:"100%"}}>
                <AccordionSummary expandIcon={<ExpandMore />}>
                  Details
                </AccordionSummary>
                <AccordionDetails>
                  <List>
                    {
                      order.products.map(product => (
                        <ListItemButton key={product.productId} onClick={()=>handleClick(product.productId)}>
                          <ListItemAvatar >
                            <img src={product.thumbnail} alt={product.title} style={{width: 50, height: 50, objectFit: "cover"}}/>
                          </ListItemAvatar>
                          <ListItemText
                            primary={product.title}
                            secondary={`Price: ${product.price.toFixed(2)} PLN | Quantity: ${product.quantity} | Total: ${(product.price * product.quantity).toFixed(2)} PLN`}
                          />
                        </ListItemButton>
                      ))
                    }
                  </List>
                </AccordionDetails>
              </Accordion>
            </ListItem>
          </List>
        ))
          :
          <h1>No orders yet</h1>
      }
    </Container>
  );
}