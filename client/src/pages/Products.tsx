import {useLocation, useParams} from "react-router-dom";
import {Box, Grid2, Pagination} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";
import {ProductsInterface} from "../interfaces.tsx";
import ProductCard from "../components/ProductCard.tsx";

export default function Products() {
  const {category} = useParams();

  const [products, setProducts] = useState<ProductsInterface[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [allPages, setAllPages] = useState(1)
  const [productsPerPage, _] = useState(15)

  const location = useLocation()

  const gridRef = useRef<HTMLDivElement>(null)

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    if (gridRef.current) gridRef.current.scrollIntoView({behavior: "smooth"})
  }

  useEffect(() => {
    setPage(1)
  }, [location, productsPerPage]);


  useEffect(() => {
    const fetchData = () => {
      console.log("fetching data")
      fetch(`http://localhost:5000/api/products?category=${category}&page=${page}&limit=${productsPerPage}`)
        .then(res => res.json())
        .then(data => {
          setProducts(data.products)
          setAllPages(Math.ceil(data.totalProducts / productsPerPage))
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
    }, 5000)

    return () => clearInterval(intervalId)
  }, [loading, location, page]);

  const productElements = products.map(product => (
    <Grid2 size={2.4}>
      <ProductCard key={product.id} product={product}/>
    </Grid2>
  ));

  return (
    <>
      <Grid2 container spacing={2} p={2} ref={gridRef}>
        {productElements}
      </Grid2>
      <Box sx={{display: 'flex', flexDirection: 'row', pt: 4, justifyContent: "center"}}>
        <Pagination hidePrevButton hideNextButton count={allPages} boundaryCount={2} page={page} onChange={handlePageChange}/>
      </Box>
    </>
  )
    ;
}