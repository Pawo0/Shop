import {Box, Button, Card, CardHeader, Divider, FormControl, FormLabel, Stack, TextField} from "@mui/material";
import {useState} from "react";
import {Link} from "react-router-dom";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Card variant={"outlined"} sx={{width: "50%", margin: "25px auto", boxShadow:6}}>
      <CardHeader title={"Sign In"}/>
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
              placeholder="john.smith"
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
              placeholder="••••••"
            />
          </FormControl>
          <Button variant={"contained"} type={"submit"}>Sign In</Button>
          <Divider>or</Divider>
          <Button component={Link} to={"/signup"} variant={"outlined"}>Sign Up</Button>
        </Box>
      </Stack>
    </Card>
  );
}