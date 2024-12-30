import {createContext, ReactNode, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";

interface AuthContext {
  token: string;
  setToken: (token: string) => void;
  username: string;
  role: string;
  userId: string;
}

interface DecodedToken {
  username: string;
  role: string;
  userId: string;
}

export const AuthContext = createContext<AuthContext | null>(null)

export const AuthProvider = ({children}: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "")
  const [username, setUsername] = useState("")
  const [role, setRole] = useState("")
  const [userId, setUserId] = useState("")

  useEffect(() => {
    if (token) {
      const decoded: DecodedToken = jwtDecode(token)
      setUsername(decoded.username)
      setRole(decoded.role)
      setUserId(decoded.userId)
    }
    else{
      setUsername("")
      setRole("")
      setUserId("")
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{token, setToken, username, role, userId}}>
      {children}
    </AuthContext.Provider>
  )
}