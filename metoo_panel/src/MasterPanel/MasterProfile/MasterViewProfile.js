import React, { useEffect, useState } from "react";
import Masterheader from "../../Components/MasterHeader";
import Mastersidebar from "../../Components/MasterSidebar";
import { Link } from "react-router-dom";
import { getAdminId } from "../../Utils/Storage";
import { getsingleMaster } from "../../api/masterprofile";

const MasterViewProfile = () => {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    getMasterDetails();
  }, []);

  const getMasterDetails = () => {
    const id = getAdminId();
    getsingleMaster(id)
      .then((res) => {
        setProfile(res?.data?.result);
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
                  <h5 className="text-bold" style={{ color: "#9265cc" }}>
                    View Profile
                  </h5>
                </div>
                <div className="content-page-header">
                  <Link to="/MasterEditprofile">
                    <button
                      className="btn btn-outline border text-white  p-2"
                      style={{ backgroundColor: "#9265cc" }}
                    >
                      Edit Profile
                    </button>
                  </Link>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="card mt-2 p-2">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-lg-12 col-md-6 col-sm-12">
                            <div className="upload-img form-group text-center">
                              <label style={{ color: "#9265cc" }}>
                                Company Logo
                              </label>
                              <div className="circle d-flex align-items-center justify-content-center">
                                <div className="p-image">
                                  {profile?.profileImage ? (
                                    <img
                                      className="avatar-sm-post rounded-circle"
                                      src={profile?.profileImage}
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
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>Name</label>
                              <br />
                              <span>{profile?.name}</span>
                            </div>
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>Email</label>
                              <br />
                              <span>{profile?.email}</span>
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>
                                Mobile Number
                              </label>
                              <br />
                              <span>{profile?.mobileNumber}</span>
                            </div>
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>
                                Company Name
                              </label>
                              <br />
                              <span>
                                {profile?.companyName
                                  ? profile?.companyName
                                  : "-"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-6 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>City</label>
                              <br />
                              <span>{profile?.city ? profile?.city : "-"}</span>
                            </div>
                          </div>
                          <div className="col-6 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>State</label>
                              <br />
                              <span>
                                {profile?.state ? profile?.state : "-"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>
                                Types Of Business
                              </label>
                              <br />
                              <span>
                                {profile?.typesOfBusiness
                                  ? profile?.typesOfBusiness
                                  : "-"}
                              </span>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>
                                Company Address
                              </label>
                              <br />
                              <span>
                                {profile?.companyAddress
                                  ? profile?.companyAddress
                                  : "-"}
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

export default MasterViewProfile;
