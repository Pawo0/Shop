import {Box, Button, Card, CardHeader, Divider, FormControl, FormLabel, Stack, TextField} from "@mui/material";
import React, {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts/AuthContext.tsx";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const authContext = useContext(AuthContext);
  const {register} = authContext!;

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) setUsernameError(true);
    else setUsernameError(false);
    if (!email) setEmailError(true);
    else setEmailError(false);
    if (!password) setPasswordError(true);
    else setPasswordError(false);
    if (!username || !email || !password) return;
    if (password !== confirmPassword) {
      setPasswordError(true);
      setConfirmPasswordError(true);
      return;
    }

    register(username, email, password).then(success => {
      if (success) navigate("/user");
      else {
        setPasswordError(true);
        setUsernameError(true);
        setEmailError(true);
      }
    })
  }


  return (
    <Card variant={"outlined"} sx={{width: "50%", margin: "25px auto", boxShadow: 6}}>
      <CardHeader title={"Sign Up"}/>
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
              placeholder="username"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor={"email"}>Email</FormLabel>
            <TextField
              error={emailError}
              id={"email"}
              type={"email"}
              variant={"outlined"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="your@email.com"
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
              placeholder="••••••••"
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor={"confirmPassword"}>Confirm Password</FormLabel>
            <TextField
              error={confirmPasswordError}
              helperText={confirmPasswordError ? "Passwords do not match" : ""}
              id={"confirmPassword"}
              type={"password"}
              variant={"outlined"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </FormControl>
          <Button variant={"contained"} type={"submit"} onClick={handleSubmit}>Sign Up</Button>
          <Divider>or</Divider>
          <Button component={Link} to={"/signin"} variant={"outlined"}>Sign In</Button>
        </Box>
      </Stack>
    </Card>
  );
}