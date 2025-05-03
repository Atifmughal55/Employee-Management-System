import React from "react";
import UserMenu from "../components/UserMenu";
import getGreeting from "../utils/getGreeting";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  return (
    <section>
      <div className="h-screen flex">
        {/* Left menu section (fixed width) */}
        <div className="w-64">
          <UserMenu role={user.role} />
        </div>

        {/* Right content section (scrollable) */}
        <div className="flex-1 overflow-y-auto">
          <h4 className="text-2xl font-bold m-2 text-blue-500">
            {getGreeting()}!
          </h4>

          <Outlet />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
