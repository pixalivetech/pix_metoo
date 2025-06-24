import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DoctorHeader from "../../Components/DoctorHeader";
import DoctorSidebar from "../../Components/DoctorSidebar";
import { getSingleUser } from "../../api/user";

const DoctorUserview = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const [user, setUser] = useState({});
  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    getSingleUser(id)
      .then((res) => {
        setUser(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <DoctorSidebar />
      <DoctorHeader />

      <div className="content-wrapper">
        <div className="content-header mt-3">
          <div className="content container-fluid w-75">
            <form>
              <div className="row d-flex justify-content-between">
                <div className="content-page-header">
                  <h5 style={{ color: "#9265cc" }} className=" text-bold">
                    View User
                  </h5>
                </div>
                <div className="content-page-header">
                  <Link to="/Doctoruserlist">
                    <button
                      className="btn btn-outline border text-white rounded-pill p-2"
                      style={{ backgroundColor: "#9265cc" }}
                    >
                      User List
                    </button>
                  </Link>
                </div>
              </div>
              <div className="col w-100">
                <div className="col-xl-12">
                  <div className="card mt-2 p-2">
                    <div className="card-body">
                      <div>
                        <div className="d-flex justify-content-center">
                          <div className="col-lg-12 col-md-6 col-sm-12">
                            <div className="upload-img form-group text-center">
                              <label style={{ color: "#9265cc" }}>Image</label>
                              <div
                                className="circle d-flex align-items-center justify-content-center"
                                id="profile-picture-circle"
                              >
                                <div className="p-image">
                                  <img
                                    className="avatar-sm-post rounded-pill"
                                    src={user?.profileImage}
                                    alt="User"
                                    width={180}
                                    height={180}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>Name</label>
                              <br />
                              <span>{user?.name}</span>
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>Email</label>
                              <br />
                              <span>{user?.email}</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>
                                Mobile Number
                              </label>
                              <br />
                              <span>
                                {user?.mobileNumber ? user?.mobileNumber : "-"}
                              </span>
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>
                                Address
                              </label>
                              <br />
                              <span>{user?.address ? user?.address : "-"}</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>City</label>
                              <br />
                              <span>{user?.city ? user?.city : "-"}</span>
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>State</label>
                              <br />
                              <span>{user?.state ? user?.state : "-"}</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>
                                Landmark
                              </label>
                              <br />
                              <span>
                                {user?.landmark ? user?.landmark : "-"}
                              </span>
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>
                                Pincode
                              </label>
                              <br />
                              <span>{user?.pincode ? user?.pincode : "-"}</span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>
                                Alternative Number
                              </label>
                              <br />
                              <span>
                                {user?.alternativeMobileNumber
                                  ? user?.alternativeMobileNumber
                                  : "-"}
                              </span>
                            </div>
                          </div>
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>
                                Locality
                              </label>
                              <br />
                              <span>
                                {user?.locality ? user?.locality : "-"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorUserview;
