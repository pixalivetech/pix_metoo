import React, { useState, useEffect } from "react";
import "./Addtocart.css";
import QuantityControl from "../HotSelling/HSProductDetails/QuantityControl";
import Payment from "../../Assests/images/payment-methods.png";
import { fetchSingleCart, PostProductCart } from "../../Api/cart";
import { getUserId } from "../../Utils/Storage";
import { FaTrash } from "react-icons/fa";
import { deleteproductcart } from "../../Api/cart";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";

import { useDispatch, useSelector } from 'react-redux';
import { fetchCartDataAsync } from '../../State Mangement/action';

const CartHeader = () => {
  const userId = getUserId();
  const dispatch = useDispatch();
  const cartvalue = useSelector(state => state.cart.cartData.result || []); // Accessing cartData from result array
  const cartData = cartvalue[0] || {}; // Get the first element of cartDatas, or an empty object if it's undefined
  const [cartDatas, setCartDatas] = useState([]);
  const [cartId, setCartId] = useState("");
  const [checkoutDisabled, setCheckoutDisabled] = useState(false);

  useEffect(() => {
    dispatch(fetchCartDataAsync());
    console.log("Cart Data:", cartData);
  }, [dispatch,userId]);

  const modifyQuantity = (productId, newQuantity) => {
    const cartItem = cartDatas.find((item) => item.productId === productId);
    if (!cartItem) {
      console.error("Cart item not found.");
      return;
    }

    const updatedCartData = {
      userId: userId,
      items: [
        {
          productId: productId,
          quantity: 1,
          operation:
            newQuantity > getProductQuantity(productId)
              ? "increase"
              : "decrease",
          productPrice: cartItem.productPrice,
        },
      ],
    };

    PostProductCart(updatedCartData)
      .then((updateResponse) => {
        if (updateResponse.data.success) {
          dispatch(fetchCartDataAsync());
        } else {
          console.log(updateResponse.data.message);
        }
      })
      .catch((updateError) => {
        console.error("Failed to update the product quantity:", updateError);
      });
  };

  const getProductQuantity = (productId) => {
    const cartItem = cartDatas.find((item) => item.productId === productId);
    return cartItem ? cartItem.quantity : 0;
  };

  const handleDeleteClick = (productId) => {
    deleteproductcart({
      _id: cartId,
      productId: productId,
    })
      .then(() => {
        dispatch(fetchCartDataAsync());
      })
      .catch((error) => {
        console.error("Failed to delete product from the cart:", error);
      });
  };

  useEffect(() => {
    setCartDatas(cartData.items || []);
    setCartId(cartData._id || "");
    setCheckoutDisabled(!cartData.items || cartData.items.length === 0);
  }, [cartData]);

  return (
    <>
      <Header />
      <div className="Your-Cart">Your Cart</div>
      <div className="container  ">
        <div className="row ">
          <div className="col-lg-8 col-12 ">
            {cartDatas && cartDatas.length > 0 ? (
              cartDatas.map((cartItem, index) => (
                <div
                  key={index}
                  className="card cart mb-3 mt-3 justify-content-center mx-auto "
                  style={{ maxWidth: "540px" }}
                >
                  <div className="row g-0 cart-container ">
                    <div className="col-md-4 productcart-img ">
                      <img
                        src={cartItem.productImage}
                        className="img-fluid rounded-start"
                        alt={cartItem.productName}
                      />
                    </div>
                    <div className="col-md-8 ">
                      <div className="card-bodyyy ">
                        <Link
                          to={`/ProductDetails?productId=${cartItem.productId}`}
                          className="text-decoration-none"
                        >
                          <h5 className="card-title ">{cartItem.productName}</h5>
                        </Link>
                        <p className="card-text fw-bold text-secondary">
                          Price: ₹{cartItem.productPrice}
                        </p>
                        <div className="quantity-counter">
                          <QuantityControl
                            key={cartItem.quantity}
                            initialValue={cartItem.quantity}
                            onQuantityChange={(newQuantity) =>
                              modifyQuantity(cartItem.productId, newQuantity)
                            }
                          />
                        </div>
                        
                        <div className="quantity-cart-remove position-absolute top-0 end-0 p-4">
                          <button className="btn btn-danger">
                            <FaTrash
                              className="delete-icon"
                              onClick={() =>
                                handleDeleteClick(cartItem.productId)
                              }
                              style={{ cursor: "pointer" }}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-items-message text-center mx-auto">
                No items in the cart.
              </div>
            )}
          </div>

          <div className="col-lg-4 col-12 mt-5 bg-light p-3 border-shadow-dark cart-amount">
            <div className="total-items text-center mx-auto">
              Total Quantity: {cartData.totalQuantity || 0}
            </div>
            <div className="total-amount text-center mx-auto">
              Total Amount: ₹{cartData.totalAmount || 0}
            </div>
            <div className="checkout-btn text-center mx-auto mt-3">
              <Link to={`/Buyitnow?CartProducts`}>
                <button
                  className={`checkout-button ${checkoutDisabled ? "disabled-button" : ""
                    }`}
                  disabled={checkoutDisabled}
                >
                  Checkout
                </button>
              </Link>
              <p className="payment-guarantee">
                Guaranteed Safe & Secure Checkout
              </p>
            </div>
            <div className="payment-method text-center mx-auto">
              <img src={Payment} alt="payment-method" />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartHeader;
