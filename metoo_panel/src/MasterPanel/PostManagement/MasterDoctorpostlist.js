import React from "react";
import Mastersidebar from "../../Components/MasterSidebar";
import Masterheader from "../../Components/MasterHeader";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFilterPost } from "../../api/postDoctor";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
} from "@mui/material";
import { localDate } from "../../Utils/DateFormat";
import { ExportCsvService } from "../../Utils/Excel";
import { templatePdf } from "../../Utils/PdfMake";
import { getDoctorId } from "../../Utils/Storage";

const MasterDoctorpostlist = () => {
  const initialStateInputs = {
    fileType: "",
    postDate: "",
  };
  const [inputs, setInputs] = useState(initialStateInputs);
  const [openFilter, setOpenFilter] = useState(false);
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const [post, setPost] = useState();
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    filter ? filterPostList() : getAllPostList();
  }, [pagination.from, pagination.to]);

  const getAllPostList = () => {
    const data = {
      limit: 10,
      page: pagination.from,
      doctorId: getDoctorId(),
    };
    getFilterPost(data)
      .then((res) => {
        setPost(res?.data?.result?.postList);
        setPagination({ ...pagination, count: res?.data?.result?.postCount });
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

  const filterPostList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
      fileType: inputs?.fileType,
      postDate: inputs?.postDate,
      limit: 10,
      page: pagination.from,
      doctorId: getDoctorId(),
    };
    getFilterPost(data)
      .then((res) => {
        setPost(res?.data?.result?.postList);
        setPagination({ ...pagination, count: res?.data?.result?.postCount });
        closeFilterPopup();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetFilter = () => {
    setFilter(false);
    setInputs(initialStateInputs);
    getAllPostList();
  };

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
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
                <h1 style={{ color: "#9265cc" }}>Post List</h1>
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
                          <th>Doctor Name</th>
                          <th>Name</th>
                          <th>Video</th>
                          <th>createdOn</th>
                          <th>Likes</th>
                          <th>Comment Count</th>
                          <th>Share</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {post?.map((data, index) => (
                          <tr key={index}>
                            <td>#{pagination.from + index + 1}</td>
                            <td>{data?.doctorId?.doctorName}</td>
                            <td>{data?.title}</td>
                            <td>
                              <video
                                className="avatar-sm-post"
                                height={100}
                                width={200}
                              >
                                <source src={data?.video} type="video/mp4" />
                                <source src={data?.video} type="video/ogg" />
                              </video>
                            </td>
                            <td>{localDate(data?.createdOn)}</td>
                            <td>{data?.likeCount}</td>
                            <td>{data?.commentCount}</td>
                            <td>{data?.shareCount}</td>
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
                                      pathname: "/MasterDoctorpostview",
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
                        {post?.length === 0 ? (
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
        </div>
      </div>
      <Dialog open={openFilter} fullWidth maxWidth="sm">
        <DialogTitle>
          Filter Posts
          <IconButton className="float-end" onClick={closeFilterPopup}>
            <i className="fa fa-times fa-xs" aria-hidden="true"></i>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form>
            <div className="from-group mb-3">
              <label className="form-label">File Type</label>
              <select
                className="form-select"
                value={inputs?.fileType ?? ""}
                onChange={handleInputs}
                name="fileType"
              >
                <option value={""} disabled hidden>
                  Select File Type
                </option>
                <option value={1}>Image</option>
                <option value={2}>Video</option>
              </select>
            </div>
            <div className="from-group mb-3">
              <label htmlFor="date" className="form-label">
                Post Date
              </label>
              <input
                type="date"
                className="form-control"
                id="date"
                name="postDate"
                value={inputs?.postDate}
                onChange={handleInputs}
                placeholder="Enter Post Date"
              />
            </div>
            <div>
              <button
                type="button"
                className="btn btn-cancel  float-end"
                onClick={resetFilter}
              >
                Reset
              </button>
              <button
                type="submit"
                onClick={filterPostList}
                className="btn btn-save float-end mx-2"
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

export default MasterDoctorpostlist;
