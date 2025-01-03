import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {DecodedToken} from "../interfaces.tsx";

interface AuthContext {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  userId: string;
  checkPassword: (password: string) => Promise<boolean>;
}


export const AuthContext = createContext<AuthContext | null>(null)

export const AuthProvider = ({children}: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "")
  const [userId, setUserId] = useState("")


  const checkPassword = async (password: string) => {
    const resposne = await fetch("http://localhost:5000/api/users/checkpassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({password, userId})
    })
    const data = await resposne.json();
    return data.success
  }

  useEffect(() => {
    if (token) {
      const decoded: DecodedToken = jwtDecode(token)
      setUserId(decoded.userId)
    } else {
      setUserId("")
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{token, setToken, userId, checkPassword}}>
      {children}
    </AuthContext.Provider>
  )
}