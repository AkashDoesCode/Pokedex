import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { loginUser} from "../features/Auth/authSlice";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let {error} = useSelector((state) => state.auth);
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
    if(password==='')
    {
      toast.warn('Empty password');
      return false;
    }
    return true;
  }

  const handleInput = async (e) => {
    e.preventDefault();  
    if(isEmailValid() && isPasswordValid()){
      dispatch(loginUser({ email, password }));
    }
  };

  return (
    
    <div className="font-mono text-sm">
      <h2 className="text-center pb-4 font-mono font-bold text-2xl">Login to your Account</h2>
      <form onSubmit={handleInput} className="flex flex-col justify-center items-center gap-1">
        <label>email</label>
        <input
          type="text"
          name="email"
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          className="outline-none rounded-3xl bg-slate-100 "
        />
       
        <label>password</label>
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          className="outline-none rounded-3xl bg-slate-100"
        />
     
        <input type="submit" value="login" className="bg-green-300 px-7 rounded-3xl text-sm mt-5 cursor-pointer" />
      </form>
    </div>
  );
}

export default Login;
