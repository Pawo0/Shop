import React, {createContext, useContext, useEffect} from "react";
import {OrderHistInterface} from "../interfaces.tsx";
import {AuthContext} from "./AuthContext.tsx";

interface OrderHistContextProps {
  carts: OrderHistInterface[];
  cartsCount: number;
}

export const OrderHistContext = createContext<OrderHistContextProps | null>(null);

export const OrderHistProvider = ({children}: { children: React.ReactNode }) => {
  const [carts, setCarts] = React.useState<OrderHistInterface[]>([]);
  const [cartsCount, setCartsCount] = React.useState<number>(0);
  const {userId} = useContext(AuthContext)!;

  useEffect(() => {
    if (!userId) return;
    fetch(`http://localhost:5000/api/orderhist/user/${userId}`)
      .then(res => res.json())
      .then(data => {
        setCartsCount(data.orderHist.length)
        setCarts(data.orderHist)
      })
  }, [userId]);

  return (
    <OrderHistContext.Provider value={{carts, cartsCount}}>
      {children}
    </OrderHistContext.Provider>
  )
}