import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/SideBar";
import { useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { updateProduct, getSingleProduct } from "../../api/product";
import { toast } from "react-toastify";
import { uploadFile } from "../../Utils/FileUpload";
import { getAllcategoryList } from "../../api/category";

function EditProduct() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  let initialStateErrors = {
    productImage: { required: false },
    productGif: { required: false },
    topImage: { required: false },
    sideImage: { required: false },
    frontImage: { required: false },
    backImage: { required: false },
    productName: { required: false },
    originalPrice: { required: false },
    gstRate: { required: false },
    discountPercentage: { required: false },
    quantity: { required: false },
    categoryName: { required: false },
    selling: { required: false },
  };

  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [benefitCount, setBenefitCount] = useState(0);
  const [wordLimitExceeded, setWordLimitExceeded] = useState(false);
  const [benefitLimitExceeded, setBenefitLimitExceeded] = useState(false);
  const [category, setCategory] = useState();
  const [specifications, setSpecifications] = useState([]);
  const navigate = useNavigate();
  const fileInputRefImage = useRef(null);
  const fileInputRefGif = useRef(null);
  const fileInputRefTop = useRef(null);
  const fileInputRefSide = useRef(null);
  const fileInputRefFront = useRef(null);
  const fileInputRefBack = useRef(null);
  useEffect(() => {
    getProductDetails();
    getAllCategoryName();
  }, []);

  const getProductDetails = () => {
    getSingleProduct(id)
      .then((res) => {
        setInputs(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllCategoryName = () => {
    getAllcategoryList(id)
      .then((res) => {
        setCategory(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFileInputs = (event) => {
    const file = event?.target?.files[0];
    const folder = "ProductImage/Mainimage";
    if (file) {
      uploadFile(file, folder)
        .then((res) => {
          const productImage = res?.Location;
          setInputs({ ...inputs, productImage: productImage });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleFileInputstop = (event) => {
    const file = event?.target?.files[0];
    const folder = "ProductImage/Topimage";
    if (file) {
      uploadFile(file, folder)
        .then((res) => {
          const topImage = res?.Location;
          setInputs({ ...inputs, topImage: topImage });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleFileInputsside = (event) => {
    const file = event?.target?.files[0];
    const folder = "ProductImage/Sideimage";
    if (file) {
      uploadFile(file, folder)
        .then((res) => {
          const sideImage = res?.Location;
          setInputs({ ...inputs, sideImage: sideImage });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleFileInputsfront = (event) => {
    const file = event?.target?.files[0];
    const folder = "ProductImage/Frontimage";
    if (file) {
      uploadFile(file, folder)
        .then((res) => {
          const frontImage = res?.Location;
          setInputs({ ...inputs, frontImage: frontImage });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleFileInputsback = (event) => {
    const file = event?.target?.files[0];
    const folder = "ProductImage/Backimage";
    if (file) {
      uploadFile(file, folder)
        .then((res) => {
          const backImage = res?.Location;
          setInputs({ ...inputs, backImage: backImage });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleFileInputsGif = (event) => {
    const file = event?.target?.files[0];
    const folder = "ProductGif/";
    if (file) {
      uploadFile(file, folder)
        .then((res) => {
          const productGif = res?.Location;
          setInputs({ ...inputs, productGif: productGif });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleInputs = (event) => {
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: value });

    if (name === "quantity") {
      let intValue = parseInt(value, 10);
      if (
        isNaN(intValue) ||
        intValue < 0 ||
        value.toString() !== intValue.toString()
      ) {
        intValue = 0;
        event.target.value = intValue;
      }
      setInputs({ ...inputs, [name]: intValue });
      return;
    }
    if (name === "benefits") {
      const pointsArray = value.split("\n");
      setInputs({ ...inputs, [name]: pointsArray });
    }
    if (name === "specifications") {
      const specsArray = value.split("\n");
      const newSpecifications = specsArray.map((spec) => {
        const [heading, pointsStr] = spec.split(":");
        const points = pointsStr
          ? pointsStr.split(",").map((point) => point.trim())
          : [];
        return {
          heading: heading.trim(),
          points,
        };
      });
      setSpecifications(newSpecifications);
      setInputs({ ...inputs, [name]: newSpecifications });
    }
  };

  const handleWordCount = (event) => {
    const bioText = event.target.value;
    const words = bioText.trim().split(/\s+/);
    const wordCount = words.length;

    setWordCount(wordCount);

    if (wordCount > 100) {
      const truncatedBio = words.slice(0, 100).join(" ");
      event.target.value = truncatedBio;
      setInputs({ ...inputs, productDescription: truncatedBio });
      setWordLimitExceeded(true);
    } else {
      setInputs({ ...inputs, productDescription: bioText });
      setWordLimitExceeded(false);
    }

    if (submitted) {
      const newError = handleValidation({
        ...inputs,
        productDescription: bioText,
      });
      setErrors(newError);
    }
  };

  const handleBenefitCount = (event) => {
    const bioText = event.target.value;
    const benefit = bioText.trim().split(/\s+/);
    const benefitCount = benefit.length;
    setBenefitCount(benefitCount);
    if (benefitCount > 200) {
      const truncatedBio = benefit.slice(0, 200).join(" ");
      event.target.value = truncatedBio;
      setInputs({ ...inputs, benefit: truncatedBio });
      setBenefitLimitExceeded(true);
    } else {
      setInputs({ ...inputs, benefit: bioText });
      setBenefitLimitExceeded(false);
    }
    if (submitted) {
      const newError = handleValidation({ ...inputs, benefit: bioText });
      setErrors(newError);
    }
  };

  const handleValidation = (data) => {
    let newErrors = { ...initialStateErrors };

    if (data.productImage === "") {
      newErrors.productImage = true;
    }
    if (data.productGif === "") {
      newErrors.productGif = true;
    }
    if (data.topImage === "") {
      newErrors.topImage = true;
    }
    if (data.sideImage === "") {
      newErrors.sideImage = true;
    }
    if (data.frontImage === "") {
      newErrors.frontImage = true;
    }
    if (data.backImage === "") {
      newErrors.backImage = true;
    }
    if (data.productName === "") {
      newErrors.productName = true;
    }
    if (data.originalPrice === "") {
      newErrors.originalPrice = true;
    }
    if (data.gstRate === "") {
      newErrors.gstRate = true;
    }
    if (data.discountPercentage === "") {
      newErrors.discountPercentage = true;
    }
    if (data.quantity === "") {
      newErrors.quantity = true;
    }
    if (data.selling === "") {
      newErrors.selling = true;
    }
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
    const allInputsValid = Object.values(newError);
    const valid = allInputsValid.some((x) => x.required === true);
    if (!valid) {
      updateProduct(inputs)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/ListProducts");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  return (
    <div>
      <Sidebar />
      <Header />
      <div className="content-wrapper">
        <div className="content-header mt-3">
          <div className="content container-fluid w-75">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="content-page-header">
                  <h5 className="text-bold" style={{ color: "#9265cc" }}>
                    Edit Product
                  </h5>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 col-lg-6">
                  <div class="upload-img form-group text-center">
                    <label style={{ color: "#9265cc" }}>
                      Product Image<span className="text-danger">*</span>
                    </label>
                    <br />
                    <label htmlFor="fileInput" className="file-upload">
                      <img
                        src={
                          inputs.productImage
                            ? inputs?.productImage
                            : "https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"
                        }
                        width="200"
                        height="150"
                        alt="Preview"
                        style={{ objectFit: "cover" }}
                        className="preview-image"
                      />
                    </label>
                    <input
                      ref={fileInputRefImage}
                      onChange={handleFileInputs}
                      name="productImage"
                      id="fileInput"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    {errors.productImage.required ? (
                      <span className="text-danger form-text">
                        This field is required.
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div class="upload-gif form-group text-center">
                    <label style={{ color: "#9265cc" }}>
                      Product GIF<span className="text-danger">*</span>
                    </label>
                    <br />
                    <label htmlFor="fileInputGif" className="file-upload">
                      <img
                        src={
                          inputs.productGif
                            ? inputs?.productGif
                            : "https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"
                        }
                        width="200"
                        height="150"
                        alt="Preview"
                        style={{ objectFit: "cover" }}
                        className="preview-image"
                      />
                    </label>
                    <input
                      ref={fileInputRefGif}
                      onChange={handleFileInputsGif}
                      name="productGif"
                      id="fileInputGif"
                      type="file"
                      accept="gif/image"
                      style={{ display: "none" }}
                    />
                    {errors.productGif.required ? (
                      <span className="text-danger form-text">
                        This field is required.
                      </span>
                    ) : null}
                  </div>
                </div>
                <div class="col-md-12 col-lg-6">
                  <div className="upload-img form-group text-center">
                    <label style={{ color: "#9265cc" }}>
                      Front Image <span className="text-danger">*</span>
                    </label>
                    <br />
                    <label
                      htmlFor="fileInputfrontImage"
                      className="file-upload"
                    >
                      <img
                        src={
                          inputs.frontImage
                            ? inputs?.frontImage
                            : "https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"
                        }
                        width="200"
                        height="150"
                        alt="Preview"
                        style={{ objectFit: "cover" }}
                        className="preview-image"
                      />
                    </label>
                    <input
                      ref={fileInputRefFront}
                      onChange={handleFileInputsfront}
                      name="frontImage"
                      id="fileInputfrontImage"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    {errors.frontImage?.required ? (
                      <span className="text-danger form-text">
                        This field is required.
                      </span>
                    ) : null}
                  </div>
                </div>
                <div class="col-md-12 col-lg-6">
                  <div className="upload-img form-group text-center">
                    <label style={{ color: "#9265cc" }}>
                      Back Image<span className="text-danger">*</span>
                    </label>
                    <br />
                    <label htmlFor="fileInputbackImage" className="file-upload">
                      <img
                        src={
                          inputs.backImage
                            ? inputs?.backImage
                            : "https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"
                        }
                        width="200"
                        height="150"
                        alt="Preview"
                        style={{ objectFit: "cover" }}
                        className="preview-image"
                      />
                    </label>
                    <input
                      ref={fileInputRefBack}
                      onChange={handleFileInputsback}
                      name="backImage"
                      id="fileInputbackImage"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    {errors.backImage?.required ? (
                      <span className="text-danger form-text">
                        This field is required.
                      </span>
                    ) : null}
                  </div>
                </div>
                <div class="col-md-12 col-lg-6">
                  <div className="upload-img form-group text-center">
                    <label style={{ color: "#9265cc" }}>
                      Top Image<span className="text-danger">*</span>
                    </label>
                    <br />
                    <label htmlFor="fileInputtopImage" className="file-upload">
                      <img
                        src={
                          inputs.topImage
                            ? inputs?.topImage
                            : "https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"
                        }
                        width="200"
                        height="150"
                        alt="Preview"
                        style={{ objectFit: "cover" }}
                        className="preview-image"
                      />
                    </label>
                    <input
                      ref={fileInputRefTop}
                      onChange={handleFileInputstop}
                      name="topImage"
                      id="fileInputtopImage"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    {errors.topImage?.required ? (
                      <span className="text-danger form-text">
                        This field is required.
                      </span>
                    ) : null}
                  </div>
                </div>
                <div class="col-md-12 col-lg-6">
                  <div className="upload-img form-group text-center">
                    <label style={{ color: "#9265cc" }}>
                      Side Image<span className="text-danger">*</span>
                    </label>
                    <br />
                    <label htmlFor="fileInputsideImage" className="file-upload">
                      <img
                        src={
                          inputs.sideImage
                            ? inputs?.sideImage
                            : "https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"
                        }
                        width="200"
                        height="150"
                        alt="Preview"
                        style={{ objectFit: "cover" }}
                        className="preview-image"
                      />
                    </label>
                    <input
                      ref={fileInputRefSide}
                      onChange={handleFileInputsside}
                      name="sideImage"
                      id="fileInputsideImage"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    {errors.sideImage?.required ? (
                      <span className="text-danger form-text">
                        This field is required.
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      Product Name<span className="text-danger">*</span>
                    </label>
                    <input
                      value={inputs?.productName}
                      onChange={handleInputs}
                      type="text"
                      className="form-control"
                      placeholder="Product Name"
                      name="productName"
                    />
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      Original Price<span className="text-danger">*</span>
                    </label>
                    <input
                      value={inputs?.originalPrice}
                      onChange={handleInputs}
                      type="number"
                      className="form-control"
                      placeholder="Enter Amount"
                      name="originalPrice"
                    />
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      GST (%)<span className="text-danger">*</span>
                    </label>
                    <input
                      value={inputs?.gstRate}
                      onChange={handleInputs}
                      type="number"
                      className="form-control"
                      placeholder="Enter Gst"
                      name="gstRate"
                    />
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      Discount (%)<span className="text-danger">*</span>
                    </label>
                    <input
                      value={inputs?.discountPercentage}
                      onChange={handleInputs}
                      type="number"
                      className="form-control"
                      placeholder="Enter Discount"
                      name="discountPercentage"
                    />
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      Quantity<span className="text-danger">*</span>
                    </label>
                    <input
                      value={inputs?.quantity}
                      onChange={handleInputs}
                      type="number"
                      className="form-control"
                      placeholder="Enter Quantity"
                      name="quantity"
                    />
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      Selling<span className="text-danger">*</span>
                    </label>
                    <br />
                    <select
                      style={{ width: "200px", height: "35px" }}
                      value={inputs?.selling}
                      onChange={handleInputs}
                      className="form-select"
                      name="selling"
                    >
                      <option value={"normal"}>Normal</option>
                      <option value={"hot"}>Hot</option>
                    </select>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      Category<span className="text-danger">*</span>
                    </label>
                    <br />
                    {category && category.length > 0 ? (
                      <select
                        style={{ width: "200px", height: "35px" }}
                        onChange={handleInputs}
                        value={inputs?.categoryName}
                        className="form-select"
                        name="categoryName"
                      >
                        <option value="" disabled hidden>
                          Select a Category
                        </option>
                        {category.map((data, index) => (
                          <option key={index} value={data.categoryName}>
                            {data.categoryName}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <select
                        style={{ width: "200px", height: "35px" }}
                        className="form-select"
                        disabled
                      >
                        <option value="">No Categories</option>
                      </select>
                    )}
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      Product Description<span className="text-danger">*</span>
                    </label>
                    <textarea
                      style={{ height: "150px" }}
                      value={inputs?.productDescription}
                      onChange={handleInputs}
                      onInput={handleWordCount}
                      type="text"
                      className="form-control"
                      placeholder="Product Description"
                      name="productDescription"
                    />
                    <div className="text-muted mt-2">{wordCount}/100 Words</div>
                    {wordLimitExceeded && (
                      <div className="text-danger form-text">
                        Maximum word limit (100 words) reached.
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      Product Benefits<span className="text-danger">*</span>
                    </label>
                    <textarea
                      style={{ height: "150px" }}
                      value={
                        Array.isArray(inputs?.benefits)
                          ? inputs?.benefits.join("\n")
                          : inputs?.benefits
                      }
                      onInput={handleBenefitCount}
                      onChange={handleInputs}
                      type="text"
                      className="form-control"
                      placeholder="Enter product benefits"
                      name="benefits"
                    />
                    <div className="text-muted mt-2">
                      {benefitCount}/200 Words
                    </div>
                    {benefitLimitExceeded && (
                      <div className="text-danger form-text">
                        Maximum word limit (200 words) reached.
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      Product Benefits<span className="text-danger">*</span>
                    </label>
                    <ul>
                      {Array.isArray(inputs.benefits) &&
                        inputs.benefits.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                    </ul>
                  </div>
                </div>
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      Product Specifications (Heading : Point1, Point2, ...)
                      <span className="text-danger">*</span>
                    </label>
                    <textarea
                      className="form-control"
                      onChange={handleInputs}
                      style={{ height: "150px" }}
                      value={inputs?.specifications
                        ?.map(
                          (spec) => `${spec.heading}: ${spec.points.join(", ")}`
                        )
                        .join("\n")}
                      placeholder="Enter Specifications (Heading: Point1, Point2, ...)"
                      rows={4}
                      name="specifications"
                    />
                  </div>
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      Product Specifications
                    </label>
                    {specifications.map((spec, index) => (
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
                <div className="add-customer-btns text-end mb-40 d-flex w-50 float-right">
                  <Link
                    style={{ backgroundColor: "#9265cc" }}
                    to="/Listproducts"
                    className="btn btn-cancel text-white w-50 m-2 p-2"
                  >
                    Cancel
                  </Link>
                  <button
                    style={{ backgroundColor: "#9265cc" }}
                    type="submit"
                    className="btn btn-save text-white w-50 m-2 p-2"
                  >
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
export default EditProduct;
