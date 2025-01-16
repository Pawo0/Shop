import {Box, Button, Card, CardHeader, Divider, FormControl, FormLabel, Stack, TextField} from "@mui/material";
import React, {useContext, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts/AuthContext.tsx";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const authContext = useContext(AuthContext)
  const {setToken} = authContext!;

  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = new URLSearchParams(location.search).get("redirect") || "/";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) setUsernameError(true);
    else setUsernameError(false);
    if (!password) setPasswordError(true);
    else setPasswordError(false);
    if (!username || !password) return

    fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          navigate(redirectPath);
        }
        else{
          setPasswordError(true);
          setUsernameError(true);
        }
      })

  }

  return (
    <Card variant={"outlined"} sx={{width: {md:"50%",sm:"65%", xs:"80%"}, margin: "25px auto", boxShadow: 6}}>
      <CardHeader title={"Sign In"}/>
      <Stack spacing={2}>
        <Box component={"form"} noValidate autoComplete={"off"}
             sx={{display: "flex", flexDirection: "column", gap: 2, p: 4}}>
          <FormControl>
            <FormLabel htmlFor={"username"}>Username</FormLabel>
            <TextField
              error={usernameError}
              id={"username"}
              type={"text"}
              variant={"outlined"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              required
              placeholder="john.smith"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor={"password"}>Password</FormLabel>
            <TextField
              error={passwordError}
              id={"password"}
              type={"password"}
              variant={"outlined"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••"
            />
          </FormControl>
          <Button variant={"contained"} type={"submit"} onClick={handleSubmit}>Sign In</Button>
          <Divider>or</Divider>
          <Button component={Link} to={"/signup"} variant={"outlined"}>Sign Up</Button>
        </Box>
      </Stack>
    </Card>
  );
}