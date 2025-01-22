import {createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import {DecodedToken} from "../interfaces.tsx";
import axios from "axios";


interface AuthContext {
  token: string;
  setToken: Dispatch<SetStateAction<string>>;
  userId: string;
  checkPassword: (password: string) => Promise<boolean>;
  login: (username: string, password: string) => Promise<boolean>;
  register: (username: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
}


export const AuthContext = createContext<AuthContext | null>(null)

export const AuthProvider = ({children}: { children: ReactNode }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "")
  const [userId, setUserId] = useState("")


  const login = async (username: string, password: string) => {
    const response = await axios.post("http://localhost:5000/api/users/login", {username, password})
    const data = response.data;
    if (data.success) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      return true;
    } else {
      return false;
    }
  }


  const register = async (username: string, email: string, password: string) => {
    const response = await axios.post("http://localhost:5000/api/users/register", {username, email, password})
    const data = response.data;
    if (data.success) {
      localStorage.setItem("token", data.token);
      setToken(data.token);
      return true;
    } else {
      return false;
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  }

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
    <AuthContext.Provider value={{token, setToken, userId, checkPassword, login, register, logout}}>
      {children}
    </AuthContext.Provider>
  )
}