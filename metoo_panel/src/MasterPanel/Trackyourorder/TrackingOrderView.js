import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Masterheader from "../../Components/MasterHeader";
import Mastersidebar from "../../Components/MasterSidebar";
import { getSingleMasterOrder } from "../../api/masterorder";

function MasterTrackorderview() {
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
    getSingleMasterOrder(id)
      .then((res) => {
        const detailed = res.data.result;
        console.log("sarath", res);
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
      <Mastersidebar />
      <Masterheader />

      <div className="content-wrapper">
        <div className="content-header mt-3">
          <div className="content container-fluid w-75">
            <form>
              <div className="row d-flex justify-content-between">
                <div className="content-page-header">
                  <h5 className="text-primary text-bold">View Order</h5>
                </div>
                <div className="content-page-header">
                  <Link to="/MasterTrackOrderList">
                    <button className="btn-primary">Order List</button>
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
                            <label className="text-primary">Company Name</label>
                            <br />
                            <span>
                              {order?.panelId?.companyName
                                ? order?.panelId?.companyName
                                : order?.companyId?.companyName}
                            </span>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label className="text-primary">Product Name</label>
                            <br />
                            <span>{order?.productName}</span>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label className="text-primary">Order Number</label>
                            <br />
                            <span>{details?.orderNumber}</span>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label className="text-primary">
                              trackingNumber
                            </label>
                            <br />
                            <span>{order?.trackingNumber}</span>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label className="text-primary">Status</label>
                            <br />
                            <span className="btn btn-primary p-1">
                              {order?.orderStatus}
                            </span>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label className="text-primary">
                              Returned / Cancelled
                            </label>
                            <br />
                            <span className="btn btn-primary p-1">
                              {order?.productStatus}
                            </span>
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
}

export default MasterTrackorderview;
