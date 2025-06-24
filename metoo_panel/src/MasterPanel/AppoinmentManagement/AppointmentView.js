import React, { useState, useEffect } from "react";
import Mastersidebar from "../../Components/MasterSidebar";
import Masterheader from "../../Components/MasterHeader";
import { Link, useLocation } from "react-router-dom";
import { getSingleAppointment } from "../../api/appointment";

const AppointmentView = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [appointment, setAppointment] = useState();

  useEffect(() => {
    getAppointmentDetails();
  }, []);

  const getAppointmentDetails = () => {
    getSingleAppointment(id)
      .then((res) => {
        setAppointment(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Mastersidebar />
      <Masterheader />
      <div className="content-wrapper">
        <div className="content-header mt-3">
          <div className="content container-fluid">
            <form>
              <div className="row justify-content-between align-items-center mb-3">
                <div className="col-auto">
                  <h5 className="text-bold" style={{ color: "#9265cc" }}>
                    View Appointment
                  </h5>
                </div>
                <div className="col-lg-2 col-md-3 col-sm-4 col-6 text-end mt-2 mt-lg-0">
                  <Link to="/appointmentlist">
                    <button
                      className="btn btn-outline border text-white"
                      style={{ backgroundColor: "#9265cc" }}
                    >
                      Appointment List
                    </button>
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-6 mx-auto">
                  <div className="card mt-2 p-2">
                    <div className="card-body ">
                      <div className="form-group">
                        <label style={{ color: "#9265cc" }}>Doctor Name</label>
                        <br />
                        <span>{appointment?.doctorId?.doctorName}</span>
                      </div>
                      <div className="form-group">
                        <label style={{ color: "#9265cc" }}>User Name</label>
                        <br />
                        <span>{appointment?.name}</span>
                      </div>
                      <div className="form-group">
                        <label style={{ color: "#9265cc" }}>Meeting Time</label>
                        <br />
                        <span>{appointment?.scheduleTime}</span>
                      </div>
                      <div className="form-group">
                        <label style={{ color: "#9265cc" }}>
                          Appointment date
                        </label>
                        <br />
                        <span>{appointment?.scheduleDate}</span>
                      </div>
                      <div className="form-group">
                        <label style={{ color: "#9265cc" }}>
                          Mobile Number
                        </label>
                        <br />
                        <span>{appointment?.mobileNumber}</span>
                      </div>
                      <div className="form-group">
                        <label style={{ color: "#9265cc" }}>
                          Ticket Number
                        </label>
                        <br />
                        <span>{appointment?.ticketNumber}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentView;
