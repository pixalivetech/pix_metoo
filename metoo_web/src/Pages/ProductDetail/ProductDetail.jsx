import React, { useState, useEffect } from "react";
import Header from "../../Components/Header/Header";
import { BsStar, BsStarFill } from "react-icons/bs";
import "./ProductDetail.css";
import Footer from "../../Components/Footer/Footer";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { isAuthenticated } from "../../Utils/Auth";
import { FaCartArrowDown } from "react-icons/fa";
import { getUserId } from "../../Utils/Storage";
import { fetchSingleProduct } from "../../Api/detail";
import { PostProductCart } from "../../Api/cart";
import { ratingAllProduct, ratingUserProduct } from "../../Api/rating";
import QuantityControl from "../HotSelling/HSProductDetails/QuantityControl";
import SimilarProducts from "./SimilarProducts";
import { localDate } from "../../Utils/DateFormat";
import { ratingProduct } from "../../Api/product";
function ProductDetail() {
  const ratingg = 0;
  const ratingdoc = 3;
  const ratingcus = 5;
  const [isReviewVisible, setReviewVisibility] = useState(false);
  const [ratingstar, setRatingstar] = useState(0);

  const handleReviewButtonClick = () => {
    setReviewVisibility(!isReviewVisible);
  };

  let [searchParams] = useSearchParams();
  const [ProductDetails, setProductDetails] = useState();
  const productId = searchParams.get("productId");
  const [rating, setRating] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [comment, setComment] = useState("");
  const [title, setProductTitle] = useState("");
  const [user, setUser] = useState(null);
  const [rateuser, setRateUser] = useState(null);
  const userId = getUserId();
  const [count, setCount] = useState(0);
  const [products, setProducts] = useState([]);
  const [allproduct, setAllProduct] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [isFullComment, setIsFullComment] = useState(false);
  const [totalraings, setTotalRatings] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
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
      window.location.href = `/Buyitnow?productId=${ProductDetails._id}&quantity=${quantity}`;
    } else {
      window.location.href = "/Login";
    }
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  const saveProductData = async () => {
    try {
      const authenticated = await isAuthenticated();

      if (
        authenticated &&
        ProductDetails &&
        (user || rating || comment || title !== undefined)
      ) {
        const data = {
          productId: productId,
          rating: rating,
          title: title,
          comment: comment,
          userId: userId,
          panelId: ProductDetails?.panelId?._id,
          companyId: ProductDetails?.companyId?._id,
          selectedId:
            ProductDetails?.panelId?._id ?? ProductDetails?.companyId?._id,
        };

        await ratingUserProduct(data);
        PostProductRate();
        setReviewVisibility(false);
        getProducts();
        toast.success("Your comment has been successfully");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    PostProductRate();
  }, [totalCount]);
  const PostProductRate = async () => {
    try {
      const data = {
        _id: productId,
        rating: Number(totalCount),
      };
      await ratingProduct(data);
      getProducts();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  const handleTitleChange = (e) => {
    setProductTitle(e.target.value);
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
    ratingAllProduct()
      .then((res) => {
        const productRatings = res?.data?.result || [];
        const userRatings = productRatings.filter(
          (rating) =>
            rating.userId && rating.userId._id && rating.userId._id === userId
        );
        const productsWithDetails = userRatings.map((rating) => ({
          ...rating,
          productDetails:
            productRatings.find(
              (product) =>
                product.productId &&
                product.productId._id &&
                product.productId._id === rating.productId
            ) || {},
        }));
        var sortedUserProductRatings = productsWithDetails.sort(
          (a, b) => new Date(b.modifiedOn) - new Date(a.modifiedOn)
        );
        setProducts(sortedUserProductRatings);

        const allProductRatings = res?.data?.result || [];
        const allUserRatings = allProductRatings.filter(
          (rating) =>
            rating.userId && rating.userId._id && rating.userId._id !== userId
        );
        const allProductsWithDetails = allUserRatings.map((rating) => ({
          ...rating,
          productDetails:
            allProductRatings.find(
              (product) =>
                product.productId &&
                product.productId._id &&
                product.productId._id === rating.productId
            ) || {},
        }));

        var sortedAllProductRatings = allProductsWithDetails.sort(
          (a, b) => new Date(b.modifiedOn) - new Date(a.modifiedOn)
        );
        setAllProduct(sortedAllProductRatings);

        setCount(
          productRatings.filter(
            (product) =>
              product.productId &&
              product.productId._id &&
              product.productId._id === productId
          ).length
        );

        const allProductRatingsForSpecificProduct = productRatings.filter(
          (rating) =>
            rating.productId &&
            rating.productId._id &&
            rating.productId._id === productId
        );
        const allRatingsForSpecificProduct =
          allProductRatingsForSpecificProduct.filter(
            (rating) => rating.userId && rating.userId._id
          );
        const allProductsWithDetailsForSpecificProduct =
          allRatingsForSpecificProduct.map((rating) => ({
            ...rating,
            productDetails:
              allProductRatings.find(
                (product) =>
                  product.productId &&
                  product.productId._id &&
                  product.productId._id === rating.productId
              ) || {},
          }));
        const sortedAllProductRatingsForSpecificProduct =
          allProductsWithDetailsForSpecificProduct.sort(
            (a, b) => new Date(b.modifiedOn) - new Date(a.modifiedOn)
          );
        setTotalRatings(sortedAllProductRatingsForSpecificProduct);

        const totalRatingsCount = allProductRatingsForSpecificProduct.length;
        const sumOfRatings = allProductRatingsForSpecificProduct.reduce(
          (sum, rating) => sum + (rating?.rating || 0),
          0
        );
        const averageRating =
          totalRatingsCount > 0 ? sumOfRatings / totalRatingsCount : 0;
        setTotalCount(averageRating);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const CommentWithReadMore = ({ comment }) => {
    const [showFullComment, setShowFullComment] = useState(false);

    const toggleReadMore = () => {
      setShowFullComment(!showFullComment);
    };

    const renderComment = () => {
      if (showFullComment || comment.split(" ").length <= 50) {
        return comment;
      } else {
        const words = comment.split(" ");
        const truncatedComment = words.slice(0, 50).join(" ");
        return (
          <>
            {truncatedComment}{" "}
            <span className="read-more text-primary" onClick={toggleReadMore}>
              ...read more
            </span>
          </>
        );
      }
    };

    return <p>{renderComment()}</p>;
  };

  const addToCart = () => {
    if (ProductDetails) {
      const cartData = {
        userId: userId,
        items: [
          {
            productId: ProductDetails._id,
            panelId: ProductDetails?.panelId?._id,
            companyId: ProductDetails?.companyId?._id,
            selectedId:
              ProductDetails?.panelId?._id ?? ProductDetails?.companyId?._id,
            productName: ProductDetails.productName,
            productImage: ProductDetails.productImage,
            quantity: quantity,
            operation: "increase",
            productPrice: ProductDetails.discountedPrice,
            discountedPrice: ProductDetails.discountedPrice,
            discountPercentage: ProductDetails.discountPercentage,
            deliveryCharge: ProductDetails.deliveryCharge,
            gstRate: ProductDetails.gstRate,
            originalPrice: ProductDetails.originalPrice,
            finalPrice: ProductDetails.finalPrice,
          },
        ],
      };

      PostProductCart(cartData)
        .then((response) => {
          if (response.data && response.data.success) {
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

  const maxWordsPerParagraph = 100;

  const splitDescriptionIntoParagraphs = (description) => {
    const words = description.split(" ");
    const paragraphs = [];

    while (words.length > 0) {
      paragraphs.push(words.splice(0, maxWordsPerParagraph).join(" "));
    }

    return paragraphs;
  };

  if (ProductDetails) {
    return (
      <div>
        <Header />

        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-12 mt-5 mb-4">
              <div id="carouselExampleIndicators" className="carousel slide">
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={0}
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  />
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={1}
                    aria-label="Slide 2"
                  />
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={2}
                    aria-label="Slide 3"
                  />
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={3}
                    aria-label="Slide 4"
                  />
                  <button
                    type="button"
                    data-bs-target="#carouselExampleIndicators"
                    data-bs-slide-to={4}
                    aria-label="Slide 5"
                  />
                </div>
                <div className="carousel-inner main_imgs">
                  <div className="carousel-item active">
                    <img
                      src={ProductDetails.productImage}
                      className="d-block rounded-2"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={ProductDetails.topImage}
                      className="d-block rounded-2"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={ProductDetails.frontImage}
                      className="d-block rounded-2"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={ProductDetails.backImage}
                      className="d-block rounded-2"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      src={ProductDetails.sideImage}
                      className="d-block rounded-2"
                      alt="..."
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon bg-dark rounded-circle"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon bg-dark rounded-circle"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Next</span>
                </button>
              </div>

              <div className="d-flex mt-4 gap-3 sub_imgs">
                <img
                  height={120}
                  src={ProductDetails.topImage}
                  className="d-block rounded-2 sub-images"
                  alt="..."
                />
                <img
                  height={120}
                  src={ProductDetails.frontImage}
                  className="d-block rounded-2 sub-images"
                  alt="..."
                />
                <img
                  height={120}
                  src={ProductDetails.backImage}
                  className="d-block rounded-2 sub-images"
                  alt="..."
                />
                <img
                  height={120}
                  src={ProductDetails.sideImage}
                  className="d-block rounded-2 sub-images"
                  alt="..."
                />
              </div>
            </div>

            <div className="col-lg-6 col-md-12 col-12 mt-5">
              <h2 className="text-headings-color">
                {ProductDetails?.productName}
              </h2>
              {[0, 1, 2, 3, 4].map((starIndex) => (
                <span
                  key={starIndex}
                  value={starIndex}
                  className={`star ${starIndex < totalCount ? "filled" : ""}`}
                >
                  {starIndex < totalCount ? <BsStarFill /> : <BsStar />}
                </span>
              ))}
              &nbsp;&nbsp;
              {count} reviews
              <p className="text-black fw-bold mt-2">
                Benefits of {ProductDetails?.productName}{" "}
              </p>
              <ul className="textdesign">
                {ProductDetails.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
              <span className="fs-5 mx-2 text-decoration-line-through text-headings-color">
                MRP- ₹{ProductDetails.finalPrice}
              </span>
              <span className="fs-5  fw-bold mx-4 text-headings-color">
                {ProductDetails.discountedPrice}
              </span>
              &nbsp;
              <span className="badge bg-danger fs-6">
                Save {ProductDetails.discountPercentage}%
              </span>
              <p className="mx-2">Prices are inclusive of all taxes</p>
              <div className="d-flex mt-4">
                <h6 className="mx-2 mt-2 text-headings-color">Quantity:</h6>
                <QuantityControl onQuantityChange={handleQuantityChange} />
              </div>
              <div className=" d-flex gap-3 mt-4">
                <button className="cart-buy-btn p-2 px-5 mt-3 rounded-2 TCbg text-white border-0" onClick={addToCart}>
                  Add to Cart
                </button>
                <button className="cart-buy-btn p-2 px-5 mt-3 rounded-2 TCbg text-white border-0" onClick={openproduct}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          <div className="row mb-5">
            <div className="col-lg-12 mt-5">
              <h3 className="text-headings-color">Description</h3>
              {ProductDetails && ProductDetails.productDescription && (
                <>
                  {splitDescriptionIntoParagraphs(
                    ProductDetails.productDescription
                  ).map((paragraph, index) => (
                    <p key={index} className="mx-1 textdesign">
                      {paragraph}
                    </p>
                  ))}
                </>
              )}

              <h3 className="text-headings-color textdesign">Specifications</h3>
              <div className="mx-2">
                <div>
                  {ProductDetails.specifications.map((specification, index) => (
                    <div key={index} className="textdesign">
                      <strong>{specification.heading}</strong>
                      <ul>
                        {specification.points.map((point, pointIndex) => (
                          <li key={pointIndex}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-1 mb-2 ">
                <SimilarProducts currentProductId={ProductDetails._id} />
              </div>

              <div>
                <h3 className="text-headings-color mt-3">Customer Reviews</h3>
                {[0, 1, 2, 3, 4].map((starIndex) => (
                  <span
                    key={starIndex}
                    value={starIndex}
                    className={`star ${starIndex < totalCount ? "filled" : ""}`}
                    onClick={() => setRatingstar(starIndex + 1)}
                  >
                    {starIndex < totalCount ? <BsStarFill /> : <BsStar />}
                  </span>
                ))}
                &nbsp;&nbsp;
                {count} reviews
                <button
                  className="btn btn-outline-primary review_btn"
                  onClick={handleReviewButtonClick}
                >
                  {isReviewVisible ? "Hide Review" : "Write a review"}
                </button>
                {isReviewVisible && (
                  <div className="review_box mt-3">
                    <h6>Rating</h6>
                    {[0, 1, 2, 3, 4].map((starIndex) => (
                      <span
                        key={starIndex}
                        onClick={() => handleStarClick(starIndex)}
                        value={starIndex}
                        onChange={handleRatingChange}
                        className={`star ${starIndex < rating ? "filled" : ""}`}
                      >
                        {starIndex < rating ? <BsStarFill /> : <BsStar />}
                      </span>
                    ))}
                    <h6 className="mt-2">Title</h6>
                    <input
                      type="text"
                      className="form-control mb-2"
                      placeholder="Product Title"
                      onChange={handleTitleChange}
                    />
                    <h6>Review</h6>
                    <textarea
                      className="form-control mb-2"
                      placeholder="Write your review..."
                      onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                      className="btn btn-primary"
                      onClick={saveProductData}
                    >
                      Submit Review
                    </button>
                  </div>
                )}
              </div>

              {Array.isArray(products) && products.length > 0 ? (
                <ul>
                  {products.map((userdetail, index) =>
                    userdetail &&
                    userdetail.productId &&
                    userdetail.productId._id === productId &&
                    (userdetail.comment ||
                      userdetail.rating ||
                      userdetail.title) ? (
                      <>
                        <div key={index} className="row mt-4 ">
                          <div className="col-lg-1 col-2 ">
                            {userdetail && (
                              <img
                                src={userdetail.userId.profileImage}
                                className="d-block rounded-5 mt-1 cus-image"
                                alt="..."
                              />
                            )}
                          </div>
                          <div className="col-lg-5 col-8 ">
                            {userdetail && (
                              <>
                                <span className="mx-3 fw-bold">
                                  {userdetail.userId.name}
                                </span>
                                <br />
                                <span className="text-muted mx-3">
                                  {localDate(userdetail.modifiedOn)}
                                </span>
                              </>
                            )}
                          </div>
                          <div className="col-lg-5 col-3 d-flex justify-content-end">
                            {[0, 1, 2, 3, 4].map((starIndex) => (
                              <span
                                key={starIndex}
                                value={starIndex}
                                className={` star ${
                                  starIndex < userdetail.rating ? "filled" : ""
                                }`}
                              >
                                {starIndex < userdetail.rating ? (
                                  <BsStarFill />
                                ) : (
                                  <BsStar />
                                )}
                              </span>
                            ))}
                          </div>
                          <div className="col-lg-12 mt-2 mx-2">
                            <h6 className="mt-3 doc_reviewss">
                              {userdetail.title}
                            </h6>
                            <div className="col-lg-11 col-12 doc_reviewss textdesign">
                              <p>
                                <CommentWithReadMore
                                  comment={userdetail.comment}
                                />
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null
                  )}
                </ul>
              ) : null}

              {Array.isArray(allproduct) && allproduct.length > 0 ? (
                <ul>
                  {allproduct.map((userdetail, index) =>
                    userdetail &&
                    userdetail.productId &&
                    userdetail.productId._id === productId &&
                    (userdetail.comment ||
                      userdetail.rating ||
                      userdetail.title) ? (
                      <>
                        <div key={index} className="row mt-4 ">
                          <div className="col-lg-1 col-2 ">
                            {userdetail && (
                              <img
                                src={userdetail.userId.profileImage}
                                className="d-block rounded-5 mt-1 cus-image"
                                alt="..."
                              />
                            )}
                          </div>
                          <div className="col-lg-5 col-8 ">
                            {userdetail && (
                              <>
                                <span className="mx-3 fw-bold">
                                  {userdetail.userId.name}
                                </span>
                                <br />
                                <span className="text-muted mx-3">
                                  {localDate(userdetail.modifiedOn)}
                                </span>
                              </>
                            )}
                          </div>
                          <div className="col-lg-5 col-3 d-flex justify-content-end">
                            {[0, 1, 2, 3, 4].map((starIndex) => (
                              <span
                                key={starIndex}
                                value={starIndex}
                                className={` star ${
                                  starIndex < userdetail.rating ? "filled" : ""
                                }`}
                              >
                                {starIndex < userdetail.rating ? (
                                  <BsStarFill />
                                ) : (
                                  <BsStar />
                                )}
                              </span>
                            ))}
                          </div>
                          <div className="col-lg-12 mt-2 mx-2">
                            <h6 className="mt-3 doc_reviewss">
                              {userdetail.title}
                            </h6>
                            <div className="col-lg-11 col-12 doc_reviewss textdesign">
                              <p>
                                <CommentWithReadMore
                                  comment={userdetail.comment}
                                />
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : null
                  )}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default ProductDetail;
