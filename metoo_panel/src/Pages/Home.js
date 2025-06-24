import React from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/SideBar";
import Home from "../Components/Home";
import Footer from "../Components/Footer";

function Dashboard() {
  return (
    <div>
      <Sidebar />
      <Header />
      <Home />
      <Footer />
    </div>
  );
}

export default Dashboard;
