import React, { useState, useEffect } from "react";
import Login from "./Login";
import Registration from "./Registration";
import { motion } from "framer-motion";
import image from "../assets/pikachu-hello.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  failedLoginHideErrorIncaseReload,
  onSuccessfulRegisterHideSuccessMsgIncaseReload,
} from "../features/Auth/authSlice";

function Authpage() {
  const [toggle, setToggle] = useState(true);

  let { registered, userInfo, error } = useSelector((state) => state.auth);
  //console.log(registered,error);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (registered) {
      toast.success("Registered successfully! Login now");
      dispatch(onSuccessfulRegisterHideSuccessMsgIncaseReload());
    }
    if (userInfo) {
      toast.success("sucessfully logged in");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    if (error) {
      toast.error(error.code);
      dispatch(failedLoginHideErrorIncaseReload()); //
    }
  }, [userInfo, error, registered]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="h-screen flex justify-center items-center font-mono">
      <ToastContainer stacked position="top-center" theme="light" />
      {toggle && (
        <div className="flex justify-center items-center bg-white rounded-lg shadow-2xl shadow-black-500/50 h-[300px] overflow-hidden">
          <motion.div
            animate={{ x: 200 }}
            transition={{ ease: "easeOut", duration: 1 }}
            className="w-[200px] text-slate-500"
          >
            <Login />
          </motion.div>
          <motion.div
            animate={{ x: -200 }}
            transition={{ ease: "easeOut", duration: 1 }}
            className="bg-green-400 w-[200px] h-full text-center flex flex-col justify-center items-center gap-4 text-sm text-white"
          >
            <h3 className="text-2xl font-bold">New Here?</h3>
            <img className="h-20" src={image} alt="#"/>
            <p className="px-4">Sign up! what are you waiting for?</p>
            <button
              className="bg-white text-green-500 rounded-3xl px-7"
              onClick={handleToggle}
            >
              signup
            </button>
          </motion.div>
        </div>
      )}

      {!toggle && (
        <div className="flex justify-center items-center bg-white rounded-lg shadow-2xl shadow-black-500/50 h-[300px] overflow-hidden">
          <motion.div
            animate={{ x: 200 }}
            transition={{ ease: "easeOut", duration: 1 }}
            className="bg-green-400 z-10 w-[200px] h-full text-center flex flex-col justify-center items-center gap-4 text-sm text-white"
          >
            <h3 className="text-2xl font-bold">Welcome back!</h3>
            <img className="h-20" src={image} alt="#"/>
            <p>Login and explore the world of pokemon</p>
            <button
              className="bg-white text-green-500 rounded-3xl px-7"
              onClick={handleToggle}
            >
              signin
            </button>
          </motion.div>
          <motion.div
            animate={{ x: -200 }}
            transition={{ ease: "easeOut", duration: 1 }}
            className="w-[200px] z-0 text-slate-500"
          >
            <Registration />
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Authpage;
