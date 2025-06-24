import React, { useRef, useState } from "react";
import Header from "../../Components/Header/Header";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getsingleuser, updateUser } from "../../Api/user";
import { getUserId } from "../../Utils/Storage";
import { isValidPhone } from "../../Utils/Validation";

const ProfileAddressEdit = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const inputRef = useRef(null);

  const handleImageClick = () => {
    inputRef.current.click();
  };

  const handleImageChange = (e) => {
    const newImage = e.target.files[0];
    setUploadedImage(newImage);
  };

  useEffect(() => {
    getUserDetails();
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

  const initialStateInputs = {
    fullName: "",
    alternativeMobileNumber: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    landmark: "",
  };

  const initialStateErrors = {
    fullName: { required: false },
    alternativeMobileNumber: { required: false },
    address: { required: false },
    city: { required: false },
    state: { required: false },
    pincode: { required: false },
    landmark: { required: false },
  };

  const [user, setUser] = useState(initialStateInputs);
  const [errors, setErrors] = useState(initialStateErrors);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

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
    if (data.fullName === "") {
      error.fullName.required = true;
    }
    if (data.alternativeMobileNumber === "") {
      error.alternativeMobileNumber.required = true;
    }
    if (data.address === "") {
      error.address.required = true;
    }
    if (data.city === "") {
      error.city.required = true;
    }
    if (data.state === "") {
      error.state.required = true;
    }
    if (data.pincode === "") {
      error.pincode.required = true;
    }
    if (data.landmark === "") {
      error.landmark.required = true;
    }
    if (!isValidPhone(data.alternativeMobileNumber)) {
      error.alternativeMobileNumber.valid = true;
    }
    return error;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(user);
    setErrors(newError);
    setSubmitted(true);
    const allInputsValid = Object.values(newError);
    const valid = allInputsValid.some((x) => x.required === true);

    if (!valid) {
      updateUser(user)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/ProfileAddress");
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
        <div className="container mt-3 py-5 w- h-100">
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
                        </label>
                      </div>

                      <h5>{user?.name ? user?.name : "-"}</h5>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body  p-4">
                        <h6 className="fs-3">Profile Address</h6>
                        <hr className="mt-0 mb-4" />
                        <div className="row pt-1">
                          <div className="col col-6 mb-3">
                            <h6>Name</h6>
                            <input
                              onChange={handleInputs}
                              type="text"
                              className="form-control"
                              placeholder="Enter name"
                              name="fullName"
                              value={user?.fullName}
                            />
                            {errors.fullName.required ? (
                              <span className="text-danger form-text">
                                This field is required.
                              </span>
                            ) : null}
                          </div>
                          <div className="col col-6 mb-3">
                            <h6>Mobile Number</h6>
                            <input
                              onChange={handleInputs}
                              type="tel"
                              className="form-control"
                              placeholder="Enter phone"
                              name="alternativeMobileNumber"
                              maxLength="10"
                              value={user?.alternativeMobileNumber}
                            />
                            {errors.alternativeMobileNumber.required ? (
                              <span className="text-danger form-text">
                                This field is required.
                              </span>
                            ) : null}
                          </div>
                        </div>

                        <div className="row pt-1">
                          <div className="col col-sm-12 mb-3">
                            <h6>Address</h6>
                            <input
                              type="text"
                              onChange={handleInputs}
                              className="form-control"
                              placeholder="Enter address"
                              name="address"
                              value={user?.address}
                            />
                            {errors.address.required ? (
                              <span className="text-danger form-text">
                                This field is required.
                              </span>
                            ) : null}
                          </div>
                        </div>

                        <div className="row pt-1">
                          <div className="col col-6 mb-3">
                            <h6>City</h6>
                            <input
                              type="text"
                              onChange={handleInputs}
                              className="form-control"
                              placeholder="Enter city"
                              value={user?.city}
                              name="city"
                            />
                            {errors.city.required ? (
                              <span className="text-danger form-text">
                                This field is required.
                              </span>
                            ) : null}
                          </div>

                          <div className="col col-6 mb-3">
                            <h6>State</h6>
                            <input
                              onChange={handleInputs}
                              value={user?.state}
                              type="text"
                              className="form-control"
                              placeholder="Enter state"
                              name="state"
                            />
                            {errors.state.required ? (
                              <span className="text-danger form-text">
                                This field is required.
                              </span>
                            ) : null}
                          </div>
                        </div>

                        <div className="row pt-1">
                          <div className="col col-6 mb-3">
                            <h6>Pin Code</h6>
                            <input
                              type="number"
                              onChange={handleInputs}
                              className="form-control"
                              placeholder="Enter pincode"
                              name="pincode"
                              value={user?.pincode}
                              maxLength={6}
                            />
                            {errors.pincode.required ? (
                              <span className="text-danger form-text">
                                This field is required.
                              </span>
                            ) : null}
                          </div>

                          <div className="col col-6 mb-3">
                            <h6>Land Mark</h6>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter landmark"
                              onChange={handleInputs}
                              name="landmark"
                              value={user?.landmark}
                            />
                            {errors.landmark.required ? (
                              <span className="text-danger form-text">
                                This field is required.
                              </span>
                            ) : null}
                          </div>
                        </div>

                        <div className="row pt-1">
                          <div className="col col-6 mb-3">
                            <a
                              href="/ProfileAddress"
                              className="btn_text_change_clr"
                            >
                              <button
                                type="submit"
                                class="btn gradient-custom text-white fw-bold"
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

export default ProfileAddressEdit;
