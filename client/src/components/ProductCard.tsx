import {Box, Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {ProductsInterface} from "../interfaces.tsx"

export default function ProductCard(props: { product: ProductsInterface }) {
  const {product} = props
  return (
    <Card sx={{bgcolor: "primary.dark", color: "white", minWidth: 200, width: 200}} key={product.id}>
      <CardMedia
        component="img"
        height="150"
        image={product.image}
        alt={product.title}
      />
      <CardContent>
        <Typography variant="h5" color="white" fontWeight={"bold"}>
          {
            String(product.price).split('.')[0] + "."
          }
          <Typography component="span" fontSize={15}
                      color="white">{String(product.price).split('.')[1] + " zł"}
          </Typography>
        </Typography>
        <Typography variant="h6" sx={{borderBottom: "1px solid transparent"}}>{product.title}</Typography>

      </CardContent>
      <Box sx={{p: 2, textAlign: "center"}}>
        <Button variant="contained" color="primary">
          Add to cart
        </Button>
      </Box>
    </Card>
  )
}