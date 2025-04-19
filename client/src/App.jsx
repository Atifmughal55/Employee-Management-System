import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import fetchUsrDetails from "./utils/fetchUserDetails";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

const App = () => {
  const dispatch = useDispatch();
  const fetchUser = async () => {
    const userData = await fetchUsrDetails();
    dispatch(setUserDetails(userData.data));
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <Header />
      <main className="min-h-[80vh] ">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </>
  );
};

export default App;
