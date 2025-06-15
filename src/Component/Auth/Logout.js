import React from "react";
import { useNavigate } from "react-router";
import useAutoLogOut from "../../hooks/useAutoLogOut";


function Logout() {
  //const persistor = persistStore(store);
  const navigate = useNavigate();
  const { handleLogout } = useAutoLogOut();

  function logoutOnClick() {
    handleLogout(navigate, "Logged out successfully");
  }

  return (
    <div>
      <button className="pt-2" onClick={logoutOnClick}>
        Logout
      </button>
    </div>
  );
}

export default Logout;
