import React, { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import { isValidEmail, isValidPhone } from "../../Utils/Validation";
import { toast } from "react-toastify";
import { saveToken } from "../../Utils/Storage";
import { isAuthenticated } from "../../Utils/Auth";
import { signResendOTP, signUp, signVerifyOTP } from "../../api/signup";

const Signup = () => {
  const navigate = useNavigate();

  const initialStateInputs = {
    name: "",
    mobileNumber: "",
    email: "",
    otp: "",
  };

  const initialStateErrors = {
    name: { required: false, valid: false },
    mobileNumber: { required: false, valid: false },
    email: { required: false, valid: false },
    otp: { required: false, valid: false },
  };

  const [inputs, setInputs] = useState(initialStateInputs);
  const [errors, setErrors] = useState(initialStateErrors);
  const [step, setStep] = useState("email");
  const [submitted, setSubmitted] = useState(false);

  const handleContinue = () => {
    if (isValidEmail(inputs.email)) {
      setStep("otp");
    } else {
      setStep("email");
    }
  };

  const handleValidation = (data) => {
    let error = initialStateErrors;
    if (data.name === "") {
      error.name.required = true;
    }
    if (data.mobileNumber === "") {
      error.mobileNumber.required = true;
    }
    if (data.email === "") {
      error.email.required = true;
    }
    if (data.otp === "") {
      error.otp.required = true;
    }
    if (!isValidPhone(data.mobileNumber)) {
      error.mobileNumber.valid = true;
    }
    if (!isValidEmail(data.email)) {
      error.email.valid = true;
    }
    return error;
  };

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event?.target?.name]: event?.target?.value });
    if (submitted) {
      const newError = handleValidation({
        ...inputs,
        [event.target.name]: event.target.value,
      });
      setErrors(newError);
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
    if (!newError.email.required && !newError.email.valid) {
      const data = {
        name: inputs.name,
        mobileNumber: inputs.mobileNumber,
        email: inputs.email,
      };
      signUp(data)
        .then((res) => {
          const _id = res?.data?.result?._id;
          setInputs({ ...inputs, _id });

          if (res?.data?.result?.sendOTP) {
            setStep("otp");
            toast.success(res?.data?.message);
          } else {
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };
  const resendOtp = () => {
    const data = { email: inputs.email };
    signResendOTP(data)
      .then((res) => {
        toast.success(res.data.message);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
    if (!newError.otp.required) {
      const data = { name: inputs.name, email: inputs.email, otp: inputs.otp };
      signVerifyOTP(data)
        .then((res) => {
          if (res?.data?.success) {
            const token = res?.data?.result?.token;
            const panelId = res?.data?.result?.panelDetails?._id;
            const userData = {
              token: token,
              panelId: panelId,
            };
            saveToken(userData);
            if (isAuthenticated()) {
              navigate("/Dashboard");
            }
            toast.success(res?.data?.message);
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  return (
    <div className="container">
      <div className="row h-100 justify-content-center align-items-center pt-5 login_center_big_screen">
        <div className="col-md-9">
          <div className="AppForm shadow-lg">
            <div className="row">
              <div className="col-lg-6 col-md-12 col-12 ">
                <div className="AppFormRight position-relative d-flex justify-content-center flex-column align-items-center text-center p-5 text-white"></div>
              </div>
              <div className="col-lg-6 col-md-12 col-12 back_color_login d-flex justify-content-center ">
                <div className="AppFormLeft">
                  <p className="text-center my-4">
                    <h5 className="text-black fw`-bold">SIGNUP AS A COMPANY</h5>
                  </p>
                  <form onSubmit={handleLogin}>
                    <div className="form-group position-relative mb-4 ">
                      <input
                        type="text"
                        name="name"
                        className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none d-flex justify-content-center text-center mx-auto"
                        id="username"
                        placeholder="Name"
                        onChange={handleInputs}
                      />
                      {errors.name.required ? (
                        <span className="text-danger form-text d-flex justify-content-center text-center mx-auto">
                          This field is required.
                        </span>
                      ) : null}
                    </div>
                    <div className="form-group position-relative mb-4">
                      <input
                        type="number"
                        name="mobileNumber"
                        className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none d-flex justify-content-center text-center mx-auto"
                        id="password"
                        placeholder="mobileNumber"
                        onChange={handleInputs}
                      />
                      {errors.mobileNumber.required ? (
                        <span className="text-danger form-text d-flex justify-content-center text-center mx-auto">
                          This field is required.
                        </span>
                      ) : errors.mobileNumber.valid ? (
                        <span className="text-danger form-text d-flex justify-content-center text-center mx-auto">
                          Enter a valid mobileNumber
                        </span>
                      ) : null}
                    </div>
                    <div className="form-group position-relative mb-4">
                      <input
                        type="email"
                        name="email"
                        className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none d-flex justify-content-center text-center mx-auto"
                        id="password"
                        placeholder="Email"
                        onChange={handleInputs}
                      />
                      {errors.email.required ? (
                        <span className="text-danger form-text d-flex justify-content-center text-center mx-auto">
                          This field is required.
                        </span>
                      ) : errors.email.valid ? (
                        <span className="text-danger form-text d-flex justify-content-center text-center mx-auto">
                          Enter a valid email address
                        </span>
                      ) : null}
                    </div>
                    <button
                      className="btn-block shadow border-0 py-2 d-flex justify-content-center text-center mx-auto comcntnbtn"
                      onClick={handleContinue}
                    >
                      Continue
                    </button>
                    <br />
                    <br />
                  </form>
                  <form onSubmit={handleSubmit}>
                    {step === "otp" ? (
                      <div>
                        <div className="form-group position-relative mb-4 mx-5">
                          <p className="">ENTER A OTP</p>
                          <input
                            type="text"
                            name="otp"
                            placeholder=" Enter OTP"
                            onChange={handleInputs}
                            className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                          />
                        </div>
                        <div className="mx-5">
                          <button className="comcntnbtn" type="submit">
                            Verify OTP{" "}
                          </button>
                          &nbsp;
                          <button className="comcntnbtn" onClick={resendOtp}>
                            Resend OTP
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </form>
                  <p className="text-center mt-5">
                    Back to --&gt;
                    <a href="/" className="text-info">
                      Login
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
