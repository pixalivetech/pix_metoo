import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/SideBar";
import { Link, useLocation } from "react-router-dom";
import { getSingleProduct } from "../../api/product";

function ViewProduct() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [product, setProduct] = useState();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = () => {
    getSingleProduct(id)
      .then((res) => {
        setProduct(res?.data?.result);
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
                    View Product
                  </h5>
                </div>
                <div className="content-page-header">
                  <Link to="/Listproducts">
                    <button
                      className="btn btn-outline border text-white  p-2"
                      style={{ backgroundColor: "#9265cc" }}
                    >
                      List Product
                    </button>
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="row p-3">
                  <div className=" col-md-6 ">
                    <div class="upload-img form-group text-center">
                      <label style={{ color: "#9265cc" }}>Product Image</label>
                      <div
                        class="circle d-flex align-items-center justify-content-center"
                        id="profile-picture-circle"
                      >
                        <div class="p-image">
                          {product?.productImage ? (
                            <img
                              className="avatar-sm-post"
                              src={product?.productImage}
                              alt="User"
                              width={180}
                              height={180}
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className=" col-md-6 ">
                    <div class="upload-img form-group text-center">
                      <label style={{ color: "#9265cc" }}>Product GIF</label>
                      <div
                        class="circle d-flex align-items-center justify-content-center"
                        id="profile-picture-circle"
                      >
                        <div class="p-image">
                          {product?.productGif ? (
                            <img
                              width={180}
                              height={180}
                              className="avatar-sm-post"
                              src={product?.productGif}
                              alt="User"
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div className="upload-img form-group text-center">
                      <label style={{ color: "#9265cc" }}>
                        Front Image <span className="text-danger">*</span>
                      </label>
                      <br />
                      <div
                        class="circle d-flex align-items-center justify-content-center"
                        id="profile-picture-circle"
                      >
                        <div class="p-image">
                          {product?.frontImage ? (
                            <img
                              width={180}
                              height={180}
                              className="avatar-sm-post"
                              src={product?.frontImage}
                              alt="User"
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div className="upload-img form-group text-center">
                      <label style={{ color: "#9265cc" }}>
                        Back Image<span className="text-danger">*</span>
                      </label>
                      <br />
                      <div
                        class="circle d-flex align-items-center justify-content-center"
                        id="profile-picture-circle"
                      >
                        <div class="p-image">
                          {product?.backImage ? (
                            <img
                              width={180}
                              height={180}
                              className="avatar-sm-post"
                              src={product?.backImage}
                              alt="User"
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div className="upload-img form-group text-center">
                      <label style={{ color: "#9265cc" }}>
                        Top Image<span className="text-danger">*</span>
                      </label>
                      <br />
                      <div
                        class="circle d-flex align-items-center justify-content-center"
                        id="profile-picture-circle"
                      >
                        <div class="p-image">
                          {product?.topImage ? (
                            <img
                              width={180}
                              height={180}
                              className="avatar-sm-post"
                              src={product?.topImage}
                              alt="User"
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <div className="upload-img form-group text-center">
                      <label style={{ color: "#9265cc" }}>
                        Side Image<span className="text-danger">*</span>
                      </label>
                      <br />
                      <div
                        class="circle d-flex align-items-center justify-content-center"
                        id="profile-picture-circle"
                      >
                        <div class="p-image">
                          {product?.sideImage ? (
                            <img
                              width={180}
                              height={180}
                              className="avatar-sm-post"
                              src={product?.sideImage}
                              alt="User"
                            />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>Company Name</label>
                    <br />
                    <span>
                      {product?.panelId?.companyName
                        ? product?.panelId?.companyName
                        : product?.companyId?.companyName}
                    </span>
                  </div>
                </div>

                <div className="col-md-12 col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>Product Name</label>
                    <br />
                    <span>{product?.productName}</span>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>Selling</label>
                    <br />
                    <span>{product?.selling}</span>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>Original Price</label>
                    <br />
                    <span>{product?.originalPrice}</span>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>GST (%) </label>
                    <br />
                    <span>{product?.gstRate}</span>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>Final Price </label>
                    <br />
                    <span>{product?.finalPrice}</span>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>Discount in %</label>
                    <br />
                    <span>{product?.discountPercentage}</span>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>Discounted Price</label>
                    <br />
                    <span>{product?.discountedPrice}</span>
                  </div>
                </div>

                <div className="col-md-12 col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>Quantity</label>
                    <br />
                    <span>{product?.quantity}</span>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>Category Name </label>
                    <br />
                    <span>{product?.categoryName}</span>
                  </div>
                </div>

                <div className="col-lg-12 col-md-12 ">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      Product Description
                    </label>
                    <br />
                    <span>{product?.productDescription}</span>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 ">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      Product Benefits<span className="text-danger">*</span>
                    </label>
                    <ul>
                      {Array.isArray(product?.benefits) &&
                        product.benefits.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 ">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      Product Specifications
                    </label>
                    {product?.specifications.map((spec, index) => (
                      <div key={index}>
                        <h4>{spec.heading}</h4>
                        <ul>
                          {spec.points.map((point, idx) => (
                            <li key={idx}>{point.trim()}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
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
export default ViewProduct;
