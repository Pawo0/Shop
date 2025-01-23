import {Button, CardContent, CardHeader, FormControl, TextField, Typography, Box} from "@mui/material";
import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {AuthContext} from "../contexts/AuthContext.tsx";
import axios from "axios";

export default function ChangePassword() {

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [currentPasswordError, setCurrentPasswordError] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);

  const navigate = useNavigate();

  const {userId, checkPassword} = useContext(AuthContext)!;


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;
    switch (name) {
      case "currentPassword":
        setCurrentPassword(value);
        setCurrentPasswordError(false);
        break;
      case "newPassword":
        setNewPassword(value);
        setNewPasswordError(false);
        break;
      case "confirmPassword":
        setConfirmPassword(value);
        setConfirmPasswordError(false);
        break;
    }
  }

  const handleSubmit = async () => {
    let error = false;
    if (currentPassword.length === 0) {
      setCurrentPasswordError(true)
      error = true;
    }
    if (newPassword.length < 3) {
      setNewPasswordError(true)
      error = true;
    }
    if (confirmPassword !== newPassword) {
      setConfirmPasswordError(true);
      error = true;
    }
    const passMatch = await checkPassword(currentPassword);
    if (!passMatch) {
      setCurrentPasswordError(true);
      error = true;
    }
    if (error) return;
    try {

      const res = await axios.patch(`http://localhost:5000/api/users/${userId}`, {password: newPassword})

      const data = res.data
      if (data.success) {
        navigate("/user")
      }
    } catch (e) {
      console.error('Failed to change password', e)
    }

  }

  const handleCancel = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    navigate("/user");
  }
  return (
    <>
      <CardHeader title="Change Password"/>
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          To change your password, please enter your current password and then your new password.
        </Typography>
        <FormControl fullWidth>
          <TextField
            required
            label="Current Password"
            type="password"
            margin="normal"
            name="currentPassword"
            onChange={handleChange}
            value={currentPassword}
            error={currentPasswordError}
            helperText={currentPasswordError ? "Incorrect password" : ""}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            required
            label="New Password"
            type="password"
            margin="normal"
            name="newPassword"
            onChange={handleChange}
            value={newPassword}
            error={newPasswordError}
            helperText={newPasswordError ? "Password must be at least 3 characters long" : ""}
          />
        </FormControl>
        <FormControl fullWidth>
          <TextField
            required
            label="Confirm New Password"
            type="password"
            margin="normal"
            name="confirmPassword"
            onChange={handleChange}
            value={confirmPassword}
            error={confirmPasswordError}
            helperText={confirmPasswordError ? "Passwords do not match" : ""}
          />
        </FormControl>
        <Box display="flex" justifyContent="space-between" sx={{width: "50%", margin: "auto", gap: 2}}>
          <Button variant="contained" color="primary" onClick={handleSubmit} sx={{flex: 1}}>Change Password</Button>
          <Button variant="contained" color="error" onClick={handleCancel} sx={{flex: 1}}>Cancel</Button>
        </Box>
      </CardContent>
    </>
  )
}