import React from "react";
import Masterheader from "../../Components/MasterHeader";
import Mastersidebar from "../../Components/MasterSidebar";
import Masterhome from "../../Components/MasterHome";
import Masterfooter from "../../Components/MasterFooter";

function Masterdashboard() {
  return (
    <div>
      <Mastersidebar />
      <Masterheader />
      <Masterhome />
      <Masterfooter />
    </div>
  );
}

export default Masterdashboard;
