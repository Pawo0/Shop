import React, {createContext} from "react";

interface ShoppingContextProps {
  cartCnt: number;
  setCartCnt: (cartCnt: number) => void;
  favoriteCnt: number;
  setFavoriteCnt: (favoriteCnt: number) => void;
}

export const ShoppingContext = createContext<ShoppingContextProps | undefined>(undefined);

export const ShoppingProvider = ({children}: { children: React.ReactNode }) => {
  const [cartCnt, setCartCnt] = React.useState<number>(0);
  const [favoriteCnt, setFavoriteCnt] = React.useState<number>(1);
  return (
    <ShoppingContext.Provider value={{cartCnt, setCartCnt, favoriteCnt, setFavoriteCnt}}>
      {children}
    </ShoppingContext.Provider>
  )
}