import React from "react";
import "./HSPD1.css";
import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer/Footer";
import QuantityControl from "./QuantityControl";
import { useSearchParams } from "react-router-dom";
import { fetchSingleProduct } from "../../../Api/detail";
import { useEffect, useState } from "react";
import { isAuthenticated } from "../../../Utils/Auth";
import { getUserId } from "../../../Utils/Storage";
import { updateProduct, ratingProduct } from "../../../Api/product";
import { getsingleuser } from "../../../Api/user";
import { HotSellingWeb } from "../../../Api/hotselling";
import { BsStar, BsStarFill } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { toast } from "react-toastify";
import { PostProductCart } from "../../../Api/cart";
import { useDispatch} from 'react-redux';//redux
import { fetchCartDataAsync } from "../../../State Mangement/action";//redux
const HSPD1 = () => {
  let [searchParams] = useSearchParams();
  var [ProductDetails, setProductDetails] = useState();
  let productId = searchParams.get("productId");
  const [rating, setRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [user, setUser] = useState(null);
  const userId = getUserId();
  const [products, setProducts] = useState("");
  const isLoggedIn = useState(isAuthenticated());
  const [isFullComment, setIsFullComment] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchSingleProduct(productId)
      .then((response) => {
        const productDetails = response.data.result;
        setProductDetails(productDetails);
      })
      .catch((error) => {
        console.error("API request failed:", error);
      });
  }, []);

  const openproduct = () => {
    if (isLoggedIn) {
      window.location.href = `/Buyitnow?productId=${ProductDetails._id}`;
    } else {
      window.location.href = "/Login";
    }
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };
  const updateProductQuantity = () => {
    const data = {
      _id: productId,
      quantity: quantity,
    };

    updateProduct(data)
      .then((response) => {
        const _id = response.data.result._id;
        const updatedQuantity = response.data.result.quantity;
      })
      .catch((error) => {
        console.error("API request failed:", error);
      });
  };

  useEffect(() => {
    updateProductQuantity();
  }, [quantity]);

  useEffect(() => {
    const saveProductData = async () => {
      try {
        const authenticated = await isAuthenticated();

        if (
          authenticated &&
          ProductDetails &&
          (user || rating || comment !== undefined)
        ) {
          const data = {
            _id: ProductDetails._id,
            rating: rating,
            comment: comment,
            user: user,
          };

          ratingProduct(data)
            .then((response) => {
              if (response && response.data && response.data.result) {
                const {
                  _id,
                  rating: updatedRating,
                  comment,
                } = response.data.result;

                if (
                  _id !== undefined &&
                  updatedRating !== undefined &&
                  comment !== undefined
                ) {
                  console.log(comment);
                } else {
                  console.error("Invalid response data:", response);
                }
              } else {
                console.error("Invalid response structure:", response);
              }
            })
            .catch((error) => {
              console.error("API request failed:", error);
            });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    saveProductData();
  }, [ProductDetails, rating, comment]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  const commentValue = () => {
    setComment(comment);
  };
  const handleStarClick = (starIndex) => {
    const userRating = starIndex + 1;
    setRating(userRating);
    localStorage.setItem(`userRating_${productId}`, userRating);
  };
  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    HotSellingWeb()
      .then((res) => {
        const value = res?.data?.result?.productList;

        setProducts(value);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getUserDetails();
    dispatch(fetchCartDataAsync());
  }, []);
  const getUserDetails = () => {
    const id = getUserId();
    getsingleuser(id)
      .then((res) => {
        setUser(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const CommentWithReadMore = ({ comment, maxLength }) => {
    const toggleReadMore = () => {
      setIsFullComment(!isFullComment);
    };

    const displayComment = isFullComment
      ? comment
      : `${comment.slice(0, maxLength)}...`;

    return (
      <div>
        <p>{displayComment}</p>
        {!isFullComment && (
          <button className="comment_value" onClick={toggleReadMore}>
            Read More
          </button>
        )}
      </div>
    );
  };

  const addToCart = () => {
    if (ProductDetails) {
      const cartData = {
        userId: userId,
        items: [
          {
            productId: ProductDetails._id,
            quantity: quantity,
            operation: "increase",
            productPrice: ProductDetails.discountedPrice,
          },
        ],
      };

      PostProductCart(cartData)
        .then((response) => {
          if (isAuthenticated() ) {
            dispatch(fetchCartDataAsync());
            toast.success("Product added to cart", {
              position: "top-center",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              icon: <FaCartArrowDown />,
            });
          } else {
            toast.error("Failed to add the product to the cart");
          }
        })
        .catch((error) => {
          console.error("Failed to add the product to the cart:", error);
        });
    }
  };
  if (ProductDetails) {
    return (
      <>
        <Header />
        <br />
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <img
                src={ProductDetails.productImage}
                alt="productimg"
                className="img-fluid"
              />
            </div>
            <div className="col-sm-6">
              <h2 className="fw-bold">{ProductDetails?.productName}</h2>
              <br />
              <p>
                <i className="bi bi-currency-rupee text_color_heading fs-3">
                  {ProductDetails.discountedPrice}
                </i>
                {"\u00a0"}
                {"\u00a0"}
                {"\u00a0"}
                <del className="text-muted fs-5">
                  {" "}
                  <i className="bi bi-currency-rupee"></i>
                  {ProductDetails.originalPrice}
                </del>
                {"\u00a0"}
                {"\u00a0"}
                {"\u00a0"}
                <span class="badge rounded-pill px-3 py-2 text_color_heading_back">
                  Save {ProductDetails.discountPercentage}%
                </span>
              </p>
              <p className="text-muted font_size_tax mt-4">
                Tax included. Shipping calculated at checkout
              </p>
              <span class="badge text_color_heading_back  py-2 px-5">
                <i class="bi bi-airplane-fill px-1"></i>
                {"\u00a0"}Free Shipping all over India.
              </span>
              <p className="text-muted mt-4">Quantity:</p>
              {/*  */}
              <QuantityControl onQuantityChange={handleQuantityChange} />
              {/*  */}

              <br />

              {/* two btn start */}
              <div className="row">
                <div className="col-sm-12 col-md-12 border_color d-flex justify-content-center justify-content-md-between">
                  <a
                    className="btn px-3 px-md-5 border-2 rounded-pill mb-2 mb-md-0"
                    href="#"
                    role="button"
                    onClick={addToCart}
                  >
                    Add to cart
                  </a>
                  {/* ee */}

                  {"\u00a0"}
                  {"\u00a0"}
                  <a
                    className="btn px-3 px-md-5 border-2 rounded-pill mb-2 mb-md-0 text_color_heading_back"
                    role="button"
                    onClick={openproduct}
                  >
                    Buy Now
                  </a>
                </div>
              </div>

              <hr />
              {/* two btn end */}

              <div className="size_small mb-3">
                <img src={ProductDetails.productImage} alt="productimg"></img>
              </div>
              <h6>Description:</h6>
              <p>{ProductDetails.productDescription}</p>
              <h6>Specification:</h6>
              <div className="listed fs-6">
                <ul>
                  <li>
                    Package Contains: It has 1 Piece of Back Arch Stretcher
                  </li>
                  <li>Material: ABS Plastic</li>
                  <li>Color: As per availability</li>
                  <li>Weight: 900 gms</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row d-flex sm-justifiy-content-center text-center">
            <div className="col-sm-4 ">
              <p className="fw-bold ">Rating:</p>
              {[0, 1, 2, 3, 4].map((starIndex) => (
                <span
                  key={starIndex}
                  value={starIndex}
                  onChange={handleRatingChange}
                  className={`star ${starIndex < rating ? "filled" : ""}`}
                >
                  {starIndex < rating ? <BsStarFill /> : <BsStar />}
                </span>
              ))}
            </div>

            <div className="col-sm-4 sm-my-5">
              <button
                type="button"
                class="btn text_color_heading_back"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalHspd1"
              >
                Be the first to write a review
              </button>
              <br />
              <br />
              <div
                class="modal fade"
                id="exampleModalHspd1"
                tabindex="-1"
                aria-labelledby="exampleModalLabel2"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1
                        class="modal-title fs-5 justify-content-center text-center"
                        id="exampleModalLabel2"
                      >
                        Write a review
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body  ">
                      <textarea
                        rows="4"
                        cols="30"
                        name="comment"
                        form="usrform"
                        onChange={(e) => setComment(e.target.value)}
                      >
                        Enter text here...
                      </textarea>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary rounded-pill"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary rounded-pill"
                        onClick={commentValue}
                      >
                        Send
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-sm-4">
              <button
                type="button"
                class="btn text_color_heading_back"
                data-bs-toggle="modal"
                data-bs-target="#exampleModalHspd"
              >
                Give the product rating:{"\u00a0"}
                {"\u00a0"}
                <i class="bi bi-list-stars"></i>
              </button>

              <div
                class="modal fade"
                id="exampleModalHspd"
                tabindex="-1"
                aria-labelledby="exampleModalLabel1"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1
                        class="modal-title fs-5 justify-content-center text-center"
                        id="exampleModalLabel1"
                      >
                        How would you rate this item?
                      </h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body  justify-content-center text-center">
                      {[0, 1, 2, 3, 4].map((starIndex) => (
                        <span
                          key={starIndex}
                          onClick={() => handleStarClick(starIndex)}
                          value={starIndex}
                          onChange={handleRatingChange}
                          className={`star ${
                            starIndex < rating ? "filled" : ""
                          }`}
                        >
                          {starIndex < rating ? <BsStarFill /> : <BsStar />}
                        </span>
                      ))}
                      <br />
                      <br />
                      <div>
                        {" "}
                        <p>{rating} out of 5</p>
                      </div>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary rounded-pill"
                        data-bs-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary rounded-pill"
                      >
                        Save changes
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="my-5">
            <h3>Product Your Review:-</h3>
            {Array.isArray(products) && products.length > 0 ? (
              <ul>
                {products.map((product, index) => {
                  if (
                    product._id === productId &&
                    user &&
                    (comment || rating)
                  ) {
                    return (
                      <div
                        className="card-lg-12 card-md-12 card-12 bg-gray"
                        id="review_comment_rate"
                        key={index}
                      >
                        <div className="row d-flex">
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="d-flex">
                              <div>By</div>
                              <div className="review_values">: {user.name}</div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="d-flex">
                              <div>productName</div>
                              <div className="review_values">
                                : {product.productName}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row d-flex">
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="d-flex">
                              <div>Comment</div>:
                              <div className="review_values">
                                <CommentWithReadMore
                                  comment={comment}
                                  maxLength={100}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="d-flex">
                              <div>Rating </div>
                              <div className="review_values">: {rating}</div>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="d-flex gap-2">
                              <div className=" mt-1">Rate :</div>
                              <div>
                                {[0, 1, 2, 3, 4].map((starIndex) => (
                                  <span
                                    key={starIndex}
                                    className={`star ${
                                      starIndex < rating ? "filled" : ""
                                    }`}
                                  >
                                    {starIndex < rating ? "★" : "☆"}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </ul>
            ) : (
              <div className="comment_data">Data not Found</div>
            )}
          </div>
        </div>
        <br />
        <Footer />
      </>
    );
  }
};

export default HSPD1;
