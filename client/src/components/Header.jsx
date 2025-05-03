import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { GoTriangleDown } from "react-icons/go";
import UserMenu from "./UserMenu";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import { logout } from "../store/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";

const Header = () => {
  const user = useSelector((state) => state?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.logout,
      });

      if (response.data.success) {
        dispatch(logout());
        localStorage.clear();
        toast.success(response.data.message);
      }
      navigate("/login");
    } catch (error) {
      AxiosToastError(error);
    }
  };
  return (
    <header className="h-16 lg:h-14 lg:shadow-md sticky top-0 z-40 flex justify-center gap-1 bg-blue-400">
      <div className="container mx-auto flex items-center justify-between px-2">
        <div className="flex items-end">
          <span className="text-3xl text-slate-100 font-semibold">EMS</span>
          <p className="text-slate-100 mb-1">
            (Manage your Business effectively)
          </p>
        </div>

        <div>
          {user?._id ? (
            <div className="flex items-center gap-4">
              <Link to="/dashboard/profile">
                <div className=" rounded-full h-10 w-10 flex justify-center items-center overflow-hidden">
                  {user?.profilePicture ? (
                    <img
                      src={`${user.profilePicture}?t=${Date.now()}`} // Prevent caching
                      alt="User"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="font-semibold text-white text-lg">
                      {user?.firstName?.charAt(0).toUpperCase() || "U"}
                    </span>
                  )}
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="text-slate-100 font-semibold hover:text-slate-200 hover:underline"
              >
                Log Out
              </button>
            </div>
          ) : (
            <Link
              to={"/login"}
              className="text-md text-slate-100 font-semibold transition-transform duration-200 transform hover:scale-110 hover:underline"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
