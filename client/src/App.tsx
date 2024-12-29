import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import Home from "./pages/Home.tsx";
import Products from "./pages/Products.tsx";
import {SearchProvider} from "./contexts/SearchContext.tsx";
import {ShoppingProvider} from "./contexts/ShoppingContext.tsx";
import Product from "./pages/Product.tsx";

function App() {

  return (
    <SearchProvider>
      <ShoppingProvider>
        <BrowserRouter>
          <Routes>
            <Route path={"/"} element={<Layout/>}>
              <Route index element={<Home/>}/>
              <Route path={"/category/:category"} element={<Products/>}/>
              <Route path={"/product/:id"} element={<Product />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ShoppingProvider>
    </SearchProvider>
  )
}

export default App
