import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getsingleProfile } from "../../api/profile";
import Mastersidebar from "../../Components/MasterSidebar";
import Masterheader from "../../Components/MasterHeader";

function MasterSellerView() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [seller, setSeller] = useState();

  useEffect(() => {
    getProfileDetails();
  }, []);

  const getProfileDetails = () => {
    getsingleProfile(id)
      .then((res) => {
        setSeller(res?.data?.result);
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
          <div className="container-fluid">
            <form>
              <div className="row justify-content-start mb-2">
                <div className="col-12 col-md-6">
                  <h5 className="text-bold" style={{ color: "#9265cc" }}>
                    View Seller Profile
                  </h5>
                </div>
                <div className="col-12 col-md-6 mt-2 mt-md-0 text-md-start">
                  <div style={{ marginLeft: "250px" }}>
                    <Link to="/Mastersellerlist">
                      <button
                        className="btn btn-outline border text-white rounded-pill"
                        style={{ backgroundColor: "#9265cc" }}
                      >
                        List Sellers
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-12 col-lg-8 offset-lg-2 text-center mb-3">
                  <div className="upload-img form-group">
                    <label className="text-primary">Profile Image</label>
                    <div className="circle">
                      {seller?.profileImage ? (
                        <img
                          className="rounded-circle"
                          src={seller?.profileImage}
                          alt="User"
                          width={160}
                          height={160}
                        />
                      ) : (
                        <p>No Image</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="col-12 col-lg-8 offset-lg-2">
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label style={{ color: "#9265cc" }}>Name</label>
                        <br />
                        <span>{seller?.name}</span>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label style={{ color: "#9265cc" }}>E-mail</label>
                        <br />
                        <span>{seller?.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label style={{ color: "#9265cc" }}>
                          Mobile Number
                        </label>
                        <br />
                        <span>{seller?.mobileNumber}</span>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label style={{ color: "#9265cc" }}>Company Name</label>
                        <br />
                        <span>
                          {seller?.companyName ? seller?.companyName : "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label style={{ color: "#9265cc" }}>
                          Company Address
                        </label>
                        <br />
                        <span>
                          {seller?.companyAddress
                            ? seller?.companyAddress
                            : "-"}
                        </span>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label style={{ color: "#9265cc" }}>
                          Types Of Business
                        </label>
                        <br />
                        <span>
                          {seller?.typesOfBusiness
                            ? seller?.typesOfBusiness
                            : "-"}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label style={{ color: "#9265cc" }}>City</label>
                        <br />
                        <span>{seller?.city ? seller?.city : "-"}</span>
                      </div>
                    </div>
                    <div className="col-12 col-md-6">
                      <div className="form-group">
                        <label style={{ color: "#9265cc" }}>State</label>
                        <br />
                        <span>{seller?.state ? seller?.state : "-"}</span>
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
}

export default MasterSellerView;
