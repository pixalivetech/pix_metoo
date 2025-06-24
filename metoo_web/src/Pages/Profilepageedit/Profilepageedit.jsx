import React, { useRef, useState, useEffect } from "react";
import "./Profilepageedit.css";
import { useNavigate } from "react-router-dom";
import { getUserId } from "../../Utils/Storage";
import { getProfileDetails, updateUser } from "../../Api/user";
import { toast } from "react-toastify";
import { isValidEmail, isValidPhone } from "../../Utils/Validation";
import { uploadFile } from "../../Utils/FileUpload";
import Header from "../../Components/Header/Header";

const Profilepageedit = () => {
  const initialState = {
    name: "",
    gender: "",
    mobileNumber: "",
    email: "",
    profileImage: "",
  };

  const initialStateErrors = {
    name: { required: false },
    gender: { required: false, valid: false },
    email: { required: false, valid: false },
    mobileNumber: { required: false, valid: false },
    profileImage: { required: false },
  };

  const [user, setUser] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState(initialStateErrors);
  const navigate = useNavigate();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    const id = getUserId();
    getProfileDetails(id)
      .then((res) => {
        setUser(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputs = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
    if (submitted) {
      const newError = handleValidation({
        ...user,
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
    if (data.gender === "") {
      error.gender.required = true;
    }
    if (data.profileImage === "") {
      error.profileImage.required = true;
    }
    if (data.mobileNumber === "") {
      error.mobileNumber.required = true;
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
    const folder = "sexify/profileimage";
    if (file) {
      uploadFile(file, folder)
        .then((res) => {
          event.target.value = null;
          const profileImage = res?.Location;
          setUser({ ...user, profileImage });
          if (submitted) {
            const newError = handleValidation({ ...user, profileImage });
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
    const newError = handleValidation(user);
    setErrors(newError);
    setSubmitted(true);
    if (handleErrors(newError)) {
      updateUser(user)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/ProfilePage");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  return (
    <div>
      <Header />
      <section className="vh-75" style={{ backgroundcolor: "#f4f5f7" }}>
        <div className="container  py-5 mt-3 w-75 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-lg-12 mb-4 mb-lg-0">
              <div className="card mb-3" style={{ borderradius: ".5rem" }}>
                <form onSubmit={handleSubmit}>
                  <div className="row g-0">
                    <div className="col-md-3 gradient-custom text-center text-white">
                      <div className="mt-5">
                        <label className="mt-5">
                          <img
                            width={60}
                            height={60}
                            className="rounded-circle"
                            src={
                              user?.profileImage ??
                              "https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"
                            }
                            alt="Profile"
                          />
                          <input
                            type="file"
                            name="profileImage"
                            style={{ display: "none" }}
                            onChange={handleFileInputs}
                            id="edit_img"
                            accept="image/*"
                          />
                        </label>
                        {errors.profileImage.required ? (
                          <span className="form-text text-danger text-center">
                            This field is required.
                          </span>
                        ) : null}
                      </div>

                      <h5 className="text-center mt-4">
                        {user?.name ? user?.name : "-"}
                      </h5>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body  p-4">
                        <h6 className="fs-3">User Profile</h6>
                        <hr className="mt-0 mb-4" />

                        <div className="row pt-1">
                          <div className="col col-sm-12 mb-3">
                            <h6>User Name</h6>
                            <input
                              type="text"
                              onChange={handleInputs}
                              value={user?.name}
                              className="form-control"
                              placeholder="Enter your Name"
                              name="name"
                            />
                            {errors.name.required ? (
                              <span className="form-text text-danger">
                                This field is required.
                              </span>
                            ) : null}
                          </div>
                        </div>

                        <div className="row pt-1">
                          <div className="col col-sm-12 mb-3">
                            <h6>E-mail</h6>
                            <input
                              onChange={handleInputs}
                              value={user?.email}
                              type="text"
                              className="form-control"
                              placeholder="Enter your Mail-ID"
                              name="email"
                            />
                            {errors.email.required ? (
                              <span className="text-danger form-text">
                                This field is required.
                              </span>
                            ) : errors.email.valid ? (
                              <span className="text-danger form-text">
                                Enter a valid Email.
                              </span>
                            ) : null}
                          </div>
                        </div>

                        <div className="row pt-1">
                          <div className="col col-sm-12 mb-3">
                            <h6>Mobile Number</h6>
                            <input
                              onChange={handleInputs}
                              value={user?.mobileNumber}
                              type="text"
                              className="form-control"
                              placeholder="Enter your Mobile Number"
                              name="mobileNumber"
                              maxLength="10"
                            />
                            {errors.mobileNumber.required ? (
                              <span className="form-text text-danger">
                                This field is required.
                              </span>
                            ) : errors.mobileNumber.valid ? (
                              <span className="form-text text-danger">
                                Enter a valid mobile number.
                              </span>
                            ) : null}
                          </div>
                        </div>

                        <div className="row pt-1">
                          <div className="col col-6 mb-3 button_changes_vj">
                            <a
                              href="/Profilepage"
                              className="btn_text_change_clr"
                            >
                              <button
                                type="submit"
                                class="btn gradient-custom fw-bold text-white"
                              >
                                Save Address
                              </button>
                            </a>
                          </div>
                        </div>

                        <hr className="mt-0 mb-4" />
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profilepageedit;
