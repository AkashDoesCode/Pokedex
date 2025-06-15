import { useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import { handleLogout } from "../utils/handleLogout";
import { useSelector } from "react-redux";

const TIME_AUTO_LOGOUT = 60 * 60 * 1000; 

function useAutoLogOut() {
  const { userInfo } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const timer = useRef(null);

  const resetTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      handleLogout(navigate, "Logged out due to inactivity");
    }, TIME_AUTO_LOGOUT);
  };

  useEffect(() => {
    if (!userInfo) {
      return;
    }
    resetTimer();
    const events = ["click", "keydown", "scroll"];
    events.forEach((event) => {
      window.addEventListener(event, resetTimer);
    });
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      events.forEach((event) => {
        window.removeEventListener(event, resetTimer);
      });
    };
  }, [userInfo]);

  return {handleLogout};
}

export default useAutoLogOut;
