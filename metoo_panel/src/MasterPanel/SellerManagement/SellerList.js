import React from "react";
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
import Mastersidebar from "../../Components/MasterSidebar";
import Masterheader from "../../Components/MasterHeader";
import { templatePdf } from "../../Utils/PdfMake";
import { ExportCsvService } from "../../Utils/Excel";
import { localDate } from "../../Utils/DateFormat";
import { getFilterMasterDoctor } from "../../api/doctor";
import { getUserId } from "../../Utils/Storage";
import { getAllPanelProfileDetails } from "../../api/profile";

const MasterSellerList = () => {
  const initialStateInputs = {
    companyName: "",
    city: "",
  };

  const [inputs, setInputs] = useState(initialStateInputs);
  const [openFilter, setOpenFilter] = useState(false);

  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const [seller, setSeller] = useState();
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    filter ? filterPanelList() : getAllPanelProfileMaster();
  }, [pagination.from, pagination.to]);

  const getAllPanelProfileMaster = () => {
    const data = {
      limit: 10,
      page: pagination.from,
      panelId: getUserId(),
    };

    getAllPanelProfileDetails(data)
      .then((res) => {
        setSeller(res?.data?.result?.panelList);
        setPagination({ ...pagination, count: res?.data?.result?.panelCount });
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

  const filterPanelList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
      companyName: inputs?.companyName,
      city: inputs?.city,
      limit: 10,
      page: pagination.from,
      panelId: getUserId(),
    };
    getAllPanelProfileDetails(data)
      .then((res) => {
        setSeller(res?.data?.result?.panelList);
        setPagination({ ...pagination, count: res?.data?.result?.panelCount });
        closeFilterPopup();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetFilter = () => {
    setFilter(false);
    setInputs(initialStateInputs);
    getAllPanelProfileMaster();
  };

  const handleInputs = (event) => {
    setSeller({ ...inputs, [event.target.name]: event.target.value });
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
                <h1 style={{ color: "#9265cc" }}>Seller's List</h1>
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
                          <th>Company Name</th>
                          <th>Name</th>
                          <th>Profile Image</th>
                          <th>Email</th>
                          <th>Mobile Number</th>
                          <th>Company Address</th>
                          <th>City</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {seller?.map((data, index) => (
                          <tr key={index}>
                            <td>#{pagination.from + index + 1}</td>
                            <td>{data?.companyName}</td>
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
                            <td>{data?.email}</td>
                            <td>{data?.mobileNumber}</td>
                            <td>{data?.companyAddress}</td>
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
                                      pathname: "/Mastersellerview",
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
                        {seller?.length === 0 ? (
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
          Filter Sellers
          <IconButton className="float-right" onClick={closeFilterPopup}>
            <i className="fa fa-times fa-xs" aria-hidden="true"></i>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form>
            <div className="from-group mb-3">
              <label className="form-label">File Type</label>
              <br />
              <select
                className="form-select"
                value={inputs?.fileType ?? ""}
                onChange={handleInputs}
                name="fileType"
              >
                <option value={""} disabled hidden>
                  Select File Type
                </option>{" "}
                &nbsp;
                <option value={1}>CompanyName</option>
                <option value={2}>City</option>
              </select>
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
                onClick={getFilterMasterDoctor}
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

export default MasterSellerList;
