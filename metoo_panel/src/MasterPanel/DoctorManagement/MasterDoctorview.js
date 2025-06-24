import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getSingleDoctor } from "../../api/doctor";
import Mastersidebar from "../../Components/MasterSidebar";
import Masterheader from "../../Components/MasterHeader";

const MasterDoctorview = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [doctor, setDoctor] = useState();

  useEffect(() => {
    getDoctorDetails();
  }, []);

  const getDoctorDetails = () => {
    getSingleDoctor(id)
      .then((res) => {
        setDoctor(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Mastersidebar />
      <Masterheader />
      <div className="content-wrapper">
        <div className="content-header mt-3">
          <div className="content container-fluid w-75">
            <form>
              <div className="row d-flex justify-content-between">
                <div className="content-page-header">
                  <h5 className=" text-bold" style={{ color: "#9265cc" }}>
                    View Profile
                  </h5>
                </div>
                <div className="content-page-header">
                  <Link to="/Masterdoctorlist">
                    <button
                      className="btn btn-outline border text-white  p-2"
                      style={{ backgroundColor: "#9265cc" }}
                    >
                      List Doctors
                    </button>
                  </Link>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 text-center mb-3">
                  <div className="upload-img form-group">
                    <label style={{ color: "#9265cc" }}>Doctor Image</label>
                    <div
                      className="circle d-flex align-items-center justify-content-center"
                      id="profile-picture-circle"
                    >
                      <div className="p-image">
                        {doctor?.profileImage ? (
                          <img
                            className="avatar-sm-post"
                            src={doctor?.profileImage}
                            alt="User"
                            width={160}
                            height={160}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-12">
                  <div className="card mt-2 p-2">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>
                              Doctor Name
                            </label>
                            <br />
                            <span>{doctor?.doctorName}</span>
                          </div>
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>Language</label>
                            <br />
                            <span>{doctor?.language}</span>
                          </div>
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>
                              Landline Number
                            </label>
                            <br />
                            <span>{doctor?.landLineNumber}</span>
                          </div>
                        </div>
                        <div className="col-lg-6">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>
                              Phone Number
                            </label>
                            <br />
                            <span>{doctor?.phone}</span>
                          </div>
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>Email</label>
                            <br />
                            <span>{doctor?.email}</span>
                          </div>
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>Gender</label>
                            <br />
                            <span>{doctor?.gender}</span>
                          </div>
                        </div>
                        <div className="col-lg-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>
                              Specialization
                            </label>
                            <br />
                            <span>{doctor?.specialization.join(", ")}</span>
                          </div>
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
};

export default MasterDoctorview;
