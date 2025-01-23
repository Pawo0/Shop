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
  const [refreshToken, setRefreshToken] = useState(localStorage.getItem("refreshToken") || "")
  const [userId, setUserId] = useState("")


  const isTokenExpiringSoon = (token: string, thresholdInMinutes: number = 1): boolean => {
    const decoded: DecodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // w sekundach
    const timeLeft = decoded.exp - currentTime;
    console.log('time to expire', timeLeft)
    return timeLeft < thresholdInMinutes * 60;
  };

  const login = async (username: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {username, password})
      const data = response.data;
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        setToken(data.token);
        setRefreshToken(data.refreshToken);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error('Error logging in', e)
      return false;
    }
  }


  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {username, email, password})
      const data = response.data;
      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        setToken(data.token);
        setRefreshToken(data.refreshToken);
        return true;
      } else {
        return false;
      }
    } catch (e) {
      console.error('Error registering', e)
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    localStorage.removeItem("refreshToken");
    setRefreshToken("");
  }

  const checkPassword = async (password: string) => {
    try {
      const response = await axios.post("http://localhost:5000/api/users/checkpassword", {password, userId})
      const data = response.data;
      return data.success;
    } catch (e) {
      console.error('Error checking password', e)
    }
  }

  const updateToken = async () => {
    if (token && isTokenExpiringSoon(token)) {
      axios.post("http://localhost:5000/api/users/refresh-token", {refreshToken})
        .then(response => {
          const data = response.data;
          if (data.success) {
            localStorage.setItem("token", data.token);
            setToken(data.token);
            const decoded: DecodedToken = jwtDecode(data.token)
            console.log('Token refreshed, expires in', decoded.exp - Math.floor(Date.now() / 1000), 'seconds')
            setUserId(decoded.userId)
          }
        })
        .catch(e => {
          logout();
          console.error('Invalid refresh token', e)
        })
    }
  }

  useEffect(() => {
    if (token) {
      updateToken();
      const decoded: DecodedToken = jwtDecode(token)
      setUserId(decoded.userId)
    } else {
      setUserId("")
    }
    const interval = setInterval(() => {
      if (token) {
        updateToken()
      } else {
        setUserId("")
      }
    }, 1000 * 30)
    return () => clearInterval(interval)
  }, [token, refreshToken]);

  return (
    <AuthContext.Provider value={{token, setToken, userId, checkPassword, login, register, logout}}>
      {children}
    </AuthContext.Provider>
  )
}