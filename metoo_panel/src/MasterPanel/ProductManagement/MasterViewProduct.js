import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Masterheader from "../../Components/MasterHeader";
import Mastersidebar from "../../Components/MasterSidebar";
import { getSingleMasterProduct } from "../../api/masterproduct";

function MasterViewProduct() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [product, setProduct] = useState();

  useEffect(() => {
    getProductDetails();
  }, []);

  const getProductDetails = () => {
    getSingleMasterProduct(id)
      .then((res) => {
        setProduct(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Mastersidebar />
      <Masterheader />

      <div className="content-wrapper">
        <div className="content-header mt-3">
          <div className="content container-fluid w-75">
            <form>
              <div className="row d-flex justify-content-between">
                <div className="content-page-header">
                  <h5 className="text-primary text-bold">View Product</h5>
                </div>
                <div className="content-page-header">
                  <Link to="/Masterproductlist">
                    <button
                      className="btn btn-outline border text-white rounded-pill p-2"
                      style={{ backgroundColor: "#9265cc" }}
                    >
                      List Product
                    </button>
                  </Link>
                </div>
              </div>
              <div className="container mt-3">
                <div className="card-body ">
                  <div className="d-flex flex-wrap">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="upload-img form-group text-center">
                        <label style={{ color: "#9265cc" }}>
                          Product Image
                        </label>
                        <div
                          className="circle d-flex align-items-center justify-content-center"
                          id="profile-picture-circle"
                        >
                          <div className="p-image">
                            {product?.productImage ? (
                              <img
                                className="avatar-sm-post img-fluid"
                                src={product?.productImage}
                                alt="User"
                                width={200}
                                height={200}
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <div className="upload-img form-group text-center">
                        <label style={{ color: "#9265cc" }}>Product GIF</label>
                        <div
                          className="circle d-flex align-items-center justify-content-center"
                          id="profile-picture-circle"
                        >
                          <div className="p-image">
                            {product?.productGif ? (
                              <img
                                className="avatar-sm-post img-fluid"
                                src={product?.productGif}
                                alt="User"
                                width={200}
                                height={200}
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row container-fluid">
                    <div className="col-lg-3 col-md-4 col-sm-6">
                      <div className="upload-img form-group text-center">
                        <label style={{ color: "#9265cc" }}>
                          Front Image <span className="text-danger">*</span>
                        </label>
                        <br />
                        <div
                          className="circle d-flex align-items-center justify-content-center"
                          id="profile-picture-circle"
                        >
                          <div className="p-image">
                            {product?.frontImage ? (
                              <img
                                className="img-fluid"
                                src={product?.frontImage}
                                alt="Front Image"
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                      <div className="upload-img form-group text-center">
                        <label style={{ color: "#9265cc" }}>
                          Back Image<span className="text-danger">*</span>
                        </label>
                        <br />
                        <div
                          className="circle d-flex align-items-center justify-content-center"
                          id="profile-picture-circle"
                        >
                          <div className="p-image">
                            {product?.backImage ? (
                              <img
                                className="img-fluid"
                                src={product?.backImage}
                                alt="Back Image"
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                      <div className="upload-img form-group text-center">
                        <label style={{ color: "#9265cc" }}>
                          Top Image<span className="text-danger">*</span>
                        </label>
                        <br />
                        <div
                          className="circle d-flex align-items-center justify-content-center"
                          id="profile-picture-circle"
                        >
                          <div className="p-image">
                            {product?.topImage ? (
                              <img
                                className="img-fluid"
                                src={product?.topImage}
                                alt="Top Image"
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                      <div className="upload-img form-group text-center">
                        <label style={{ color: "#9265cc" }}>
                          Side Image<span className="text-danger">*</span>
                        </label>
                        <br />
                        <div
                          className="circle d-flex align-items-center justify-content-center"
                          id="profile-picture-circle"
                        >
                          <div className="p-image">
                            {product?.sideImage ? (
                              <img
                                className="img-fluid"
                                src={product?.sideImage}
                                alt="Side Image"
                              />
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                      <div className="form-group">
                        <h5 style={{ color: "#9265cc" }}>Selling</h5>
                        <div>{product?.selling}</div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                      <div className="form-group">
                        <h5 style={{ color: "#9265cc" }}>Original Price</h5>
                        <div>{product?.originalPrice}</div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                      <div className="form-group">
                        <h5 style={{ color: "#9265cc" }}>GST (%)</h5>
                        <div>{product?.gstRate}</div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                      <div className="form-group">
                        <h5 style={{ color: "#9265cc" }}>Final Price</h5>
                        <div>{product?.finalPrice}</div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                      <div className="form-group">
                        <h5 style={{ color: "#9265cc" }}>Discount (%)</h5>
                        <div>{product?.discountPercentage}</div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                      <div className="form-group">
                        <h5 style={{ color: "#9265cc" }}>Discounted Price</h5>
                        <div>{product?.discountedPrice}</div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                      <div className="form-group">
                        <h5 style={{ color: "#9265cc" }}>Quantity</h5>
                        <div>{product?.quantity}</div>
                      </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 mb-3">
                      <div className="form-group">
                        <h5 style={{ color: "#9265cc" }}>Category Name</h5>
                        <div>{product?.categoryName}</div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-8 col-md-6 col-sm-12">
                      <div className="form-group">
                        <h5 style={{ color: "#9265cc" }}>Company Name</h5>
                        <div>
                          {product?.panelId?.companyName ||
                            product?.companyId?.companyName}
                        </div>
                      </div>
                      <div className="form-group">
                        <h5 style={{ color: "#9265cc" }}>Product Name</h5>
                        <div>{product?.productName}</div>
                      </div>
                      <div className="form-group">
                        <h5 style={{ color: "#9265cc" }}>
                          Product Description
                        </h5>
                        <div>{product?.productDescription}</div>
                      </div>
                      <div className="form-group">
                        <h5 style={{ color: "#9265cc" }}>Product Benefits</h5>
                        <ul>
                          {Array.isArray(product?.benefits) &&
                            product.benefits.map((benefit, index) => (
                              <li key={index}>{benefit}</li>
                            ))}
                        </ul>
                      </div>
                      <div className="form-group">
                        <h5 style={{ color: "#9265cc" }}>
                          Product Specifications
                        </h5>
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
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MasterViewProduct;
