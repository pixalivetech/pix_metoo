import React, { useEffect, useState } from "react";
import "./Card.css";
import Header from "../../../../Components/Header/Header";
import Footer from "../../../../Components/Footer/Footer";
import { useSearchParams } from "react-router-dom";
import { getSingleOrder } from "../../../../Api/order";
function Card() {
  let [searchParams] = useSearchParams();
  let [ProductDetails, setProductDetails] = useState();
  let [totalAmount, setTotalAmount] = useState(0);
  let [products, setProducts] = useState([]);
  let [orderNumber, setOrderNumber] = useState(0);

  let productId = searchParams.get("productId");
  useEffect(() => {
    getSingleOrder(productId)
      .then((response) => {
        const productDetails = response.data.result.products[0];
        setProductDetails(productDetails);
        const totalAmount = response.data.result.totalAmount;
        setTotalAmount(totalAmount);
        const products = response.data.result.products;
        setProducts(products);
        const orderNumber = response.data.result.orderNumber;
        setOrderNumber(orderNumber);
      })
      .catch((error) => {
        console.error("API request failed:", error);
      });
  }, [productId]);

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row mb-5">
          <div className="col-lg-12 col-sm-12 col-md-12">
            <div className="mt-3 d-flex text-center justify-content-center">
              <h1>Your order is placed Successfully.</h1>
            </div>
          </div>

          {products.map((ProductDetails) => (
            <div
              key={ProductDetails._id}
              className=" row border border-1 border-dark p-3 mt-2"
            >
              <div className="col-lg-3 col-12 col-md-3 mt-4">
                <div className="fw-bolder d-flex justify-content-center">
                  Products
                </div>
                <div className="d-flex justify-content-center mt-2">
                  <img
                    src={ProductDetails.productImage}
                    alt="Payment Image"
                    height={50}
                    width={60}
                    className="rounded"
                  />
                </div>
                <div className="text-secondary d-flex justify-content-center mt-1">
                  {ProductDetails.productName}
                </div>
              </div>
              <div className="col-lg-2 col-12 col-md-2 mt-4">
                <div className="fw-bolder d-flex justify-content-center">
                  Quantity
                </div>
                <div className="text-secondary d-flex justify-content-center mt-4">
                  {ProductDetails.quantity}
                </div>
              </div>
              <div className="col-lg-2 col-12 col-md-2 mt-4">
                <div className="fw-bolder d-flex justify-content-center">
                  Amount
                </div>
                <div className="text-secondary d-flex justify-content-center mt-4">
                  Rs.{ProductDetails.discountedPrice * ProductDetails.quantity}
                  .00
                </div>
              </div>
              <div className="col-lg-2 col-12 col-md-2 mt-4">
                <div className="fw-bolder d-flex justify-content-center">
                  Order Number
                </div>
                <div className="text-secondary d-flex justify-content-center mt-4">
                  {orderNumber}
                </div>
              </div>
              <div className="col-lg-3 col-12 col-md-3 mt-4">
                <div className="fw-bolder d-flex justify-content-center">
                  Tracking Number
                </div>
                <div className="text-secondary d-flex justify-content-center mt-4">
                  {ProductDetails.trackingNumber}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Card;
