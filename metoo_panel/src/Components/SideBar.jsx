import React, { useEffect, useState } from "react";
import logo from "../Assests/Images/metoo.png";
import { getUserId } from "../Utils/Storage";
import { getsingleProfile } from "../api/profile";
import eventEmitter from "./EventEmitter";

const Sidebar = () => {
  const [profile, setProfile] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    getProfileDetails();
  }, []);

  const getProfileDetails = () => {
    const id = getUserId();
    getsingleProfile(id)
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
        <a href="/Dashboard" className="brand-text font-weight-light">
          <img
            src={logo}
            alt="logo"
            className="brand-image"
            width="250"
            height="100"
          />
        </a>
        <div className="sidebar">
          <div className="user-panel d-flex p-2 ">
            <div className="image ">
              {profile?.profileImage ? (
                <img
                  style={{ width: "50px", height: "50px" }}
                  className=" rounded-circle   "
                  src={profile?.profileImage}
                  alt="User"
                />
              ) : null}
            </div>
            <div className="info">
              <a
                href="/Dashboard"
                className="d-block text-white text-bold "
                style={{ textDecoration: "none" }}
              >
                {profile?.name}
              </a>
              <a
                className="d-block text-white text-bold"
                style={{ textDecoration: "none" }}
              >
                {profile?.companyName && `(${profile?.companyName})`}
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
                <a href="/Dashboard" className="nav-link text-white">
                  <i className="nav-icon fas fa-tachometer-alt" />
                  <p>Dashboard</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Listproducts" className="nav-link text-white">
                  <i className="nav-icon fas fa-th" />
                  <p>Products</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Listproductreview" className="nav-link text-white">
                  <i className="nav-icon fas fa-th" />
                  <p>Product Reviews</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Listorder" className="nav-link text-white">
                  <i className="nav-icon fas fa-th" />
                  <p>Order Management</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Trackyourorder" className="nav-link text-white">
                  <i className="nav-icon fas fa-circle" />
                  <p>Track Your Order</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="/Givereviewlist" className="nav-link text-white">
                  <i className="nav-icon fas fa-circle" />
                  <p>Give Review To Us</p>
                </a>
              </li>
              <li className="nav-header text-white">General</li>

              <li className="nav-item">
                <a href="#" className="nav-link text-white">
                  <i className="nav-icon far fa-user" />
                  <p>Payment</p>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
};
export default Sidebar;
