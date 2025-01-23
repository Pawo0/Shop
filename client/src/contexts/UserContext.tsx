import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {AuthContext} from "./AuthContext.tsx";
import {EditProfileInterface} from "../interfaces.tsx";
import axios from "axios";

interface UserContext {
  username: string;
  role: string;
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  editProfile: (newData: EditProfileInterface) => Promise<boolean>;
  changePassword: (oldPass: string, newPass: string, newPass2: string) => void;
}

export const UserContext = createContext<UserContext | null>(null)

export const UserProvider = ({children}: { children: ReactNode }) => {
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // security 100% xd
  const [password, setPassword] = useState("");

  const authContext = useContext(AuthContext)!
  const {userId} = authContext;

const editProfile = async (newData: EditProfileInterface) => {
  if (userId) {
    try {
      const res = await axios.patch(`http://localhost:5000/api/users/${userId}`, newData);
      if (res.data.success) {
        setUsername(res.data.user.username);
        setEmail(res.data.user.email);
        setFirstName(res.data.user.firstName);
        setLastName(res.data.user.lastName);
        return true;
      }
    } catch (err) {
      console.error('Error editing profile:', err);
      return false;
    }
  }
  return false;
}

  const changePassword = (oldPass: string, newPass: string, newPass2: string) => {
    if (userId && oldPass === password && newPass && newPass === newPass2) {
      axios.patch(`http://localhost:5000/api/users/${userId}`, {password: newPass})
        .then(res => {
          if (res.data.success) {
            setPassword(newPass);
          }
        })
        .catch(err => console.error('Error changing password:', err))

    }
  }

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/api/users/${userId}`)
        .then(res => {
          if (res.data.success) {
            setUsername(res.data.user.username);
            setRole(res.data.user.role);
            setFirstName(res.data.user.firstName);
            setLastName(res.data.user.lastName);
            setEmail(res.data.user.email);
          }
        })
        .catch(err => console.error('Error fetching user:', err))
    }
    else{
      setUsername("");
      setRole("");
      setFirstName("");
      setLastName("");
      setEmail("");
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