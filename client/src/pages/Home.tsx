import {ProductsInterface} from "../interfaces.tsx"
import ProductCarousel from "../components/ProductCarousel.tsx";
import {useEffect, useState} from "react";


export default function Home() {
  // const products: ProductsInterface[] = [
  //   {
  //     id: 1,
  //     title: "Essence Mascara Lash Princess",
  //     description: "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
  //     category: "beauty",
  //     price: 9.99,
  //     discountPercentage: 7.17,
  //     rating: 4.84,
  //     brand: "Essence",
  //     image: "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"
  //   },
  //   {
  //     id: 2,
  //     title: "Eyeshadow Palette with Mirror",
  //     description: "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
  //     category: "beauty",
  //     price: 19.99,
  //     discountPercentage: 5.5,
  //     rating: 3.28,
  //     brand: "Glamour Beauty",
  //     image: "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png"
  //   },
  // ];
const [products, setProducts] = useState<ProductsInterface[]>([])

  useEffect(()=>{
    fetch('http://localhost:5000/products')
      .then(res=>res.json())
      .then(data => {
        setProducts(data)
      })
  },[])

  return (
    <ProductCarousel products={products} title={"Na czasie"} />
  );
}
