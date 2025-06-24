import React, { useState, useEffect } from "react";
import "./ProfileAddress.css";
import Header from "../../Components/Header/Header";
import { getsingleuser } from "../../Api/user";
import { getUserId } from "../../Utils/Storage";

const ProfileAddress = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    const id = getUserId();
    getsingleuser(id)
      .then((res) => {
        setUser(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header />
      <section class="vh-75" style={{ backgroundcolor: "#f4f5f7" }}>
        <div class="container mt-3 py-5 w- h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-lg-12 mb-4 mb-lg-0">
              <div class="card mb-3" style={{ borderradius: ".5rem" }}>
                <div class="row g-0">
                  <div
                    class="col-md-3 gradient-custom text-center text-white"
                    style={{
                      bordertopleftradius: ".5rem",
                      borderbottomleftradius: ".5rem",
                    }}
                  >
                    <img
                      src={
                        user?.profileImage ??
                        "https://s3.ap-south-1.amazonaws.com/pixalive.me/empty_profile.png"
                      }
                      alt="Profile Pic"
                      class="img-fluid my-5"
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                      }}
                    />
                    <h5>{user?.name ? user?.name : "-"}</h5>
                    <a href="/ProfileAddressEdit">
                      {" "}
                      <i className="bi bi-pencil-square text-dark"></i>{" "}
                    </a>
                  </div>
                  <div class="col-md-8">
                    <div class="card-body  p-4">
                      <h6 className="fs-3">Profile Address</h6>
                      <hr class="mt-0 mb-4" />
                      <div class="row pt-1">
                        <div class="col-6 mb-3">
                          <h6>Name</h6>
                          <p class="text-muted">
                            {user?.fullName ? user?.fullName : "-"}
                          </p>
                        </div>
                        <div class="col-6 mb-3">
                          <h6>Mobile Number</h6>
                          <p class="text-muted">
                            {user?.alternativeMobileNumber
                              ? user?.alternativeMobileNumber
                              : "-"}
                          </p>
                        </div>
                      </div>

                      <div class="row pt-1">
                        <div class="col-6 mb-3">
                          <h6>Address</h6>
                          <p class="text-muted">
                            {user?.address ? user?.address : "-"}
                          </p>
                        </div>
                        <div class="col-6 mb-3">
                          <h6>City</h6>
                          <p class="text-muted">
                            {user?.city ? user?.city : "-"}
                          </p>
                        </div>
                      </div>

                      <div class="row pt-1">
                        <div class="col-6 mb-3">
                          <h6>State</h6>
                          <p class="text-muted">
                            {user?.state ? user?.state : "-"}
                          </p>
                        </div>
                        <div class="col-6 mb-3">
                          <h6>Pin Code</h6>
                          <p class="text-muted">
                            {user?.pincode ? user?.pincode : "-"}
                          </p>
                        </div>
                      </div>

                      <div class="row pt-1">
                        <div class="col-sm-6 mb-3">
                          <h6>Land Mark</h6>
                          <p class="text-muted">
                            {user?.landmark ? user?.landmark : "-"}
                          </p>
                        </div>
                      </div>

                      <hr class="mt-0 mb-4" />
                      <a href="/" className="btn_text_change_clr">
                        <button
                          type="button"
                          class="btn gradient-custom text-white fw-bold"
                        >
                          Back
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProfileAddress;
