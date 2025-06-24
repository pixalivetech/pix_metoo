import React, { useState, useRef } from "react";
import Mastersidebar from "../../Components/MasterSidebar";
import Masterheader from "../../Components/MasterHeader";
import { Link, useNavigate } from "react-router-dom";
import { uploadFile } from "../../Utils/FileUpload";
import { toast } from "react-toastify";
import { saveCategory } from "../../api/category";
import { getAdminId } from "../../Utils/Storage";

const MasterAddcategory = () => {
  const initialStateInputs = {
    companyId: getAdminId(),
    categoryName: "",
    categoryImage: "",
  };

  const initialStateErrors = {
    categoryName: { required: false },
    categoryImage: { required: false },
  };

  const [category, setCategory] = useState(initialStateInputs);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const fileInputRefImage = useRef(null);

  const handleValidation = (data) => {
    let newErrors = { ...initialStateErrors };
    if (data.categoryName === "") {
      newErrors.categoryName = true;
    }
    if (data.categoryImage === "") {
      newErrors.categoryImage = true;
    }
    return newErrors;
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

  const handleInputs = (event) => {
    setCategory({ ...category, [event.target.name]: event.target.value });
    if (submitted) {
      setErrors({ ...errors, [event.target.name]: false });
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
      saveCategory(category)
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
          <div className="content container-fluid w-75">
            <div className="row">
              <div className="content-page-header">
                <h5 className="text-bold" style={{ color: "#9265cc" }}>
                  Add Category
                </h5>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="col">
                <div className="col-xl-12">
                  <div className="card mt-2 p-2">
                    <div className="card-body">
                      <div className="col-lg-12 col-md-6 col-sm-12">
                        <div className="upload-img form-group text-center mb-3">
                          <label style={{ color: "#9265cc" }}>
                            Catagory Image<span className="text-danger">*</span>
                          </label>
                          <br />
                          {category.categoryImage ? (
                            <div className="preview-container">
                              <img
                                src={category.categoryImage}
                                width="180"
                                height="180"
                                alt="Preview"
                                className="preview-image rounded-circle"
                                name="categoryImage"
                              />
                            </div>
                          ) : (
                            <label
                              htmlFor="fileInputImage"
                              className="file-upload btn p-5 rounded-circle"
                              style={{ backgroundColor: "#9265cc" }}
                            >
                              <i className="fa fa-camera me-2 fa-3x"></i>
                            </label>
                          )}
                          <br />
                          <input
                            ref={fileInputRefImage}
                            className="file-upload"
                            onChange={handleFileInputs}
                            name="categoryImage"
                            id="fileInputImage"
                            type="file"
                            accept="image/*"
                          />
                          {errors.categoryImage?.required ? (
                            <span className="text-danger form-text">
                              This field is required.
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          <label style={{ color: "#9265cc" }}>
                            Category Name<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            onChange={handleInputs}
                            placeholder="Catagory Name"
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
                    <div className="add-customer-btns text-end mb-40 d-flex w-100 justify-content-end">
                      <Link
                        to="/Mastercategorylist"
                        className="btn btn-cancel btn-outline-primary w-48 m-2"
                      >
                        Cancel
                      </Link>
                      <button
                        type="submit"
                        className="btn btn-save btn-outline-primary w-48 m-2"
                      >
                        Submit
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

export default MasterAddcategory;
