import React, { useState, useEffect } from "react";
import DoctorSidebar from "../../Components/DoctorSidebar";
import DoctorHeader from "../../Components/DoctorHeader";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import { getDoctorId } from "../../Utils/Storage";
import {
  ListAppointment,
  updateAppointmentStatus,
} from "../../api/appointment";

const UserAppointmentList = () => {
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    getAllAppointments();
  }, [pagination.from, pagination.to]);

  const getAllAppointments = () => {
    const data = {
      limit: 10,
      page: pagination.from,
      doctorId: getDoctorId(),
    };

    ListAppointment(data)
      .then((res) => {
        setAppointments(res?.data?.result);
        setPagination({ ...pagination, count: res?.data?.result });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = page * pageSize;
    setPagination({ ...pagination, from: from, to: to });
  };

  const handleStatusChange = (appointmentId, newStatus, index) => {
    const updatedAppointments = appointments.map((appointment, idx) => {
      if (idx === index) {
        return { ...appointment, scheduleStatus: newStatus };
      }
      return appointment;
    });
    setAppointments(updatedAppointments);
    updateAppointmentStatus(appointmentId, newStatus)
      .then((res) => {
      })
      .catch((err) => {
        console.error(err);
        setAppointments(appointments);
      });
  };

  return (
    <div>
      <DoctorSidebar />
      <DoctorHeader />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ color: "#9265cc" }}> User Appointment List</h1>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12">
            <div className="card mt-2">
              <div className="card-body">
                <div className="card-table">
                  <div className="table-responsive">
                    <table className=" table card-table datatable text-center">
                      <thead>
                        <tr style={{ color: "#9265cc" }}>
                          <th>S No</th>
                          <th>Patient Name</th>
                          <th>Meeting Time</th>
                          <th>Appointment date</th>
                          <th>Mobile Number</th>
                          <th>Status</th>
                          <th>Ticket Number</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments?.map((data, index) => (
                          <tr key={index}>
                            <td>#{pagination.from + index + 1}</td>
                            <td>{data?.name}</td>
                            <td>{data?.scheduleTime}</td>
                            <td>{data?.scheduleDate}</td>
                            <td>{data?.mobileNumber}</td>
                            <td>
                              <select
                                className="form-select"
                                name="scheduleStatus"
                                value={data?.scheduleStatus}
                                onChange={(e) =>
                                  handleStatusChange(
                                    data._id,
                                    e.target.value,
                                    index
                                  )
                                }
                                disabled={data?.scheduleStatus === "completed"}
                              >
                                <option hidden>Select Options</option>
                                <option
                                  value={"confirmed"}
                                  selected={data?.scheduleStatus === "confirm"}
                                >
                                  Confirm
                                </option>
                                <option
                                  className="text-danger"
                                  value={"rejected"}
                                  selected={data?.scheduleStatus === "reject"}
                                >
                                  Reject
                                </option>
                                <option
                                  className="text-success"
                                  value={"completed"}
                                  selected={
                                    data?.scheduleStatus === "completed"
                                  }
                                >
                                  Completed
                                </option>
                              </select>
                            </td>
                            <td>
                              {data?.ticketNumber ? data.ticketNumber : "-"}
                            </td>
                            <td>
                              <div className="dropdown dropdown-action">
                                <a
                                  href=""
                                  className="action-icon dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fe fe-more-horizontal"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <Link
                                    className="dropdown-item"
                                    to={{
                                      pathname: "/UserAppointmentview",
                                      search: `?id=${data?._id}`,
                                    }}
                                  >
                                    <i className="far fa-eye me-2"></i>
                                    &nbsp;View
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {appointments?.length === 0 ? (
                          <tr>
                            <td className="form-text text-danger" colSpan="9">
                              No Appointments
                            </td>
                          </tr>
                        ) : null}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="float-right my-2">
                  <Pagination
                    count={Math.ceil(pagination.count / pageSize)}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAppointmentList;
