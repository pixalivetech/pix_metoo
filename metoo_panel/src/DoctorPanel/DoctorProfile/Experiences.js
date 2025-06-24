import React, { useEffect, useState, useRef } from "react";
import "./Edit.css";
import { getMonthYear } from "../../Utils/DateFormat";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { RiDeleteBin5Line } from "react-icons/ri";
import {
  getSingleDoctor,
  updateExperience,
  updateDoctor,
  deleteExperience,
} from "../../api/doctor";
import { getDoctorId } from "../../Utils/Storage";
import { Dialog, DialogContent } from "@mui/material";

const Experiences = () => {
  let initialStateExperience = {
    role: "",
    organization: "",
    from: "",
    to: "",
    location: "",
    skills: "",
  };
  let initialStateExperienceErrors = {
    role: {
      required: false,
    },
    organization: {
      required: false,
    },
    from: {
      required: false,
    },

    to: {
      required: false,
    },

    location: {
      required: false,
    },
    skills: {
      required: false,
    },
  };

  const [inputs, setInputs] = useState(initialStateExperience);
  const [experience, setExperience] = useState([]);
  const [experienceErrors, setExperienceErrors] = useState(
    initialStateExperienceErrors
  );
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const modal = useRef(null);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    const data = getDoctorId();
    getSingleDoctor(data)
      .then((res) => {
        const result = res?.data?.result?.experience;
        setExperience(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleExperienceInputs = (event) => {
    setInputs({ ...inputs, [event?.target?.name]: event?.target?.value });
    if (submitted) {
      const newError = handleExperienceValidation({
        ...inputs,
        [event.target.name]: event.target.value,
      });
      setExperienceErrors(newError);
    }
  };

  const handleExperienceValidation = (data) => {
    let error = initialStateExperienceErrors;
    if (data.role === "") {
      error.role.required = true;
    }
    if (data.organization === "") {
      error.organization.required = true;
    }
    if (data.from === "") {
      error.from.required = true;
    }

    if (data.to === "") {
      error.to.required = true;
    }

    if (data.location === "") {
      error.location.required = true;
    }
    if (data.skills === "") {
      error.skills.required = true;
    }

    return error;
  };

  const handleExperienceErrors = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const prop = obj[key];
        if (prop.required === true || prop.valid === true) {
          return false;
        }
      }
    }
    return true;
  };

  const handleSaveExperience = (event) => {
    event.preventDefault();
    const newErrorEducation = handleExperienceValidation(inputs);
    setExperienceErrors(newErrorEducation);
    setSubmitted(true);
    if (handleExperienceErrors(newErrorEducation)) {
      if (inputs?._id) {
        const data = {
          _id: getDoctorId(),
          experience: inputs,
        };
        updateExperience(data)
          .then((res) => {
            toast.success("Successfully Update EXPERIENCE");
            getUserDetails();
            modal.current.click();
          })
          .catch((err) => console.log(err));
      } else {
        const data = {
          _id: getDoctorId(),
          experience: inputs,
        };
        updateDoctor(data)
          .then((res) => {
            toast.success("Successfully Add Experience");
            getUserDetails();
            modal.current.click();
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message);
          });
      }
    }
  };

  const handleEditExperience = (data) => {
    setInputs(data);
    setSubmitted(false);
    setExperienceErrors(initialStateExperienceErrors);
  };

  const handleAddExperience = () => {
    setInputs(initialStateExperience);
    setSubmitted(false);
    setExperienceErrors(initialStateExperienceErrors);
  };

  const openPopup = (data) => {
    setOpen(true);
    setDeleteId(data);
  };

  const closePopup = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    const data = { _id: getDoctorId(), experienceId: deleteId };
    deleteExperience(data)
      .then((res) => {
        toast.success(res?.data?.message);
        getUserDetails();
        closePopup();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container p-0">
        <div className="card  shadow border-0 rounded mt-5 p-4">
          <div className="">
            <div className="d-flex justify-content-between align-items-start">
              <h3 className="fw-bold" style={{ color: "#9265cc" }}>
                Experience
              </h3>
              <div className="modal-btn">
                <a
                  className="text-decoration-none text-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#modal_5"
                  aria-controls="modal_5"
                  onClick={() => {
                    handleAddExperience();
                  }}
                  role="button"
                >
                  <h5>
                    Add &nbsp;
                    <IoMdAddCircleOutline />
                  </h5>
                </a>
              </div>
              <div
                className="modal fade "
                id="modal_5"
                aria-hidden="true"
                aria-labelledby="exampleModalToggleLabel"
                tabIndex="-1"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
              >
                <div className="modal-dialog modal-lg modal-dialog-centered  modal-dialog-scrollable">
                  <div className="modal-content border-0 shadow-lg rounded m-3">
                    <div
                      className="card w-100  border-0  shadow"
                      style={{ height: "500px" }}
                    >
                      <div className="modal-header d-flex justify-content-between align-items-center">
                        <p
                          className="modal-title fs-4 fw-bolder mb-3"
                          id="exampleModalToggleLabel"
                        >
                          {inputs?._id ? "Edit Experience" : "Add Experience"}
                        </p>
                        <button
                          type="button"
                          ref={modal}
                          className="btn-close bg-white border rounded-5 m-0 mb-3"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                      </div>
                      <div className="modal-body">
                        <div className="container-fluid">
                          <form
                            className="fw-bolder"
                            onSubmit={handleSaveExperience}
                          >
                            <div className=" row row-cols-lg-2 row-cols-1">
                              <div className="mb-3 col">
                                <label htmlFor="role" className="form-label">
                                  Role<span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="role"
                                  value={inputs?.role}
                                  onChange={handleExperienceInputs}
                                  placeholder="Enter Your Role"
                                  className="form-control"
                                  id="role"
                                />
                                {experienceErrors.role.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}
                              </div>
                              <div className="mb-3 col">
                                <label
                                  htmlFor="organization"
                                  className="form-label"
                                >
                                  Organization
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="organization"
                                  value={inputs?.organization}
                                  onChange={handleExperienceInputs}
                                  placeholder="Enter Your Organization"
                                  className="form-control"
                                  id="organization"
                                />
                                {experienceErrors.organization.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}
                              </div>

                              <div className="mb-3 col">
                                <label className="form-label">
                                  From<span className="text-danger">*</span>
                                </label>
                                <input
                                  type="date"
                                  name="from"
                                  value={inputs?.from}
                                  onChange={handleExperienceInputs}
                                  className="form-control"
                                  id="from"
                                />
                                {experienceErrors.from.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}
                              </div>
                              <div className="mb-3 col">
                                <label className="form-label">
                                  To <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="date"
                                  name="to"
                                  value={inputs?.to}
                                  onChange={handleExperienceInputs}
                                  className="form-control"
                                  id="to"
                                />

                                {experienceErrors.to.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}
                              </div>
                              <div className="mb-2">
                                <label htmlFor="skills" className="form-label">
                                  Worked Specialization
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="skills"
                                  value={inputs?.skills}
                                  onChange={handleExperienceInputs}
                                  placeholder="Enter Your Worked Specialization"
                                  className="form-control w-100"
                                  id="skills"
                                />
                                {experienceErrors.skills.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}
                              </div>

                              <div className="mb-2">
                                <label
                                  htmlFor="location"
                                  className="form-label"
                                >
                                  Location<span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="location"
                                  value={inputs?.location}
                                  onChange={handleExperienceInputs}
                                  placeholder="Enter Your Location"
                                  className="form-control w-100"
                                  id="location"
                                />
                                {experienceErrors.location.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}
                              </div>
                            </div>
                            <div className="modal-footer d-flex gap-3 mb-5">
                              <button type="submit" className="btn btn-primary">
                                {inputs?._id ? "Update" : "Save"}
                              </button>
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Cancel
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {experience?.map((data, index) => (
              <div key={index} className="card rounded mt-2 px-3 pt-1 ">
                <div className="container">
                  <div className="modal-btn d-flex gap-2 align-items-center justify-content-end">
                    <Link
                      onClick={() => handleEditExperience(data)}
                      className="btn  btn-sm btn-light  border-0"
                      data-bs-toggle="modal"
                      data-bs-target="#modal_5"
                      aria-controls="modal_5"
                      type="button"
                    >
                      <h4>
                        <FiEdit />
                      </h4>
                    </Link>
                    <Link
                      className="btn  btn-sm btn-light  border-0"
                      onClick={() => openPopup(data?._id)}
                      type="button"
                    >
                      <h4>
                        <RiDeleteBin5Line />
                      </h4>
                    </Link>
                  </div>
                </div>
                <div className="row row-cols-md-2 row-cols-1">
                  <div>
                    <h6 className="fw-bold" style={{ color: "#9265cc" }}>
                      Role
                    </h6>
                    <p className="fw-lighter"> {data?.role}</p>
                  </div>
                  <div>
                    <h6 className="fw-bold" style={{ color: "#9265cc" }}>
                      Organization
                    </h6>
                    <p className="fw-lighter"> {data?.organization}</p>
                  </div>
                  <div>
                    <h6 className="fw-bold" style={{ color: "#9265cc" }}>
                      From
                    </h6>
                    <p className="fw-lighter"> {getMonthYear(data?.from)}</p>
                  </div>
                  <div>
                    <h6 className="fw-bold" style={{ color: "#9265cc" }}>
                      To
                    </h6>
                    <p className="fw-lighter"> {getMonthYear(data?.to)}</p>
                  </div>
                  <div>
                    <h6 className="fw-bold" style={{ color: "#9265cc" }}>
                      Worked Speciality
                    </h6>
                    <p className="fw-lighter"> {data?.skills}</p>
                  </div>
                  <div>
                    <h6 className="fw-bold" style={{ color: "#9265cc" }}>
                      Location
                    </h6>
                    <p className="fw-lighter"> {data?.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Dialog open={open}>
        <DialogContent>
          <div className="text-center m-4">
            <h5 className="mb-4">
              Are you sure you want to remove <br /> the selected Experience
              Details ?
            </h5>
            <button
              type="button"
              className="btn btn-primary mx-3"
              onClick={handleDelete}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-light "
              onClick={closePopup}
            >
              No
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Experiences;
