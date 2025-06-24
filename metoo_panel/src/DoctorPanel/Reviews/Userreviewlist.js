import React, { useEffect, useState } from "react";
import DoctorSidebar from "../../Components/DoctorSidebar";
import DoctorHeader from "../../Components/DoctorHeader";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import { ListReviews } from "../../api/review";
import { getDoctorId } from "../../Utils/Storage";

export default function Userreviewlist() {
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const [review, setReview] = useState();

  useEffect(() => {
    getAllReview();
  }, [pagination.from, pagination.to]);

  const getAllReview = () => {
    const data = {
      limit: 10,
      page: pagination.from,
      doctorId: getDoctorId(),
    };
    ListReviews(data)
      .then((res) => {
        setReview(res?.data?.result);
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

  return (
    <div>
      <DoctorSidebar />
      <DoctorHeader />

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
                          <th>User Name</th>
                          <th>Patient Name</th>
                          <th>Title</th>
                          <th>Comment</th>
                          <th>Rating</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {review &&
                          review?.map((data, index) => (
                            <tr key={index}>
                              <td>{pagination.from + index + 1}</td>
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
                                        pathname: "/Userreviewview",
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
                            <td className="form-text text-danger">No Review</td>
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
}
