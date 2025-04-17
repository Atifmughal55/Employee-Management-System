import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="w-full container mx-auto px-2">
      <main className="flex-grow flex items-center justify-center py-8 px-4">
        <div className="bg-white shadow-2xl rounded-xl p-10 w-full max-w-md animate-fade-in-up">
          <h2 className="text-xl font-semibold text-center text-blue-400 mb-6">
            Ready to manage your tasks? Sign up as an employee now!
          </h2>
          <form className="space-y-2" onSubmit={handleSubmit}>
            <div className="flex justify-between gap-4">
              <div>
                <label
                  htmlFor="fname"
                  className="text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <input
                  autoFocus
                  id="fname"
                  type="text"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  name="fName"
                  value={data.fName}
                  onChange={handleChange}
                  placeholder="Enter First Name"
                />
              </div>
              <div>
                <label
                  htmlFor="lname"
                  className="text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lname"
                  name="lName"
                  value={data.lName}
                  onChange={handleChange}
                  placeholder="Enter Last Name"
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>
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
                placeholder="Enter your email"
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
                  value={data.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
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
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="mt-1 flex items-center w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-white">
                <input
                  type={showPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Enter confirm password"
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
                disabled={!validValues || loading}
                type="submit"
                className={`${
                  validValues
                    ? "bg-indigo-600 hover:bg-indigo-700"
                    : "bg-teal-500"
                } w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 font-semibold transition`}
              >
                {loading ? "Loading..." : "Register"}
              </button>
            </div>
          </form>
          <div>
            <p className="text-sm flex justify-center text-slate-600 ">
              If you have account?{" "}
              <Link to={"/login"} className="font-semibold text-red-600">
                login.
              </Link>
            </p>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Register;
