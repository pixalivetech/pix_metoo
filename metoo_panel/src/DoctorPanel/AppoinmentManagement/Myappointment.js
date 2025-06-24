import React, { useState, useEffect } from "react";
import "./Myappointment.css";
import { getDoctorAppointments } from "../../api/appointment";
import { getDoctorId } from "../../Utils/Storage";
import Date from "../../Assests/Images/my appointment/date.png";
import Time from "../../Assests/Images/my appointment/time.png";
import Ticket from "../../Assests/Images/my appointment/tickett.png";
import Status from "../../Assests/Images/my appointment/status.png";
import Patient from "../../Assests/Images/my appointment/patient.png";
import Mobile from "../../Assests/Images/my appointment/mobile.jpg";
import DoctorHeader from "../../Components/DoctorHeader";
import DoctorSidebar from "../../Components/DoctorSidebar";

function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 5;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    getAllMyAppointments();
  }, [currentPage]);

  const getAllMyAppointments = () => {
    setLoading(true);

    const data = {
      doctorId: getDoctorId(),
      page: currentPage,
      limit: itemsPerPage,
    };
    getDoctorAppointments(data)
      .then((res) => {
        const doctorId = getDoctorId();
        const doctorAppointments = res?.data?.result.filter(
          (item) => item.doctorId?._id === doctorId
        );
        setTotalPages(Math.ceil(doctorAppointments.length / itemsPerPage));
        setAppointments(
          doctorAppointments.slice(
            (currentPage - 1) * itemsPerPage,
            currentPage * itemsPerPage
          ) || []
        );
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div>
        <DoctorSidebar />
        <DoctorHeader />
      </div>
      <div className="container appoint">
        <div className="row">
          <div className="col-12 mt-4 mb-2">
            <h3>My Appointment History</h3>
          </div>
          {loading && <p>Loading...</p>}
          {Array.isArray(appointments) &&
            appointments.map((appointment, index) => (
              <div className="col-lg-12 mb-3 p-1" key={index}>
                <div className="card w-75">
                  <div className="card-body custom-bg-color small-app">
                    <div className="card p-2 detail-content">
                      <h4>Patient Details</h4>
                      <div className="underline1 mb-1"></div>
                      <div className="d-flex iconz">
                        <div>
                          <img src={Patient} alt="img" className="mt-1" />
                        </div>
                        <div>
                          <h6 className="card-title">Name</h6>
                          <p className="card-text">{appointment?.name}</p>
                        </div>
                      </div>
                      <br />
                      <div className="d-flex iconz">
                        <div>
                          <img src={Mobile} alt="img" className="mt-1" />
                        </div>
                        <div>
                          <h6 className="card-title">Mobile</h6>
                          <p className="card-text">
                            {appointment?.mobileNumber}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="card p-2 detail-contented">
                      <h4 className="">Appointment Details</h4>
                      <div className="underline1 mb-1"></div>
                      <div className="small-app">
                        <div>
                          <div className="d-flex iconz">
                            <div>
                              <img src={Date} alt="img" className="mt-1" />
                            </div>
                            <div>
                              <h6 className="card-title">Date</h6>
                              <p className="card-text">
                                {appointment?.scheduleDate}
                              </p>
                            </div>
                          </div>
                          <br />
                          <div className="d-flex iconz">
                            <div>
                              <img src={Time} alt="img" className="mt-1" />
                            </div>
                            <div>
                              <h6 className="card-title">Time</h6>
                              <p className="card-text">
                                {appointment?.scheduleTime}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="">
                          <div className="d-flex iconzz mt-2">
                            <div>
                              <img src={Ticket} alt="img" className="mt-1" />
                            </div>
                            <div className="text-icon">
                              <h6 className="card-title">Ticket Number</h6>
                              <p className="card-text">
                                {appointment?.ticketNumber}
                              </p>
                            </div>
                          </div>
                          <br />
                          <div className="d-flex  iconzz">
                            <div>
                              <img src={Status} alt="img" className="mt-1" />
                            </div>
                            <div className="text-icon">
                              <h6 className="card-title">Appointment Status</h6>
                              <p className="card-text">
                                {appointment?.scheduleStatus}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {!loading && (
            <div className="col-12 mt-4">
              <nav>
                <ul className="pagination">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <li
                      key={index}
                      className={`page-item ${
                        currentPage === index + 1 ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(index + 1)}
                      >
                        {index + 1}
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyAppointments;
