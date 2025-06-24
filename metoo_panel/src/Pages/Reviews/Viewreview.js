import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/SideBar";
import { Link, useLocation } from "react-router-dom";
import { getSingleProductReview } from "../../api/product";

function Viewreview() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [review, setReview] = useState();

  useEffect(() => {
    getReviewDetails();
  }, []);

  const getReviewDetails = () => {
    getSingleProductReview(id)
      .then((res) => {
        setReview(res?.data?.result);
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
        <div className="content-header mt-3">
          <div className="content container-fluid w-75">
            <div className=" d-flex justify-content-around ">
              <div className="content-page-header">
                <h5 style={{ color: "#9265cc" }} className=" text-bold">
                  View Reviews
                </h5>
              </div>
              <div className="content-page-header">
                <Link to="/Listproductreview">
                  <button
                    style={{ backgroundColor: "#9265cc" }}
                    className="text-white btn"
                  >
                    Review List
                  </button>
                </Link>
              </div>
            </div>
            <div className="card-body ">
              <div className="col-lg-6 ">
                <div className="form-group">
                  <label style={{ color: "#9265cc" }}>User Name</label>
                  <br />
                  <span>{review?.userId?.name}</span>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label style={{ color: "#9265cc" }}>Product Name</label>
                  <br />
                  <span>{review?.productId?.productName}</span>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label style={{ color: "#9265cc" }}>Title</label>
                  <br />
                  <span>{review?.title}</span>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label style={{ color: "#9265cc" }}>Comment</label>
                  <br />
                  <span>{review?.comment}</span>
                </div>
              </div>
              <div className="col-lg-6">
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
  );
}

export default Viewreview;
