import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import Masterheader from "../../Components/MasterHeader";
import Mastersidebar from "../../Components/MasterSidebar";
import { Dialog, DialogContent, Pagination } from "@mui/material";
import { getAdminId } from "../../Utils/Storage";
import { toast } from "react-toastify";
import { deleteCarousel, getCarousel } from "../../api/ads";
import { localDate } from "../../Utils/DateFormat";

export default function Masteradslist() {
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const [ads, setAds] = useState();
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    filter ? filterAdsList() : getAllAds();
  }, [pagination.from, pagination.to]);

  const getAllAds = () => {
    const data = {
      limit: 10,
      page: pagination.from,
      companyId: getAdminId(),
    };

    getCarousel(data)
      .then((res) => {
        setAds(res?.data?.result?.carouselList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.carouselCount,
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

  const openPopup = (data) => {
    setOpen(true);
    setDeleteId(data);
  };

  const closePopup = () => {
    setOpen(false);
  };

  const deleteAds = () => {
    deleteCarousel(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getAllAds();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const filterAdsList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
      limit: 10,
      page: pagination.from,
      companyId: getAdminId(),
    };
    getCarousel(data)
      .then((res) => {
        setAds(res?.data?.result?.carouselList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.carouselCount,
        });
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
                <h1 style={{ color: "#9265cc" }}>Advertisement List</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb d-flex justify-content-end align-items-center">
                  <li class="m-2">
                    <Link class="btn btn-pix-primary" to="/Masteraddads">
                      <button
                        className="btn btn-outline border text-white rounded-pill p-2"
                        style={{ backgroundColor: "#9265cc" }}
                      >
                        <i
                          class="fa fa-plus-circle me-2"
                          aria-hidden="true"
                        ></i>{" "}
                        Add Advertisement
                      </button>
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
                          <th>Images</th>
                          <th>Title</th>
                          <th>Content</th>
                          <th>Created On</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ads?.map((data, index) => (
                          <tr key={index}>
                            <td>#{pagination.from + index + 1}</td>
                            <td>
                              <img
                                className="avatar-sm-post"
                                width={100}
                                height={100}
                                src={data?.image}
                                alt="user"
                              />
                            </td>
                            <td>{data?.title}</td>
                            <td>{data?.content}</td>
                            <td>{localDate(data?.createdOn)}</td>
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
                                      pathname: "/Masterviewads",
                                      search: `?id=${data?._id}`,
                                    }}
                                  >
                                    <i className="far fa-eye me-2"></i>
                                    &nbsp;View
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to={{
                                      pathname: "/Mastereditads",
                                      search: `?id=${data?._id}`,
                                    }}
                                  >
                                    <i className="far fa-edit me-2"></i>
                                    &nbsp;Edit
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    onClick={() => {
                                      openPopup(data?._id);
                                    }}
                                  >
                                    <i className="far fa-trash-alt me-2"></i>
                                    &nbsp;Delete
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {ads?.length === 0 ? (
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
            <h5 className="mb-4">
              Are you sure you want to Delete <br /> the selected Product ?
            </h5>
            <button
              type="button"
              className="btn btn-save mx-3"
              onClick={deleteAds}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-cancel "
              onClick={closePopup}
            >
              No
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
