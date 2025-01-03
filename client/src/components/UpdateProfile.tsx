import {Box, Button, CardContent, CardHeader, FormControl, TextField, Typography} from "@mui/material";
import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {UserContext} from "../contexts/UserContext.tsx";

export default function UpdateProfile() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("")

  // if we want to change username we have to change the backend for reviews
  const [emailLengthError, setEmailLengthError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);

  const userContext = useContext(UserContext)!;
  const {userId, editProfile} = userContext;

  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    switch (name) {
      case "email":
        setEmail(value);
        setEmailLengthError(false);
        setEmailError(false);
        setEmailExists(false);
        break;
      case "firstName":
        setFirstName(value);
        setFirstNameError(false)
        break;
      case "lastName":
        setLastName(value);
        setLastNameError(false)
        break
    }
  }

  const handleCancel = () => {
    setUsername("");
    setEmail("");
    setFirstName("");
    setLastName("");
    navigate("/user")
  }

  const checkValid = async () => {
    let error = false;
    if (email.length !== 0 && email.length < 3) {
      setEmailLengthError(true);
      error = true;
    } else setEmailLengthError(false)
    if (firstName.length !== 0 && firstName.length < 3) {
      setFirstNameError(true);
      error = true;
    } else setFirstNameError(false)
    if (lastName.length !== 0 && lastName.length < 3) {
      setLastNameError(true);
      error = true;
    } else setLastNameError(false)
    if (email) {
      if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        setEmailError(true);
        return false
      } else setEmailError(false)


      const res = await fetch(`http://localhost:5000/api/users/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({email})
      })
      const data = await res.json();
      if (data.emailExist) {
        setEmailExists(true);
        error = true;
      } else setEmailExists(false)
    }

    return !error
  }

  const handleSave = async () => {
    const valid = await checkValid();
    if (!valid) return;
    let body = {
      username: username.length === 0 ? undefined : username,
      email: email.length === 0 ? undefined : email,
      firstName: firstName.length === 0 ? undefined : firstName,
      lastName: lastName.length === 0 ? undefined : lastName
    }
    const res = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
    const data = await res.json();
    if (data.success) {
      editProfile({username, email, firstName, lastName})
      navigate("/user")
    }
  }

  return (
    <>
      <CardHeader title={"Update Profile"}/>
      <CardContent>
        <FormControl sx={{display: "flex", flexDirection: "column", gap: 2}}>

          <Box sx={{display: "flex", flexDirection: "column", gap: 2}}>
            <TextField variant={"outlined"} label={"Email"} value={email} name={"email"} onChange={handleChange}
                       error={emailLengthError || emailError || emailExists}
                       helperText={emailLengthError ? "Email should be at least 3 characters" : emailError ? "Not valid format" : emailExists ? "Email already exists" : ""}
                       fullWidth/>
            <TextField variant={"outlined"} label={"First Name"} value={firstName} name={"firstName"}
                       onChange={handleChange} error={firstNameError}
                       fullWidth/>
            <TextField variant={"outlined"} label={"Last Name"} value={lastName} name={"lastName"}
                       onChange={handleChange}
                       error={lastNameError} fullWidth/>
          </Box>
          <Typography variant={"body2"}>Note: Fill only fields which you want to change </Typography>
          <Box sx={{display: "flex", width: "50%", gap: 2, margin: "16px auto"}}>
            <Button variant={"contained"} sx={{flex: 1}} onClick={handleSave} type={"submit"}>Save</Button>
            <Button variant={"contained"} sx={{flex: 1}} color="error" onClick={handleCancel}>Cancel</Button>
          </Box>
        </FormControl>
      </CardContent>
    </>
  )
}
