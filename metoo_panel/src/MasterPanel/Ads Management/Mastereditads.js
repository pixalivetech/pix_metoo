import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Masterheader from "../../Components/MasterHeader";
import Mastersidebar from "../../Components/MasterSidebar";
import { uploadFile } from "../../Utils/FileUpload";
import { toast } from "react-toastify";
import { getSingleCarousel, updateCarousel } from "../../api/ads";

function Masterditads() {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");

  const initialStateErrors = {
    image: { required: false },
    title: { required: false },
    content: { required: false },
  };

  const [errors, setErrors] = useState(initialStateErrors);
  const [inputs, setInputs] = useState({});
  const [wordCount, setWordCount] = useState(0);
  const [wordLimitExceeded, setWordLimitExceeded] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRefImage = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    getAdsDetails();
  }, []);

  const getAdsDetails = () => {
    getSingleCarousel(id)
      .then((res) => {
        setInputs(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFileInputs = (event) => {
    const file = event?.target?.files[0];
    const folder = "carouselImage/";
    if (file) {
      uploadFile(file, folder)
        .then((res) => {
          const image = res?.Location;
          setInputs({ ...inputs, image: image });
        })
        .catch((err) => {
          console.log(err);
        });
    }
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

  const handleWordCount = (event) => {
    const bioText = event.target.value;
    const words = bioText.trim().split(/\s+/);
    const wordCount = words.length;
    setWordCount(wordCount);
    if (wordCount > 10) {
      const truncatedBio = words.slice(0, 10).join(" ");
      event.target.value = truncatedBio;
      setInputs({ ...inputs, content: truncatedBio });
      setWordLimitExceeded(true);
    } else {
      setInputs({ ...inputs, content: bioText });
      setWordLimitExceeded(false);
    }
    if (submitted) {
      const newError = handleValidation({ ...inputs, content: bioText });
      setErrors(newError);
    }
  };

  const handleValidation = (data) => {
    let newErrors = { ...initialStateErrors };
    if (data.image === "") {
      newErrors.image = true;
    }
    if (data.title === "") {
      newErrors.title = true;
    }
    if (data.content === "") {
      newErrors.content = true;
    }
    return newErrors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(inputs);
    setErrors(newError);
    setSubmitted(true);
    const allInputsValid = Object.values(newError);
    const valid = allInputsValid.some((x) => x.required === true);
    if (!valid) {
      updateCarousel(inputs)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/Masteradslist");
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
              <div className="row p-3">
                <div className="content-page-header">
                  <h5 className="text-bold" style={{ color: "#9265cc" }}>
                    Edit Ads
                  </h5>
                </div>
              </div>
              <div className="col">
                <div className="col-xl-12">
                  <div className="card mt-1 p-2">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-12 col-md-6 col-sm-12">
                          <div class="upload-img form-group text-center">
                            <label style={{ color: "#9265cc" }}>
                              Advertisment Image
                              <span className="text-danger">*</span>
                            </label>
                            <br />
                            {inputs.image ? (
                              <div className="preview-container">
                                <img
                                  src={
                                    inputs.image
                                      ? inputs?.image
                                      : "https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"
                                  }
                                  width="200"
                                  height="150"
                                  alt="Preview"
                                  className="preview-image"
                                />
                              </div>
                            ) : (
                              <label
                                htmlFor="fileInput"
                                className="file-upload btn btn-primary p-5"
                              >
                                <i className="fa fa-camera me-2 fa-3x"></i>
                              </label>
                            )}
                            <input
                              ref={fileInputRefImage}
                              onChange={handleFileInputs}
                              name="image"
                              id="fileInput"
                              type="file"
                              accept="image/*"
                            />
                            {errors.image.required ? (
                              <span className="text-danger form-text">
                                This field is required.
                              </span>
                            ) : null}
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>
                              Title<span className="text-danger">*</span>
                            </label>
                            <input
                              value={inputs?.title}
                              onChange={handleInputs}
                              type="text"
                              className="form-control"
                              placeholder="Enter the title"
                              name="title"
                            />
                            {errors.title?.required ? (
                              <span className="text-danger form-text">
                                This field is required.
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>
                              Ad Content<span className="text-danger">*</span>
                            </label>
                            <textarea
                              style={{ height: "50px" }}
                              onInput={handleWordCount}
                              onChange={handleInputs}
                              value={inputs?.content}
                              type="text"
                              className="form-control"
                              placeholder="Enter the content"
                              name="content"
                            />
                            <div className="text-muted mt-2">
                              {wordCount}/10 Words
                            </div>
                            {wordLimitExceeded && (
                              <div className="text-danger form-text">
                                Maximum word limit (10 words) reached.
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-12 d-flex justify-content-end mb-3">
                          <Link
                            to="/Masteradslist"
                            className="btn btn-cancel btn-outline-primary mx-1"
                          >
                            Cancel
                          </Link>
                          <button
                            type="submit"
                            className="btn btn-save btn-outline-primary mx-1"
                          >
                            Submit
                          </button>
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
}

export default Masterditads;
