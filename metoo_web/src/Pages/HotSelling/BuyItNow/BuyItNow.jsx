import React from "react";
import "./BuyItNow.css";
import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchSingleProduct } from "../../../Api/detail";
import { isAuthenticated } from "../../../Utils/Auth";
import { getOrderId, getUserId, saveOrderId} from "../../../Utils/Storage";
import { toast } from "react-toastify";
import { order } from "../../../Api/order";
import "react-toastify/dist/ReactToastify.css";
import { fetchSingleCart } from "../../../Api/cart";
import { removeAllcartProducts } from "../../../Api/cart";
import { coupon, getTodayCoupon } from "../../../Api/coupon";
import { load } from "@cashfreepayments/cashfree-js";
import { payment,updatePayment,verify } from "../../../Api/payment";

import { useDispatch, useSelector } from 'react-redux';
import { fetchCartDataAsync } from '../../../State Mangement/action';

const BuyItNow = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let [searchParams] = useSearchParams();
  const [ProductDetails, setProductDetails] = useState();
  const [cartDatas, setCartDatas] = useState([]);
  const [deliveryCharges, setDeliveryCharges] = useState(0);
  const [Totalcartamount, setTotalcartamount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [ProductsIds, setProductsIds] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [couponData, setCouponData] = useState([]);
  const [cartId, setCartId] = useState();
  useEffect(() => {
    getTodayCouponCode();
  }, []);

  const getTodayCouponCode = () => {
    getTodayCoupon()
      .then((res) => {
        setCouponData(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const userId = getUserId();
  let productId = searchParams.get("productId");
  let quantity = searchParams.get("quantity");

  useEffect(() => {
    if (searchParams.has("CartProducts")) {
      fetchSingleCart({ userId })
        .then((response) => {
          if (response.data.success && response.data.result.length > 0) {
            setProductDetails(response.data.result[0]);
            setCartDatas(response.data.result[0].items);
            setTotalAmount(response.data.result[0].totalAmount);
            setCartId(response.data.result[0]._id);
            const productIds = response.data.result[0].items.map(
              (item) => item.productId
            );
            setProductsIds(productIds);
          } else {
            setCartDatas([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching cart data:", error);
          setCartDatas([]);
        });
    } else {
      fetchSingleProduct(productId)
        .then((response) => {
          const productDetails = response.data.result;
          const totalPrice = productDetails.discountedPrice;
          const totalQuantity = productDetails.quantity;
          if (totalPrice >= 499) {
            productDetails.deliveryCharges = 0;
          } else {
            productDetails.deliveryCharges = 50;
          }
          productDetails.totalAmount = totalPrice * quantity;
          productDetails.totalPrice = totalPrice;
          setProductDetails(productDetails);
        })
        .catch((error) => {
          console.error("API request failed:", error);
        });
    }
  }, [productId, searchParams]);

  useEffect(() => {
    const calculateDeliveryCharges = () => {
      if (totalAmount >= 499) {
        return 0;
      } else {
        return 50;
      }
    };

    const newDeliveryCharges = calculateDeliveryCharges();
    setDeliveryCharges(newDeliveryCharges);

    const newTotalcartamount = totalAmount + newDeliveryCharges;
    setTotalcartamount(newTotalcartamount);
  }, [totalAmount]);

  const [showInput, setShowInput] = useState(false);
  const [showInput1, setShowInput1] = useState(false);
  const [showInput3, setShowInput3] = useState(false);
  const [showInput4, setShowInput4] = useState(false);
  const toggleInput = () => {
    setShowInput(!showInput);
  };
  const toggleInput1 = () => {
    setShowInput1(!showInput1);
  };
  const toggleInput3 = () => {
    setShowInput3(!showInput3);
  };
  const toggleNewsletter = () => {
    setShowInput4(!showInput);
  };

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const country = ["India", "USA", "UK", "Canada", "Australia", "NewZealand"];

  const [selectedState, setSelectedState] = useState("");

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
  };

  const initialStateInputs = {
    email: "",
    country: "",
    firstname: "",
    lastname: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
    mobileNumber: "",
    paymentMethod: "",
  };

  const initialStateErrors = {
    email: { required: false, valid: false },
    country: { required: false, valid: false },
    firstname: { required: false, valid: false },
    lastname: { required: false, valid: false },
    address: { required: false, valid: false },
    pincode: { required: false, valid: false },
    city: { required: false, valid: false },
    state: { required: false, valid: false },
    mobileNumber: { required: false, valid: false },
    paymentMethod: { required: false, valid: false },
  };

  const [inputs, setInputs] = useState(initialStateInputs);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);

  const handleInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    if (submitted) {
      const newError = handleValidation({
        ...inputs,
        [e.target.name]: e.target.value,
      });
      setErrors(newError);
    }
  };
  const handleValidation = (data) => {
    let error = initialStateErrors;
    if (data.email === "") {
      error.email.required = true;
    }
    if (data.country === "") {
      error.country.required = true;
    }
    if (data.firstname === "") {
      error.firstname.required = true;
    }
    if (data.lastname === "") {
      error.lastname.required = true;
    }
    if (data.address === "") {
      error.address.required = true;
    }
    if (data.pincode === "") {
      error.pincode.required = true;
    }
    if (data.city === "") {
      error.city.required = true;
    }
    if (data.state === "") {
      error.state.required = true;
    }
    if (data.mobileNumber === "") {
      error.mobileNumber.required = true;
    }
    if (data.appartment === "") {
      error.appartment.required = true;
    }
    if (data.paymentMethod === "") {
      error.paymentMethod.required = true;
    }

    return error;
  };
  const handleErrors = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const prop = obj[key];
        if (prop.required === true || prop.valid === true) {
          return false;
        }
      }
    }
    return true;
  };

  const [cashfree, setCashfree] = useState(null);
    // const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        initializeCashfreeSDK();
    }, []);

    const initializeCashfreeSDK = async () => {
        try {
            const cashfreeInstance = await load({
                mode: "production",
            });
            setCashfree(cashfreeInstance);
        } catch (error) {
            console.error("Failed to initialize Cashfree SDK:", error);
        }
    };

  

  const getSessionId = async (Id) => {
      try {
          let res = await payment({ _id: Id });
          console.log("res:", res);
          console.log("res.data.order_id:", res.data.order_id);
          const data = res?.data?.order_id;
          const sessionId = res.data.payment_session_id;
          // setOrderId(data);
          return { orderId: data, sessionId: sessionId };
      } catch (error) {
          console.error("Error getting session ID:", error);
          throw error;
      }
  };

  const verifyPayment = async (orderId,Id) => {
    try {
        if (!orderId) {
            console.error("orderId is null");
            return;
        }

        console.log("orderId:", orderId);
        console.log("productId:", Id);
        const res = await verify(orderId); // You need to replace verify() with the actual function call to verify the payment

        console.log("res:", res);

        if (res && res.data) {
            console.log("Payment verified:", res.data);

            if (res.data.payment_status === "SUCCESS" ) {
                // Prepare the update payment object
                const updatePaymentData = {
                    status: res.data.payment_status,
                    _id: Id, 
                    paymentOrder_id: res.data.paymentOrder_id, 
                    payment_completion_time: res.data.payment_completion_time,
                    payment_amount: res.data.payment_Amount,
                    payment_method: res.data.payment_method,
                    payment_status: res.data.payment_status
                };

                await updatePayment(updatePaymentData);

                toast.success("Your payment is " + res.data.payment_status);
            }
            else {
                console.log("Payment not verified:", res.data);
                toast.error("Your payment is " + res.data.payment_status);
            }
        }
    } catch (error) {
        console.error("Error verifying payment:", error);
        toast.error(error.message);
    }
};

    
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
  
    if (handleErrors(newError)) {
      if (selectedOption === "cashOnDelivery" || selectedOption === "onlinePayment") {
        const userId = getUserId();
        const orderData = {
          userId: userId,
          couponCode: couponCode,
          products: searchParams.has("CartProducts")
            ? cartDatas.map((cartProduct) => ({
                productId: cartProduct.productId,
                companyId: cartProduct.companyId,

                panelId: cartProduct.panelId,
                productName: cartProduct.productName,
                discountedPrice: cartProduct.productPrice,
                quantity: cartProduct.quantity,
                productImage: cartProduct.productImage,
                productPrice: cartProduct.productPrice,
                discountPercentage: cartProduct.discountPercentage,
                deliveryCharge: cartProduct.deliveryCharge,
                gstRate: cartProduct.gstRate,
                originalPrice: cartProduct.originalPrice,
                finalPrice: cartProduct.finalPrice,
                paymentMethod: selectedOption,
              }))
            : [
                {
                  productId: productId,
                  panelId: ProductDetails?.panelId?._id,
                  companyId: ProductDetails?.companyId?._id,
                  productName: ProductDetails?.productName,
                  quantity: quantity,
                  productImage: ProductDetails?.productImage,
                  productPrice: ProductDetails?.discountedPrice,
                  discountedPrice: ProductDetails && ProductDetails.discountedPrice,
                  discountPercentage: ProductDetails && ProductDetails.discountPercentage,
                  deliveryCharge: ProductDetails && ProductDetails.deliveryCharge,
                  gstRate: ProductDetails && ProductDetails.gstRate,
                  originalPrice: ProductDetails && ProductDetails.originalPrice,
                  finalPrice: ProductDetails && ProductDetails.finalPrice,
                  paymentMethod: selectedOption,
                },
              ],
          ShippingAddress: [
            {
              name: `${inputs.firstname} ${inputs.lastname}`,
              email: inputs.email,
              mobileNumber: inputs.mobileNumber,
              address: inputs.address,
              city: inputs.city,
              state: inputs.state,
              pincode: inputs.pincode,
            },
          ],
          paymentMethod: selectedOption,
        };
  
        try {
          if (searchParams && searchParams.has("CartProducts")) {
            const cartRemoveData = {
              _id: cartId,
              // items: cartDatas.map((cartProduct) => ({
              //   productId: cartProduct.productId,
              //   companyId: cartProduct.companyId,
              //   panelId: cartProduct.panelId,
              //   productName: cartProduct.productName,
              //   discountedPrice: cartProduct.productPrice,
              //   quantity: cartProduct.quantity,
              //   productImage: cartProduct.productImage,
              //   productPrice: cartProduct.productPrice,
              //   discountPercentage: cartProduct.discountPercentage,
              //   deliveryCharge: cartProduct.deliveryCharge,
              //   gstRate: cartProduct.gstRate,
              //   originalPrice: cartProduct.originalPrice,
              //   finalPrice: cartProduct.finalPrice,
              // })),
            };
  
            const removeResponse = await removeAllcartProducts(cartRemoveData);
            console.log("removeResponse:", cartRemoveData);
            dispatch(fetchCartDataAsync());
            if (!removeResponse.data.success) {
              throw new Error(removeResponse.data.message || "Failed to remove cart products");
            }
          }
  
          const orderResponse = await order(orderData);
          if (orderResponse.data.success) {
            const orderNumber = orderResponse?.data?.result?.orderNumber;
            const trackingNumber = orderResponse?.data?.result?.trackingNumber;
            const Id = orderResponse?.data?.result?.insertedData?._id;
            
          
            if (selectedOption === "onlinePayment") {
              try {
                  let { orderId, sessionId } = await getSessionId(Id);
                  let checkoutOptions = {
                      paymentSessionId: sessionId,
                      redirectTarget: "_modal",
                  };
  
                  cashfree.checkout(checkoutOptions).then(async (res) => {
                      console.log("Payment initialized");
                      await verifyPayment(orderId,Id);
                  });

                  if (isAuthenticated()) {
                    navigate(`/Card?productId=${Id}`, {
                      state: {
                        orderNumber: orderNumber,
                        trackingNumber: trackingNumber,
                      },
                    });
                  }
              } catch (error) {
                  console.error("Error during online payment:", error);
              }
          } else {
              try {
                if (isAuthenticated()) {
                  navigate(`/Card?productId=${Id}`, {
                    state: {
                      orderNumber: orderNumber,
                      trackingNumber: trackingNumber,
                    },
                  });
                }
                toast.success("Cash on delivery order placed successfully");
              } catch (error) {
                console.error("Error during cash on delivery:", error);
                toast.error(error.message );
              }
          }

           
  
            toast.success(orderResponse.data.message);
          } else {
            throw new Error(orderResponse.data.message || "Failed to place order");
          }
        } catch (error) {
          console.error("API request failed:", error);
          toast.error(error.message || "Unexpected error occurred");
        }
       
      } else {
        alert('Please select "Cash on Delivery" or "Online Payment" to place your order.');
      }
    } else {
      setSubmitted(false);
    }
  };
  
  

  const [selectedOption, setSelectedOption] = useState("");

  const handlePaymentChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <>
      <Header />
      <body className="gradient-custom1">
        <div className="container ">
          <div className="row">
            <div className="col-sm-7">
              <div
                className="container ADDRESS_SIDE my-lg-5 my-2 p-3"
                style={{ borderRadius: "50px 50px 0px 50px " }}
              >
                <div className="row">
                  <div className="col-sm-2 fw-bold  mt-5"></div>
                  <div className="col-sm-5"></div>
                  <div className="col-sm-5 fw-bold text-white  ">
                    <p>
                      Have an account?&nbsp;
                      <a href="/login" className="text-warning">
                        Login in
                      </a>
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <p className="text-white fw-bold">Email:</p>
                    <input
                      type="text"
                      aria-label="First name"
                      className="form-control"
                      placeholder="Enter Your Email"
                      name="email"
                      value={inputs.email}
                      onChange={handleInputs}
                    />
                  </div>
                  {errors.email.required ? (
                    <span className="text-danger form-text d-flex mt-4 justify-content-center">
                      This field is required.
                    </span>
                  ) : errors.email.valid ? (
                    <span className="text-danger form-text d-flex mt-4 justify-content-center">
                      Enter a valid mail id
                    </span>
                  ) : null}
                </div>
                <br />
                <div className="row">
                  <div className="col-sm-12 fw-bold">
                    <p className="text-white">Country:</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-12">
                    <select
                      className="form-select"
                      value={inputs.country}
                      onChange={(e) => {
                        handleStateChange(e);
                        handleInputs(e);
                      }}
                      name="country"
                    >
                      <option value="" disabled hidden>
                        Country/Region
                      </option>
                      {country.map((country, index) => (
                        <option key={index} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.country.required ? (
                    <span className="text-danger form-text d-flex mt-4 justify-content-center">
                      This field is required.
                    </span>
                  ) : errors.country.valid ? (
                    <span className="text-danger form-text d-flex mt-4 justify-content-center">
                      Enter a valid country
                    </span>
                  ) : null}
                </div>
                <br />
                <div className="row">
                  <div className="col-sm-6 mt-2">
                    <div className="input-group d-flex gap-2">
                      <div className="fw-bold text-white">First Name:</div>
                      <br></br>
                      <input
                        type="text"
                        aria-label="First name"
                        className="form-control rounded-2"
                        name="firstname"
                        value={inputs?.firstname}
                        onChange={handleInputs}
                      />
                    </div>
                  </div>
                  <div className="col-sm-6 mt-2">
                    <div className="input-group d-flex gap-2">
                      <div className="fw-bold text-white">Last Name:</div>
                      <br></br>
                      <input
                        type="text"
                        aria-label="Last name"
                        className="form-control rounded-2"
                        name="lastname"
                        value={inputs?.lastname}
                        onChange={handleInputs}
                      />
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-6">
                      {errors.firstname.required ? (
                        <span className="text-danger form-text d-flex mt-4 ms-5 justify-content-center">
                          This field is required.
                        </span>
                      ) : errors.firstname.valid ? (
                        <span className="text-danger form-text d-flex mt-4 ms-5 justify-content-center">
                          Enter a valid firstname
                        </span>
                      ) : null}
                    </div>
                    <div className="col-sm-6">
                      {errors.lastname.required ? (
                        <span className="text-danger form-text d-flex mt-4 justify-content-center">
                          This field is required.
                        </span>
                      ) : errors.lastname.valid ? (
                        <span className="text-danger form-text d-flex mt-4 justify-content-center">
                          Enter a valid lastname
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <br />

                <div className="row">
                  <div className="col-sm-12">
                    <div className="fw-bold text-white">Address:</div>
                    <input
                      type="text"
                      aria-label="First name"
                      className="form-control mt-2"
                      placeholder="Enter Your Address"
                      name="address"
                      value={inputs?.address}
                      onChange={handleInputs}
                    />
                    {errors.address.required ? (
                      <span className="text-danger form-text d-flex mt-4 justify-content-center">
                        This field is required.
                      </span>
                    ) : errors.country.valid ? (
                      <span className="text-danger form-text d-flex mt-4 justify-content-center">
                        Enter a valid address
                      </span>
                    ) : null}
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-sm-3">
                    <div className="fw-bold text-white">City:</div>
                    <input
                      type="text"
                      aria-label="First name"
                      className="form-control mt-2"
                      placeholder="City"
                      name="city"
                      value={inputs?.city}
                      onChange={handleInputs}
                    />
                    {errors.city.required ? (
                      <span className="text-danger form-text d-flex mt-4 justify-content-center">
                        This field is required.
                      </span>
                    ) : errors.city.valid ? (
                      <span className="text-danger form-text d-flex mt-4 justify-content-center">
                        Enter a valid city
                      </span>
                    ) : null}
                  </div>
                  <br />
                  <div className="col-sm-1"></div>
                  <br />
                  <div className="col-sm-3">
                    <div className="fw-bold text-white">State:</div>
                    <select
                      className="form-select mt-2"
                      value={inputs.state}
                      onChange={(e) => {
                        handleStateChange(e);
                        handleInputs(e);
                      }}
                      name="state"
                    >
                      <option value="" disabled hidden>
                        Select State
                      </option>
                      {indianStates.map((state, index) => (
                        <option key={index} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                    {errors.state.required ? (
                      <span className="text-danger form-text d-flex mt-4 justify-content-center">
                        This field is required.
                      </span>
                    ) : errors.state.valid ? (
                      <span className="text-danger form-text d-flex mt-4 justify-content-center">
                        Enter a valid this.state.
                      </span>
                    ) : null}
                  </div>
                  <br />
                  <div className="col-sm-1"></div>
                  <br />
                  <div className="col-sm-3">
                    <div className="fw-bold text-white">Pincode:</div>
                    <input
                      type="text"
                      aria-label="First name"
                      className="form-control mt-2"
                      placeholder="Pincode"
                      name="pincode"
                      maxLength="6"
                      value={inputs?.pincode}
                      onChange={handleInputs}
                    />
                    {errors.pincode.required ? (
                      <span className="text-danger form-text d-flex mt-4 justify-content-center">
                        This field is required.
                      </span>
                    ) : errors.pincode.valid ? (
                      <span className="text-danger form-text d-flex mt-4 justify-content-center">
                        Enter a valid pincode
                      </span>
                    ) : null}
                  </div>
                  <br />
                </div>
                <br />
                <div className="row">
                  <div className="col-sm-12 ">
                    <div className="fw-bold text-white">Mobile Number:</div>
                    <input
                      type="text"
                      aria-label="First name"
                      className="form-control mt-2"
                      placeholder="Phone Number For Orders & Delivery Updates"
                      name="mobileNumber"
                      value={inputs?.mobileNumber}
                      onChange={handleInputs}
                      maxLength={10}
                    />
                    {errors.mobileNumber.required ? (
                      <span className="text-danger form-text d-flex mt-4 justify-content-center">
                        This field is required.
                      </span>
                    ) : errors.mobileNumber.valid ? (
                      <span className="text-danger form-text d-flex mt-4 justify-content-center">
                        Enter a valid mobile number
                      </span>
                    ) : null}
                  </div>
                </div>
                <br />
                <div className="row d- flex justify-content-between">
                  <div className="col-sm-6 fw-bold">
                    <span className="text-white">Coupon code:</span>
                    <input
                      type="text"
                      aria-label="First name"
                      className="form-control mt-2"
                      placeholder="Discount Code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                  </div>
                  <div className="col-sm-6 coupondisplay">
                    <span className="text-white fw-bold">
                      Available Coupon:
                    </span>{" "}
                    <br />
                    <p className="card p-1 text-center coupondisplaycard">
                      {couponData.code}
                    </p>
                  </div>
                </div>
                <br />
                <div className="row">
                  <div className="col-sm-12 fw-bold">
                    <p className="text-white">Payment</p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <div className="form-check  ms-5">
                      <input
                        className="form-check-input "
                        type="radio"
                        name="paymentMethod"
                        value="cashOnDelivery"
                        checked={selectedOption === "cashOnDelivery"}
                        onChange={(e) => {
                          handlePaymentChange(e);
                          handleInputs(e);
                        }}
                      />
                      <button
                        className="p-1 mx-auto w-75 form-check-label COD_ONLINE_PAYMENT_BTN "
                        htmlFor="cashOnDelivery"
                      >
                        Cash On Delivery
                      </button>
                    </div>
                  </div>
                  <br />
                  <br />
                  <br />
                  <div className="col-sm-6">
                    <div className="form-check ms-5">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="paymentMethod"
                        value="onlinePayment"
                        checked={selectedOption === "onlinePayment"}
                        onChange={(e) => {
                          handlePaymentChange(e);
                          handleInputs(e);
                        }}
                      />
                      <button
                        className="p-1 mx-auto w-50 form-check-label COD_ONLINE_PAYMENT_BTN"
                        htmlFor="onlinePayment"
                      >
                        Online Payment
                      </button>
                    </div>
                  </div>
                </div>
                {errors.country.required ? (
                  <span className="text-danger form-text d-flex mt-2 justify-content-center">
                    This field is required.
                  </span>
                ) : errors.country.valid ? (
                  <span className="text-danger form-text d-flex mt-2 justify-content-center">
                    Enter a valid country
                  </span>
                ) : null}
                <br />
                <div className="row">
                  <div className="col-sm-12 col-lg-12 d-flex justify-content-center ">
                    <button
                      type="button"
                      className="col-12 mx-auto btn COD_ONLINE_PAYMENT_BTN bg-warning text-white border-0 p-2 fw-bolder  d-flex justify-content-center"
                      style={{ maxWidth: "20rem" }}
                      onClick={handleSubmit}
                    >
                      Place Your Order
                    </button>
                  </div>
                </div>
                <br />
              </div>
            </div>
            <div className="col-sm-5 PAYMENT_DETAILS_SIDE rounded-5">
              <div className="container mt-5">
                <div className="row">
                  <div
                    className="card mx-auto w-100 col-sm-12 col-lg-12 row d-flex justify-content-center mb-3"
                    id="payment_pay"
                    style={{ borderRadius: "50px 50px 0px 50px" }}
                  >
                    {searchParams.has("CartProducts") && ProductDetails && (
                      <>
                        {cartDatas.map((cartproduct) => (
                          <div
                            key={cartproduct._id}
                            className="col-12 d-flex gap-3 mb-2"
                          >
                            <div className="col-sm-2 col-lg-4 product_details_pic">
                              <img
                                className=""
                                src={cartproduct.productImage}
                                alt=""
                              />
                            </div>
                            <div className="col-sm-10">
                              <div className="mt-4 mb-2">
                                <span className="d-flex">
                                  {cartproduct.productName}: ₹
                                  {cartproduct.discountedPrice}{" "}
                                </span>
                                <span className="d-flex mt-2">
                                  Quantity: {cartproduct.quantity}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="row mx-1 mb-2">
                          <div className="col-sm-12">
                            <div className="d-flex flex-wrap">
                              <div className="text-primary flex-grow-1">
                                Sub Total:
                              </div>
                              <div className="text-primary">
                                ₹ {ProductDetails.totalAmount}
                              </div>
                            </div>
                            <div className="d-flex flex-wrap">
                              <div className="text-primary flex-grow-1">
                                Delivery Charges:
                              </div>
                              <div className="text-primary">
                                ₹ {ProductDetails.deliveryCharges}.00
                              </div>
                            </div>
                            <div className="d-flex flex-wrap">
                              <div className="text-primary flex-grow-1">
                                Total Quantity:
                              </div>
                              <div className="text-primary">{quantity}</div>
                            </div>
                            <div className="d-flex flex-wrap">
                              <div className="text-primary flex-grow-1">
                                Total:
                              </div>
                              <div className="text-primary">
                                ₹ {ProductDetails.totalAmount}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {!searchParams.has("CartProducts") && ProductDetails && (
                      <>
                        <div className="row">
                          <div className="col-sm-2 col-lg-4 product_details_pic">
                            <img
                              className=""
                              src={ProductDetails.productImage}
                              alt=""
                            />
                          </div>
                          <div className="col-sm-10">
                            <div className="mt-4 mb-2">
                              <span className="d-flex">
                                {ProductDetails.productName}: ₹
                                {ProductDetails.discountedPrice}{" "}
                              </span>
                              <span className="d-flex mt-1">
                                GST: {ProductDetails.gstRate}%
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="row mx-1 mb-2">
                          <div className="col-sm-12">
                            <div className="d-flex flex-wrap">
                              <div className="text-primary flex-grow-1">
                                Sub Total:
                              </div>
                              <div className="text-primary">
                                ₹ {ProductDetails.totalAmount}
                              </div>
                            </div>
                            <div className="d-flex flex-wrap">
                              <div className="text-primary flex-grow-1">
                                Delivery Charges:
                              </div>
                              <div className="text-primary">
                                ₹ {ProductDetails.deliveryCharges}.00
                              </div>
                            </div>
                            <div className="d-flex flex-wrap">
                              <div className="text-primary flex-grow-1">
                                Total Quantity:
                              </div>
                              <div className="text-primary">{quantity}</div>
                            </div>
                            <div className="d-flex flex-wrap">
                              <div className="text-primary flex-grow-1">
                                Total:
                              </div>
                              <div className="text-primary">
                                ₹ {ProductDetails.totalAmount}
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
      <Footer />
    </>
  );
};

export default BuyItNow;
