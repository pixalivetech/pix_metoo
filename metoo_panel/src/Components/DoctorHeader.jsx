import React, { useState, useEffect, useRef } from "react";
import { clearStorage, getDoctorId } from "../Utils/Storage";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { getSingleDoctor } from "../api/doctor";
import { Popover, PopoverHeader, PopoverBody, Button } from "reactstrap";
import Notifications from "../DoctorPanel/AppoinmentManagement/Notification";
import "./DoctorHeader.css";
import eventEmitter from "./EventEmitter";

const DoctorHeader = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logout = () => {
    clearStorage();
    toast.success("You have logged out successfully");
  };

  const [profile, setProfile] = useState(null);

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

  const [popoverOpen, setPopoverOpen] = useState(false);

  const togglePopover = () => {
    setPopoverOpen(!popoverOpen);
  };

  const toggleSidebar = () => {
    eventEmitter.emit("TOGGLE_SIDEBAR");
  };

  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light position-static p-3">
        <ul className="navbar-nav">
          <li className="nav-item">
            <a
              className="nav-link border rounded"
              data-widget="pushmenu"
              href="#"
              role="button"
            >
              <i className="fas fa-bars" onClick={toggleSidebar} />
            </a>
          </li>
        </ul>

        <ul className="navbar-nav ml-auto" ref={dropdownRef}>
          <li>
            <div className="pop-colorr">
              <a className="nav-link mt-3" id="popoverBtn" type="button">
                <i className="fas fa-bell" style={{ fontSize: "1.5rem" }}></i>
              </a>
              <Popover
                style={{ maxHeight: "500px", overflowY: "auto" }}
                id="pop-bodyy"
                placement="bottom"
                isOpen={popoverOpen}
                target="popoverBtn"
                toggle={togglePopover}
              >
                <PopoverHeader id="pop-headerr">Notifications</PopoverHeader>
                <PopoverBody id="pop-bodyy">
                  <Notifications />
                </PopoverBody>
              </Popover>
            </div>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link" onClick={toggleDropdown} role="button">
              <div className="card border-0 ">
                <div className="card-body p-1 d-flex align-items-center">
                  <div className="rounded-circle mr-2">
                    {profile && profile.profileImage ? (
                      <img
                        className="rounded-circle"
                        style={{ height: "40px", width: "40px" }}
                        src={profile.profileImage}
                        alt="Doctor Profile"
                      />
                    ) : (
                      <i className="fas fa-user-circle fa-2x" />
                    )}
                  </div>
                  <div>
                    <div className="font-weight-bold">
                      {profile?.doctorName}
                    </div>
                  </div>
                  <i className="fas fa-chevron-down ml-2"></i>
                </div>
              </div>
            </a>
            {showDropdown && (
              <div className="dropdown-menu dropdown-menu-right show mt-3 ml-0">
                <Link
                  className="dropdown-item d-flex align-items-center py-2"
                  to="/Myappoinmentlist"
                >
                  <i className="far fa-calendar-alt mr-2"></i>My Appointments
                </Link>
                <a
                  href="/DoctorViewprofile"
                  className="dropdown-item d-flex align-items-center py-2"
                >
                  <i className="far fa-user mr-2"></i>
                  Profile
                </a>
                <Link
                  className="dropdown-item d-flex align-items-center py-2"
                  onClick={logout}
                  to="/"
                >
                  <i className="fas fa-sign-out-alt mr-2"></i>
                  Log Out
                </Link>
              </div>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DoctorHeader;
