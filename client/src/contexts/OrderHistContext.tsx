import React, {createContext, useContext, useEffect} from "react";
import {OrderHistInterface} from "../interfaces.tsx";
import {AuthContext} from "./AuthContext.tsx";
import axios from "axios";

interface OrderHistContextProps {
  carts: OrderHistInterface[];
  cartsCount: number;
  addOrder: (order: OrderHistInterface) => void;
}

export const OrderHistContext = createContext<OrderHistContextProps | null>(null);

export const OrderHistProvider = ({children}: { children: React.ReactNode }) => {
  const [carts, setCarts] = React.useState<OrderHistInterface[]>([]);
  const [cartsCount, setCartsCount] = React.useState<number>(0);
  const {userId} = useContext(AuthContext)!;

  useEffect(() => {
    if (!userId) return;
    axios.get(`http://localhost:5000/api/orderhist/user/${userId}`)
      .then(res => {
        setCartsCount(res.data.orderHist.length)
        setCarts(res.data.orderHist)
      })
      .catch(err => console.error('Error fetching order history:', err));
  }, [userId]);

  const addOrder = (order: OrderHistInterface) => {
    setCarts([order, ...carts]);
    setCartsCount(cartsCount + 1);
  }

  return (
    <OrderHistContext.Provider value={{carts, cartsCount, addOrder}}>
      {children}
    </OrderHistContext.Provider>
  )
}