import React, { useState, useEffect, useRef } from "react";
import Mastersidebar from "../../Components/MasterSidebar";
import Masterheader from "../../Components/MasterHeader";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { uploadFile } from "../../Utils/FileUpload";
import { toast } from "react-toastify";
import { updateCategory, getSingleCategory } from "../../api/category";

const MasterEditcategory = () => {
  const initialStateErrors = {
    categoryImage: { required: false },
    categoryName: { required: false },
  };

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const [category, setCategory] = useState();
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRefImage = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getCategoryDetails();
  }, []);

  const getCategoryDetails = () => {
    getSingleCategory(id)
      .then((res) => {
        setCategory(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleValidation = (data) => {
    let error = { ...initialStateErrors };

    if (data.categoryImage === "") {
      error.categoryImage.required = true;
    }
    if (data.categoryName === "") {
      error.categoryName.required = true;
    }

    return error;
  };

  const handleInputs = (event) => {
    setCategory({ ...category, [event.target.name]: event.target.value });
    if (submitted) {
      const newError = handleValidation({
        ...category,
        [event.target.name]: event.target.value,
      });
      setErrors(newError);
    }
  };

  const handleFileInputs = (event) => {
    const file = event?.target?.files[0];
    const folder = "categoryImage/";
    if (file) {
      uploadFile(file, folder)
        .then((res) => {
          const image = res?.Location;
          setCategory({ ...category, categoryImage: image });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(category);
    setErrors(newError);
    setSubmitted(true);
    const allInputValid = Object.values(newError);
    const valid = allInputValid.some((x) => x.required === true);
    if (!valid) {
      updateCategory(category)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/Mastercategorylist");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  return (
    <div>
      <Mastersidebar />
      <Masterheader />
      <div className="content-wrapper">
        <div className="content-header mt-3">
          <div className="content container-fluid">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="content-page-header col-md-6 mb-3 d-flex align-items-center pl-md-5">
                  <h5 className="text-bold" style={{ color: "#9265cc" }}>
                    Edit Category
                  </h5>
                </div>
                <div className="content-page-header col-md-6 d-flex justify-content-end pr-md-5">
                  <Link to="/Mastercategorylist">
                    <button
                      className="btn btn-outline border text-white p-2"
                      style={{ backgroundColor: "#9265cc" }}
                    >
                      Category List
                    </button>
                  </Link>
                </div>
              </div>
              <div className="col">
                <div className="col-xl-12">
                  <div className="card mt-2 p-2">
                    <div className="card-body">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group text-center mb-3">
                          <label style={{ color: "#9265cc" }}>
                            Category Image
                          </label>
                          <br />
                          <div className="preview-container">
                            <img
                              src={category?.categoryImage}
                              width="200"
                              height="150"
                              alt="Preview"
                              className="preview-image"
                            />
                          </div>
                          <input
                            className="file-upload mt-2"
                            onChange={handleFileInputs}
                            name="categoryImage"
                            id="fileInputImage"
                            type="file"
                            accept="image/*"
                          />
                          {errors.categoryImage.required ? (
                            <span className="text-danger form-text">
                              This field is required.
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          <label style={{ color: "#9265cc" }}>
                            Category Name
                          </label>
                          <br />
                          <input
                            type="text"
                            value={category?.categoryName}
                            onChange={handleInputs}
                            className="form-control"
                            placeholder="Category Name"
                            name="categoryName"
                          />
                          {errors.categoryName?.required ? (
                            <span className="text-danger form-text">
                              This field is required.
                            </span>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    <div className="add-customer-btns text-end mb-40 d-flex justify-content-end">
                      <Link
                        to="/Mastercategorylist"
                        className="btn btn-cancel btn-outline-primary m-2"
                      >
                        Cancel
                      </Link>
                      <button
                        type="submit"
                        className="btn btn-save btn-outline-primary m-2"
                      >
                        Update
                      </button>
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
};

export default MasterEditcategory;
