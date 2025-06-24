import React, { useState, useRef, useEffect } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/SideBar";
import { Link, useNavigate } from "react-router-dom";
import { getUserId } from "../../Utils/Storage";
import { isValidEmail, isValidPhone } from "../../Utils/Validation";
import { toast } from "react-toastify";
import { uploadFile } from "../../Utils/FileUpload";
import { getProfileDetails, updateProfile } from "../../api/profile";

function Profile() {
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
  const fileInputRefImage = useRef(null);

  useEffect(() => {
    getUsereDetails();
  }, []);

  const getUsereDetails = () => {
    const id = getUserId();
    getProfileDetails(id)
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
    const file = event?.target?.files[0];
    const folder = "Manufacuturer/profileimage";
    if (file) {
      uploadFile(file, folder)
        .then((res) => {
          const profileImage = res?.Location;
          setProfile({ ...profile, profileImage: profileImage });
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
      updateProfile(profile)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/Viewprofile");
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
              <div className="content-page-header">
                <h5 className="text-bold" style={{ color: "#9265cc" }}>
                  Edit Profile
                </h5>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-6 col-sm-12">
                  <div className="upload-img form-group text-center">
                    <label style={{ color: "#9265cc" }}>
                      Company Logo<span className="text-danger">*</span>
                    </label>
                    <br />
                    <label htmlFor="fileInputImage" className="file-upload">
                      <img
                        src={
                          profile?.profileImage
                            ? profile?.profileImage
                            : "https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"
                        }
                        width="180"
                        height="180"
                        alt="Preview"
                        style={{ objectFit: "cover" }}
                        className="preview-image"
                      />
                    </label>
                    <input
                      onChange={handleFileInputs}
                      name="profileImage"
                      id="fileInputImage"
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                    {errors.profileImage.required ? (
                      <span className="text-danger form-text">
                        This field is required.
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      {" "}
                      Name<span className="text-danger">*</span>
                    </label>
                    <input
                      value={profile?.name}
                      onChange={handleInputs}
                      type="text"
                      className="form-control "
                      placeholder="Enter name"
                      name="name"
                    />
                    {errors.name?.required ? (
                      <span className="text-danger form-text">
                        This field is required.
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      E-mail<span className="text-danger">*</span>
                    </label>
                    <input
                      onChange={handleInputs}
                      value={profile?.email}
                      type="text"
                      className="form-control "
                      placeholder="Enter email "
                      name="email"
                    />
                    {errors.email?.required ? (
                      <span className="text-danger form-text">
                        This field is required.
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      {" "}
                      Mobile Number<span className="text-danger">*</span>
                    </label>
                    <input
                      onChange={handleInputs}
                      value={profile?.mobileNumber}
                      type="number"
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
                </div>
                <div className="col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      Company Name<span className="text-danger">*</span>
                    </label>
                    <input
                      onChange={handleInputs}
                      value={profile?.companyName}
                      type="text"
                      className="form-control"
                      placeholder="Enter company"
                      name="companyName"
                    />
                    {errors.companyName?.required ? (
                      <span className="text-danger form-text">
                        This field is required.
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      Company Address<span className="text-danger">*</span>
                    </label>
                    <input
                      onChange={handleInputs}
                      value={profile?.companyAddress}
                      type="text"
                      className="form-control"
                      placeholder="Enter address"
                      name="companyAddress"
                    />
                    {errors.companyAddress?.required ? (
                      <span className="text-danger form-text">
                        This field is required.
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      Type Of Business <span className="text-danger">*</span>
                    </label>
                    <input
                      onChange={handleInputs}
                      value={profile?.typesOfBusiness}
                      type="text"
                      className="form-control"
                      placeholder="Enter type"
                      name="typesOfBusiness"
                    />
                    {errors.typesOfBusiness?.required ? (
                      <span className="text-danger form-text">
                        This field is required.
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      City<span className="text-danger">*</span>
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
                <div className="col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      State <span className="text-danger">*</span>
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
                <div className="add-customer-btns mb-40 d-flex justify-content-end w-50 ml-auto">
                  <Link
                    style={{ backgroundColor: "#9265cc" }}
                    to="/Viewprofile"
                    className="btn btn-cancel border text-white w-50 m-2"
                  >
                    Cancel
                  </Link>
                  <button
                    style={{ backgroundColor: "#9265cc" }}
                    type="submit"
                    className="btn btn-save border text-white w-50 m-2"
                  >
                    Submit
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

export default Profile;
