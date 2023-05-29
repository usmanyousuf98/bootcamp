import React, { useState } from "react";
import { Link } from "react-router-dom";
import loginImg from "../assets/login.png";
import Logo from "../assets/logo.png";
import CustomInput from "./customComponent/customInput";
import { useNavigate } from "react-router-dom";
import { useSignUp } from "../assets/hooks/hooks";
import { storeToken } from "../assets/token";

export default function Signup() {
  const [sname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfrimPassword] = useState("");
  const [nameError, setNameError] = useState(" ");
  const [emailError, setEmailError] = useState(" ");
  const [passwordError, setPasswordError] = useState(" ");
  const [apiError, setApiError] = useState("");
  const signupMutation = useSignUp();

  const validateName = () => {
    if (sname.trim() === "") {
      setNameError("Name is required");
    } else {
      setNameError("");
    }
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
    if (32 > newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else if (newPassword != confirmPassword) {
      setPasswordError("Password must matchg");
    } else {
      setPasswordError("");
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log(sname);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };
  const handleConfirmPasswordChange = (e) => {
    setConfrimPassword(e.target.value);
  };

  const onSuccessCb = async (data) => {
    try {
      await storeToken(data?.token);

      setEmail("");
      setNewPassword("");
      setConfrimPassword("");
      setName("");

      location.replace("/Sidebar");
    } catch (error) {
      // console.log("log errorrr", error);
      setApiError(error);
    }
  };

  const onErrorCb = async (error) => {
    // console.log("eEEORRR", error?.response?.data?.message);
    setApiError(error?.response?.data?.message);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    validateName();
    validateEmail();
    validatePassword();

    if (!nameError && !emailError && !passwordError) {
      console.log(sname, email, confirmPassword);
      const mutationArgs = {
        sname,
        email,
        confirmPassword,
        onSuccessCb,
        onErrorCb,
      };
      signupMutation.mutate(mutationArgs);
    }
  };

  // const handleSignUp = async (e) => {
  //   e.preventDefault();
  //   if (newPassword === confirmPassword) {
  //     const response = await loginApi(sname, email, confirmPassword);
  //     storeToken(response.token);

  //     console.log(response);
  //     const token = getToken();
  //     console.log("get", token);
  //     // Perform login logic here
  //     // You can send the email and password to the server for authentication

  //     // Clear the form
  //     setEmail("");
  //     setNewPassword("");
  //     setConfrimPassword("");
  //     setName("");
  //     // <Link to="/Sidebar"></Link>;
  //     console.log("joisjo");

  //     navigation("/Sidebar");
  //   } else {
  //     alert("Your file is being uploaded!");
  //   }
  // };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-cover bg-no-repeat bg-[url('./assets/login.png')]">
      <div className="rounded-xl bg-gray-600 bg-opacity-50 px-16 py-10 shadow-lg backdrop-blur-md max-sm:px-8">
        <div>
          <div className="mb-4 flex flex-col items-center">
            <img src={Logo} w-50 h-50 />
          </div>
          <form action="#" className=" flex flex-col item-center ">
            <h2 className="text-4xl font-bold text-center text-white">
              SignUp
            </h2>
            {nameError && <p className="error">{nameError}</p>}
            <CustomInput
              type="text"
              placeholder="Enter Username"
              value={sname}
              heading="Username"
              handleChange={(text) => handleNameChange(text)}
            />
            {emailError && <p className="error">{emailError}</p>}
            <CustomInput
              type="email"
              placeholder="email"
              // value={email}
              heading="Email"
              handleChange={(text) => handleEmailChange(text)}
            />
            {passwordError && <p className="error">{passwordError}</p>}
            <CustomInput
              type="password"
              placeholder="Password "
              value={newPassword}
              heading="New Password"
              handleChange={(text) => handleNewPasswordChange(text)}
            />

            <CustomInput
              type="password"
              placeholder="Password "
              value={confirmPassword}
              name="uname"
              heading="Confirm Password"
              handleChange={(text) => handleConfirmPasswordChange(text)}
            />
            {apiError && <p className="error">{apiError}</p>}
            {signupMutation.isLoading && <p className="error"> loading...</p>}
            <div className="mt-8 flex justify-center text-lg text-black">
              <button
                type="SignUp"
                className="w-40 my-3 py-2 text-white  bg-teal-900 rounded-3xl transition-colors duration-300 hover:bg-teal-500"
                onClick={handleSignUp}
              >
                SignUp
              </button>
            </div>
            <div className="flex justify-center text-white py-2">
              <p>
                Already have an account? <Link to="/">SignIn.</Link>{" "}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
