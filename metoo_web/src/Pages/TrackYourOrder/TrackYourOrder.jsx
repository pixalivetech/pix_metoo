import React, { useState, useEffect } from "react";
import "./TrackYourOrder.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { trackOrder } from "../../Api/order";
import { getToken } from "../../Utils/Storage";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isAuthenticated } from "../../Utils/Auth";

const TrackYourOrder = () => {
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingDetails, setTrackingDetails] = useState(null);

  useEffect(() => {
    if (!isAuthenticated() || !getToken()) {
      navigate("/login");
    }
  }, [navigate]);

  const handleTrackOrder = () => {
    if (!orderNumber) {
      toast.error("Please provide an order number.");
      return;
    }

    trackOrder({ orderNumber })
      .then((response) => {
        if (response.data.success) {
          const matchingOrder = response.data.result.find(
            (order) => order.orderNumber === orderNumber
          );

          if (matchingOrder) {
            setTrackingDetails(matchingOrder);

            navigate(`/OrderDetails?orderId=${matchingOrder._id}`, {
              state: {
                orderNumber: matchingOrder.orderNumber,
                orderStatus: matchingOrder.orderStatus,
                orderId: matchingOrder._id,
                address: matchingOrder.ShippingAddress[0].address,
                phonenumber: matchingOrder.ShippingAddress[0].mobileNumber,
              },
            });

            toast.success("Order found and status retrieved successfully.");
          } else {
            toast.error("Order not found. Please check the order details.");
          }
        } else {
          toast.error("Failed to retrieve order status. Please try again.");
        }
      })
      .catch((error) => {
        console.error("API Request Error:", error);
        toast.error("Failed to track the order. Please try again.");
      });
  };

  const handleTrackingOrder = () => {
    if (!trackingNumber) {
      toast.error("Please provide a tracking number.");
      return;
    }

    trackOrder({ trackingNumber })
      .then((response) => {
        if (response.data.success) {
          const orders = response.data.result;

          const matchingOrder = orders.find((order) =>
            order.products.some(
              (product) => product.trackingNumber === trackingNumber
            )
          );

          if (matchingOrder) {
            const matchingProduct = matchingOrder.products.find(
              (product) => product.trackingNumber === trackingNumber
            );
            console.log("matchingProduct", matchingProduct);

            if (matchingProduct) {
              setTrackingDetails({
                trackingNumber,
                orderStatus: matchingProduct.orderStatus,
                orderId: matchingOrder._id,
                address: matchingOrder.ShippingAddress[0].address,
                phonenumber: matchingOrder.ShippingAddress[0].mobileNumber,
              });

              navigate(`/OrderDetails?orderId=${matchingOrder._id}`, {
                state: {
                  trackingNumber: matchingProduct.trackingNumber,
                  orderStatus: matchingProduct.orderStatus,
                  orderId: matchingOrder._id,
                  address: matchingOrder.ShippingAddress[0].address,
                  phonenumber: matchingOrder.ShippingAddress[0].mobileNumber,
                },
              });

              toast.success("Order found and status retrieved successfully.");
            } else {
              toast.error(
                "Product not found. Please check the tracking number."
              );
            }
          } else {
            toast.error("Order not found. Please check the tracking number.");
          }
        } else {
          toast.error("Failed to retrieve order details. Please try again.");
        }
      })
      .catch((error) => {
        console.error("API Request Error:", error);
        toast.error("Failed to track the order. Please try again.");
      });
  };

  return (
    <div>
      <Header />
      <div className="container-fluid background_image_search">
        <div className="container">
          <div className="row pt-2">
            <div className="col-12">
              <h1 className="text_change_size pt-5">Track Your Order</h1>
            </div>
          </div>
          <div className="row pt-5">
            <div className="col-lg-12 col-sm d-flex justify-content-center ">
              <div className="card trackk">
                <div className="card-body changes_in_con_pp">
                  <h6 className=" ">Track Tracking Number</h6>
                  <div className="pt-5 ">
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      aria-label="Tracking Number"
                      aria-describedby="basic-addon1"
                      value={trackingNumber}
                      onChange={(e) => setTrackingNumber(e.target.value)}
                    />
                  </div>
                  <br />
                  <button className="p-2 px-4" onClick={handleTrackingOrder}>
                    Track
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-10"></div>
            <div className="col-2 mb-5 font_size_change">
              <a href="https://www.track123.com/en/?invite=ShopifyTrackingPage">
                <span className="text-secodary fw-bold">
                  Powered by Track123
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TrackYourOrder;
