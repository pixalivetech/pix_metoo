import React, { useEffect, useState } from "react";
import logo from "../Assests/Images/metoo.png";
import { clearStorage, getDoctorId } from "../Utils/Storage";
import { toast } from "react-toastify";
import { getSingleDoctor } from "../api/doctor";
import eventEmitter from "./EventEmitter";

const DoctorSidebar = () => {
  const [profile, setProfile] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    getDoctorDetails();
  }, []);

  const getDoctorDetails = () => {
    const id = getDoctorId();
    getSingleDoctor(id)
      .then((res) => {
        setProfile(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const toggle = () => setSidebarOpen((prev) => !prev);
    const unsub = eventEmitter.subscribe("TOGGLE_SIDEBAR", toggle);
    return () => {
      unsub();
    };
  }, []);

  return (
    <div
      className={`position-fixed h-100 ${
        isSidebarOpen ? "sidebar-open" : "sidebar-closed"
      }`}
      style={{ zIndex: 1000 }}
    >
      <aside
        className="main-sidebar elevation-4"
        style={{ backgroundColor: "#9265cc" }}
      >
        <div
          style={{ marginLeft: "210px" }}
          className="d-md-none  shadow-lg rounded  position-absolute"
        >
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleSidebar}
          >
            <i
              className={`fas fa-times ${
                isSidebarOpen ? "text-success" : "text-black"
              }`}
            />
          </button>
        </div>
        <a href="/Doctordashboard" className="brand-text font-weight-light">
          <img
            src={logo}
            alt="logo"
            className="brand-image"
            width="250"
            height="100"
          />
        </a>
        <div className="sidebar">
          <div className="user-panel mt-2 pb-3  d-flex">
            <div className="image">
              {profile?.profileImage ? (
                <img
                  className="avatar-sm-post rounded-circle  "
                  style={{ height: 50, width: 50 }}
                  src={profile?.profileImage}
                  alt="User"
                />
              ) : null}
            </div>
            <div className="info  mt-1">
              <a
                href="/Doctordashboard"
                className="d-block text-bold   text-white text-md "
                style={{ textDecoration: "none" }}
              >
                {profile?.doctorName}
              </a>
              <a
                className="d-block text-sm text-white  "
                style={{ textDecoration: "none" }}
              >
                {profile?.overAllQualification &&
                  `( ${profile?.overAllQualification} )`}
              </a>
            </div>
          </div>
          <nav className="mt-2">
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <a href="/Doctordashboard" className="nav-link text-white">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>Dashboard</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/DoctorPostlist" className="nav-link text-white">
                  <i className="nav-icon fas fa-th" />
                  <p>Post Management</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/DoctorUserlist" className="nav-link text-white">
                  <i className="nav-icon fas fa-th" />
                  <p>User Management</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Userreviewlist" className="nav-link text-white">
                  <i className="nav-icon fas fa-th" />
                  <p>User Reviews</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Doctorchatlist" className="nav-link text-white">
                  <i className="nav-icon fas fa-th" />
                  <p>User Question & Answer</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/UserAppointmentlist" className="nav-link text-white">
                  <i className="nav-icon fas fa-th" />
                  <p> User Appointment</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Doctoruserchat" className="nav-link text-white">
                  <i className="nav-icon far fa-user" />
                  <p>User Chat</p>
                </a>
              </li>
              {/* <li className="nav-header text-white">General</li>
              <li className="nav-item">
                <a href="/DoctorViewprofile" className="nav-link text-white">
                  <i className="nav-icon far fa-user" />
                  <p>Profile</p>
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" onClick={logout} to='/'>
                  <i className="nav-icon far fa-image" />
                  <p> Log Out </p>
                </Link>
              </li> */}
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};

export default DoctorSidebar;
