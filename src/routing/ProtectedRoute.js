import { useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const ProtectedRoute = () => {
  const { userInfo, success, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  console.log(userInfo);

  useEffect(() => {
    if (!userInfo) toast.info("Why not Login first? Click the pokeball for login");
  }, []);

  const handleSplit = () => {
    setTimeout(() => {
      navigate("/auth");
    }, 200);
  };

  const series = {
    first: {
      y: 0,
      rotate: 0,
    },
    second: {
      y: [-250, 0, -200, 0, -150, 0, -100, 0, -50, 0, -25, 0],
      rotate: [10, 30, 20, 40, 30, -10, -20, 10, 20, 20, 0],
      transition: {
        duration: 8,
      },
    },
  };

  if (!userInfo) {
    return (
      <>
        <ToastContainer theme="light" />
        <div className="flex justify-center items-center h-screen">
          <motion.div
            variants={series}
            initial="first"
            animate="second"
            className={`h-56 w-56`}
            whileTap={{ scale: 4, rotate: 90 }}
            onClick={handleSplit}
          >
            <motion.div className="h-1/2 w-full bg-red-500 rounded-t-full border-2 border-b-0 border-[#555555] flex justify-center items-end">
              <div className=" h-1/4 w-1/4 bg-white rounded-t-full border-2 border-[#555555] border-b-0 flex justify-center items-end">
                <div className="h-1/2 w-1/2 bg-[#555555] rounded-t-full "></div>
              </div>
            </motion.div>
            <motion.div className="h-1/2 w-full bg-white rounded-b-full border-2 border-t-0 border-[#555555] shadow-2xl shadow-[#888888] flex justify-center items-start">
              <div className="h-1/4 w-1/4 bg-white rounded-b-full border-2 border-[#555555] border-t-0 flex justify-center items-start">
                <div className="h-1/2 w-1/2 bg-[#555555] rounded-b-full "></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </>
    );
  }

  return <Outlet />;
};
export default ProtectedRoute;
