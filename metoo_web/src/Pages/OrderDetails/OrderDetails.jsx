import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { getSingleOrder } from "../../Api/order";
import { getUserId } from "../../Utils/Storage";
import "./OrderDetails.css";

const OrderDetails = () => {
  const location = useLocation();
  const orderNumber = location?.state?.orderNumber;
  const trackingNumber = location?.state?.trackingNumber;
  const orderStatus = location?.state?.orderStatus;
  const orderId = location?.state?.orderId;
  const address = location?.state?.address;
  const phonenumber = location?.state?.phonenumber;
  const [currentStep, setCurrentStep] = useState(null);
  const stepText = ["pending", "progress", "shipped", "delivered"];
  const targetStepIndex = stepText.indexOf(orderStatus);



  
  useEffect(() => {
    if (targetStepIndex >= 0) {
      setCurrentStep(targetStepIndex);
    }
  }, [targetStepIndex]);

  const [order, setOrder] = useState({});

  useEffect(() => {
    getOrderDetails();
  }, []);

  const getOrderDetails = () => {
    const id = getUserId();
    getSingleOrder(id)
      .then((res) => {
        console.log(res);
        setOrder(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header />
      <div className="container change_cc_ii_ss">
        <article className="card cardchangeitem">
          <header className="card-header card_change_header text-danger fw-bold">
            My Orders / Tracking
          </header>
          <div className="card-body">
            <h6>Order ID: {orderId}</h6>

            <article className="card">
              <div className="card-body row">
                <div className="col">
                  <strong>Shipping By:</strong> {address} |{" "}
                  <i className="fa fa-phone" /> +{phonenumber}{" "}
                </div>
                <div className="col">
                  <strong className="d-flex">
                    Status:{" "}
                    <div className="text-danger fw-bold">
                      {" "}
                      &nbsp;{orderStatus}
                    </div>
                  </strong>{" "}
                </div>
                <div className="col">
                  {trackingNumber ? (
                    <>
                      <strong>Tracking no #:</strong>
                      {trackingNumber}{" "}
                    </>
                  ) : (
                    <>
                      <strong>Order no #:</strong>
                      {orderNumber}{" "}
                    </>
                  )}
                </div>
              </div>
            </article>
            <div className="track">
              {stepText.map((step, index) => (
                <div
                  key={index}
                  className={`step ${index <= currentStep ? "active" : ""}`}
                >
                  <span className="icon">
                    {index <= currentStep ? (
                      <i className="fa fa-check" />
                    ) : (
                      index + 1
                    )}
                  </span>
                  <span
                    className={`text ${
                      index <= currentStep ? "text-danger fw-bold" : ""
                    }`}
                  >
                    {step}
                  </span>
                </div>
              ))}
            </div>
            <hr />

            <a href="/MyOrder" className="btn btn-warning" data-abc="true">
              <i className="fa fa-chevron-left" /> Back to orders
            </a>
          </div>
        </article>
      </div>
      <Footer />
    </div>
  );
};

export default OrderDetails;
