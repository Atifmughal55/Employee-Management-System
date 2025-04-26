import React from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Home = () => {
  const employees = [
    {
      name: "Jhon",
      position: "Project Manager",
    },
    {
      name: "Boob",
      position: "Senior Developer",
    },
    {
      name: "Joy",
      position: "SQA Engineer",
    },
    {
      name: "Harry",
      position: "Dev Ops",
    },
  ];

  return (
    <div className="w-full overflow-x-hidden">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col md:flex-row items-center relative">
        {/* Content */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="w-full md:w-1/2 p-10 z-10"
        >
          <h1 className="text-5xl font-bold text-blue-600 mb-6">
            Manage Employees with Ease
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Welcome to EMS - Your trusted Employee Management System to track
            attendance, payrolls, and more.
          </p>
          <Link
            to={"/register"}
            className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300"
          >
            Get Started
          </Link>
        </motion.div>

        {/* Slash Image */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full md:w-1/2 h-[400px] md:h-auto bg-blue-300"
        >
          <div
            className="absolute inset-0 bg-cover bg-center clip-slash"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1581091870620-1f1bdb68599b?fit=crop&w=1200')",
            }}
          ></div>
        </motion.div>
      </section>

      {/* Companies Section */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-bold text-gray-700 mb-10">
          Trusted by Leading Companies
        </h2>
        <div className="flex flex-wrap justify-center gap-10 px-4">
          {[
            "logo1.png",
            "logo2.png",
            "logo3.png",
            "logo4.png",
            "logo5.png",
          ].map((logo, idx) => (
            <img
              key={idx}
              src={`/assets/${logo}`}
              alt="Company Logo"
              className="h-12 grayscale hover:grayscale-0 transition-all duration-300"
            />
          ))}
        </div>
      </section>

      {/* Employees Section */}
      <section className="py-16 bg-blue-50">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-12">
          Meet Our Team
        </h2>
        <div className="flex flex-wrap justify-center gap-10 px-4">
          {employees.map((emp, index) => (
            <motion.div
              key={emp}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-lg p-6 w-72 text-center"
            >
              <img
                src={`https://randomuser.me/api/portraits/men/${
                  index + 30
                }.jpg`}
                alt="Employee"
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-blue-600 mb-1">
                {emp.name}
              </h3>
              <p className="text-gray-500">{emp.position}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-700 mb-12">
          What Our Clients Say
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8 px-4">
          {[1, 2, 3].map((testi) => (
            <motion.div
              key={testi}
              whileHover={{ scale: 1.05 }}
              className="bg-blue-100 rounded-2xl shadow-md p-8 max-w-sm text-center"
            >
              <p className="text-gray-600 mb-4">
                "EMS has completely transformed the way we manage our employees.
                Highly recommend!"
              </p>
              <h4 className="text-blue-700 font-bold">Client {testi}</h4>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default Home;
