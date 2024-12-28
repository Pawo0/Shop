import {useLocation, useParams} from "react-router-dom";
import React, {useContext, useEffect, useRef, useState} from "react";
import {ProductsInterface} from "../interfaces.tsx";
import PaginationControls from "../components/PaginationControls.tsx";
import ProductList from "../components/ProductList.tsx";
import {Typography} from "@mui/material";
import {SearchContext} from "../contexts/SearchContext.tsx";

export default function Products() {
  const {category} = useParams();
  const searchContext = useContext(SearchContext)
  if (searchContext === undefined) {
    throw new Error("SearchContext must be used within a SearchProvider");
  }
  const {searchQuery} = searchContext

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
      const fetchUrl = `http://localhost:5000/api/products?category=${category}&page=${page}&limit=${productsPerPage}&search=${searchQuery}`
      fetch(fetchUrl)
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
  }, [loading, location, page, searchQuery]);


  return (
    <>
      <div ref={gridRef}>
        <Typography variant={"h4"} p={4}>
          {searchQuery
            ? `You are looking for: "${searchQuery}" in category: ${category}`
            : `Category: ${category}`}
        </Typography>
        <ProductList products={products}/>
      </div>
      <PaginationControls page={page} allPages={allPages} handlePageChange={handlePageChange}/>
    </>
  )
    ;
}