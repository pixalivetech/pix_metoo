import React from "react";
import DoctorSidebar from "../../Components/DoctorSidebar";
import DoctorHeader from "../../Components/DoctorHeader";
import DoctorHome from "../../Components/DoctorHome";

const DoctorDashboard = () => {
  return (
    <div>
      <DoctorSidebar />
      <DoctorHeader />
      <DoctorHome />
    </div>
  );
};

export default DoctorDashboard;
