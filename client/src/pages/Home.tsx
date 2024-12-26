import {ProductsInterface} from "../interfaces.tsx"
import ProductCarousel from "../components/ProductCarousel.tsx";
import {useEffect, useState} from "react";


export default function Home() {
  const [products, setProducts] = useState<ProductsInterface[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = () => {
      fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => {
          setProducts(data)
          setLoading(false)
        })
        .catch(err => {
          console.error('Błąd pobierania danych:', err)
        })
    }

    fetchData()

    const intervalId = setInterval(() => {
      if (loading) {
        fetchData()
      } else {
        clearInterval(intervalId)
      }
    }, 5000) // Próbuj co 5 sekund

    return () => clearInterval(intervalId)
  }, [loading])

  return (
    <ProductCarousel products={products} title={"Na czasie"} />
  );
}