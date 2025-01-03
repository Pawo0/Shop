import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {AuthContext} from "./AuthContext.tsx";
import {EditProfileInterface} from "../interfaces.tsx";

interface UserContext {
  username: string;
  role: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  editProfile: (newData: EditProfileInterface) => void;
  changePassword: (oldPass: string, newPass: string, newPass2: string) => void;
}

export const UserContext = createContext<UserContext | null>(null)

export const UserProvider = ({children}: { children: ReactNode }) => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // security 0% xd
  const [password, setPassword] = useState("");

  const authContext = useContext(AuthContext)!
  const {userId} = authContext;

  const editProfile = (newData: EditProfileInterface) => {
    if (userId) {
      fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application"
        },
        body: JSON.stringify(newData)
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setUsername(data.user.username);
            setEmail(data.user.email);
            setFirstName(data.user.firstName);
            setLastName(data.user.lastName);
          }
        })
        .catch(err => console.log(err))
    }
  }

  const changePassword = (oldPass: string, newPass: string, newPass2: string) => {
    if (userId && oldPass === password && newPass && newPass === newPass2) {
      fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({password: newPass})
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setPassword(newPass);
          }
        })
        .catch(err => console.log(err))

    }
  }

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/api/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application"
        }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            setUsername(data.user.username);
            setRole(data.user.role);
            setFirstName(data.user.firstName);
            setLastName(data.user.lastName);
            setEmail(data.user.email);
          }
        })
        .catch(err => console.log(err))
    }
  }, [userId])

  return (
    <UserContext.Provider value={{
      username,
      role,
      userId,
      email,
      firstName,
      lastName,
      editProfile,
      changePassword
    }}>
      {children}
    </UserContext.Provider>
  )
}