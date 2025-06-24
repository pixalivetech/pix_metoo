import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DoctorHeader from "../../Components/DoctorHeader";
import DoctorSidebar from "../../Components/DoctorSidebar";
import Experiences from "./Experiences";
import Qualification from "./Qualification";
import { getSingleDoctor } from "../../api/doctor";
import { getDoctorId } from "../../Utils/Storage";

function DoctorViewprofile() {
  const [profile, setProfile] = useState();

  useEffect(() => {
    getProfileDetails();
  }, []);

  const getProfileDetails = () => {
    const id = getDoctorId();
    getSingleDoctor(id)
      .then((res) => {
        setProfile(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <DoctorSidebar />
      <DoctorHeader />
      <div className="container-fluid">
        <div className="row">
          <div class="col-md-3"></div>
          <div className="col-md-7 p-3">
            <h5 style={{ color: "#9265cc" }} className=" text-bold">
              View Profile
            </h5>
            <div className="content-header mt-3">
              <ol className="breadcrumb d-flex justify-content-end align-items-center">
                <li class="m-2">
                  <Link to="/DoctorAddprofile">
                    <button
                      style={{ backgroundColor: "blueviolet" }}
                      className="btn border text-white p-2"
                    >
                      <span>
                        <i class="fas fa-edit" aria-hidden="true"></i>
                        Add Profile
                      </span>
                    </button>
                  </Link>
                </li>
              </ol>
            </div>
            <div className="content container-fluid">
              <div className="row">
                <div className="col-md-12 col-lg-6">
                  <div class="upload-img form-group text-center">
                    <label style={{ color: "#9265cc" }}>Profile Image</label>
                    <div
                      class="circle d-flex align-items-center justify-content-center"
                      id="profile-picture-circle"
                    >
                      <div class="p-image">
                        {profile?.profileImage ? (
                          <img
                            className="avatar-sm-post rounded-circle"
                            src={profile?.profileImage}
                            alt="User"
                            width={150}
                            height={150}
                            name="profileImage"
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex">
                <div className="col-md-12 col-lg-6 ">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}> Name</label>
                    <p>{profile?.doctorName ? profile?.doctorName : "-"}</p>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>E-mail</label>
                    <p>{profile?.email ? profile?.email : "-"}</p>
                  </div>
                </div>
              </div>
              <div className="d-flex">
                <div className="col-md-12 col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>Gender</label>
                    <p>{profile?.gender ? profile?.gender : "-"}</p>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>Mobile number</label>
                    <p>{profile?.phone ? profile?.phone : "-"}</p>
                  </div>
                </div>
              </div>
              <div className="d-flex">
                <div className="col-md-12 col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>LandLineNumber</label>
                    <p>{profile?.landLineNumber}</p>
                  </div>
                </div>

                <div className="col-md-12 col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>Language</label>
                    <p>{profile?.language ? profile?.language : "-"}</p>
                  </div>
                </div>
              </div>
              <div className="d-flex">
                <div className="col-md-12 col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      Overall Qualification
                    </label>
                    <p>
                      {profile?.overAllQualification
                        ? profile?.overAllQualification
                        : "-"}
                    </p>
                  </div>
                </div>
                <div className="col-md-12 col-lg-6">
                  <div className="form-group">
                    <label style={{ color: "#9265cc" }}>
                      overall Experience
                    </label>
                    <p>{profile?.overAllExperience}</p>
                  </div>
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <div className="form-group">
                  <label style={{ color: "#9265cc" }}>Speciality</label>
                  <p>{profile?.specialization?.join(",")}</p>
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <div className="form-group">
                  <label style={{ color: "#9265cc" }}>Services</label>
                  <p>{profile?.services?.join(",")}</p>
                </div>
              </div>
              <div className="col-md-12 col-lg-6">
                <div className="form-group">
                  <label style={{ color: "#9265cc" }}>Address</label>
                  <p>{profile?.address ? profile?.address : "-"}</p>
                </div>
              </div>
              <div className=" col-md-12 ">
                <label style={{ color: "#9265cc" }} maxLength={500}>
                  Your's Bio
                </label>
                <br />
                <span style={{ height: "100px", width: "100px" }}>
                  {profile?.doctorBio}
                </span>
              </div>
              <Qualification />
              <Experiences />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorViewprofile;
