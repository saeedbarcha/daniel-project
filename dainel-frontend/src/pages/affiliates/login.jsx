import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import LoginInputs from "../../Components/logincommon/loginInputs";
import Heading from "../../Components/logincommon/Heading";
import { useLoginMutation } from "../../features/usersApiSlice";
import { setCredentials } from "../../features/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const AffiliatesLogin = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/affiliates-page";

  //   useEffect(() => {
  //     if (userInfo) {
  //       navigate(redirect);
  //     }
  //   }, [userInfo, redirect, navigate]);
  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const loginData = {
        email: inputData.email,
        password: inputData.password,
        role: "AFFILIATE",
      };
      const res = await login(loginData).unwrap();

      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(
        err?.data?.message || "Login failed. Please check your credentials."
      );
    }
  };
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setInputData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form className="form-container" onSubmit={submitHandler}>
      <Heading heading="Affiliate Login" />

      <div>
        <LoginInputs
          label="Email"
          name="email"
          type="email"
          value={inputData.email}
          onChange={handleOnChange}
          placeholder="example@gmail.com"
        />
      </div>

      <div>
        <LoginInputs
          label="Password"
          name="password"
          type="password"
          value={inputData.password}
          onChange={handleOnChange}
          placeholder="Password"
        />
       
      </div>

      <button className="btn btn-info">Login</button>
    </form>
  );
};

export default AffiliatesLogin;
