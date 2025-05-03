// import React from "react";
// import { HiOutlineExternalLink } from "react-icons/hi";
// import { useDispatch, useSelector } from "react-redux";
// import { Link, useNavigate } from "react-router-dom";
// import isAdmin from "../utils/isAdmin";
// import Axios from "../utils/Axios";
// import SummaryApi from "../common/SummaryApi";
// import { logout } from "../store/userSlice";
// import toast from "react-hot-toast";
// import AxiosToastError from "../utils/AxiosToastError";

// const UserMenu = () => {
//   const user = useSelector((state) => state.user);
//   console.log("user ", user);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const handleLogout = async () => {
//     try {
//       const response = await Axios({
//         ...SummaryApi.logout,
//       });
//       if (response.data.success) {
//         if (close) {
//           close();
//         }
//         dispatch(logout());
//         localStorage.clear();
//         toast.success(response.data.message);
//         navigate("/");
//       }
//     } catch (error) {
//       AxiosToastError(error);
//     }
//   };
//   const handleClose = () => {
//     if (close) return close();
//   };

//   return (
//     <div>
//       <div className="font-semibold">My Account</div>
//       <div className="text-sm flex items-center gap-2">
//         <span className="max-w-52 text-ellipsis line-clamp-1">
//           {user.firstName || user.mobile}
//           <span className="text-sm text-red-600">
//             {user.role === "ADMIN" ? "(Admin)" : ""}
//           </span>
//         </span>
//       </div>

//       <div className="text-sm grid gap-1">
//         <Link
//           to={"/dashboard/profile"}
//           className="px-2 hover:bg-orange-200 py-1"
//         >
//           Profile
//         </Link>
//         {isAdmin(user.role) && (
//           <Link
//             onClick={handleClose}
//             to={"/dashboard/category"}
//             className="px-2 hover:bg-orange-200 py-1"
//           >
//             Category
//           </Link>
//         )}

//         {isAdmin(user.role) && (
//           <Link
//             onClick={handleClose}
//             to={"/dashboard/sub-category"}
//             className="px-2 hover:bg-orange-200 py-1"
//           >
//             Sub Category
//           </Link>
//         )}

//         {isAdmin(user.role) && (
//           <Link
//             onClick={handleClose}
//             to={"/dashboard/upload-product"}
//             className="px-2 hover:bg-orange-200 py-1"
//           >
//             Upload product
//           </Link>
//         )}
//         {isAdmin(user.role) && (
//           <Link
//             onClick={handleClose}
//             to={"/dashboard/all-orders"}
//             className="px-2 hover:bg-orange-200 py-1"
//           >
//             All Orders
//           </Link>
//         )}

//         {isAdmin(user.role) ? (
//           <Link
//             onClick={handleClose}
//             to={"/dashboard/product"}
//             className="px-2 hover:bg-orange-200 py-1"
//           >
//             Product
//           </Link>
//         ) : (
//           <Link
//             onClick={handleClose}
//             to={"/"}
//             className="px-2 hover:bg-orange-200 py-1"
//           >
//             Product
//           </Link>
//         )}
//         <Link
//           onClick={handleClose}
//           to={"/dashboard/my-orders"}
//           className="px-2 hover:bg-orange-200 py-1"
//         >
//           Tasks / Projects
//         </Link>
//         <Link
//           onClick={handleClose}
//           to={"/dashboard/address"}
//           className="px-2 hover:bg-orange-200 py-1"
//         >
//           Attendance
//         </Link>
//         <Link
//           onClick={handleClose}
//           to={"/dashboard/address"}
//           className="px-2 hover:bg-orange-200 py-1"
//         >
//           Leaves
//         </Link>
//         <Link
//           onClick={handleClose}
//           to={"/dashboard/address"}
//           className="px-2 hover:bg-orange-200 py-1"
//         >
//           Payroll
//         </Link>
//         <Link
//           onClick={handleClose}
//           to={"/dashboard/address"}
//           className="px-2 hover:bg-orange-200 py-1"
//         >
//           Attendance
//         </Link>
//         <button
//           onClick={handleLogout}
//           className="text-left text-red-500 px-2 hover:bg-orange-200 py-1"
//         >
//           Log Out
//         </button>
//       </div>
//     </div>
//   );
// };

