import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userImage from "../assets/user.jpg";
import { FiEdit } from "react-icons/fi";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";
import fetchUsrDetails from "../utils/fetchUserDetails";
import { setUserDetails } from "../store/userSlice";
import AxiosToastError from "../utils/AxiosToastError";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdits";
const Profile = () => {
  const user = useSelector((state) => state.user);
  console.log("User: ", user);
  const [userData, setUserData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    address: user.address,
    dob: user.dob,
    maritalStatus: user.maritalStatus,
    department: user.department,
    position: user.position,
    dateOfJoining: user.dateOfJoining.split("T")[0],
    salary: user.salary,
  });

  const isEdited =
    JSON.stringify(userData) !==
    JSON.stringify({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      dob: user.dob,
      maritalStatus: user.maritalStatus,
      department: user.department,
      position: user.position,
      dateOfJoining: user.dateOfJoining.split("T")[0],
      salary: user.salary,
    });

  const [loading, setLoading] = useState(false);
  const [openEditPicture, setOpenEditPicture] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setUserData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
      address: user.address,
      dob: user.dob,
      maritalStatus: user.maritalStatus,
      department: user.department,
      position: user.position,
      dateOfJoining: user.dateOfJoining.split("T")[0],
      salary: user.salary,
    });
  }, [user]);
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      console.log("UserData: ", userData);
      console.log("Date: ", new Date(userData.dob));
      const response = await Axios({
        ...SummaryApi.updateUserDetails,
        data: userData,
      });

      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        const userData = await fetchUsrDetails();
        dispatch(setUserDetails(userData.data));
      }
      setLoading(false);
    } catch (error) {
      return AxiosToastError(error);
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow rounded-lg">
      {/* Employee ID */}
      <div className="text-xl font-semibold text-gray-700 mb-4">
        Employee ID:{" "}
        <span className="font-bold text-blue-600">{user.employeeID}</span>
      </div>

      {/* Profile Picture */}
      <div className="flex items-center mb-6">
        <div className="relative w-36 h-36 rounded-full overflow-hidden group bg-gray-200 flex items-center justify-center text-5xl text-white font-bold">
          {user.profilePicture ? (
            <img
              src={`${user.profilePicture}?t=${Date.now()}`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : user.firstName ? (
            <span className="text-blue-600">
              {user.firstName[0].toUpperCase()}
            </span>
          ) : (
            <FaRegUserCircle size={65} className="text-blue-600" />
          )}

          <div
            onClick={() => setOpenEditPicture(true)}
            className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <FiEdit className="text-white w-8 h-8" />
          </div>
        </div>
      </div>
      {openEditPicture && (
        <UserProfileAvatarEdit close={() => setOpenEditPicture(false)} />
      )}
      {/* Editable Fields */}
      <form
        className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block text-sm font-medium text-gray-600">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={userData.firstName}
            onChange={handleOnChange}
            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={userData.lastName}
            onChange={handleOnChange}
            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleOnChange}
            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleOnChange}
            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Address
          </label>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleOnChange}
            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Date of Birth
          </label>
          <input
            type="date"
            name="dob"
            value={userData?.dob}
            onChange={handleOnChange}
            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Marital Status
          </label>
          <select
            name="maritalStatus"
            value={userData.maritalStatus}
            onChange={handleOnChange}
            className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
          >
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
        </div>
        <div className="md:col-span-2 flex justify-end mt-4">
          <button
            type="submit"
            disabled={!isEdited || loading}
            className={`px-6 py-2 rounded-md text-white font-medium transition 
        ${
          isEdited && !loading
            ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
            : "bg-gray-300 cursor-not-allowed"
        }`}
          >
            {loading ? "Loading..." : "Save Changes"}
          </button>
        </div>
      </form>

      {/* View-only Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Department
          </label>
          <input
            type="text"
            name="department"
            value={userData.department}
            disabled
            className="w-full mt-1 px-3 py-2 border rounded-md bg-gray-100 text-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Position
          </label>
          <input
            type="text"
            name="position"
            value={userData.position}
            disabled
            className="w-full mt-1 px-3 py-2 border rounded-md bg-gray-100 text-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Date of Joining
          </label>
          <input
            type="input"
            name="dateOfJoining"
            value={userData.dateOfJoining}
            disabled
            className="w-full mt-1 px-3 py-2 border rounded-md bg-gray-100 text-gray-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Salary
          </label>
          <input
            type="text"
            name="salary"
            value={`PKR ${userData.salary}`}
            disabled
            className="w-full mt-1 px-3 py-2 border rounded-md bg-gray-100 text-gray-500"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
