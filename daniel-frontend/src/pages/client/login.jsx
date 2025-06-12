import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useLocation } from "react-router-dom";
import LoginInputs from "../../Components/logincommon/loginInputs";
import Heading from "../../Components/logincommon/Heading";
import { useLoginMutation } from "../../features/usersApiSlice";
import { setCredentials } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { motion } from "framer-motion"; // ✅ import motion

const ClientLogin = () => {
  const [inputData, setInputData] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/client-dashboard";

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const loginData = {
        email: inputData.email,
        password: inputData.password,
        role: "CLIENT",
      };
      const res = await login(loginData).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (err) {
      toast.error(err?.data?.message || "Login failed. Please check your credentials.");
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
    <div className="page-background">
      <motion.form
      style={{marginLeft: "-200px"}}
        className="form-container"
        onSubmit={submitHandler}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: -100 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Heading heading="Login" />

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
      </motion.form>
    </div>
  );
};

export default ClientLogin;
