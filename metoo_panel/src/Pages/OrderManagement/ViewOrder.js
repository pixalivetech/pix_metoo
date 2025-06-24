import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/SideBar";
import { Link, useLocation } from "react-router-dom";
import { getSingleOrder } from "../../api/ordertrack";
import { getUserId } from "../../Utils/Storage";

function ViewOrder() {
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
        console.log("view order", filteredOrders);
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
                  <Link to="/Listorder">
                    <button
                      style={{ backgroundColor: "#9265cc" }}
                      className="btn text-white"
                    >
                      List of Orders
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
                          <div class="upload-img form-group text-center">
                            <label style={{ color: "#9265cc" }}>
                              Product Image
                            </label>
                            <div
                              class="circle d-flex align-items-center justify-content-center"
                              id="profile-picture-circle"
                            >
                              <div class="p-image">
                                <img
                                  className="avatar-sm-post"
                                  src={order?.productImage}
                                  alt="product image"
                                  width={150}
                                  height={150}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>
                              Product Name
                            </label>
                            <br />
                            <span>{order?.productName}</span>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>Quantity</label>
                            <br />
                            <span>{order?.quantity}</span>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>
                              Ordered Person
                            </label>
                            <br />
                            <span>{details?.ShippingAddress?.[0]?.name}</span>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>Email</label>
                            <br />
                            <span>{details?.ShippingAddress?.[0]?.email}</span>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>
                              Mobile Number
                            </label>
                            <br />
                            <span>
                              {details?.ShippingAddress?.[0]?.mobileNumber}
                            </span>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>Address</label>
                            <br />
                            <span>
                              {details?.ShippingAddress?.[0]?.address}
                            </span>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>
                              Payment Method
                            </label>
                            <br />
                            <span>{details?.paymentMethod}</span>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>Status</label>
                            <br />
                            <span>{order?.orderStatus}</span>
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
export default ViewOrder;
