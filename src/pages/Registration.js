import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { registerUser } from "../features/Auth/authSlice";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const isEmailValid = () =>{
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if(email==='')
    {
      toast.warn('Empty email');
      return false;
    }
    else if(!emailPattern.test(email)){
      toast.warn('Not a valid email');
      return false;
    }
    return true;
  }


  const isPasswordValid = () =>{
    const passwordPattern = /^(?=(.*[a-z]){4,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){2,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/;
    if(password==='')
    {
      toast.warn('Empty password');
      return false;
    }
    else if(!passwordPattern.test(password))
    {
      toast.warn('try a strong password')
      return false;
    }
    else if(password!==confirmpassword)
    {
      toast.warn('password did not match')
      return false;
    }
    return true;
  }



  const handleInput = async (e) => {
    e.preventDefault();
    if(isEmailValid() && isPasswordValid())
      dispatch(registerUser({ email, password }));
  };

  return (
    <div className="font-mono text-sm">
      <h2 className="text-center pb-10 font-mono font-bold text-2xl">Create Account</h2>
      <form onSubmit={handleInput} className="flex flex-col justify-center items-center gap-1">
        <label>Email</label>
        <input
          type="text"
          name="email"
          id="email1"
          onChange={(e) => setEmail(e.target.value)}
          className="outline-none rounded-3xl bg-slate-100"
        />
        <label>password</label>
        <input
          type="password"
          name="password"
          id="password1"
          onChange={(e) => setPassword(e.target.value)}
          className="outline-none rounded-3xl bg-slate-100"
        />
         <label>confirm password</label>
        <input
          type="password"
          name="confirmpassword"
          id="confirmpassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="outline-none rounded-3xl bg-slate-100"
        />
        <input type="submit" value="Register" className="bg-green-300 px-7 rounded-3xl text-sm mt-5 cursor-pointer"/>
      </form>
    </div>
  );
}

export default Registration;
