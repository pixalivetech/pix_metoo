import React, { useRef, useState, useEffect } from "react";
import "./MyOrder.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../Utils/Storage";
import { cancelandreturnOrder, orderId } from "../../Api/order";
import { toast } from "react-toastify";
import { Product } from "../../Api/endpoints";
import { Modal, Button, Form } from "react-bootstrap";
const MyOrder = () => {
  const navigate = useNavigate();
  const trackingNumberRef = useRef(null);
  const orderIdRef = useRef(null);
  const [copiedMessage, setCopiedMessage] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [showCancelReasonBox, setShowCancelReasonBox] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [orderData, setOrderData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Copy to clipboard
  const copyToClipboard = (value) => {
    const tempInput = document.createElement("input");
    tempInput.value = value;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);

    setCopiedMessage("Copied to clipboard");

    setTimeout(() => {
      setCopiedMessage("");
    }, 2000);
  };

  useEffect(() => {
    getOrderDetails();
  }, []);

  const getOrderDetails = () => {
    const id = getUserId();
    orderId(id)
      .then((res) => {
        const filteredOrders = res.data.result.filter(
          (order) => !order.canceled && order.userId === id
        );
        const ordersWithIST = filteredOrders.map((order) => {
          const totalamount = res.data.result.totalAmount;
          setTotalAmount(totalamount);
          const orderPlacedOnUTC = new Date(order.orderPlacedOn);
          const orderPlacedOnIST = orderPlacedOnUTC.toLocaleString("en-US", {
            timeZone: "Asia/Kolkata",
          });
          return { ...order, orderPlacedOn: orderPlacedOnIST };
        });

        setOrderData(ordersWithIST);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleCloseCancelModal = () => {
    setShowCancelModal(false);
    setCancelReason("");
    setSelectedProduct(null);
  };

  const handleShowCancelModal = (order, product) => {
    setShowCancelModal(true);
    setSelectedProduct(product);
    setSelectedOrder(order);
  };

  const deleteOrderHandler = async (order, product) => {
    try {
      handleOpen();
      setShowCancelReasonBox(true);

      const trackingNumber = selectedProduct?.trackingNumber?.trim();
      const orderNumber = selectedOrder?.orderNumber?.trim();

      if (!trackingNumber || !orderNumber) {
        toast.error("Please provide both tracking number and order number");
        setShowCancelReasonBox(false);
        handleClose();
        return;
      }

      const data = {
        trackingNumber,
        orderNumber,
        _id: selectedProduct?._id,
        productStatus: "cancel",
        cancelReason: cancelReason,
      };
      const res = await cancelandreturnOrder(data);
      if (res.data.success) {
        setOrderData((prevOrderData) =>
          prevOrderData.map((prevOrder) =>
            prevOrder._id === selectedOrder._id
              ? { ...prevOrder, canceled: true, productStatus: "canceled" }
              : prevOrder
          )
        );
        toast.success("Order canceled successfully");
        getOrderDetails();
      } else {
        toast.error(res.data.extendedMessage || "Failed to cancel order");
      }
    } catch (error) {
      console.error("Error occurred while canceling order:", error);
      toast.error("Error occurred while canceling order");
    } finally {
      setShowCancelReasonBox(false);
      handleClose();
    }
  };

  const returnOrderHandler = async (order, product) => {
    try {
      handleOpen();
      setShowCancelReasonBox(true);

      const trackingNumber = product?.trackingNumber?.trim();
      const orderNumber = order?.orderNumber?.trim();

      if (!trackingNumber || !orderNumber) {
        toast.error("Please provide both tracking number and order number");
        setShowCancelReasonBox(false);
        handleClose();
        return;
      }

      const data = {
        trackingNumber,
        orderNumber,
        _id: product._id,
        productStatus: "return",
      };
      const res = await cancelandreturnOrder(data);

      if (res.data.success) {
        setOrderData((prevOrderData) =>
          prevOrderData.map((prevOrder) =>
            prevOrder._id === order._id
              ? { ...prevOrder, returned: true, productStatus: "returned" }
              : prevOrder
          )
        );
        toast.success("Order returned successfully");
        getOrderDetails();
      } else {
        toast.error(res.data.extendedMessage || "Failed to return order");
      }
    } catch (error) {
      console.error("Error occurred while returning order:", error);
      toast.error("Error occurred while returning order");
    } finally {
      setShowCancelReasonBox(false);
      handleClose();
    }
  };

  const handleInvoice = (order, product) => {
    if (order.invoiceNumber) {
      navigate(`/invoice/?productId=${product._id}`, {
        state: {
          invoiceNumber: order.invoiceNumber,
        },
      });
    }
  };

  return (
    <div>
      <Header />
      <div className="container change_over_all_size">
        <div className="row pt-2 ">
          <h5 className="fw-bold text-danger mx-2">My Orders</h5>
        </div>
        <div className="row pt-2">
          {Array.isArray(orderData) && orderData.length > 0 ? (
            orderData.map((order, index) => (
              <div className="col-sm-12 mb-5" key={index}>
                <div className="card border-secondary-subtle">
                  <div className="card-header border-secondary-subtle custom-head-colour">
                    <ul className="d-flex flex-wrap change_list_st">
                      <li>
                        <div className="">
                          <p>
                            <span className="fw-bold text_clr_cha_p mx-3">
                              Order Placed Date And Time
                            </span>
                            <br />
                            <span className="text-black mx-5">
                              {order.orderPlacedOn}
                            </span>
                          </p>
                        </div>
                      </li>

                      <li>
                        <div className="fw-bold text_clr_cha_p">
                          Payment Method
                        </div>
                        <div className="text-black">{order.paymentMethod}</div>
                      </li>
                      <li>
                        <div className="fw-bold text_clr_cha_p mx-4">
                          OrderID
                        </div>
                        <div
                          className="text-black"
                          onClick={() => copyToClipboard(order.orderNumber)}
                        >
                          {order.orderNumber}
                        </div>
                      </li>
                    </ul>
                  </div>
                  <div className="card-body">
                    {order.products && order.products.length > 0 ? (
                      order.products.map((product, productIndex) => (
                        <div key={productIndex}>
                          <ul
                            key={productIndex}
                            className="d-flex flex-wrap change_list_st"
                          >
                            <li>
                              <div>
                                <p className="fw-bold text-center text_clr_cha_p">
                                  Product Image
                                </p>
                                <img
                                  width={100}
                                  height={100}
                                  src={product.productImage}
                                  alt=""
                                  className="change_sise_in_pic"
                                />
                              </div>
                            </li>
                            <li>
                              <div>
                                <span className="fw-bold text-center text_clr_cha_p">
                                  Product Name
                                </span>
                                <br />
                                <span className="text-black d-flex justify-content-center my-lg-5">
                                  {product.productName}
                                </span>
                              </div>
                            </li>
                            <li>
                              <div className="fw-bold text-center text_clr_cha_p">
                                Quantity
                              </div>
                              <div className="text-black d-flex justify-content-center my-lg-5">
                                {product.quantity}
                              </div>
                            </li>
                            <li>
                              <div className="fw-bold text-center text_clr_cha_p">
                                Order Total
                              </div>
                              <div className="d-flex justify-content-center my-lg-5">
                                {product.discountedPrice * product.quantity}
                              </div>
                            </li>
                            <li>
                              <div className="fw-bold text-center text_clr_cha_p">
                                Tracking Number
                              </div>
                              <div
                                className="text-black my-lg-5"
                                onClick={() =>
                                  copyToClipboard(product.trackingNumber)
                                }
                              >
                                {product.trackingNumber}
                              </div>
                            </li>
                            <li>
                              <div className="text-black ">
                                <span className="fw-bold text-center text_clr_cha_p">
                                  Order Status
                                </span>
                                <br />
                                <div className="my-lg-5 d-flex justify-content-center">
                                  {product.orderStatus}
                                </div>
                              </div>
                            </li>
                            <li>
                              <div className="text-black ">
                                <span className="fw-bold text-center text_clr_cha_p">
                                  Returned / Cancelled
                                </span>
                                <br />
                                <div className="my-lg-5 d-flex justify-content-center">
                                  {product.productStatus}
                                </div>
                              </div>
                            </li>
                          </ul>
                          <div className="btn_cc_vv px-5 mb-3">
                            <a href="/TrackYourOrder">
                              <button className="px-4 py-2 mt-2">
                                Track Package
                              </button>
                            </a>{" "}
                            <button
                              className="px-4 py-2 ms-2 mt-2"
                              onClick={() => {
                                handleShowCancelModal(order, product);
                              }}
                            >
                              Cancel Order
                            </button>
                            <Modal
                              show={showCancelModal}
                              onHide={handleCloseCancelModal}
                            >
                              <Modal.Header closeButton>
                                <Modal.Title className="text-danger">
                                  Enter Your Cancel Reason
                                </Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <Form.Group controlId="cancelReasonForm">
                                  <Form.Label>Cancel Reason:</Form.Label>
                                  <Form.Control
                                    as="textarea"
                                    placeholder="Type your cancel reason here"
                                    value={cancelReason}
                                    onChange={(e) =>
                                      setCancelReason(e.target.value)
                                    }
                                    style={{ whiteSpace: "pre-wrap" }}
                                  />
                                </Form.Group>
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="secondary"
                                  onClick={() =>
                                    handleCloseCancelModal(order, product)
                                  }
                                >
                                  Close
                                </Button>
                                <Button
                                  variant="danger"
                                  onClick={() =>
                                    deleteOrderHandler(order, product)
                                  }
                                >
                                  Cancel Order
                                </Button>
                              </Modal.Footer>
                            </Modal>
                            <button
                              className="px-4 py-2 ms-2 mt-2"
                              onClick={() => handleInvoice(order, product)}
                            >
                              View Invoice
                            </button>
                            <button
                              className="px-4 py-2 ms-2 mt-2"
                              onClick={() => returnOrderHandler(order, product)}
                            >
                              Return Order
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No products available</p>
                    )}

                    <p className="text-secondary mt-2 tex_ce_alig">
                      <a className="text_font_t" href="">
                        Click on Order-ID and Tracking Number to copy it{" "}
                        {copiedMessage && (
                          <p className="text-dang er">{copiedMessage}</p>
                        )}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>No Orders to show</div>
          )}
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
};

export default MyOrder;
