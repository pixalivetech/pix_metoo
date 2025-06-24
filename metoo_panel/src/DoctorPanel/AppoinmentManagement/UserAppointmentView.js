import React, { useState, useEffect } from "react";
import DoctorSidebar from "../../Components/DoctorSidebar";
import DoctorHeader from "../../Components/DoctorHeader";
import { Link, useLocation } from "react-router-dom";
import { getSingleAppointment } from "../../api/appointment";

const UserAppointmentView = () => {
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
      <DoctorSidebar />
      <DoctorHeader />
      <div className="content-wrapper">
        <div className="content-header mt-3">
          <div className="content container-fluid w-100">
            <form>
              <div className="row d-flex justify-content-between">
                <div className="content-page-header">
                  <h5 className=" text-bold" style={{ color: "#9265cc" }}>
                    View Appointment
                  </h5>
                </div>
                <div className="content-page-header">
                  <Link to="/UserAppointmentlist">
                    <button
                      className="btn btn-outline border text-white  p-2"
                      style={{ backgroundColor: "#9265cc" }}
                    >
                      Appointment List
                    </button>
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <div className="card mt-2 p-2">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>
                              Patient Name
                            </label>
                            <br />
                            <span>{appointment?.name}</span>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>
                              Meeting Time
                            </label>
                            <br />
                            <span>{appointment?.scheduleTime}</span>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>
                              Appointment Date
                            </label>
                            <br />
                            <span>{appointment?.scheduleDate}</span>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>
                              Mobile Number
                            </label>
                            <br />
                            <span>{appointment?.mobileNumber}</span>
                          </div>
                        </div>
                      </div>

                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>Status</label>
                            <br />
                            <span>{appointment?.scheduleStatus}</span>
                          </div>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-6">
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
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAppointmentView;
