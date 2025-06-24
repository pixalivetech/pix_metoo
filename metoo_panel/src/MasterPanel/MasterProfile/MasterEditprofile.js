import React, { useEffect, useState } from "react";
import Masterheader from "../../Components/MasterHeader";
import Mastersidebar from "../../Components/MasterSidebar";
import { Link, useNavigate } from "react-router-dom";
import { getAdminId } from "../../Utils/Storage";
import { getMasterDetails, updateMaster } from "../../api/masterprofile";
import { isValidEmail, isValidPhone } from "../../Utils/Validation";
import { uploadFile } from "../../Utils/FileUpload";
import { toast } from "react-toastify";

const MasterEditprofile = () => {
  const initialState = {
    profileImage: "",
    name: "",
    email: "",
    mobileNumber: "",
    companyName: "",
    companyAddress: "",
    typesOfBusiness: "",
    city: "",
    state: "",
  };

  const initialStateErrors = {
    profileImage: { required: false },
    name: { required: false },
    email: { required: false },
    mobileNumber: { required: false },
    companyName: { required: false },
    companyAddress: { required: false },
    typesOfBusiness: { required: false },
    city: { required: false },
    state: { required: false },
  };

  const [profile, setProfile] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState(initialStateErrors);
  const navigate = useNavigate();

  useEffect(() => {
    getMasterDetail();
  }, []);

  const getMasterDetail = () => {
    const id = getAdminId();
    getMasterDetails(id)
      .then((res) => {
        setProfile(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputs = (event) => {
    setProfile({ ...profile, [event.target.name]: event.target.value });
    if (submitted) {
      const newError = handleValidation({
        ...profile,
        [event.target.name]: event.target.value,
      });
      setErrors(newError);
    }
  };

  const handleValidation = (data) => {
    let error = initialStateErrors;
    if (data.name === "") {
      error.name.required = true;
    }
    if (data.email === "") {
      error.email.required = true;
    }
    if (data.companyName === "") {
      error.companyName.required = true;
    }
    if (data.profileImage === "") {
      error.profileImage.required = true;
    }
    if (data.mobileNumber === "") {
      error.mobileNumber.required = true;
    }
    if (data.companyAddress === "") {
      error.companyAddress.required = true;
    }
    if (data.typesOfBusiness === "") {
      error.typesOfBusiness.required = true;
    }
    if (data.city === "") {
      error.city.required = true;
    }
    if (data.state === "") {
      error.state.required = true;
    }
    if (!isValidEmail(data.email)) {
      error.email.valid = true;
    }
    if (!isValidPhone(data.mobileNumber)) {
      error.mobileNumber.valid = true;
    }
    return error;
  };

  const handleErrors = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const prop = obj[key];
        if (prop.required === true) {
          return false;
        }
      }
    }
    return true;
  };

  const handleFileInputs = (event) => {
    const profileImage = event.target.files[0];
    setProfile(URL.createObjectURL(profileImage));
    const file = event?.target?.files[0];
    const folder = "sexify/profileimage";
    if (file) {
      uploadFile(file, folder)
        .then((res) => {
          event.target.value = null;
          const profileImage = res?.Location;
          setProfile({ ...profile, profileImage });
          if (submitted) {
            const newError = handleValidation({ ...profile, profileImage });
            setErrors(newError);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(profile);
    setErrors(newError);
    setSubmitted(true);
    if (handleErrors(newError)) {
      updateMaster(profile)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/Masterviewprofile");
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
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="content-page-header">
                  <h5 className="text-bold" style={{ color: "#9265cc" }}>
                    Edit Profile
                  </h5>
                </div>
              </div>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-xl-8 col-lg-10 col-md-12">
                    <div className="card mt-2 p-2">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-12">
                            <div className="upload-img form-group text-center">
                              <label style={{ color: "#9265cc" }}>
                                Company Logo
                                <span className="text-danger">*</span>
                              </label>
                              <br />
                              {profile.profileImage ? (
                                <div className="preview-container">
                                  <img
                                    src={profile.profileImage}
                                    width="180"
                                    height="180"
                                    alt="Preview"
                                    className="preview-image rounded-circle"
                                  />
                                </div>
                              ) : (
                                <label
                                  htmlFor="fileInputImage"
                                  className="file-upload btn p-5"
                                  style={{ backgroundColor: "#9265cc" }}
                                >
                                  <i className="fa fa-camera me-2 fa-3x"></i>
                                </label>
                              )}
                              <input
                                className="file-upload"
                                onChange={handleFileInputs}
                                name="profileImage"
                                id="fileInputImage"
                                type="file"
                                accept="image/*"
                              />
                              {errors.profileImage?.required ? (
                                <span className="text-danger form-text">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>
                                Name<span className="text-danger">*</span>
                              </label>
                              <input
                                value={profile?.name}
                                onChange={handleInputs}
                                type="text"
                                className="form-control"
                                placeholder="Enter Name"
                                name="name"
                              />
                              {errors.name?.required ? (
                                <span className="text-danger form-text">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>

                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>
                                Mobile Number
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                onChange={handleInputs}
                                value={profile?.mobileNumber}
                                type="text"
                                className="form-control"
                                placeholder="Enter number"
                                name="mobileNumber"
                              />
                              {errors.mobileNumber?.required ? (
                                <span className="text-danger form-text">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>

                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>
                                company Address
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                onChange={handleInputs}
                                value={profile?.companyAddress}
                                type="text"
                                className="form-control"
                                placeholder="Enter companyAddress"
                                name="companyAddress"
                              />
                              {errors.companyAddress?.required ? (
                                <span className="text-danger form-text">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>

                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>
                                city<span className="text-danger">*</span>
                              </label>
                              <input
                                onChange={handleInputs}
                                value={profile?.city}
                                type="text"
                                className="form-control"
                                placeholder="Enter city"
                                name="city"
                              />
                              {errors.city?.required ? (
                                <span className="text-danger form-text">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>
                          </div>

                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>
                                Email<span className="text-danger">*</span>
                              </label>
                              <input
                                onChange={handleInputs}
                                value={profile?.email}
                                type="text"
                                className="form-control"
                                placeholder="Enter Email"
                                name="email"
                              />
                              {errors.email?.required ? (
                                <span className="text-danger form-text">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>

                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>
                                Company Name
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                onChange={handleInputs}
                                value={profile?.companyName}
                                type="text"
                                className="form-control"
                                placeholder="Enter"
                                name="companyName"
                              />
                              {errors.companyName?.required ? (
                                <span className="text-danger form-text">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>

                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>
                                type Of Business
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                onChange={handleInputs}
                                value={profile?.typesOfBusiness}
                                type="text"
                                className="form-control"
                                placeholder="Enter typesOfBusiness"
                                name="typesOfBusiness"
                              />
                              {errors.typesOfBusiness?.required ? (
                                <span className="text-danger form-text">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>

                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>
                                state<span className="text-danger">*</span>
                              </label>
                              <input
                                onChange={handleInputs}
                                value={profile?.state}
                                type="text"
                                className="form-control"
                                placeholder="Enter state"
                                name="state"
                              />
                              {errors.state?.required ? (
                                <span className="text-danger form-text">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-12 d-flex justify-content-end">
                            <div className="d-flex flex-column flex-sm-row w-75">
                              <Link
                                to="/MasterViewprofile"
                                className="btn btn-cancel btn-outline-primary mb-2 mb-sm-0 w-50 w-sm-auto mx-2"
                              >
                                Cancel
                              </Link>
                              <button
                                type="submit"
                                className="btn btn-save btn-outline-primary w-50 w-sm-auto mx-2"
                              >
                                Update
                              </button>
                            </div>
                          </div>
                        </div>
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
};

export default MasterEditprofile;
