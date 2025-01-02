import React, {createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {AuthContext} from "./AuthContext.tsx";
import {CartInterface, ProductsInterface} from "../interfaces.tsx";


interface ShoppingContextProps {
  cartTotalQuantity: number;
  setCartTotalQuantity: Dispatch<SetStateAction<number>>;
  cartTotalProducts: number;
  setCartTotalProducts: Dispatch<SetStateAction<number>>;
  cartTotalPrice: number;
  setCartTotalPrice: Dispatch<SetStateAction<number>>;
  favoriteCnt: number;
  setFavoriteCnt: Dispatch<SetStateAction<number>>;
  cart: CartInterface[];
  setCart: Dispatch<SetStateAction<CartInterface[]>>;
  decreaseQuantity: (productId: string) => void;
  increaseQuantity: (productId: string) => void;
  deleteProduct: (productId: string) => void;
  addProduct: (productId: string) => void;
}

export const ShoppingContext = createContext<ShoppingContextProps | undefined>(undefined);

export const ShoppingProvider = ({children}: { children: React.ReactNode }) => {
  const [favoriteCnt, setFavoriteCnt] = React.useState<number>(0);

  const [cart, setCart] = useState<CartInterface[]>([])
  const [cartTotalQuantity, setCartTotalQuantity] = React.useState<number>(0);
  const [cartTotalProducts, setCartTotalProducts] = React.useState<number>(0);
  const [cartTotalPrice, setCartTotalPrice] = React.useState<number>(0);

  const {userId} = useContext(AuthContext)!;

  const decreaseQuantity = (productId: string) => {
    setCart((prevCart) => {
      return prevCart.reduce((acc: CartInterface[], product: CartInterface) => {
        if (product.productId === productId) {
          setCartTotalPrice(prevState => prevState - product.price);
          if (product.quantity > 1) {
            acc.push({...product, quantity: product.quantity - 1});
          } else {
            setCartTotalProducts(prevState => prevState - 1);
          }
        } else {
          acc.push(product);
        }
        return acc;
      }, []);
    });

    setCartTotalQuantity(prevState => prevState - 1);
  }

  const increaseQuantity = (productId: string) => {
    setCart((prevCart) => {
      return prevCart.reduce((acc: CartInterface[], product: CartInterface) => {
        if (product.productId === productId) {
          setCartTotalPrice(prevState => prevState + product.price);
          acc.push({...product, quantity: product.quantity + 1});
        } else {
          acc.push(product);
        }
        return acc;
      }, []);
    });

    setCartTotalQuantity(prevState => prevState + 1);
  }

  const deleteProduct = (productId: string) => {
    setCart((prevCart) => {
      return prevCart.reduce((acc: CartInterface[], product: CartInterface) => {
        if (product.productId === productId) {
          setCartTotalPrice(prevState => prevState - product.price * product.quantity);
          setCartTotalProducts(prevState => prevState - 1);
          setCartTotalQuantity(prevState => prevState - product.quantity);
        } else {
          acc.push(product);
        }
        return acc;
      }, []);
    });
  }

  const addProduct = (productId: string) => {
    if (cart.find(product => product.productId === productId)) {
      increaseQuantity(productId);
    } else{
      fetch(`http://localhost:5000/api/products/${productId}`)
        .then(res => res.json())
        .then((data: { product: ProductsInterface, success: boolean }) => {
          setCart((prevCart) => {
            return [...prevCart, {
              productId: productId,
              title: data.product.title,
              price: data.product.price,
              thumbnail: data.product.thumbnail,
              quantity: 1
            }]
          });
          setCartTotalPrice(prevState => prevState + data.product.price);
          setCartTotalProducts(prevState => prevState + 1);
          setCartTotalQuantity(prevState => prevState + 1);
        })
    }
  }


  const updateCart = () => {
    if (userId) {
      fetch(`http://localhost:5000/api/carts/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          products: cart
        })
      })
        .then(res => res.json())
        .then(data => {
          console.log("Cart updated", data)
        })
    }
  }

  useEffect(() => {
    if (userId){
      updateCart()
    }
  }, [cart]);

  useEffect(() => {

      let totalQuantity = 0;
      let totalPrice = 0;
      if (userId) {
        fetch(`http://localhost:5000/api/carts/user/${userId}`)
          .then(res => res.json())
          .then(data => {
            setCartTotalProducts(data.cart.totalProducts)
            setCartTotalQuantity(data.cart.totalQuantity)
            const productPromises = data.cart.products.map((product: any) =>
              fetch(`http://localhost:5000/api/products/${product.productId}`)
                .then(res => res.json())
                .then((data: { product: ProductsInterface, success: boolean }) => {
                  totalQuantity += product.quantity;
                  totalPrice += product.quantity * data.product.price;
                  return {
                    productId: product.productId,
                    title: data.product.title,
                    price: data.product.price,
                    thumbnail: data.product.thumbnail,
                    quantity: product.quantity
                  }
                })
            );
            return Promise.all(productPromises)
          })
          .then((products) => {
            setCart(products)
            setCartTotalPrice(totalPrice)
            setCartTotalQuantity(totalQuantity)
          })
      } else {
        setCartTotalQuantity(0)
        setCart([])
        setCartTotalPrice(0)
        setCartTotalProducts(0)
      }
    }
    , [userId]);

  return (
    <ShoppingContext.Provider value={{
      cartTotalQuantity,
      setCartTotalQuantity,
      favoriteCnt,
      setFavoriteCnt,
      cart,
      setCart,
      cartTotalProducts,
      setCartTotalProducts,
      cartTotalPrice,
      setCartTotalPrice,
      decreaseQuantity,
      increaseQuantity,
      deleteProduct,
      addProduct
    }}>
      {children}
    </ShoppingContext.Provider>
  )
}