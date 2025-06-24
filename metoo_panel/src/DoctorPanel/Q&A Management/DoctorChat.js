import React, { useState, useEffect } from "react";
import DoctorHeader from "../../Components/DoctorHeader";
import DoctorSidebar from "../../Components/DoctorSidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleFaq, answerQA } from "../../api/faq";
import { getDoctorId } from "../../Utils/Storage";

const DoctorChat = () => {
  const initialState = {
    answer: "",
  };

  const initialStateErrors = {
    answer: { required: false },
  };

  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [chat, setChat] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState(initialStateErrors);
  const navigate = useNavigate();

  useEffect(() => {
    getPostDetails();
  }, []);

  const getPostDetails = () => {
    getSingleFaq(id)
      .then((res) => {
        console.log("siva kumar", res);
        setChat(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleInputs = (event) => {
    setChat({ ...chat, [event.target.name]: event.target.value });
    if (submitted) {
      const newError = handleValidation({
        ...chat,
        [event.target.name]: event.target.value,
      });
      setErrors(newError);
    }
  };

  const handleValidation = (data) => {
    let error = initialStateErrors;
    if (data.answer === "") {
      error.answer.required = true;
    }
    return error;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitting data:", chat);
    const data = {
      answers: chat.answer,
      doctorIds: getDoctorId(),
      _id: id,
    };
    answerQA(data)
      .then((res) => {
        console.log("Response from server:", res);
        toast.success(res?.data?.message);
        navigate("/Doctorchatlist");
      })
      .catch((err) => {
        console.error("Error from server:", err);
        toast.error(err?.response?.data?.message);
      });
  };

  return (
    <div>
      <DoctorSidebar />
      <DoctorHeader />

      <div className="content-wrapper">
        <div className="content-header mt-3">
          <div className="content container-fluid w-75">
            <div className="row d-flex justify-content-between w-100">
              <div className="content-page-header">
                <h5 className="text-bold" style={{ color: "#9265cc" }}>
                  {" "}
                  Chat
                </h5>
              </div>
              <div className="content-page-header">
                <Link to="/Doctorchatlist">
                  <button
                    className="btn btn-outline border text-white  p-2"
                    style={{ backgroundColor: "#9265cc" }}
                  >
                    Chat List
                  </button>
                </Link>
              </div>
            </div>
            <div className="col w-100">
              <div className="col-xl-12">
                <div className="card mt-1 p-2">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 ">
                        <div className="form-group">
                          <label style={{ color: "#9265cc" }}>Name</label>
                          <br />
                          <span>{chat?.userId?.name}</span>
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12 ">
                        <div className="form-group">
                          <label style={{ color: "#9265cc" }}>Question</label>
                          <br />
                          <span>{chat?.question}</span>
                        </div>
                      </div>
                      <form onSubmit={handleSubmit}>
                        <div>
                          <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>
                                Answer<span className="text-danger">*</span>
                              </label>
                              <textarea
                                type="text"
                                onChange={handleInputs}
                                className="form-control "
                                placeholder="Enter Answer"
                                name="answer"
                              />
                              {errors.answers?.required ? (
                                <span className="text-danger form-text">
                                  This field is required.
                                </span>
                              ) : null}
                            </div>
                          </div>
                          <div className="add-customer-btns text-end mb-40 d-flex w-50 float-right">
                            <button
                              type="submit"
                              className="btn text-bold btn-save btn-outline-primary w-75 m-2 p-2"
                            >
                              Send
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorChat;
