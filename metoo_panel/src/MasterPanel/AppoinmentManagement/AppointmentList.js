import React, { useState, useEffect } from "react";
import Mastersidebar from "../../Components/MasterSidebar";
import Masterheader from "../../Components/MasterHeader";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import { ListAllAppointment } from "../../api/appointment";

const AppointmentList = () => {
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const [appointment, setAppointment] = useState([]);

  useEffect(() => {
    getAllAppointment();
  }, [pagination.from, pagination.to]);

  const getAllAppointment = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };

    ListAllAppointment(data)
      .then((res) => {
        setAppointment(res?.data?.result?.appointmentList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.appointmentCount,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
  };

  return (
    <div>
      <Mastersidebar />
      <Masterheader />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ color: "#9265cc" }}>Appointment List</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb d-flex justify-content-end align-items-center">
                  <li className="m-2">
                    <Link className="btn-filters">
                      <button className="btn btn-outline-primary p-2">
                        <span>
                          <i className="fa fa-file-pdf" aria-hidden="true"></i>
                        </span>
                      </button>
                    </Link>
                  </li>
                  <li className="m-2">
                    <Link className="btn-filters">
                      <span>
                        <button className="btn btn-outline-primary p-2">
                          <i
                            className="fa fa-file-excel"
                            aria-hidden="true"
                          ></i>
                        </button>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link className="btn-filters">
                      <span>
                        <button className="btn btn-outline-primary p-2">
                          <i className="fa fa-filter" aria-hidden="true"></i>
                        </button>
                      </span>
                    </Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xl-12 ">
            <div className="card mt-2">
              <div className="card-body">
                <div className="card-table">
                  <div className="table-responsive">
                    <table className=" table card-table  text-center">
                      <thead>
                        <tr style={{ color: "#9265cc" }}>
                          <th>S No</th>
                          <th>Doctor Name</th>
                          <th>User Name</th>
                          <th>Meeting Time</th>
                          <th>Appoinment date</th>
                          <th>Mobile Number</th>
                          <th>Ticket Number</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointment?.map((data, index) => (
                          <tr key={index}>
                            <td>{pagination.from + index + 1}</td>
                            <td>{data?.doctorId?.doctorName}</td>
                            <td>{data?.name}</td>
                            <td>{data?.scheduleTime}</td>
                            <td>{data?.scheduleDate}</td>
                            <td>{data?.mobileNumber}</td>
                            <td>{data?.ticketNumber}</td>
                            <td>{data?.scheduleStatus}</td>
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
                                      pathname: "/appointmentview",
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
                        {appointment?.length === 0 ? (
                          <tr>
                            <td className="form-text text-danger" colSpan="9">
                              No Appointment
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

export default AppointmentList;
