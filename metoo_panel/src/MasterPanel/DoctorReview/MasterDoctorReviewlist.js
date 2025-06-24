import React, { useState, useEffect } from "react";
import Mastersidebar from "../../Components/MasterSidebar";
import Masterheader from "../../Components/MasterHeader";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import { ListDoctorReviews } from "../../api/review";

const MasterDoctorReviewlist = () => {
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const [review, setReview] = useState([]);

  useEffect(() => {
    getAllDoctorReview();
  }, [pagination.from, pagination.to]);

  const getAllDoctorReview = () => {
    const data = {
      limit: 10,
      page: pagination.from,
    };
    ListDoctorReviews(data)
      .then((res) => {
        setReview(res?.data?.result?.reviewList);
        setPagination({ ...pagination, count: res?.data?.result?.reviewCount });
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
                <h1 className="m-0" style={{ color: "#9265cc" }}>
                  User Reviews
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="col-xl-12">
            <div className="card mt-2">
              <div className="card-body">
                <div className="card-table">
                  <div className="table-responsive">
                    <table className=" table card-table dataTable text-center">
                      <thead>
                        <tr style={{ color: "#9265cc" }}>
                          <th>S No.</th>
                          <th>Doctor Name</th>
                          <th>User Name</th>
                          <th>Patient Name</th>
                          <th>Title</th>
                          <th>Comment</th>
                          <th>Rating</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {review?.map((data, index) => (
                          <tr key={index}>
                            <td>{pagination.from + index + 1}</td>
                            <td>{data?.doctorId?.doctorName}</td>
                            <td>{data?.userId?.name}</td>
                            <td>{data?.fullName}</td>
                            <td>{data?.title}</td>
                            <td>{data?.comment}</td>
                            <td>{data?.rating}</td>
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
                                      pathname: "/Masterdoctorreviewview",
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
                        {review?.length === 0 ? (
                          <tr>
                            <td className="form-text text-danger" colSpan="9">
                              No Review
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

export default MasterDoctorReviewlist;
