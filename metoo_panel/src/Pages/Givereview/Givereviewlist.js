import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Sidebar from "../../Components/SideBar";
import Header from "../../Components/Header";
import { toast } from "react-toastify";
import { Dialog, DialogContent, Pagination } from "@mui/material";
import { deleteReview, listPanelReview } from "../../api/review";
import { localDate } from "../../Utils/DateFormat";
import { getUserId } from "../../Utils/Storage";

function Givereviewlist() {
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const pageSize = 10;

  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const [panelReview, setPanelReview] = useState();

  useEffect(() => {
    getPanelReviewList();
  }, [pagination.from, pagination.to]);

  const getPanelReviewList = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };
    listPanelReview(data)
      .then((res) => {
        console.log("sarath", res);
        const panelId = getUserId();
        console.log(panelId);
        setPanelReview(
          res?.data?.result.filter(
            (review) => review.panelId && review.panelId._id === panelId
          )
        );
        setPagination({ ...pagination, count: res?.data?.result });
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

  const deleteReviewData = () => {
    deleteReview(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getPanelReviewList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Sidebar />
      <Header />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h3 style={{ color: "#9265cc" }}>Panel Review List</h3>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb d-flex justify-content-end align-items-center">
                  <li class="m-2">
                    <Link class="btn btn-pix-primary" to="/AddReview">
                      <button
                        className="btn btn-outline border text-white  p-2"
                        style={{ backgroundColor: "#9265cc" }}
                      >
                        <i
                          class="fa fa-plus-circle me-2"
                          aria-hidden="true"
                        ></i>{" "}
                        Add Review
                      </button>
                    </Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
        <div className="col-xl-12">
          <div className="card-body">
            <div className="card-table">
              <div className="table-responsive">
                <table className=" table card-table dataTable text-center">
                  <thead>
                    <tr style={{ color: "#9265cc" }}>
                      <th>S No</th>
                      <th>Title</th>
                      <th>Comment</th>
                      <th>createdOn</th>
                      <th>Rating</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {panelReview?.map((data, index) => (
                      <tr key={index}>
                        <td>#{pagination.from + index + 1}</td>
                        <td>{data?.title}</td>
                        <td>{data?.comment}</td>
                        <td>{localDate(data?.createdOn)}</td>
                        <td>{data?.rating}</td>
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
                            <div
                              className="dropdown-menu dropdown-menu-right"
                              style={{ position: "static" }}
                            >
                              <Link
                                className="dropdown-item"
                                to={{
                                  pathname: "/Givereviewedit",
                                  search: `?id=${data?._id}`,
                                }}
                              >
                                <i className="far fa-edit me-2"></i>Edit
                              </Link>
                              <Link
                                className="dropdown-item"
                                to={{
                                  pathname: "/Givereviewview",
                                  search: `?id=${data?._id}`,
                                }}
                              >
                                <i className="far fa-eye me-2"></i>View
                              </Link>
                              <Link
                                className="dropdown-item"
                                onClick={() => {
                                  openPopup(data?._id);
                                }}
                              >
                                <i className="far fa-trash-alt me-2"></i>
                                Delete
                              </Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {panelReview?.length === 0 ? (
                      <tr>
                        <td className="form-text text-danger">No data</td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="float-end my-2">
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
      <Dialog open={open}>
        <DialogContent>
          <div className="text-center m-4">
            <h5 className="mb-4">
              Are you sure you want to Delete <br /> the selected Review ?
            </h5>
            <button
              type="button"
              style={{ backgroundColor: "blueviolet" }}
              className="btn btn-save border text-white mx-3"
              onClick={deleteReviewData}
            >
              Yes
            </button>
            <button
              type="button"
              style={{ backgroundColor: "blueviolet" }}
              className="btn btn-cancel border text-white "
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

export default Givereviewlist;
