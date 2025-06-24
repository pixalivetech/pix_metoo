import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Masterheader from "../../Components/MasterHeader";
import Mastersidebar from "../../Components/MasterSidebar";
import { getSingleCarousel } from "../../api/ads";

function Masterviewads() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [ads, setAds] = useState();

  useEffect(() => {
    getAdsDetails();
  }, []);

  const getAdsDetails = () => {
    getSingleCarousel(id)
      .then((res) => {
        setAds(res?.data?.result);
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
          <div className="content container-fluid">
            <form>
              <div className="row d-flex justify-content-between p-3">
                <div className="content-page-header">
                  <h5 className="text-primary text-bold">View Advertisement</h5>
                </div>
                <div className="content-page-header">
                  <Link to="/Masteradslist">
                    <button
                      className="btn btn-outline border text-white rounded-pill p-2"
                      style={{ backgroundColor: "#9265cc" }}
                    >
                      Ads List
                    </button>
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="card mt-2 p-2">
                    <div className="card-body">
                      <div className="col-lg-12 col-md-6 col-sm-12">
                        <div className="upload-img form-group text-center">
                          <label style={{ color: "#9265cc" }}>
                            Advertisement Image
                          </label>
                          <div
                            className="circle d-flex align-items-center justify-content-center"
                            id="profile-picture-circle"
                          >
                            <div className="p-image">
                              {ads?.image ? (
                                <img
                                  className="avatar-sm-post"
                                  src={ads?.image}
                                  alt="User"
                                  width={200}
                                  height={200}
                                />
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          <label style={{ color: "#9265cc" }}>Title</label>
                          <br />
                          <span>{ads?.title}</span>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          <label style={{ color: "#9265cc" }}>Content</label>
                          <br />
                          <span>{ads?.content}</span>
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
}

export default Masterviewads;
