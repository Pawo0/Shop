import {Container} from "@mui/material";
import {useContext} from "react";
import {OrderHistContext} from "../contexts/OrderHistContext.tsx";

export default function OrderHist(){
  const {carts} = useContext(OrderHistContext)!;
  console.log(carts)
  const elements = carts.map((order) => {
    return (
      <div key={order._id}>
        <h3>Order ID: {order._id}</h3>
        <ul>
          {order.products.map((product) => {
            return (
              <li key={product.productId}>
                <p>{product.title}</p>
                <p>Quantity: {product.quantity}</p>
                <p>Price: {product.price}</p>
              </li>
            )
          })}
        </ul>
      </div>
    )
  })

  return (
    <Container sx={{mt:2}}>
      {elements}
    </Container>
  )
}