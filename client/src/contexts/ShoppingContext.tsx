import React, {createContext, useContext, useEffect, useState} from "react";
import {AuthContext} from "./AuthContext.tsx";
import {CartInterface, ProductsInterface} from "../interfaces.tsx";


interface ShoppingContextProps {
  cartCnt: number;
  setCartCnt: (cartCnt: number) => void;
  favoriteCnt: number;
  setFavoriteCnt: (favoriteCnt: number) => void;
  cart: CartInterface[];
  setCart: (cart: CartInterface[]) => void;
  updateCart: () => void;
}

export const ShoppingContext = createContext<ShoppingContextProps | undefined>(undefined);

export const ShoppingProvider = ({children}: { children: React.ReactNode }) => {
  const [cartCnt, setCartCnt] = React.useState<number>(0);
  const [favoriteCnt, setFavoriteCnt] = React.useState<number>(1);
  const [cart, setCart] = useState<CartInterface[]>([])


  const {userId} = useContext(AuthContext)!;

  const updateCart = () => {
    if (userId) {
      fetch(`http://localhost:5000/api/carts/user/${userId}`)
        .then(res => res.json())
        .then(data => {
          setCartCnt(data.cart.totalQuantity)
          const productPromises = data.cart.products.map((product: any) =>
            fetch(`http://localhost:5000/api/products/${product.productId}`)
              .then(res => res.json())
              .then((data: { product: ProductsInterface, success: boolean }) => ({
                productId: product.productId,
                title: data.product.title,
                price: data.product.price,
                thumbnail: data.product.thumbnail,
                quantity: product.quantity
              }))
          );
          return Promise.all(productPromises)
        })
        .then((products) => {
          setCart(products)
        })
    }
    else {
      setCartCnt(0)
      setCart([])
    }
  }

  useEffect(() => {
    updateCart()
  }, [userId]);

  return (
    <ShoppingContext.Provider value={{cartCnt, setCartCnt, favoriteCnt, setFavoriteCnt, cart, setCart, updateCart}}>
      {children}
    </ShoppingContext.Provider>
  )
}