// export default UserMenu;

import {
  FaUser,
  FaUsers,
  FaClipboardList,
  FaCog,
  FaSignOutAlt,
  FaCalendarCheck,
  FaBuilding,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import SummaryApi from "../common/SummaryApi";
import { useDispatch } from "react-redux";
import { logout } from "../store/userSlice";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";

const menus = {
  admin: [
    { label: "Dashboard", path: "/dashboard", icon: <FaBuilding /> },
    {
      label: "Manage Employees",
      path: "/dashboard/manage-employees",
      icon: <FaUsers />,
    },
    { label: "Reports", path: "/dashboard/reports", icon: <FaClipboardList /> },
    { label: "Settings", path: "/dashboard/settings", icon: <FaCog /> },
    { label: "Logout", path: "/logout", icon: <FaSignOutAlt /> },
  ],
  hr: [
    { label: "Dashboard", path: "/dashboard", icon: <FaBuilding /> },
    {
      label: "Employee Records",
      path: "/dashboard/employee-records",
      icon: <FaUsers />,
    },
    {
      label: "Attendance",
      path: "/dashboard/attendance",
      icon: <FaCalendarCheck />,
    },
    {
      label: "Leave Requests",
      path: "/dashboard/leaves",
      icon: <FaClipboardList />,
    },
    { label: "Logout", path: "/logout", icon: <FaSignOutAlt /> },
  ],
  employee: [
    { label: "My Profile", path: "/dashboard/profile", icon: <FaUser /> },
    { label: "My Tasks", path: "/dashboard/task", icon: <FaClipboardList /> },
    {
      label: "Attendance",
      path: "/dashboard/attendance",
      icon: <FaCalendarCheck />,
    },
    { label: "Leaves", path: "/dashboard/leaves", icon: <FaClipboardList /> },
    { label: "Logout", path: "/logout", icon: <FaSignOutAlt /> },
  ],
};

export default function UserMenu({ role }) {
  const location = useLocation();
  const currentPath = location.pathname;
  const [open, setOpen] = useState(true);
  const userMenus = menus[role] || [];
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
        navigate("/login");
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  return (
    <div
      className={`bg-blue-400 text-white min-h-screen ${
        open ? "w-64" : "w-20"
      } duration-300 p-5 relative`}
    >
      {/* Toggle Button */}
      <div
        className="absolute top-6 right-2 cursor-pointer text-2xl"
        onClick={() => setOpen(!open)}
      >
        {open ? "←" : "→"}
      </div>

      {/* Logo or Title */}
      <div className="flex gap-x-4 items-center">
        <FaBuilding className="text-3xl" />
        {open && <h1 className="text-2xl font-bold">EMS</h1>}
      </div>

      {/* Menu Items */}
      <ul className="pt-10">
        {userMenus.map((menu) => (
          <li
            key={menu.path}
            className={`flex items-center gap-x-4 p-2 rounded-md mt-2 cursor-pointer transition-colors duration-300
            ${
              currentPath === menu.path
                ? "bg-blue-700 font-bold"
                : "hover:bg-blue-700"
            }
            `}
          >
            {menu.icon}
            {open &&
              (menu.path === "/logout" ? (
                <button
                  onClick={handleLogout}
                  className="capitalize text-md font-semibold text-left w-full"
                >
                  {menu.label}
                </button>
              ) : (
                <Link
                  to={menu.path}
                  className="capitalize text-md font-semibold"
                >
                  {menu.label}
                </Link>
              ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
