import {Card, Divider, Grid2} from "@mui/material";
import {ProductsInterface} from "../interfaces.tsx";
import ProductTitle from "./ProductTitle.tsx";
import ProductImages from "./ProductImages.tsx";
import LoadingProductImages from "./LoadingProductImages.tsx";

export default function ProductPresentation({size, loading, notFound, product, selectedImage, handleThumbnailClick}: {
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
        <ProductTitle loading={loading} notFound={notFound} product={product}/>
        <Divider/>
        {
          loading ?
            <LoadingProductImages/> :
            product && selectedImage &&
              <ProductImages
                  loading={loading}
                  product={product}
                  selectedImage={selectedImage}
                  handleThumbnailClick={handleThumbnailClick}
              />
        }

      </Card>
    </Grid2>
  )
}