import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Mastersidebar from "../../Components/MasterSidebar";
import Masterheader from "../../Components/MasterHeader";
import { getFilterMasterDoctor } from "../../api/doctor";

const MasterDoctorlist = () => {
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const [doctor, setDoctor] = useState();

  useEffect(() => {
    getAllDoctorProfileDetails();
  }, [pagination.from, pagination.to]);

  const getAllDoctorProfileDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };

    getFilterMasterDoctor(data)
      .then((res) => {
        setDoctor(res?.data?.result?.doctorList);
        setPagination({ ...pagination, count: res?.data?.result?.doctorCount });
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
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ color: "#9265cc" }}>Doctor List</h1>
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
                    <table className=" table card-table dataTable text-center">
                      <thead>
                        <tr style={{ color: "#9265cc" }}>
                          <th>S No</th>
                          <th> Name</th>
                          <th>Profile Image</th>
                          <th>Specialization</th>
                          <th>Mobilenumber</th>
                          <th>Email</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {doctor?.map((data, index) => (
                          <tr key={index}>
                            <td>#{pagination.from + index + 1}</td>
                            <td>{data?.doctorName}</td>
                            <td>
                              <img
                                className="avatar-sm-post"
                                width={100}
                                height={100}
                                src={data?.profileImage}
                                alt="User"
                              />
                            </td>
                            <td>{data?.specialization.join(", ")}</td>
                            <td>{data?.phone}</td>
                            <td>{data?.email}</td>
                            <td>
                              <div className="dropdown dropdown-action">
                                <a
                                  href="/#"
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
                                      pathname: "/Masterdoctorview",
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
                        {doctor?.length === 0 ? (
                          <tr>
                            <td className="form-text text-danger" colSpan="9">
                              No data
                            </td>
                          </tr>
                        ) : null}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterDoctorlist;
