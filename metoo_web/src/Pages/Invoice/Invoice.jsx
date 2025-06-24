import React, { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./Invoice.css";
import logo from "../../Assests/images/Image-vdfidi.jpeg";
import { getUserId } from "../../Utils/Storage";
import { getSingleInvoice, getInvoiceNumber } from "../../Api/invoice";
import { useLocation } from "react-router-dom";
import { order } from "../../Api/order";
import Header from "../../Components/Header/Header";
import { localDate } from "../../Utils/DateFormat";

function Invoice() {
  const location = useLocation();
  const invoiceNumber =
    location && location.state && location.state.invoiceNumber;
  const [invoice, setInvoice] = useState({});
  const [address, setAddress] = useState({});
  useEffect(() => {
    getInvoice();
  }, []);

  const getInvoice = () => {
    getSingleInvoice(invoiceNumber)
      .then((res) => {
        const matchedInvoice = res?.data?.result.find(
          (product) => product.invoiceNumber === invoiceNumber
        );
        setAddress(res?.data?.result[0]);
        setInvoice(matchedInvoice);
      })
      .catch((err) => {
        console.log(err, "error");
      });
  };

  const invoiceRef = useRef(null);

  const downloadInvoice = () => {
    const invoiceNode = invoiceRef.current;

    html2canvas(invoiceNode).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      pdf.addImage(imgData, "PNG", 0, 0, 210, 297);
      pdf.save("invoice.pdf");
    });
  };

  return (
    <>
      <Header />
      <div ref={invoiceRef} className="bg-light">
        {invoice &&
          invoice.products?.map((products) =>
            !(
              products.productStatus === "canceled" ||
              products.productStatus === "returned"
            ) ? (
              <>
                <div className="container card border border-1 mt-3 col-lg-7  col-md-9 col-10">
                  <div className="row  d-flex border-bottom border-5 border-dark">
                    <div className="col-sm-12 col-lg-6 col-md-12 ">
                      <h3 className="d-flex justify-content-center">INVOICE</h3>
                      <div className="d-flex justify-content-center">
                        {" "}
                        <img
                          className=" rounded "
                          width="180px"
                          height="65px"
                          src={logo}
                          alt="Logo"
                        />
                      </div>
                    </div>
                    <div className="col-sm-12 col-lg-6 col-md-12 d-flex flex-column gap-3 mt-5">
                      <div className="d-flex justify-content-center">
                        <h6>Invoice Number:- </h6>
                        <p>&nbsp;{invoice?.invoiceNumber}</p>
                      </div>
                      <div className="d-flex justify-content-center">
                        <h6>Invoice Date:- </h6>
                        <p className="">
                          &nbsp;
                          {localDate(
                            address.ShippingAddress && address.orderPlacedOn
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row ">
                    <div className="col-sm-12 col-lg-6 col-md-12 border border-1 ">
                      <h5 className="d-flex justify-content-center">
                        Billing Address:
                      </h5>
                      <h6 className="d-flex justify-content-center">
                        {invoice.ShippingAddress &&
                          invoice.ShippingAddress[0]?.name}
                      </h6>
                      <p className="d-flex justify-content-center">
                        {invoice.ShippingAddress &&
                          invoice.ShippingAddress[0]?.address}{" "}
                        <br />{" "}
                        {invoice.ShippingAddress &&
                          invoice.ShippingAddress[0]?.city}{" "}
                        <br />{" "}
                        {invoice.ShippingAddress &&
                          invoice.ShippingAddress[0]?.state}
                        <br />
                        pincode-
                        {invoice.ShippingAddress &&
                          invoice.ShippingAddress[0]?.pincode}
                      </p>
                      <p className="d-flex justify-content-center">
                        Contact-{" "}
                        {invoice.ShippingAddress &&
                          address.ShippingAddress[0]?.mobileNumber}
                      </p>
                    </div>

                    <div className="col-sm-12 col-lg-6 col-md-12 border border-1 ">
                      <h5 className="d-flex justify-content-center">
                        Shipping Address:
                      </h5>
                      <h6 className="d-flex justify-content-center">
                        {invoice.ShippingAddress &&
                          invoice.ShippingAddress[0]?.name}
                      </h6>
                      <p className="d-flex justify-content-center">
                        {invoice.ShippingAddress &&
                          invoice.ShippingAddress[0]?.address}{" "}
                        <br />{" "}
                        {invoice.ShippingAddress &&
                          invoice.ShippingAddress[0]?.city}{" "}
                        <br />{" "}
                        {invoice.ShippingAddress &&
                          invoice.ShippingAddress[0]?.state}
                        <br />
                        pincode-
                        {invoice.ShippingAddress &&
                          invoice.ShippingAddress[0]?.pincode}
                      </p>
                      <p className="d-flex justify-content-center">
                        Contact-{" "}
                        {invoice.ShippingAddress &&
                          address.ShippingAddress[0]?.mobileNumber}
                      </p>
                    </div>
                  </div>
                  <div className="row bottom-border-1 border-bottom border-dark">
                    <div className=" col-lg-4 col-sm-12 col-md-12">
                      <h6 className=" d-flex justify-content-center bg-secondary text-white p-2">
                        Product Name
                      </h6>
                      <div className="d-flex justify-content-center">
                        <p>{products.productName}</p>
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-12 col-md-12">
                      <h6 className="d-flex justify-content-center bg-secondary text-white p-2">
                        Quantity
                      </h6>
                      <div className="d-flex justify-content-center">
                        <p>{products.quantity}</p>
                      </div>
                    </div>
                    <div className="col-lg-4 col-sm-12 col-md-12">
                      <h6 className="d-flex justify-content-center bg-secondary text-white p-2">
                        Unit Price
                      </h6>
                      <div className="d-flex justify-content-center">
                        <p>{products.finalPrice}</p>
                      </div>
                    </div>
                  </div>

                  <div className="row bottom-border-1 border-bottom border-dark">
                    <div className="col-lg-6"></div>
                    <div className="col-lg-6 col-sm-12 col-md-12 d-flex flex-column justify-content-space-between">
                      <div className=" price_total">
                        <p>OriginalPrice:</p>
                        <p>{products.originalPrice}</p>
                      </div>
                      <div className="price_total">
                        <p>GST:</p>
                        <p>{products.gstRate}</p>
                      </div>
                      <div className="price_total">
                        <p>finalPrice(Includes GST):</p>
                        <p>{products.finalPrice}</p>
                      </div>
                      <div className="price_total">
                        <p>DiscountedPrice:</p>
                        <p>{products.discountedPrice}</p>
                      </div>
                      <div className="price_total">
                        <p>
                          <b>Total</b>
                        </p>
                        <p>
                          <b>{products.discountedPrice * products.quantity}</b>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="row bottom-border-1 border-bottom border-dark">
                    <div className="col-lg-6 col-sm-12 col-md-12">
                      <h5>Seller Details:</h5>
                      <h6>
                        {products.panelId && products.panelId.companyName}
                        {products.companyId && products.companyId.companyName}
                      </h6>
                      <p>
                        {products.panelId && products.panelId.companyAddress}
                        {products.companyId &&
                          products.companyId.companyAddress}{" "}
                        <br />
                        {products.panelId && products.panelId.city}
                        {products.companyId &&
                          products.companyId.city} <br />{" "}
                        {products.panelId && products.panelId.state}
                        {products.companyId && products.companyId.state}
                        <br />
                        email-{products.panelId && products.panelId.email}
                        {products.companyId && products.companyId.email}{" "}
                      </p>
                      <p>
                        Contact-{" "}
                        {products.panelId && products.panelId.mobileNumber}
                        {products.companyId && products.companyId.mobileNumber}
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-sm-12 col-md-12 ">
                      <h5 className="d-flex justify-content-center">
                        Terms & Conditions:
                      </h5>
                      <p className="d-flex justify-content-center">
                        The Seller shall not be liable to the Buyer directly or
                        indirectly for any loss or damage suffered by the Buyer.{" "}
                        <br /> If you have any questions or concerns, please
                        contact us.
                      </p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12 col-sm-12 col-md-12 ">
                      <p className="d-flex justify-content-center">
                        Thank you for your business!
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-sm-12 col-md-12 d-flex justify-content-center  ">
                    <button
                      className="bg-danger text-white p-2 rounded mt-3"
                      onClick={downloadInvoice}
                    >
                      Download Invoice
                    </button>
                  </div>
                </div>
              </>
            ) : null
          )}
      </div>
    </>
  );
}
export default Invoice;
