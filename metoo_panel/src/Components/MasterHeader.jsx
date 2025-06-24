import React, { useEffect, useState, useRef } from "react";
import eventEmitter from "./EventEmitter";

const Masterheader = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  };

  const toggleSidebar = () => {
    eventEmitter.emit("TOGGLE_SIDEBAR");
  };

  return (
    <div>
      <nav className="main-header navbar navbar-expand-md navbar-white navbar-light position-static">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          onClick={toggleSidebar}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                data-widget="pushmenu"
                href="#"
                role="button"
              >
                <i className={`fas fa-bars`} />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Masterheader;
