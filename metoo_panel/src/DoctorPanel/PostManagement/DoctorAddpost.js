import React, { useState } from "react";
import { getDoctorId } from "../../Utils/Storage";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { savePost } from "../../api/postDoctor";
import { uploadFile } from "../../Utils/FileUpload";
import DoctorHeader from "../../Components/DoctorHeader";
import DoctorSidebar from "../../Components/DoctorSidebar";

const DoctorAddpost = () => {
  let initialStateInputs = {
    doctorId: getDoctorId(),
    video: "",
    title: "",
    content: "",
  };

  let initialStateErrors = {
    video: { required: false },
    title: { required: false },
    content: { required: false },
  };

  const [errors, setErrors] = useState(initialStateErrors);
  const [inputs, setInputs] = useState(initialStateInputs);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleFileInputs = async (event) => {
    try {
      const file = event?.target?.files[0];

      if (!file) {
        return;
      }

      let fileType;
      let folder;

      if (file.type === "video/mp4") {
        fileType = 2;
        folder = "sexify/postVideo";
      } else {
        fileType = 1;
        folder = "sexify/postVideo";
      }

      const res = await uploadFile(file, folder);
      const videoUrl = res?.Location;

      setInputs((prevInputs) => ({ ...prevInputs, video: videoUrl }));
      if (submitted) {
        handleValidation({ ...inputs, video: videoUrl });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputs = (event) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      [event.target.name]: event.target.value,
    }));
    if (submitted) {
      handleValidation({
        ...inputs,
        [event.target.name]: event.target.value,
      });
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = handleValidation(inputs);

    if (isValid) {
      try {
        const data = {
          doctorId: getDoctorId(),
          video: inputs?.video,
          title: inputs?.title,
          content: inputs?.content,
        };

        const res = await savePost(data);
        toast.success(res?.data?.message);
        navigate("/DoctorPostlist");
      } catch (error) {
        console.error(error);
        toast.error(error?.response?.data?.message || "An error occurred");
      }
    } else {
      console.log("Validation failed");
    }
  };

  return (
    <div>
      <DoctorSidebar />
      <DoctorHeader />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3"></div>
          <div className="col-md-6 border">
            <div className="content-page-header p-3">
              <h5 className="text-bold" style={{ color: "#9265cc" }}>
                Add Post
              </h5>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="content container-fluid">
                <div className="col">
                  <div className="col-md-12 col-lg-6">
                    <div className="upload-video form-group text-center">
                      <label style={{ color: "#9265cc" }}>
                        Doctor Video<span className="text-danger">*</span>
                      </label>
                      <div className="video-upload video-upload-logo"></div>
                      {errors.video && (
                        <span className="form-text text-danger">
                          This field is required.
                        </span>
                      )}
                    </div>
                    <div className="upload-video form-group text-center">
                      <video
                        src={inputs?.video}
                        type="video/mp4"
                        width="340"
                        height="220"
                        controls
                      ></video>
                      <input
                        type="file"
                        name="video"
                        onChange={handleFileInputs}
                        accept="video/*"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-6 col-sm-3">
                    <div className="form-group">
                      <label style={{ color: "#9265cc" }}>
                        Title<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        onChange={handleInputs}
                        className="form-control"
                        placeholder="Enter title here..."
                        name="title"
                      />
                      {errors.title && (
                        <span className="form-text text-danger">
                          This field is required.
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 col-sm-12">
                    <div className="form-group">
                      <label style={{ color: "#9265cc" }}>
                        Description<span className="text-danger">*</span>
                      </label>
                      <textarea
                        type="text"
                        onChange={handleInputs}
                        className="form-control"
                        placeholder="Enter comment here..."
                        name="content"
                      />
                      {errors.content && (
                        <span className="form-text text-danger">
                          This field is required.
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="add-customer-btns d-flex float-right w-50">
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
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAddpost;
