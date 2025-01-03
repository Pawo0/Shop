import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext.tsx";
import {UserContext} from "../contexts/UserContext.tsx";
import {Link, useNavigate} from "react-router-dom";
import {Button, CardActions, CardContent, CardHeader, Divider, Typography} from "@mui/material";

export default function UserDetails() {
  const authContext = useContext(AuthContext)
  const {setToken} = authContext!;

  const userContext = useContext(UserContext)!;
  const {username, role, email, firstName, lastName, userId} = userContext

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  }

  return (
    <>
      <CardHeader title={`Hello ${username}!`}/>
      <CardContent>
        <Typography variant={"body1"}>User ID: <Typography component={"span"}
                                                           sx={{fontWeight: "bold"}}>{userId}</Typography></Typography>
        <Typography variant={"body1"}>Role: <Typography component={"span"}
                                                        sx={{fontWeight: "bold"}}> {role}</Typography></Typography>
        <Typography variant={"body1"}>Email: <Typography component={"span"}
                                                         sx={{fontWeight: "bold"}}>{email}</Typography></Typography>
        <Typography variant={"body1"}>First Name: {
          firstName ?
            <Typography component={"span"} sx={{fontWeight: "bold"}}>{firstName}</Typography>
            :
            <Typography component={"span"} sx={{color: "grey"}}>Not provided</Typography>
        }</Typography>
        <Typography variant={"body1"}>Last Name: {
          lastName ?
            <Typography component={"span"} sx={{fontWeight: "bold"}}>{lastName}</Typography>
            :
            <Typography component={"span"} sx={{color: "grey"}}>Not provided</Typography>

        }</Typography>

      </CardContent>
      <Divider/>
      <CardActions>
        <Button variant={"outlined"} component={Link} to={"/user/update"}>Update Profile</Button>
        <Button variant={"outlined"} component={Link} to={"/user/password"}>Change Password</Button>
        <Button variant={"contained"} onClick={handleLogout}>Logout</Button>
      </CardActions>
    </>
  )

}