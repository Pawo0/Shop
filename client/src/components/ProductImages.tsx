import {Box, CardMedia} from "@mui/material";
import {ProductsInterface} from "../interfaces.tsx";

export default function ProductImages({product, selectedImage, handleThumbnailClick}: {
  loading: boolean,
  product: ProductsInterface,
  selectedImage: string,
  handleThumbnailClick: (image: string) => void
}) {
  return (
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

  )
}