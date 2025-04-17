import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <section className="w-full container mx-auto px-2">
      <main className="flex-grow flex items-center justify-center py-8 px-4">
        <div className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-md animate-fade-in-up">
          <h2 className="text-3xl font-bold text-center text-blue-400 mb-8">
            Sign In to Your Account
          </h2>
          <form className="space-y-3">
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
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 flex items-center w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  className="w-full flex-1 bg-transparent outline-none border-none focus:outline-none focus:border-none"
                />
                <div
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="ml-2 cursor-pointer text-gray-600 hover:text-indigo-600"
                >
                  {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900"
                >
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to={"#"}
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 font-semibold transition"
              >
                Sign In
              </button>
            </div>
          </form>
          <div>
            <p className="text-sm flex justify-center text-slate-600 pt-4">
              Don't have account?{" "}
              <Link to={"/register"} className="font-semibold text-red-600">
                Register Now.
              </Link>
            </p>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Login;
