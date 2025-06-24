import React from "react";
import DoctorHeader from "../../Components/DoctorHeader";
import DoctorSidebar from "../../Components/DoctorSidebar";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import { useState } from "react";
import { getFilterUser } from "../../api/user";
import { useEffect } from "react";
import { getAdminId, getUserId } from "../../Utils/Storage";

const DoctorUserlist = () => {
  const initialStateInputs = {
    name: "",
  };

  const [inputs, setInputs] = useState(initialStateInputs);
  const [openFilter, setOpenFilter] = useState(false);
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  const [user, setUser] = useState();
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    getAllUserList();
  }, [pagination.from, pagination.to]);

  const getAllUserList = () => {
    const data = {
      limit: 10,
      page: pagination.from,
      panelId: getUserId(),
      companyId: getAdminId(),
    };
    getFilterUser(data)
      .then((res) => {
        setUser(res?.data?.result?.userList);
        setPagination({ ...pagination, count: res?.data?.result?.userCount });
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

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
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
                <h1 style={{ color: "#9265cc" }}>User List</h1>
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
                          <th>Image</th>
                          <th>email</th>
                          <th>Mobile Number</th>
                          <th>City</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user?.map((data, index) => (
                          <tr key={index}>
                            <td>{pagination.from + index + 1}</td>
                            <td>{data?.name}</td>
                            <td>
                              <img
                                className="avatar-sm-post"
                                src={data?.profileImage}
                                alt="User"
                                style={{ width: "50px", height: "50px" }}
                              />
                            </td>
                            <td>{data?.email}</td>
                            <td>{data?.mobileNumber}</td>
                            <td>{data?.city}</td>
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
                                      pathname: "/DoctorUserView",
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
                        {user?.length === 0 ? (
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
                <div className="float-right my-2">
                  <Pagination
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

export default DoctorUserlist;
