import React, { useState, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../common/SummaryApi";
import toast from "react-hot-toast";

const OtpVerification = () => {
  const [data, setData] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  const validValues = data.every((val) => val !== "");

  const handleChange = (index, value) => {
    if (/^\d*$/.test(value)) {
      const newOtp = [...data];
      newOtp[index] = value;

      setData(newOtp);

      // Move to next input
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("Text").trim();
    if (/^\d{6}$/.test(pasteData)) {
      const otpArray = pasteData.split("");
      setData(otpArray);
      otpArray.forEach((digit, index) => {
        inputRefs.current[index].value = digit;
      });
      inputRefs.current[5]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !data[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await Axios({
        ...SummaryApi.forgot_password_otp_verification,
        data: {
          otp: data.join(""),
          email: location?.state?.email,
        },
      });
      console.log("response ", response);
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/reset-password", {
          state: {
            data: response.data,
            email: location?.state?.email,
          },
        });
      }
    } catch (error) {
      AxiosToastError(error);
    } finally {
      setLoading(false);
      setData(["", "", "", "", "", ""]);
    }
  };

  return (
    <section className="w-full container mx-auto px-2">
      <main className="flex-grow flex items-center justify-center py-8 px-4">
        <div className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-md animate-fade-in-up">
          <h2 className="text-3xl font-bold text-center text-blue-400 mb-8">
            Verify OTP
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="flex justify-between gap-2" onPaste={handlePaste}>
              {data.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  ref={(el) => (inputRefs.current[index] = el)}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              ))}
            </div>

            <button
              disabled={!validValues || loading}
              type="submit"
              className={`w-full flex justify-center py-2 px-4 rounded-lg shadow-sm font-semibold transition ${
                validValues
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          <div className="pt-4">
            <p className="text-sm flex justify-center text-slate-600">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-red-600 ml-1">
                Login.
              </Link>
            </p>
          </div>
        </div>
      </main>
    </section>
  );
};

export default OtpVerification;
