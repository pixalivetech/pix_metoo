import React, { useState } from "react";
import Sidebar from "../../Components/SideBar";
import Header from "../../Components/Header";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getUserId } from "../../Utils/Storage";
import { savePanelReview } from "../../api/review";
import { BsStar, BsStarFill } from "react-icons/bs";

function Addreview() {
  const [rating, setRating] = useState(0);

  let initialStateInputs = {
    panelId: getUserId(),
    title: "",
    comment: "",
    rating: rating,
  };

  let initialStateErrors = {
    title: { required: false },
    comment: { required: false },
    rating: { required: false },
  };

  const [errors, setErrors] = useState(initialStateErrors);
  const [inputs, setInputs] = useState(initialStateInputs);
  const [submitted, setSubmitted] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [wordLimitExceeded, setWordLimitExceeded] = useState(false);
  const navigate = useNavigate();

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

  const handleValidation = (data) => {
    let error = initialStateErrors;
    if (data.title === "") {
      error.title.required = true;
    }
    if (data.comment === "") {
      error.comment.required = true;
    }
    if (data.rating === "") {
      error.rating.required = true;
    }
    return error;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
    const allInputsValid = Object.values(newError);
    const valid = allInputsValid.some((x) => x.required === true);
    if (!valid) {
      const updatedInputs = { ...inputs, rating: rating };
      setInputs(updatedInputs);
      savePanelReview(updatedInputs)
        .then((res) => {
          const panelId = getUserId();
          console.log("edw", res, panelId);
          toast.success(res?.data?.message);
          navigate("/Givereviewlist");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  const handleStarClick = (starIndex) => {
    const userRating = starIndex + 1;
    setRating(userRating);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleWordCount = (event) => {
    const bioText = event.target.value;
    const words = bioText.trim().split(/\s+/);
    const wordCount = words.length;
    setWordCount(wordCount);
    if (wordCount > 25) {
      const truncatedBio = words.slice(0, 50).join(" ");
      event.target.value = truncatedBio;
      setInputs({ ...inputs, comment: truncatedBio });
      setWordLimitExceeded(true);
    } else {
      setInputs({ ...inputs, comment: bioText });
      setWordLimitExceeded(false);
    }
    if (submitted) {
      const newError = handleValidation({
        ...inputs,
        comment: bioText,
      });
      setErrors(newError);
    }
  };

  return (
    <div>
      <Sidebar />
      <Header />
      <div className="content-wrapper">
        <div className="content-header mt-3">
          <div className="content container-fluid p-3 w-75 ">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="content-page-header">
                  <h5 className="text-bold" style={{ color: "#9265cc" }}>
                    Add Review
                  </h5>
                </div>
              </div>
              <div className="row card">
                <div className="card-body ">
                  <div className="row ">
                    <div className="col-12">
                      <div className="form-group">
                        <label style={{ color: "#9265cc" }}>
                          Title<span className="text-danger">*</span>
                        </label>
                        <input
                          onChange={handleInputs}
                          type="text"
                          className="form-control"
                          placeholder="Enter title"
                          name="title"
                        />
                        {errors.title?.required ? (
                          <span className="text-danger form-text">
                            This field is required.
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-12 ">
                      <div className="form-group">
                        <label style={{ color: "#9265cc" }}>
                          Comment<span className="text-danger">*</span>
                        </label>
                        <textarea
                          type="text"
                          onChange={handleInputs}
                          onInput={handleWordCount}
                          className="form-control"
                          placeholder="Type Comment..."
                          name="comment"
                        />
                        {errors.comment.required ? (
                          <span className="form-text text-danger">
                            This field is required.
                          </span>
                        ) : null}
                        <div className="text-muted mt-2">
                          {wordCount}/50 Words
                        </div>
                        {wordLimitExceeded && (
                          <div className="text-danger form-text">
                            Maximum word limit (50 words) reached.
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="col-12 ">
                      <label style={{ color: "#9265cc" }}>
                        Rating<span className="text-danger">*</span>
                      </label>
                      <div className="form-group">
                        {[0, 1, 2, 3, 4].map((starIndex) => (
                          <span
                            key={starIndex}
                            onClick={() => handleStarClick(starIndex)}
                            value={starIndex}
                            onChange={handleRatingChange}
                            className={`star ${
                              starIndex < rating ? "filled" : ""
                            }`}
                          >
                            {" "}
                            {starIndex < rating ? (
                              <BsStarFill className="text-warning  " />
                            ) : (
                              <BsStar className="text-secondary " />
                            )}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="add-customer-btns text-end mb-40 d-flex w-75 float-right">
                      <Link
                        style={{ backgroundColor: "#9265cc" }}
                        to="/Givereviewlist"
                        className="btn btn-cancel text-white  w-50 m-2"
                      >
                        Cancel
                      </Link>
                      <button
                        style={{ backgroundColor: "#9265cc" }}
                        type="submit"
                        className="btn btn-cancel text-white  w-50 m-2"
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
}

export default Addreview;
