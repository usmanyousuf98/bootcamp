import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import loginImg from "../assets/login.png";
import Logo from "../assets/logo.png";
import CustomInput from "./customComponent/customInput";
import { useLogin } from "../assets/hooks/hooks";
import { storeToken } from "../assets/token";

export default function Signin() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [apiError, setApiError] = useState("");
  const signInMutation = useLogin();
  const navigation = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    console.log(email);
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email address");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError(
        "Password must be at least 8 characters long less then 32."
      );
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();
    if (emailError == "" && passwordError == "") {
      const mutationArgs = {
        email,
        password,
        onSuccessCb,
        onErrorCb,
      };
      signInMutation.mutate(mutationArgs);
      console.log("login");
    }
  };

  const onSuccessCb = async (data) => {
    try {
      await storeToken(data?.token);

      setEmail("");
      setPassword("");
      navigation("/Sidebar");
    } catch (error) {
      console.log("login error", error);
    }
  };
  const onErrorCb = async (error) => {
    if (error?.response?.status == 401) {
      setApiError("Invalid email or password");
      // console.log("Invalid email or password");
    }
    // console.log(error?.response?.status);
  };

  const token = localStorage.getItem("@authToken");
  // const isLoggedIn = !token;

  if (token != null) {
    return <Navigate to="/Sidebar" />;
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-cover bg-no-repeat bg-[url('./assets/login.png')]">
      <div className="rounded-xl bg-gray-600 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div>
          <div className="mb-4 flex flex-col items-center">
            <img src={Logo} />
          </div>
          <form className=" flex flex-col item-center ">
            <h2 className="text-4xl font-bold text-center text-white">
              SignIn
            </h2>
            {emailError && <p className="error">{emailError}</p>}
            <CustomInput
              type="email"
              placeholder="Email"
              value={email}
              heading="Enter Email"
              handleChange={(text) => handleEmailChange(text)}
            />
            {passwordError && <p className="error">{passwordError}</p>}
            <CustomInput
              type="password"
              placeholder="Password"
              value={password}
              heading="Enter Password"
              handleChange={(text) => handlePasswordChange(text)}
            />
            {apiError && <p className="error">{apiError}</p>}
            {/* <div className="flex justify-between text-white py-2">
                <p className="flex">
                  <input className="mr-2" type="checkbox" /> Remember me{" "}
                </p>
                <p>Forget Password? </p>
              </div> */}
            <div className=" flex justify-center text-lg text-black">
              {/* <Link to="/Sidebar"> */}
              <button
                className="w-40 my-3 py-2 text-white  bg-teal-900 rounded-3xl transition-colors duration-300 hover:bg-teal-500 "
                type="LogIn"
                onClick={handleLogin}
              >
                LogIn
              </button>
            </div>
            <div className="flex justify-center text-white py-2 ">
              <Link to="/Signup">
                <p>Create an account </p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
