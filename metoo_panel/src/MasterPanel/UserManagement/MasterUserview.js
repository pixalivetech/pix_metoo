import React, { useState, useEffect } from "react";
import Mastersidebar from "../../Components/MasterSidebar";
import Masterheader from "../../Components/MasterHeader";
import { Link, useLocation } from "react-router-dom";
import { getSingleUser } from "../../api/user";

const MasterUserview = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [user, setUser] = useState();

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
      <Mastersidebar />
      <Masterheader />
      <div className="content-wrapper">
        <div className="content-header mt-3">
          <div className="content container-fluid w-75">
            <form>
              <div className="row d-flex justify-content-between">
                <div className="content-page-header">
                  <h5 className=" text-bold" style={{ color: "#9265cc" }}>
                    View Profile
                  </h5>
                </div>
                <div className="content-page-header">
                  <Link to="/Masteruserlist">
                    <button
                      className="btn btn-outline border text-white  p-2"
                      style={{ backgroundColor: "#9265cc" }}
                    >
                      List Users
                    </button>
                  </Link>
                </div>
              </div>
              <div className="col">
                <div className="col-12">
                  <div className="card mt-2 p-2">
                    <div className="card-body">
                      <div>
                        <div className="row justify-content-center mb-3">
                          <div className="col-12 col-md-6 text-center">
                            <div className="upload-img form-group">
                              <label style={{ color: "#9265cc" }}>Image</label>
                              <div
                                className="circle d-flex align-items-center justify-content-center"
                                id="profile-picture-circle"
                              >
                                <div className="p-image">
                                  {user?.profileImage ? (
                                    <img
                                      className="avatar-sm-post"
                                      src={user?.profileImage}
                                      alt="User"
                                      width={160}
                                      height={160}
                                    />
                                  ) : null}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 col-md-4">
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>
                                Full Name
                              </label>
                              <br />
                              <span>{user?.name}</span>
                            </div>
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>Email</label>
                              <br />
                              <span>{user?.email}</span>
                            </div>
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>
                                Mobile Number
                              </label>
                              <br />
                              <span>{user?.mobileNumber}</span>
                            </div>
                          </div>
                          <div className="col-12 col-md-4">
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>
                                Address
                              </label>
                              <br />
                              <span>{user?.address}</span>
                            </div>
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>City</label>
                              <br />
                              <span>{user?.city}</span>
                            </div>
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>State</label>
                              <br />
                              <span>{user?.state}</span>
                            </div>
                          </div>
                          <div className="col-12 col-md-4">
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>
                                Pin Code
                              </label>
                              <br />
                              <span>{user?.pincode}</span>
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

export default MasterUserview;
