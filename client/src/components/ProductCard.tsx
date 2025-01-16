import {Box, Button, Card, CardContent, CardMedia, CircularProgress, Divider, Typography} from "@mui/material";
import {ProductsInterface} from "../interfaces.tsx"
import {useNavigate} from "react-router-dom";
import React, {useContext} from "react";
import {ShoppingContext} from "../contexts/ShoppingContext.tsx";
import {AuthContext} from "../contexts/AuthContext.tsx";

export default function ProductCard(props: { product?: ProductsInterface, empty?: boolean }) {
  const {product} = props
  const navigate = useNavigate()

  const authContext = useContext(AuthContext)!
  const {userId} = authContext

  const shoppingContext = useContext(ShoppingContext)!
  const {addProduct} = shoppingContext


  const handleButtonClick = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation()
    if (userId) {
      addProduct(productId)
    }
    else{
      navigate(`/signin?redirect=/product/${productId}`)
    }
  }

  const handleCardClick = () => {
    if (product) {
      navigate(`/product/${product._id}`)
    }
  }

  if (product) {
    return (
      <Card
        sx={{
          bgcolor: "primary.dark", color: "white", minWidth: 200, width: 198, height: 350,  cursor: "pointer", boxShadow: "0 0 6px rgba(0,0,0,0.22)",
          '&:hover': {
            // transform: "scale(1.003)",
            transition: "all 0.2s",
            boxShadow: "0 0 12px rgba(0,0,0,0.3)"
          }
        }}
        key={product._id}
        onClick={handleCardClick}
      >
        <CardMedia
          component="img"
          height="150"
          image={product.thumbnail}
          alt={product.title}
          sx={{bgcolor: "white", border: "1px solid transparent"}}
        />
        <CardContent sx={{height: "100px", overflow: "hidden"}}>
          <Typography variant="h5" color="white" fontWeight={"bold"}>
            {
              String(product.price).split('.')[0] + "."
            }
            <Typography component="span" fontSize={15}
                        color="white">{String(product.price).split('.')[1] + " PLN"}
            </Typography>
          </Typography>
          <Divider/>
          <Typography variant="h6" sx={{borderBottom: "1px solid transparent"}}>{product.title}</Typography>

        </CardContent>
        <Box sx={{p: 2, textAlign: "center"}}>
          <Button variant="contained" color="primary"
                  onClick={(e) => handleButtonClick(e, product._id)}
                  disabled={product.stock <= 0}
                  sx={{
                    '&:active': {
                      transform: "scale(0.95)"
                    }
                  }}
          >
            Add to cart
          </Button>
        </Box>
      </Card>
    )
  } else {
    return (
      <Card sx={{bgcolor: "primary.dark", color: "white", minWidth: 200, width: 200}}>
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: 350}}>
          <CircularProgress/>
        </Box>
      </Card>
    )
  }
}
