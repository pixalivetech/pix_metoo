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
  updateEducation,
  updateDoctor,
  deleteEducation,
} from "../../api/doctor";
import { getDoctorId } from "../../Utils/Storage";
import { Dialog, DialogContent } from "@mui/material";

const Qualification = () => {
  const initialStateEducation = {
    college: "",
    degree: "",
    specialization: "",
    yearOfPassing: "",
    from: "",
    to: "",
    percentage: "",
    grade: "",
  };

  const initialStateEducationErrors = {
    college: { required: false },
    degree: { required: false },
    specialization: { required: false },
    yearOfPassing: { required: false },
    from: { required: false },
    to: { required: false },
    percentage: { required: false },
    grade: { required: false },
  };

  const [inputs, setInputs] = useState(initialStateEducation);
  const [education, setEducation] = useState([]);
  const [educationErrors, setEducationErrors] = useState(
    initialStateEducationErrors
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
        const result = res?.data?.result?.qualification;
        setEducation(result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleEducationInputs = (event) => {
    setInputs({ ...inputs, [event?.target?.name]: event?.target?.value });
    if (submitted) {
      const newError = handleEducationValidation({
        ...inputs,
        [event.target.name]: event.target.value,
      });
      setEducationErrors(newError);
    }
  };
  const handleEducationValidation = (data) => {
    let error = initialStateEducationErrors;
    if (data.college === "") {
      error.college.required = true;
    }
    if (data.degree === "") {
      error.degree.required = true;
    }
    if (data.specialization === "") {
      error.specialization.required = true;
    }
    if (data.yearOfPassing === "") {
      error.yearOfPassing.required = true;
    }
    if (data.from === "") {
      error.from.required = true;
    }
    if (data.to === "") {
      error.to.required = true;
    }
    if (data.percentage === "") {
      error.percentage.required = true;
    }
    if (data.grade === "") {
      error.grade.required = true;
    }
    return error;
  };

  const handleEducationErrors = (obj) => {
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

  const handleSaveEducation = (event) => {
    event.preventDefault();
    const newErrorEducation = handleEducationValidation(inputs);
    setEducationErrors(newErrorEducation);
    setSubmitted(true);
    if (handleEducationErrors(newErrorEducation)) {
      if (inputs?._id) {
        const data = {
          _id: getDoctorId(),
          qualification: inputs,
        };
        updateEducation(data)
          .then((res) => {
            toast.success("Successfully Update Qualification");
            getUserDetails();
            modal.current.click();
          })
          .catch((err) => console.log(err));
      } else {
        const data = {
          _id: getDoctorId(),
          qualification: inputs,
        };
        updateDoctor(data)
          .then((res) => {
            toast.success("Successfully Add Qualification");
            getUserDetails();
            modal.current.click();
          })
          .catch((err) => {
            toast.error(err?.response?.data?.message);
          });
      }
    }
  };

  const handleEditEducation = (data) => {
    setInputs(data);
    setSubmitted(false);
    setEducationErrors(initialStateEducationErrors);
  };

  const handleAddEducation = () => {
    setInputs(initialStateEducation);
    setSubmitted(false);
    setEducationErrors(initialStateEducationErrors);
  };

  const openPopup = (data) => {
    setOpen(true);
    setDeleteId(data);
  };

  const closePopup = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    const data = { _id: getDoctorId(), qualificationId: deleteId };
    deleteEducation(data)
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
                Qualification
              </h3>
              <div className="modal-btn">
                <a
                  className="text-decoration-none text-dark"
                  data-bs-toggle="modal"
                  data-bs-target="#modal_6"
                  aria-controls="modal_6"
                  onClick={() => {
                    handleAddEducation();
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
                id="modal_6"
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
                          {inputs?._id ? "Edit Education" : "Add Education"}
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
                            onSubmit={handleSaveEducation}
                          >
                            <div className=" row row-cols-lg-2 row-cols-1">
                              <div className="mb-3 col">
                                <label htmlFor="college" className="form-label">
                                  Institute Name
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="college"
                                  value={inputs?.college}
                                  onChange={handleEducationInputs}
                                  placeholder="Your College Name"
                                  className="form-control"
                                  id="college"
                                />
                                {educationErrors.college.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}
                              </div>
                              <div className="mb-3 col">
                                <label htmlFor="degree" className="form-label">
                                  Degree<span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="degree"
                                  value={inputs?.degree}
                                  onChange={handleEducationInputs}
                                  placeholder="Your Degree"
                                  className="form-control"
                                  id="degree"
                                />
                                {educationErrors.degree.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}
                              </div>
                              <div className="mb-3 col">
                                <label
                                  htmlFor="specialization"
                                  className="form-label"
                                >
                                  specialization
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="specialization"
                                  value={inputs?.specialization}
                                  onChange={handleEducationInputs}
                                  placeholder="Specialization of Degree"
                                  className="form-control"
                                  id="specialization"
                                />
                                {educationErrors.specialization.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}
                              </div>
                              <div className="mb-3 col">
                                <label
                                  htmlFor="yearOfPassing"
                                  className="form-label"
                                >
                                  Passed Out Year
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="yearOfPassing"
                                  value={inputs?.yearOfPassing}
                                  onChange={handleEducationInputs}
                                  placeholder="Year of Passing"
                                  className="form-control"
                                  id="yearOfPassing"
                                />
                                {educationErrors.yearOfPassing.required ? (
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
                                  onChange={handleEducationInputs}
                                  className="form-control"
                                  id="from"
                                />
                                {educationErrors.from.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}
                              </div>
                              <div className="mb-3 col">
                                <label className="form-label">
                                  To<span className="text-danger">*</span>
                                </label>
                                <input
                                  type="date"
                                  name="to"
                                  value={inputs?.to}
                                  onChange={handleEducationInputs}
                                  className="form-control"
                                  id="to"
                                />

                                {educationErrors.to.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}
                              </div>
                              <div className="mb-2">
                                <label
                                  htmlFor="percentage"
                                  className="form-label"
                                >
                                  Percentage
                                  <span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="percentage"
                                  value={inputs?.percentage}
                                  onChange={handleEducationInputs}
                                  placeholder="Enter Percentage Ex:100 %"
                                  className="form-control w-100"
                                  id="percentage"
                                />
                                {educationErrors.percentage.required ? (
                                  <span className="form-text text-danger">
                                    This field is required.
                                  </span>
                                ) : null}
                              </div>
                              <div className="mb-2">
                                <label htmlFor="grade" className="form-label">
                                  Grade<span className="text-danger">*</span>
                                </label>
                                <input
                                  type="text"
                                  name="grade"
                                  value={inputs?.grade}
                                  onChange={handleEducationInputs}
                                  placeholder="Enter Grade"
                                  className="form-control w-100"
                                  id="grade"
                                />
                                {educationErrors.grade.required ? (
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
            {education?.map((data, index) => (
              <div key={index} className="card rounded mt-2 px-3 pt-1 ">
                <div className="container">
                  <div className="modal-btn d-flex gap-2 align-items-center justify-content-end">
                    <Link
                      onClick={() => handleEditEducation(data)}
                      className="btn  btn-sm btn-light  border-0"
                      data-bs-toggle="modal"
                      data-bs-target="#modal_6"
                      aria-controls="modal_6"
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
                      College
                    </h6>
                    <p className="fw-lighter"> {data?.college}</p>
                  </div>
                  <div>
                    <h6 className="fw-bold" style={{ color: "#9265cc" }}>
                      Degree
                    </h6>
                    <p className="fw-lighter"> {data?.degree}</p>
                  </div>
                  <div>
                    <h6 className="fw-bold" style={{ color: "#9265cc" }}>
                      Specialization
                    </h6>
                    <p className="fw-lighter"> {data?.specialization}</p>
                  </div>
                  <div>
                    <h6 className="fw-bold" style={{ color: "#9265cc" }}>
                      YearOfPassing
                    </h6>
                    <p className="fw-lighter"> {data?.yearOfPassing}</p>
                  </div>
                  <div>
                    <h6 className="fw-bold" style={{ color: "#9265cc" }}>
                      Percentage
                    </h6>
                    <p className="fw-lighter"> {data?.percentage}</p>
                  </div>
                  <div>
                    <h6 className="fw-bold" style={{ color: "#9265cc" }}>
                      Grade
                    </h6>
                    <p className="fw-lighter"> {data?.grade}</p>
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
                </div>
              </div>
            ))}
            {/* Education Modal */}
          </div>
        </div>
      </div>
      <Dialog open={open}>
        <DialogContent>
          <div className="text-center m-4">
            <h5 className="mb-4">
              Are you sure you want to remove <br /> the selected Qualification
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

export default Qualification;
