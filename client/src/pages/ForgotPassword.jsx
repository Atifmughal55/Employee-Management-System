import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [data, setData] = useState({
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const validValues = Object.values(data).every((el) => el);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const response = await Axios({
        ...SummaryApi.forgot_password,
        data: data,
      });

      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/verification-otp", {
          state: data,
        });
        setData({
          email: "",
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
        <div className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-md animate-fade-in-up">
          <h2 className="text-3xl font-bold text-center text-blue-400 mb-8">
            Forgot Password
          </h2>
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={data.email}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="pt-4">
              <button
                disabled={!validValues || loading}
                type="submit"
                className={`${
                  validValues
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-teal-500"
                } w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 font-semibold transition`}
              >
                {loading ? "Loading..." : "Send OTP"}
              </button>
            </div>
          </form>
          <div>
            <p className="text-sm flex justify-center text-slate-600 pt-4">
              Already have an account?{" "}
              <Link to={"/login"} className="font-semibold text-red-600">
                Login.
              </Link>
            </p>
          </div>
        </div>
      </main>
    </section>
  );
};

export default ForgotPassword;
