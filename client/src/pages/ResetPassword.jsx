import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const ResetPassword = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  console.log("location: ", location);
  useEffect(() => {
    if (!location?.state?.data?.success) {
      navigate("/");
    }

    if (location?.state?.email) {
      setData((prev) => {
        return {
          ...prev,
          email: location?.state?.email,
        };
      });
    }
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value, //[name] is use to consider same name the field name if we use without square brackets the name is consider field name
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await Axios({
        ...SummaryApi.reset_password,
        data: data,
      });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
        setData({
          email: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="w-full container mx-auto px-2">
      <main className="flex-grow flex items-center justify-center py-8 px-4">
        <div className="bg-white shadow-xl rounded-xl p-10 w-full max-w-md animate-fade-in-up">
          <h2 className="text-3xl font-bold text-center text-blue-400 mb-8">
            Reset Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="mt-1 flex items-center w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white">
              <input
                type={showPassword ? "text" : "password"}
                name="newPassword"
                value={data.newPassword}
                onChange={handleChange}
                required
                placeholder="Enter New Password"
                className="w-full flex-1 bg-transparent outline-none border-none focus:outline-none focus:border-none"
              />
              <div
                onClick={() => setShowPassword((prev) => !prev)}
                className="ml-2 cursor-pointer text-gray-600 hover:text-indigo-600"
              >
                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>

            <div className="mt-1 flex items-center w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Enter Confirm Password"
                className="w-full flex-1 bg-transparent outline-none border-none focus:outline-none focus:border-none"
              />
              <div
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className="ml-2 cursor-pointer text-gray-600 hover:text-indigo-600"
              >
                {showConfirmPassword ? <FaRegEye /> : <FaRegEyeSlash />}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        </div>
      </main>
    </section>
  );
};

export default ResetPassword;
