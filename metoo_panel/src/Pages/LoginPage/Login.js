import React, { useState } from "react";
import "./Login.css";
import { Link, Navigate } from "react-router-dom";
import { isValidEmail } from "../../Utils/Validation";
import { useNavigate } from "react-router-dom";
import { Loginpanel, resendOTP, verifyOTP } from "../../api/login";
import { toast } from "react-toastify";
import { getLoginType, saveToken } from "../../Utils/Storage";
import { isAuthenticated } from "../../Utils/Auth";

const Login = () => {
  const navigate = useNavigate();

  let initialStateInputs = {
    email: "",
    otp: "",
  };

  let initialStateErrors = {
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
    if (data.email === "") {
      error.email.required = true;
    }
    if (data.otp === "") {
      error.otp.required = true;
    }
    if (!isValidEmail(data.email)) {
      error.email.valid = true;
    }
    return error;
  };

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
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
    const allInputsValid =
      !newError?.email?.required && !newError?.email?.valid;

    if (allInputsValid) {
      const data = { email: inputs?.email };
      Loginpanel(data)
        .then((res) => {
          const _id = res?.data?.result?._id;
          setInputs({ ...inputs, _id });
          toast.success(res?.data?.message);
          if (res?.data?.result?.sendOTP) {
            setStep("otp");
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
    if (!newError.otp.required) {
      const data = { email: inputs.email, otp: inputs.otp };
      verifyOTP(data)
        .then((res) => {
          let token = res?.data?.result?.token;
          let panelId = res?.data?.result?.panelDetails?._id;
          let doctorId = res?.data?.result?.doctorDetails?._id;
          let companyId = res?.data?.result?.companyDetails?._id;
          let loginType = res?.data?.result?.loginType;
          if (
            loginType === "panel" ||
            loginType === "doctor" ||
            loginType === "company"
          ) {
            let data = {
              token: token,
              panelId: panelId,
              doctorId: doctorId,
              companyId: companyId,
              loginType: loginType,
            };
            saveToken(data);
            if (isAuthenticated()) {
              if (getLoginType() === "panel") {
                navigate("/Dashboard");
              } else if (getLoginType() === "doctor") {
                navigate("/Doctordashboard");
              } else {
                navigate("/Masterdashboard");
              }
              toast.success(res?.data?.message);
            }
          } else {
            toast.error("Please provide the correct crediantials.");
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };
  if (isAuthenticated()) {
    if (getLoginType() === "panel") {
      return <Navigate to="/Dashboard" />;
    } else if (getLoginType() === "doctor") {
      return <Navigate to="/Doctordashboard" />;
    } else {
      return <Navigate to="/Masterdashboard" />;
    }
  }

  const resendOtp = () => {
    const data = { email: inputs?.email };
    resendOTP(data)
      .then((res) => {
        toast.success(res?.data?.message);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <div className="container p-5">
      <div className="row h-100 justify-content-center align-items-center  login_center_big_screen ">
        <div className="col-md-9">
          <div className="AppForm shadow-lg">
            <div className="row">
              <div className="col-lg-6 col-md-12 col-12 ">
                <div className="AppFormRight position-relative d-flex justify-content-center flex-column align-items-center text-center p-5 text-white"></div>
              </div>
              <div className="col-lg-6 col-md-12 col-12 back_color_login d-flex justify-content-center ">
                <div className="loginleftside">
                  <p className="text-center my-4">
                    <h5 className="text-black fw`-bold">SIGNUP AS</h5>
                    <Link to="/Doctorsignup">
                      <button className="mx-3 px-3 py-2 text-white">
                        {" "}
                        Doctor
                      </button>
                    </Link>
                    <Link to="/Companysignup">
                      <button className="px-3 py-2 text-white"> Company</button>
                    </Link>
                  </p>
                  <form onSubmit={handleLogin}>
                    <h1 className="d-flex justify-content-center text-center mx-auto my-1">
                      LOGIN
                    </h1>
                    <div className="form-group position-relative mb-4">
                      <i className="fa fa-user-o"></i>
                    </div>
                    <div className="form-group position-relative mb-4">
                      <input
                        type="email"
                        className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none"
                        id="password"
                        name="email"
                        onChange={handleInputs}
                        placeholder="Email"
                      />
                      {errors.email.required ? (
                        <span className="text-danger form-text">
                          This field is required.
                        </span>
                      ) : errors.email.valid ? (
                        <span className="text-danger form-text">
                          Enter a valid mail id
                        </span>
                      ) : null}
                    </div>
                    <button
                      className="btn-block border-0 py-2 d-flex justify-content-center text-center mx-auto"
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
                        <div className="d-flex justify-content-center">
                          {" "}
                          <button type="submit">Verify OTP </button>
                          &nbsp;
                          <button onClick={resendOtp}>Resend OTP</button>
                        </div>
                      </div>
                    ) : null}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
