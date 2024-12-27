import ProductCarousel from "../components/ProductCarousel.tsx";


export default function Home() {


  return (
    <>
      <ProductCarousel products={"http://localhost:5000/api/products?limit=8"} title={"Currently hot"}/>
      <ProductCarousel products={"http://localhost:5000/api/products?limit=8&category=groceries"} title={"NOT  hot"}/>
    </>
  );
}