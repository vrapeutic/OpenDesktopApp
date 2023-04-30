import React from "react";
import "@renderer/pages/Login.css";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";

const Login = (props: any) => {
  return (
    <>
      <h1 className="welcome">Welcome back</h1>
      <div className="login">
        Please login or register to start using your VRapeutic account.{" "}
      </div>
      <FormControl>
        <FormLabel>Email or mobile number</FormLabel>
        <input type="text" />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <input type="password" />
        <FormHelperText>Forgot Password ?</FormHelperText>
      </FormControl>
    </>
  );
};

export default Login;
