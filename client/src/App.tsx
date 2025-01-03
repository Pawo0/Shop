import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "./pages/Layout.tsx";
import Home from "./pages/Home.tsx";
import Products from "./pages/Products.tsx";
import {SearchProvider} from "./contexts/SearchContext.tsx";
import {ShoppingProvider} from "./contexts/ShoppingContext.tsx";
import Product from "./pages/Product.tsx";
import SignIn from "./components/SignIn.tsx";
import SignUp from "./components/SignUp.tsx";
import {AuthProvider} from "./contexts/AuthContext.tsx";
import User from "./pages/User.tsx";
import Cart from "./pages/Cart.tsx";
import Favorites from "./pages/Favorites.tsx";
import {UserProvider} from "./contexts/UserContext.tsx";
import UserDetails from "./components/UserDetails.tsx";
import UpdateProfile from "./components/UpdateProfile.tsx";
import ChangePassword from "./components/ChangePassword.tsx";

function App() {

  return (
    <AuthProvider>
      <UserProvider>
        <SearchProvider>
          <ShoppingProvider>
            <BrowserRouter>
              <Routes>
                <Route path={"/"} element={<Layout/>}>
                  <Route index element={<Home/>}/>
                  <Route path={"/category/:category"} element={<Products/>}/>
                  <Route path={"/product/:id"} element={<Product/>}/>
                  <Route path={"/signin"} element={<SignIn/>}/>
                  <Route path={"/signup"} element={<SignUp/>}/>
                  <Route path={"/cart"} element={<Cart/>}/>
                  <Route path={"/favorites"} element={<Favorites/>}/>
                  <Route path={"/user"} element={<User/>}>
                    <Route index element={<UserDetails />}/>
                    <Route path={"update"} element={<UpdateProfile />}/>
                    <Route path={"password"} element={<ChangePassword />}/>
                  </Route>
                  <Route path={"*"} element={<h1>Not Found</h1>}/>
                </Route>
              </Routes>
            </BrowserRouter>
          </ShoppingProvider>
        </SearchProvider>
      </UserProvider>
    </AuthProvider>
  )
}

export default App
