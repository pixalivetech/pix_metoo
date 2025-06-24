import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/SideBar";
import { Link } from "react-router-dom";
import { getsingleProfile } from "../../api/profile";
import { getUserId } from "../../Utils/Storage";

function ProfilePage() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    getProfileDetails();
  }, []);

  const getProfileDetails = () => {
    const id = getUserId();
    getsingleProfile(id)
      .then((res) => {
        setProfile(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Sidebar />
      <Header />
      <div className="content-wrapper">
        <div className="content-header mt-3">
          <div className="content container-fluid w-75">
            <div className=" d-flex justify-content-between">
              <div className="content-page-header">
                <h5 className="text-bold" style={{ color: "#9265cc" }}>
                  View Profile
                </h5>
              </div>
              <div>
                <Link to="/profile">
                  <button
                    className="btn btn-outline border text-white  p-2"
                    style={{ backgroundColor: "#9265cc" }}
                  >
                    Edit Profile
                  </button>
                </Link>
              </div>
            </div>
            <div className="row p-3">
              <div className="col-lg-12 ">
                <div class="upload-img form-group text-center">
                  <label style={{ color: "#9265cc" }}>Company Logo</label>
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
                          width={160}
                          height={160}
                        />
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-group">
                  <label style={{ color: "#9265cc" }}>Name</label>
                  <br />
                  <span>{profile?.name}</span>
                </div>
              </div>
              <div className="col-lg-6  ">
                <div className="form-group">
                  <label style={{ color: "#9265cc" }}>E mail</label>
                  <br />
                  <span>{profile?.email}</span>
                </div>
              </div>
              <div className="col-lg-6  ">
                <div className="form-group">
                  <label style={{ color: "#9265cc" }}>Mobile Number</label>
                  <br />
                  <span>{profile?.mobileNumber}</span>
                </div>
              </div>
              <div className="col-lg-6 ">
                <div className="form-group">
                  <label style={{ color: "#9265cc" }}>Company Name</label>
                  <br />
                  <span>
                    {profile?.companyName ? profile?.companyName : "-"}
                  </span>
                </div>
              </div>
              <div className="col-lg-6 ">
                <div className="form-group">
                  <label style={{ color: "#9265cc" }}>Company Address</label>
                  <br />
                  <span>
                    {profile?.companyAddress ? profile?.companyAddress : "-"}
                  </span>
                </div>
              </div>
              <div className="col-lg-6 ">
                <div className="form-group">
                  <label style={{ color: "#9265cc" }}>Types Of Business</label>
                  <br />
                  <span>
                    {profile?.typesOfBusiness ? profile?.typesOfBusiness : "-"}
                  </span>
                </div>
              </div>
              <div className="col-lg-6 ">
                <div className="form-group">
                  <label style={{ color: "#9265cc" }}>City</label>
                  <br />
                  <span>{profile?.city ? profile?.city : "-"}</span>
                </div>
              </div>
              <div className="col-lg-6 ">
                <div className="form-group">
                  <label style={{ color: "#9265cc" }}>State</label>
                  <br />
                  <span>{profile?.state ? profile?.state : "-"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProfilePage;
