import React, { useEffect, useState } from "react";
import logo from "../Assests/Images/metoo.png";
import { Link } from "react-router-dom";
import { clearStorage, getAdminId } from "../Utils/Storage";
import { toast } from "react-toastify";
import { getsingleMaster } from "../api/masterprofile";
import eventEmitter from "./EventEmitter";

const Mastersidebar = () => {
  const logout = () => {
    clearStorage();
    toast.success("You have logged out successfully.");
  };

  const [profile, setProfile] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    getMasterDetails();
  }, []);

  const getMasterDetails = () => {
    const id = getAdminId();
    getsingleMaster(id)
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
        <a href="/Masterdashboard" className="brand-text font-weight-light">
          <img
            src={logo}
            alt="logo"
            className="brand-image"
            width="250"
            height="80"
          />
        </a>

        <div className="sidebar">
          <div className="user-panel mt-2 pb-3  d-flex ">
            <div className="image">
              {profile?.profileImage ? (
                <img
                  className="avatar-sm-post rounded-circle  "
                  style={{ height: 50, width: 50 }}
                  src={profile?.profileImage}
                  alt="User"
                />
              ) : null}
              <div className="info position-absolute mt-1 ">
                <a
                  href="/Masterdashboard"
                  className="d-block text-white "
                  style={{ textDecoration: "none" }}
                >
                  {profile?.name}
                </a>
              </div>
            </div>
          </div>
          <nav>
            <ul
              className="nav nav-pills nav-sidebar flex-column"
              data-widget="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item">
                <a href="/Masterdashboard" className="nav-link text-white">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>Dashboard</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Masteradslist" className="nav-link text-white">
                  <i className="nav-icon fas fa-th" />
                  <p>Ads Management</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Mastercategorylist" className="nav-link text-white">
                  <i className="nav-icon fas fa-th" />
                  <p>Category Management</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Masterproductlist" className="nav-link text-white">
                  <i className="nav-icon fas fa-th" />
                  <p>Product Management</p>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/Masterlistreviewproduct"
                  className="nav-link text-white"
                >
                  <i className="nav-icon fas fa-th" />
                  <p>Product Reviews</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Masterorderlist" className="nav-link text-white">
                  <i className="nav-icon fas fa-th" />
                  <p>Order Management</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/MasterTrackOrderList" className="nav-link text-white">
                  <i className="nav-icon fas fa-th" />
                  <p>Order Tracking</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Mastersellerlist" className="nav-link text-white">
                  <i className="nav-icon fas fa-th" />
                  <p>Company Management</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Masterdoctorlist" className="nav-link text-white">
                  <i className="nav-icon fas fa-th" />
                  <p>Doctor's Management</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/appointmentlist" className="nav-link text-white">
                  <i className="nav-icon fas fa-th" />
                  <p>Appointment Management</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Masterdoctorpostlist" className="nav-link text-white">
                  <i className="nav-icon fas fa-th" />
                  <p> Doctor Post Management</p>
                </a>
              </li>
              <li className="nav-item">
                <a
                  href="/Masterdoctorreviewlist"
                  className="nav-link text-white"
                >
                  <i className="nav-icon fas fa-th" />
                  <p> Doctor Reviews</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Panelreviewlist" className="nav-link text-white">
                  <i className="nav-icon fas fa-th" />
                  <p> Panel Reviews</p>
                </a>
              </li>

              <li className="nav-item">
                <a href="/Masteruserlist" className="nav-link text-white">
                  <i className="nav-icon fas fa-th" />
                  <p>User Management</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link text-white">
                  <i className="nav-icon far fa-user" />
                  <p>Payment Management</p>
                </a>
              </li>
              <li className="nav-header text-white">General</li>
              <li className="nav-item">
                <a href="/Masterviewprofile" className="nav-link text-white">
                  <i className="nav-icon far fa-user" />
                  <p> Profile </p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Mastercontactlist" className="nav-link text-white">
                  <i className="nav-icon far fas fa-mobile-alt" />
                  <p>Contact</p>
                </a>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" onClick={logout} to="/">
                  <i className="nav-icon far fa-image" />
                  <p> Log Out </p>
                </Link>
              </li>
            </ul>
            <br />
          </nav>
        </div>
      </aside>
    </div>
  );
};
export default Mastersidebar;
