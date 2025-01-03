import React, {createContext, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import {AuthContext} from "./AuthContext.tsx";
import {CartProductInterface, ProductsInterface} from "../interfaces.tsx";
import {OrderHistContext} from "./OrderHistContext.tsx";


interface ShoppingContextProps {
  cartTotalQuantity: number;
  setCartTotalQuantity: Dispatch<SetStateAction<number>>;
  cartTotalProducts: number;
  setCartTotalProducts: Dispatch<SetStateAction<number>>;
  cartTotalPrice: number;
  setCartTotalPrice: Dispatch<SetStateAction<number>>;
  cart: CartProductInterface[];
  setCart: Dispatch<SetStateAction<CartProductInterface[]>>;
  deleteProduct: (productId: string) => void;
  decreaseQuantity: (productId: string, by?: number) => void;
  increaseQuantity: (productId: string, by?: number) => void
  addProduct: (productId: string, how_many?: number) => void;
  checkoutCart: () => void;
}

export const ShoppingContext = createContext<ShoppingContextProps | undefined>(undefined);

export const ShoppingProvider = ({children}: { children: React.ReactNode }) => {

  const [cart, setCart] = useState<CartProductInterface[]>([])
  const [cartTotalQuantity, setCartTotalQuantity] = React.useState<number>(0);
  const [cartTotalProducts, setCartTotalProducts] = React.useState<number>(0);
  const [cartTotalPrice, setCartTotalPrice] = React.useState<number>(0);

  const {userId} = useContext(AuthContext)!;
  const {addOrder} = useContext(OrderHistContext)!;

  const checkoutCart = () => {
    if (!userId) {
      console.log("Please sign in to continue");
      return;
    }
    if (cart.length === 0) {
      console.log("Cart is empty");
      return;
    }
    fetch(`http://localhost:5000/api/carts/checkout/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("Order placed", data)
        addOrder(data.newOrderHist)
        setCart([])
        setCartTotalPrice(0)
        setCartTotalProducts(0)
        setCartTotalQuantity(0)
      })
  }

  const decreaseQuantity = (productId: string, by = 1) => {
    let how_many = 1;
    setCart((prevCart) => {
      return prevCart.reduce((acc: CartProductInterface[], product: CartProductInterface) => {
        if (product.productId === productId) {
          how_many = Math.min(product.quantity, by);
          setCartTotalPrice(prevState => prevState - (product.price * how_many));
          if (product.quantity > by) {
            acc.push({...product, quantity: product.quantity - how_many});
          } else {
            setCartTotalProducts(prevState => prevState - how_many);
          }
        } else {
          acc.push(product);
        }
        return acc;
      }, []);
    });

    setCartTotalQuantity(prevState => prevState - how_many);
  }

  const increaseQuantity = (productId: string, by = 1) => {
    setCart((prevCart) => {
      return prevCart.reduce((acc: CartProductInterface[], product: CartProductInterface) => {
        if (product.productId === productId) {
          setCartTotalPrice(prevState => prevState + (product.price * by));
          acc.push({...product, quantity: product.quantity + by});
        } else {
          acc.push(product);
        }
        return acc;
      }, []);
    });

    setCartTotalQuantity(prevState => prevState + by);
  }

  const deleteProduct = (productId: string) => {
    setCart((prevCart) => {
      return prevCart.reduce((acc: CartProductInterface[], product: CartProductInterface) => {
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

  const addProduct = (productId: string, how_many : number = 1) => {
    if (cart.find(product => product.productId === productId)) {
      increaseQuantity(productId, how_many);
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
              quantity: how_many
            }]
          });
          setCartTotalPrice(prevState => prevState + (data.product.price * how_many));
          setCartTotalProducts(prevState => prevState + 1);
          setCartTotalQuantity(prevState => prevState + how_many);
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
      cart,
      setCart,
      cartTotalProducts,
      setCartTotalProducts,
      cartTotalPrice,
      setCartTotalPrice,
      decreaseQuantity,
      increaseQuantity,
      deleteProduct,
      addProduct,
      checkoutCart
    }}>
      {children}
    </ShoppingContext.Provider>
  )
}