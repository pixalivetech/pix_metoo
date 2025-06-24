import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Masterheader from "../../../Components/MasterHeader";
import Mastersidebar from "../../../Components/MasterSidebar";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
} from "@mui/material";
import { toast } from "react-toastify";
import { ExportCsvService } from "../../../Utils/Excel";
import { templatePdf } from "../../../Utils/PdfMake";
import { deleteContact, getFilterContact } from "../../../api/contact";
import { getUserId } from "../../../Utils/Storage";

export default function ContactList() {
  const initialStateInputs = {
    name: "",
    email: "",
  };

  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState(initialStateInputs);
  const [openFilter, setOpenFilter] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const [contact, setContact] = useState();
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    filter ? filterContactList() : getAllContact();
  }, [pagination.from, pagination.to]);

  const getAllContact = () => {
    const data = {
      limit: 10,
      page: pagination.from,
      userId: getUserId(),
    };
    getFilterContact(data)
      .then((res) => {
        setContact(res?.data?.result?.userList);
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

  const openPopup = (data) => {
    setOpen(true);
    setDeleteId(data);
  };

  const closePopup = () => {
    setOpen(false);
  };

  const deleteContactData = () => {
    deleteContact(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getAllContact();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openFilterPopup = () => {
    setOpenFilter(true);
  };

  const closeFilterPopup = () => {
    setOpenFilter(false);
  };

  const filterContactList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
      name: inputs?.name,
      email: inputs?.email,
      limit: 10,
      page: pagination.from,
      userId: getUserId(),
    };
    getFilterContact(data)
      .then((res) => {
        setContact(res?.data?.result?.userList);
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
    getAllContact();
  };

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const pdfDownload = (event) => {
    event?.preventDefault();
    const data = { userId: getUserId() };
    getFilterContact(data)
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
            text: "Name",
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
            text: "Mobile Number",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "messageGoesHere",
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
              text: element?.name,
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
              text: element?.number ?? 0,
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.messageGoesHere ?? 0,
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
          ]);
        });
        templatePdf("contact List", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const exportCsv = (event) => {
    event?.preventDefault();
    const data = { userId: getUserId() };
    getFilterContact(data)
      .then((res) => {
        var result = res?.data?.result?.userList;
        let list = [];
        result?.forEach((res) => {
          list.push({
            name: res?.name ?? "-",
            email: res?.email ?? "-",
            number: res?.number ?? "-",
            messageGoesHere: res?.messageGoesHere ?? "-",
          });
        });
        let header1 = ["name", "email", "number", "messageGoesHere"];
        let header2 = ["name", "email", "number", "messageGoesHere"];
        ExportCsvService.downloadCsv(
          list,
          "Contactlist",
          "Contact List",
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
                <h1 style={{ color: "#9265cc" }}>Contact List</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb d-flex justify-content-end align-items-center">
                  <li class="m-2">
                    <Link onClick={pdfDownload} class="btn-filters">
                      <button className="btn btn-outline-primary p-2">
                        <span>
                          <i class="fa fa-file-pdf" aria-hidden="true"></i>
                        </span>
                      </button>
                    </Link>
                  </li>
                  <li class="m-2">
                    <Link onClick={exportCsv} class="btn-filters">
                      <span>
                        <button className="btn btn-outline-primary p-2">
                          <i class="fa fa-file-excel" aria-hidden="true"></i>
                        </button>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link onClick={openFilterPopup} class="btn-filters">
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
                          <th>Name </th>
                          <th>Email</th>
                          <th>Mobile Number</th>
                          <th>Messages</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {contact?.map((data, index) => (
                          <tr key={index}>
                            <td>#{pagination.from + index + 1}</td>

                            <td>{data?.name} </td>
                            <td>{data?.email}</td>
                            <td>{data?.mobileNumber}</td>
                            <td>{data?.messages}</td>

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
                                      pathname: "/Masterviewcontact",
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
                        {contact?.length === 0 ? (
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
      <Dialog open={open}>
        <DialogContent>
          <div className="text-center m-4">
            <h5 className="mb-4" style={{ color: "#9265cc" }}>
              Are you sure you want to Delete <br /> the selected contact ?
            </h5>
            <button
              type="button"
              className="btn w-25 btn-outline-success btn-save mx-3"
              onClick={deleteContactData}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn w-25 btn-outline-success btn-cancel "
              onClick={closePopup}
            >
              No
            </button>
          </div>
        </DialogContent>
      </Dialog>
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
              <label className="form-label">Search by E-mail</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="email"
                value={inputs?.email}
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
                onClick={filterContactList}
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
}
