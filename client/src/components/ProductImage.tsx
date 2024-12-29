import {Box, Card, CardMedia, CircularProgress, Divider, Grid2, Typography} from "@mui/material";
import {ProductsInterface} from "../interfaces.tsx";

export default function ProductImage({size, loading, notFound, product, selectedImage, handleThumbnailClick}: {
  size: number,
  loading: boolean,
  notFound: boolean,
  product: ProductsInterface | null,
  selectedImage: string | null,
  handleThumbnailClick: (image: string) => void
}) {
  return (
    <Grid2 size={size}>
      <Card sx={{boxShadow: 6}}>
        <Typography variant={"h4"} p={2}>{
          loading ?
            "Loading..."
            :
            notFound ?
              "Product not found"
              :
              product?.title
        }</Typography>
        <Divider/>
        {loading ? (
          <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", height: 500}}>
            <CircularProgress/>
          </Box>
        ) : (
          product && selectedImage &&
          <Box sx={{display: "flex", flexDirection: "row"}}>
              <Box display="flex" justifyContent="center" m={2} flexDirection={"column"}>
                {
                  product.images.map((image, index) => (
                    <CardMedia
                      key={index}
                      component="img"
                      height="100"
                      image={image}
                      alt={`${product.title} thumbnail ${index + 1}`}
                      onClick={() => handleThumbnailClick(image)}
                      sx={{
                        cursor: "pointer",
                        border: selectedImage === image ? "2px solid blue" : "2px solid transparent",
                        margin: "0 5px"
                      }}
                    />
                  ))
                }
              </Box>
              <CardMedia component="img" height="500" image={selectedImage} alt={product.title}/>
          </Box>
        )}
      </Card>
    </Grid2>
  )
}