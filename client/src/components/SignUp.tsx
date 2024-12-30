import {Box, Button, Card, CardHeader, Divider, FormControl, FormLabel, Stack, TextField} from "@mui/material";
import {useState} from "react";
import {Link} from "react-router-dom";

export default function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <Card variant={"outlined"} sx={{width: "50%", margin: "25px auto", boxShadow: 6}}>
      <CardHeader title={"Sign Up"}/>
      <Stack spacing={2}>
        <Box component={"form"} noValidate autoComplete={"off"}
             sx={{display: "flex", flexDirection: "column", gap: 2, p: 4}}>
          <FormControl>
            <FormLabel htmlFor={"username"}>Username</FormLabel>
            <TextField
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
              id={"confirmPassword"}
              type={"password"}
              variant={"outlined"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </FormControl>
          <Button variant={"contained"} type={"submit"}>Sign Up</Button>
          <Divider>or</Divider>
          <Button component={Link} to={"/signin"} variant={"outlined"}>Sign In</Button>
        </Box>
      </Stack>
    </Card>
  );
}