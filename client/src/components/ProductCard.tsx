import {Box, Button, Card, CardContent, CardMedia, CircularProgress, Divider, Typography} from "@mui/material";
import {ProductsInterface} from "../interfaces.tsx"
import {useNavigate} from "react-router-dom";
import React from "react";

export default function ProductCard(props: { product?: ProductsInterface, empty?: boolean }) {
  const {product} = props
  const navigate = useNavigate()

  const handleCardClick = () => {
    if (product) {
      navigate(`/product/${product._id}`)
    }
  }
  const handleButtonClick = (e: React.MouseEvent) => {
    e.stopPropagation()
  }

  if (product) {
    return (
      <Card
        sx={{
          bgcolor: "primary.dark", color: "white", minWidth: 200, width: 198, cursor: "pointer",
          '&:hover': {
            transform: "scale(1.05)",
            transition: "transform 0.2s",
            boxShadow: "0 0 10px rgba(0,0,0,0.5)"
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
                        color="white">{String(product.price).split('.')[1] + " zł"}
            </Typography>
          </Typography>
          <Divider/>
          <Typography variant="h6" sx={{borderBottom: "1px solid transparent"}}>{product.title}</Typography>

        </CardContent>
        <Box sx={{p: 2, textAlign: "center"}}>
          <Button variant="contained" color="primary" onClick={handleButtonClick}>
            Add to cart
          </Button>
        </Box>
      </Card>
    )
  } else {
    return (
      // todo po załadaowaniu produktu psuje sie rozmiar
      <Card sx={{bgcolor: "primary.dark", color: "white", minWidth: 200, width: 200}}>
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: 325}}>
          <CircularProgress/>
        </Box>
      </Card>
    )
  }
}
