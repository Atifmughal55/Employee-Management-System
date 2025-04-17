import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
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
          <Link
            to={"/login"}
            className="text-md text-slate-100 font-semibold transition-transform duration-200 transform hover:scale-110 hover:underline"
          >
            Sign In
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
