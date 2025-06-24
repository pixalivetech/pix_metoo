import React from "react";
import Mastersidebar from "../../Components/MasterSidebar";
import Masterheader from "../../Components/MasterHeader";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
} from "@mui/material";
import { templatePdf } from "../../Utils/PdfMake";
import { ExportCsvService } from "../../Utils/Excel";
import { getUserId } from "../../Utils/Storage";
import { getFilterMasterUser } from "../../api/user";

const MasterUserlist = () => {
  const initialStateInputs = {
    city: "",
    state: "",
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
    filter ? filterMasterUserList() : getAllUserProfileDetails();
  }, [pagination.from, pagination.to]);

  const getAllUserProfileDetails = () => {
    const data = {
      limit: 10,
      page: pagination.from,
      userId: getUserId(),
    };
    getFilterMasterUser(data)
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

  const openFilterPopup = () => {
    setOpenFilter(true);
  };

  const closeFilterPopup = () => {
    setOpenFilter(false);
  };

  const filterMasterUserList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
      city: inputs?.city,
      state: inputs?.state,
      limit: 10,
      page: pagination.from,
      userId: getUserId(),
    };
    getFilterMasterUser(data)
      .then((res) => {
        setUser(res?.data?.result?.userList);
        setPagination({ ...pagination, count: res?.data?.result?.userCount });
        closeFilterPopup();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetFilter = () => {
    setFilter(false);
    setInputs(initialStateInputs);
    getAllUserProfileDetails();
  };

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const pdfDownload = (event) => {
    event?.preventDefault();
    const data = { userId: getUserId() };
    getFilterMasterUser(data)
      .then((res) => {
        var result = res?.data?.result?.userList;
        var tablebody = [];
        tablebody.push([
          {
            text: "S.NO",
            fontSize: 11,
            alignment: "center",
            margin: [5, 5],
            bold: true,
          },

          {
            text: "FullName",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Email",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "MobileNumber",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Address",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "City",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "State",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Pincode",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
        ]);
        result.forEach((element, index) => {
          tablebody.push([
            {
              text: index + 1,
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
              border: [true, false, true, true],
            },
            {
              text: element?.fullName,
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.email ?? 0,
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.mobileNumber ?? 0,
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.address ?? 0,
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.city ? element?.city : "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.state ? element?.state : "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.pincode ? element?.pincode : "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
          ]);
        });
        templatePdf("User List", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();
    const data = { userId: getUserId() };
    getFilterMasterUser(data)
      .then((res) => {
        var result = res?.data?.result?.userList;
        let list = [];
        result?.forEach((res) => {
          list.push({
            fullName: res?.fullName ?? "-",
            email: res?.email ?? "-",
            mobileNumber: res?.mobileNumber ?? "-",
            address: res?.address ?? "-",
            city: res?.city ?? "-",
            state: res?.state ?? "-",
            pincode: res?.pincode ?? "-",
          });
        });
        let header1 = [
          "fullName",
          "email",
          "mobileNumber",
          "address",
          "city",
          "state",
          "pincode",
        ];
        let header2 = [
          "FullName",
          "Email",
          "MobileNumber",
          "Address",
          "City",
          "State",
          "Pincode",
        ];
        ExportCsvService.downloadCsv(
          list,
          "Userlist",
          "User List",
          header1,
          header2
        );
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
                <h1 style={{ color: "#9265cc" }}>User List</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb d-flex justify-content-end align-items-center">
                  <li class="m-2">
                    <Link class="btn-filters" onClick={pdfDownload}>
                      <button className="btn btn-outline-primary p-2">
                        <span>
                          <i class="fa fa-file-pdf" aria-hidden="true"></i>
                        </span>
                      </button>
                    </Link>
                  </li>
                  <li class="m-2">
                    <Link class="btn-filters" onClick={exportCsv}>
                      <span>
                        <button className="btn btn-outline-primary p-2">
                          <i class="fa fa-file-excel" aria-hidden="true"></i>
                        </button>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link class="btn-filters" onClick={openFilterPopup}>
                      <span>
                        <button className="btn btn-outline-primary p-2">
                          <i class="fa fa-filter" aria-hidden="true"></i>
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
          <div className="col-xl-12">
            <div className="card mt-2">
              <div className="card-body">
                <div className="card-table">
                  <div className="table-responsive">
                    <table className=" table card-table dataTable text-center">
                      <thead>
                        <tr style={{ color: "#9265cc" }}>
                          <th>S No</th>
                          <th>FullName</th>
                          <th>Profile Image</th>
                          <th>mobile Number</th>
                          <th>Email</th>
                          <th>City</th>
                          <th>State</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {user?.map((data, index) => (
                          <tr key={index}>
                            <td>#{pagination.from + index + 1}</td>
                            <td>{data?.name}</td>
                            <td>
                              <img
                                className="avatar-sm-post"
                                width={100}
                                height={100}
                                src={data?.profileImage}
                                alt="User"
                              />
                            </td>

                            <td>{data?.mobileNumber}</td>
                            <td>{data?.email}</td>
                            <td>{data?.city}</td>
                            <td>{data?.state}</td>
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
                                      pathname: "/Masteruserview",
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
                            <td className="form-text text-danger">No data</td>
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

      <Dialog open={openFilter} fullWidth maxWidth="sm">
        <DialogTitle>
          Filter Products
          <IconButton className="float-right" onClick={closeFilterPopup}>
            <i className="fa fa-times fa-xs" aria-hidden="true"></i>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form>
            <div className="from-group mb-3">
              <label className="form-label">Search by City</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="city"
                value={inputs?.city}
                onChange={handleInputs}
                placeholder="search..."
              />
            </div>
            <div>
              <button
                type="button"
                className="btn btn-cancel border text-white float-right bg"
                style={{ backgroundColor: "#9265cc" }}
                onClick={resetFilter}
              >
                Reset
              </button>
              <button
                type="submit"
                onClick={filterMasterUserList}
                className="btn btn-save border text-white float-right mx-2"
                style={{ backgroundColor: "#9265cc" }}
              >
                Apply
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MasterUserlist;
