import {Button, Card, CardActions, CardContent, CardHeader, Divider} from "@mui/material";
import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext.tsx";
import {useNavigate} from "react-router-dom";

export default function User() {
  const authContext = useContext(AuthContext)
  const {setToken, username, role, userId} = authContext!;

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/signin");
  }

    return (
        <>
          <Card>
            <CardHeader title={`Hello ${username}`} />
            <CardContent>
              <p>Role: {role}</p>
              <p>UserId: {userId}</p>
            </CardContent>
            <Divider />
            <CardActions>
              <Button variant={"contained"} onClick={handleLogout}>Logout</Button>
            </CardActions>
          </Card>
        </>
    )
}