import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import {toast } from "react-toastify";
import store from "../app/store";
import { persistStore } from "redux-persist";

export const handleLogout = async (navigate, message) => {
  const persistor = persistStore(store);
  try {
    await signOut(auth);
    persistor.purge().then(() => {
      toast.success(message);
      navigate("/");
    });
  } catch (error) {
    toast.error("Logout failed: " + error.message);
  }
};