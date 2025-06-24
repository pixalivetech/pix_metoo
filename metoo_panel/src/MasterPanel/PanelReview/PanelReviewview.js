import React, { useState, useEffect } from "react";
import Mastersidebar from "../../Components/MasterSidebar";
import Masterheader from "../../Components/MasterHeader";
import { Link, useLocation } from "react-router-dom";
import { getSinglePanelReview } from "../../api/review";
import { localDate } from "../../Utils/DateFormat";

const PanelReviewview = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [review, setReview] = useState();

  useEffect(() => {
    getReviewDetails();
  }, []);

  const getReviewDetails = () => {
    getSinglePanelReview(id)
      .then((res) => {
        setReview(res?.data?.result);
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
                  <h5 style={{ color: "#9265cc" }} className=" text-bold">
                    View Reviews
                  </h5>
                </div>
                <div className="content-page-header">
                  <Link to="/Panelreviewlist">
                    <button
                      style={{ backgroundColor: "#9265cc" }}
                      className="btn border text-white p-2"
                    >
                      Review List
                    </button>
                  </Link>
                </div>
              </div>
              <div className="col">
                <div className="col-xl-12">
                  <div className="card mt-2 p-2">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>
                              Company Name
                            </label>
                            <br />
                            <span>{review?.panelId?.companyName}</span>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>Title</label>
                            <br />
                            <span>{review?.title}</span>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>Comment</label>
                            <br />
                            <span>{review?.comment}</span>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>
                              createdOn
                            </label>
                            <br />
                            <p>{localDate(review?.createdOn)}</p>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>Rating</label>
                            <br />
                            <span>{review?.rating}</span>
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

export default PanelReviewview;
