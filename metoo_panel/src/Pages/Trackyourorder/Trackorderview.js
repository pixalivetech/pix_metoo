import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/SideBar";
import { Link, useLocation } from "react-router-dom";
import { getSingleOrder } from "../../api/ordertrack";

function Trackorderview() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const trackingNumber = new URLSearchParams(location.search).get(
    "trackingNumber"
  );
  const [order, setOrder] = useState({});
  const [details, setDetail] = useState({});

  useEffect(() => {
    getOrderDetails();
  }, []);

  const getOrderDetails = () => {
    getSingleOrder(id)
      .then((res) => {
        const detailed = res.data.result;
        setDetail(detailed);
        const filteredOrders = res.data.result.products.find(
          (product) => product.trackingNumber === trackingNumber
        );
        setOrder(filteredOrders);
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
            <form>
              <div className="row d-flex justify-content-between">
                <div className="content-page-header">
                  <h5 style={{ color: "#9265cc" }} className=" text-bold">
                    View Order
                  </h5>
                </div>
                <div className="content-page-header">
                  <Link to="/Trackyourorder">
                    <button
                      style={{ backgroundColor: "#9265cc" }}
                      className="btn text-white"
                    >
                      Order List
                    </button>
                  </Link>
                </div>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label style={{ color: "#9265cc" }}>Order Number</label>
                      <br />
                      <span>{details.orderNumber}</span>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label style={{ color: "#9265cc" }}>trackingNumber</label>
                      <br />
                      <span>{order.trackingNumber}</span>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label style={{ color: "#9265cc" }}>Status</label>
                      <br />
                      <span>{order.orderStatus}</span>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label style={{ color: "#9265cc" }}>
                        Returned Or Cancelled
                      </label>
                      <br />
                      <span>
                        {order?.productStatus ? order?.productStatus : "N/A"}
                      </span>
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

export default Trackorderview;
