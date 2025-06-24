import React, { useState, useEffect } from "react";
import DoctorHeader from "../../Components/DoctorHeader";
import DoctorSidebar from "../../Components/DoctorSidebar";
import { Link, useNavigate } from "react-router-dom";
import { getDoctorId } from "../../Utils/Storage";
import { isValidEmail, isValidPhone } from "../../Utils/Validation";
import { toast } from "react-toastify";
import { uploadFile } from "../../Utils/FileUpload";
import { getDoctorDetails, updateDoctor } from "../../api/doctor";
import { FaTrash } from "react-icons/fa";

const DoctorAddprofile = () => {
  const initialState = {
    profileImage: "",
    doctorName: "",
    email: "",
    phone: "",
    doctorBio: "",
    specialization: "",
    services: "",
    gender: "",
    overAllQualification: "",
    overAllExperience: "",
    address: "",
    language: "",
    landLineNumber: "",
  };

  const initialStateErrors = {
    profileImage: { required: false },
    doctorName: { required: false },
    email: { required: false },
    phone: { required: false },
    gender: { required: false },
    address: { required: false },
    language: { required: false },
    landLineNumber: { required: false },
    overAllQualification: { required: false },
    overAllExperience: { required: false },
    doctorBio: { required: false },
  };

  const [profile, setProfile] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState(initialStateErrors);
  const [wordCount, setWordCount] = useState(0);
  const [wordLimitExceeded, setWordLimitExceeded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getdoctorDetails();
  }, []);

  const getdoctorDetails = () => {
    const id = getDoctorId();
    getDoctorDetails(id)
      .then((res) => {
        setProfile(res?.data?.result);
        setInputValue({
          specialization: res?.data?.result?.specialization.join(", "),
        });
        setInputServiceValue({
          services: res?.data?.result?.services.join(", "),
        });
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
    if (data.doctorName === "") {
      error.doctorName.required = true;
    }
    if (data.email === "") {
      error.email.required = true;
    }
    if (data.profileImage === "") {
      error.profileImage.required = true;
    }
    if (data.phone === "") {
      error.phone.required = true;
    }
    if (data.gender === "") {
      error.gender.required = true;
    }
    if (data.address === "") {
      error.address.required = true;
    }
    if (data.language === "") {
      error.language.required = true;
    }
    if (data.landLineNumber === "") {
      error.landLineNumber.required = true;
    }
    if (data.overAllQualification === "") {
      error.overAllQualification.required = true;
    }
    if (data.overAllExperience === "") {
      error.overAllExperience.required = true;
    }
    if (data.doctorBio === "") {
      error.doctorBio.required = true;
    }
    if (!isValidEmail(data.email)) {
      error.email.valid = true;
    }
    if (!isValidPhone(data.phone)) {
      error.phone.valid = true;
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
    const profileImageFile = event.target.files[0];
    if (profileImageFile) {
      const folder = "sexify/profileimage";
      uploadFile(profileImageFile, folder)
        .then((res) => {
          const newProfileImage = res?.Location;
          setProfile({ ...profile, profileImage: newProfileImage });
          if (submitted) {
            const newError = handleValidation({
              ...profile,
              profileImage: newProfileImage,
            });
            setErrors(newError);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleWordCount = (event) => {
    const bioText = event.target.value;
    const words = bioText.trim().split(/\s+/);
    const wordCount = words.length;
    setWordCount(wordCount);
    if (wordCount > 50) {
      const truncatedBio = words.slice(0, 50).join(" ");
      event.target.value = truncatedBio;
      setProfile({ ...profile, doctorBio: truncatedBio });
      setWordLimitExceeded(true);
    } else {
      setProfile({ ...profile, doctorBio: bioText });
      setWordLimitExceeded(false);
    }

    if (submitted) {
      const newError = handleValidation({ ...profile, doctorBio: bioText });
      setErrors(newError);
    }
  };

  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handlespecializationInputs = (event) => {
    setInputValue({ ...inputValue, specialization: event.target.value });
  };

  const addSpecialization = () => {
    const newSpecializations = inputValue.specialization
      .split(",")
      .map((s) => s.trim());
    setSelectedSpecializations([
      ...selectedSpecializations,
      ...newSpecializations,
    ]);
    setInputValue({ ...inputValue, specialization: "" });
  };

  const removeSpecialization = (index, event) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    const newSpecializations = selectedSpecializations.filter(
      (_, i) => i !== index
    );
    setSelectedSpecializations(newSpecializations);
  };

  const [selectedServices, setSelectedServices] = useState([]);
  const [inputServiceValue, setInputServiceValue] = useState("");

  const handleservicesInputs = (event) => {
    setInputServiceValue({
      ...inputServiceValue,
      services: event.target.value,
    });
  };

  const addService = () => {
    const newServices = inputServiceValue.services
      .split(",")
      .map((serv) => serv.trim());
    setSelectedServices([...selectedServices, ...newServices]);
    setInputServiceValue({ ...inputServiceValue, services: "" });
  };

  const removeService = (indexValue, event) => {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    const newServices = selectedServices.filter((_, i) => i !== indexValue);
    setSelectedServices(newServices);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newError = handleValidation(profile);
    setErrors(newError);
    setSubmitted(true);

    if (
      handleErrors(newError) &&
      selectedSpecializations.length > 0 &&
      selectedServices.length > 0
    ) {
      const updatedProfile = {
        ...profile,
        specialization: selectedSpecializations,
        services: selectedServices,
      };

      updateDoctor(updatedProfile)
        .then((res) => {
          toast.success(res?.data?.message);
          navigate("/DoctorViewprofile");
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
      <div className="container-fluid">
        <div className="row">
          <div class="col-md-3"></div>
          <div className="col-md-7 p-3">
            <div className="content-page-header">
              <h5 className="text-bold" style={{ color: "#9265cc" }}>
                Add Profile
              </h5>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="content container-fluid ">
                <div className="row">
                  <div className="col-md-12 col-lg-6">
                    <div className="upload-img form-group text-center mb-3">
                      <label style={{ color: "#9265cc" }}>
                        profile Image<span className="text-danger">*</span>
                      </label>
                      <br />
                      {profile.profileImage ? (
                        <div className="preview-container">
                          <label
                            htmlFor="fileInputImage"
                            className="banner-image-label"
                            style={{ width: "100%" }}
                          >
                            <img
                              src={profile.profileImage}
                              width="180"
                              height="180"
                              alt="Preview"
                              className="preview-image rounded-circle"
                              name="profileImage"
                            />
                          </label>
                        </div>
                      ) : (
                        <label
                          htmlFor="fileInputImage"
                          className="file-upload btn p-5 rounded-circle"
                          style={{ backgroundColor: "#9265cc" }}
                        >
                          <i className="fa fa-camera me-2 fa-3x "></i>
                        </label>
                      )}
                      <input
                        className="file-upload"
                        onChange={handleFileInputs}
                        style={{ display: "none" }}
                        name="profileImage"
                        id="fileInputImage"
                        type="file"
                        accept="image/*"
                      />
                      {errors.profileImage?.required ? (
                        <span className="text-danger form-text">
                          This field is required.
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="col-md-12 col-lg-6 ">
                    <div className="form-group">
                      <label style={{ color: "#9265cc" }}>
                        {" "}
                        Name<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        value={profile?.doctorName}
                        onChange={handleInputs}
                        className="form-control "
                        placeholder="Enter Name"
                        name="doctorName"
                      />
                      {errors.doctorName?.required ? (
                        <span className="text-danger form-text">
                          This field is required.
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="form-group">
                      <label style={{ color: "#9265cc" }}>
                        Mobile Number<span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        value={profile?.phone}
                        onChange={handleInputs}
                        className="form-control"
                        placeholder="Enter number"
                        name="phone"
                      />
                      {errors.phone?.required ? (
                        <span className="text-danger form-text">
                          This field is required.
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="d-flex ">
                  <div className="col-md-12 col-lg-6 ">
                    <div className="form-group">
                      <label style={{ color: "#9265cc" }}>
                        {" "}
                        Email<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        value={profile?.email}
                        onChange={handleInputs}
                        className="form-control "
                        placeholder="Enter Email"
                        name="email"
                      />
                      {errors.email?.required ? (
                        <span className="text-danger form-text">
                          This field is required.
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="form-group">
                      <label style={{ color: "#9265cc" }}>
                        Address<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        value={profile?.address}
                        onChange={handleInputs}
                        className="form-control"
                        placeholder="Enter address"
                        name="address"
                      />
                      {errors.address?.required ? (
                        <span className="text-danger form-text">
                          This field is required.
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="d-flex ">
                  <div className="col-md-12 col-lg-6">
                    <div className="form-group">
                      <label style={{ color: "#9265cc" }}>
                        Landline Number<span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        value={profile?.landLineNumber}
                        onChange={handleInputs}
                        className="form-control"
                        placeholder="Enter number"
                        name="landLineNumber"
                      />
                      {errors.landLineNumber?.required ? (
                        <span className="text-danger form-text">
                          This field is required.
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="form-group">
                      <label style={{ color: "#9265cc" }}>
                        Language<span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        value={profile?.language}
                        onChange={handleInputs}
                        className="form-control"
                        placeholder="Enter language"
                        name="language"
                      />
                      {errors.language?.required ? (
                        <span className="text-danger form-text">
                          This field is required.
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="d-flex ">
                  <div className="col-md-12 col-lg-6 ">
                    <div className="form-group">
                      <label style={{ color: "#9265cc" }}>
                        {" "}
                        Overall Qualification
                        <span className="text-danger">*</span>
                      </label>
                      <input
                        type="text"
                        value={profile?.overAllQualification}
                        onChange={handleInputs}
                        className="form-control "
                        placeholder="Enter Qualification"
                        name="overAllQualification"
                      />
                      {errors.overAllQualification?.required ? (
                        <span className="text-danger form-text">
                          This field is required.
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <div className="col-md-12 col-lg-6">
                    <div className="form-group">
                      <label style={{ color: "#9265cc" }}>
                        overall Experience<span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        value={profile?.overAllExperience}
                        onChange={handleInputs}
                        className="form-control"
                        placeholder="Enter Experience"
                        name="overAllExperience"
                      />
                      {errors.overAllExperience?.required ? (
                        <span className="text-danger form-text">
                          This field is required.
                        </span>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      {" "}
                      Gender<span className="text-danger">*</span>
                    </label>
                    <br />
                    <select
                      style={{ width: "190px", height: "38px" }}
                      value={profile?.gender}
                      onChange={handleInputs}
                      className="form-select rounded border"
                      name="gender"
                    >
                      <option hidden>Select Options</option>
                      <option value={"male"}>male</option>
                      <option value={"female"}>female</option>
                      <option value={"others"}>others</option>
                    </select>
                  </div>
                </div>
                <div className="d-flex">
                  <div className="col-lg-6 col-md-12 ">
                    <label style={{ color: "#9265cc" }}>
                      Specialization<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      onChange={handlespecializationInputs}
                      value={inputValue?.specialization}
                      className="form-control"
                      placeholder="Enter Specialization"
                      name="specialization"
                    />
                    {selectedSpecializations?.length === 0 && submitted && (
                      <span className="text-danger form-text">
                        This field is required.
                      </span>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div>
                      <button
                        type="button"
                        onClick={addSpecialization}
                        style={{
                          marginTop: "1.8rem",
                          backgroundColor: "#9265cc",
                        }}
                        className="btn text-white "
                      >
                        Add Specialization
                      </button>
                    </div>
                  </div>
                </div>
                <div className="d-flex p-2 flex-wrap">
                  {selectedSpecializations.map((specialization, index) => (
                    <div
                      className="border rounded btn text-white"
                      style={{ backgroundColor: "#9265cc" }}
                      key={index}
                    >
                      <span>{specialization}</span>
                      <button
                        onClick={(event) => removeSpecialization(index, event)}
                        className="btn btn-sm "
                      >
                        <FaTrash className="text-white" />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="d-flex">
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <label style={{ color: "#9265cc" }}>
                      Services<span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      onChange={handleservicesInputs}
                      value={inputServiceValue?.services}
                      className="form-control"
                      placeholder="Enter Services"
                      name="services"
                    />
                    {selectedServices?.length === 0 && submitted && (
                      <span className="text-danger form-text">
                        This field is required.
                      </span>
                    )}
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6">
                    <div>
                      <button
                        type="button"
                        onClick={addService}
                        style={{
                          marginTop: "1.8rem",
                          backgroundColor: "#9265cc",
                        }}
                        className="btn text-white"
                      >
                        Add Service
                      </button>
                    </div>
                  </div>
                </div>
                <div className="d-flex p-2 flex-wrap">
                  {selectedServices.map((servicesadd, index) => (
                    <div
                      className="border rounded btn text-white"
                      style={{ backgroundColor: "#9265cc" }}
                      key={index}
                    >
                      <span>{servicesadd}</span>
                      <button
                        onClick={(event) => removeService(index, event)}
                        className="btn btn-sm"
                      >
                        <FaTrash className="text-white" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="col-md-12 col-lg-12 ">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      Doctor's Bio<span className="text-danger">*</span>
                    </label>
                    <textarea
                      style={{ height: "100px" }}
                      maxLength={500}
                      value={profile?.doctorBio}
                      onChange={handleInputs}
                      onInput={handleWordCount}
                      className="form-control"
                      placeholder="Give Your Bio Here"
                      name="doctorBio"
                    />
                    <div className="text-muted mt-2">{wordCount}/50 Words</div>
                    {wordLimitExceeded && (
                      <div className="text-danger form-text">
                        Maximum word limit (50 words) reached.
                      </div>
                    )}
                    {errors.doctorBio?.required ? (
                      <span className="text-danger form-text">
                        This field is required.
                      </span>
                    ) : null}
                  </div>
                </div>
                <div className="add-customer-btns  mb-40 d-flex w-50 float-center">
                  <Link
                    style={{ backgroundColor: "#9265cc" }}
                    to="/DoctorViewprofile"
                    className="btn btn-cancel text-white border w-50 m-2"
                  >
                    Cancel
                  </Link>
                  <button
                    style={{ backgroundColor: "#9265cc" }}
                    type="submit"
                    className="btn btn-save text-white border w-50 m-2 "
                  >
                    Submit
                  </button>
                </div>
                <br />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorAddprofile;
