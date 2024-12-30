import {Grid2} from "@mui/material";
import {useState} from "react";
import {ProductsInterface} from "../interfaces.tsx";
import {useParams} from "react-router-dom";
import ProductPresentation from "../components/ProductPresentation.tsx";
import ProductDetails from "../components/ProductDetails.tsx";
import useFetchWithInterval from "../hooks/useFetchWithInterval.ts";
import Reviews from "../components/Reviews.tsx";

export default function Product() {
  const params = useParams()
  const [product, setProduct] = useState<ProductsInterface | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const [quantity, setQuantity] = useState(1)

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(prevState => prevState - 1)
    }
  }

  const handleIncrease = () => {
    if (product && quantity < product?.stock) {
      setQuantity(prevState => prevState + 1)
    }
  }

  useFetchWithInterval({
    url: `http://localhost:5000/api/products/${params.id}`,
    onNotFound: () => {
      setNotFound(true)
    },
    onFetchData: (data: { product: ProductsInterface }) => {
      setProduct(data.product)
      setSelectedImage(data.product.images[0])
    },
    interval: 5000,
    loading,
    setLoading
  })

  const handleThumbnailClick = (image: string) => {
    setSelectedImage(image)
  }

  return (
    <Grid2 container spacing={3} padding={3}>
      <ProductPresentation
        size={8}
        loading={loading}
        notFound={notFound}
        product={product}
        selectedImage={selectedImage}
        handleThumbnailClick={handleThumbnailClick}
      />
      <ProductDetails
        size={4}
        product={product}
        loading={loading}
        notFound={notFound}
        quantity={quantity}
        handleDecrease={handleDecrease}
        handleIncrease={handleIncrease}
      />
      <Reviews product={product}/>
    </Grid2>
  )
}