import {useLocation, useParams} from "react-router-dom";
import React, {useContext, useEffect, useRef, useState} from "react";
import {ProductsInterface} from "../interfaces.tsx";
import PaginationControls from "../components/PaginationControls.tsx";
import ProductList from "../components/ProductList.tsx";
import {Typography} from "@mui/material";
import {SearchContext} from "../contexts/SearchContext.tsx";
import useFetchWithInterval from "../hooks/useFetchWithInterval.ts";

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
  // in future add change products per page
  // const [productsPerPage, _] = useState(15)
  const productsPerPage = 15

  const location = useLocation()

  const gridRef = useRef<HTMLDivElement>(null)

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
    if (gridRef.current) gridRef.current.scrollIntoView({behavior: "smooth"})
  }

  useEffect(() => {
    // after change category, load again and set 1st page
    setPage(1)
    setLoading(true)
  }, [location, productsPerPage]);

  // todo add page to link query
  useEffect(() => {
    setLoading(true)
  }, [page]);

  useFetchWithInterval({
    url: `http://localhost:5000/api/products?category=${category}&page=${page}&limit=${productsPerPage}&search=${searchQuery}`,
    onFetchData: (data) => {
      setProducts(data.products)
      setAllPages(Math.ceil(data.totalProducts / productsPerPage))
    },
    dependencies: [category, page, searchQuery],
    interval: 5000,
    loading,
    setLoading
  })


  return (
    <>
      <div ref={gridRef}>
        <Typography variant={"h4"} p={4}>
          {searchQuery
            ? `You are looking for: "${searchQuery}" in category: ${category}`
            : `Category: ${category}`}
        </Typography>
        <ProductList products={products} loading={loading} productsPerPage={productsPerPage}/>
      </div>
      <PaginationControls page={page} allPages={allPages} handlePageChange={handlePageChange}/>
    </>
  )
    ;
}