import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {DecodedToken} from "../interfaces.tsx";

interface AuthContext {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  userId: string;
}



export const AuthContext = createContext<AuthContext | null>(null)

export const AuthProvider = ({children}: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "")
  const [userId, setUserId] = useState("")

  useEffect(() => {
    if (token) {
      const decoded: DecodedToken = jwtDecode(token)
      setUserId(decoded.userId)
    }
    else{
      setUserId("")
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{token, setToken, userId}}>
      {children}
    </AuthContext.Provider>
  )
}