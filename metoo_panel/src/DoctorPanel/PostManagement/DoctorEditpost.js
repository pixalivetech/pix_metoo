import { useState } from "react";
import DoctorHeader from "../../Components/DoctorHeader";
import DoctorSidebar from "../../Components/DoctorSidebar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getSinglePost, updatePost } from "../../api/postDoctor";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { uploadFile } from "../../Utils/FileUpload";

const DoctorEditpost = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  let initialStateErrors = {
    video: { required: false },
    title: { required: false },
    content: { required: false },
  };

  const [errors, setErrors] = useState(initialStateErrors);
  const [inputs, setInputs] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getPostDetails();
  }, []);

  const getPostDetails = () => {
    getSinglePost(id)
      .then((res) => {
        setInputs(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleFileInputs = (event) => {
    const file = event?.target?.files[0];
    let fileType;
    let folder;
    if (file?.type === "video/mp4") {
      fileType = 2;
      folder = "sexify/postVideo/";
    } else {
      fileType = 1;
      folder = "sexify/postImage";
    }
    if (file) {
      uploadFile(file, folder)
        .then((res) => {
          event.target.value = null;
          const Video = res?.Location;
          setInputs({ ...inputs, video: Video, fileType });
          if (submitted) {
            const newError = handleValidation({ ...inputs, video: Video });
            setErrors(newError);
          }
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

  const handleValidation = (data) => {
    let error = initialStateErrors;
    if (data.video === "") {
      error.video.required = true;
    }
    if (data.title === "") {
      error.title.required = true;
    }
    if (data.content === "") {
      error.content.required = true;
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
      updatePost(inputs)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/DoctorPostlist");
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }
  };

  return (
    <div>
      <DoctorSidebar />
      <DoctorHeader />

      <div className="content-wrapper">
        <div className="content-header mt-3">
          <div className="content container-fluid w-75">
            <div className="content-page-header">
              <h5 style={{ color: "#9265cc" }} className=" text-bold">
                Edit Post
              </h5>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="col">
                <div className="card mt-2 p-2">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-12 col-md-12 col-sm-12 text-center">
                        <div className="upload-img form-group">
                          <h5 style={{ color: "#9265cc" }}>
                            Doctor Video<span className="text-danger">*</span>
                          </h5>
                          <video
                            src={inputs?.video}
                            type="video/mp4"
                            controls
                            style={{ maxWidth: "100%", height: "300px" }}
                          />
                          <div className="d-flex justify-content-center mt-2">
                            <input
                              onChange={handleFileInputs}
                              name="video"
                              id="fileInput"
                              type="file"
                              accept="video/*"
                            />
                          </div>
                          {errors.video.required && (
                            <span className="form-text text-danger">
                              This field is required.
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          <label style={{ color: "#9265cc" }}>
                            {" "}
                            Title<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            value={inputs?.title}
                            onChange={handleInputs}
                            className="form-control"
                            placeholder="Enter Name"
                            name="title"
                          />
                          {errors.title.required && (
                            <span className="form-text text-danger">
                              This field is required.
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          <label style={{ color: "#9265cc" }}>
                            {" "}
                            Description<span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            value={inputs?.content}
                            onChange={handleInputs}
                            className="form-control"
                            placeholder="Enter Description"
                            name="content"
                          />
                          {errors.content.required && (
                            <span className="form-text text-danger">
                              This field is required.
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="add-customer-btns d-flex float-right w-75">
                      <Link
                        style={{ backgroundColor: "#9265cc" }}
                        to="/Doctorpostlist"
                        className="btn btn-cancel text-white border w-50 m-2"
                      >
                        Cancel
                      </Link>
                      <button
                        style={{ backgroundColor: "#9265cc" }}
                        type="submit"
                        className="btn btn-save text-white border w-50 m-2"
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

export default DoctorEditpost;
