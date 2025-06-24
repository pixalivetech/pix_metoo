import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { clearStorage, getUserId } from "../Utils/Storage";
import { toast } from "react-toastify";
import { getsingleProfile } from "../api/profile";
import eventEmitter from "./EventEmitter";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const [profile, setProfile] = useState(null);

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
    eventEmitter.emit("TOGGLE_SIDEBAR");
  };

  const logout = () => {
    clearStorage();
    toast.success("You have logged out successfully.");
  };

  return (
    <div>
      <nav className="main-header navbar navbar-expand navbar-white navbar-light position-static p-3">
        <ul className="navbar-nav ">
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
          <li className=" dropdown mb-2">
            <a className="nav-link" onClick={toggleDropdown} role="button">
              <div className="card ">
                <div className="card-body p-1 d-flex align-items-center">
                  <div className="rounded-circle mr-2">
                    {profile && profile.profileImage ? (
                      <img
                        className="rounded-circle"
                        style={{ height: "35px", width: "35px" }}
                        src={profile.profileImage}
                        alt="Doctor Profile"
                      />
                    ) : (
                      <i className="fas fa-user-circle fa-2x" />
                    )}
                  </div>
                  <div>
                    <div
                      style={{ color: "#9265cc" }}
                      className="font-weight-bold"
                    >
                      {profile?.name}
                    </div>
                  </div>
                  <i className="fas fa-chevron-down ml-2"></i>
                </div>
              </div>
            </a>
            {showDropdown && (
              <div className="dropdown-menu dropdown-menu-right show mt-3 ml-0">
                <a
                  href="/Viewprofile"
                  style={{ color: "#9265cc" }}
                  className="dropdown-item d-flex align-items-center py-2"
                >
                  <i
                    style={{ color: "#9265cc" }}
                    className="far fa-user mr-2"
                  ></i>
                  Profile
                </a>
                <Link
                  style={{ color: "#9265cc" }}
                  className="dropdown-item d-flex align-items-center py-2"
                  onClick={logout}
                  to="/"
                >
                  <i
                    style={{ color: "#9265cc" }}
                    className="fas fa-sign-out-alt mr-2"
                  ></i>
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

export default Header;
