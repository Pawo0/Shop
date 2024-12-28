import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import Home from "./pages/Home.tsx";
import Products from "./pages/Products.tsx";
import {SearchProvider} from "./contexts/SearchContext.tsx";

function App() {

  return (
    <SearchProvider>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Layout/>}>
            <Route index element={<Home/>}/>
            <Route path={"/category/:category"} element={<Products/>}/>

          </Route>
        </Routes>
      </BrowserRouter>
    </SearchProvider>
  )
}

export default App
