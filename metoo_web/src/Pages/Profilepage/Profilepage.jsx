import React from "react";
import { useState, useEffect } from "react";
import { getsingleuser } from "../../Api/user";
import { getUserId } from "../../Utils/Storage";

import "./Profilepage.css";
import Header from "../../Components/Header/Header";
const Profilepage = () => {
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
      <section class="vh-50" style={{ backgroundcolor: "#f4f5f7" }}>
        <div class="container  py-2 mt-3 w-75 h-100">
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
                      alt="Avatar"
                      className="img-fluid my-5 img-display-before rounded-circle rondimg"
                      style={{ width: "100px", height: "100px" }}
                    />
                    <h5>{user?.name ? user?.name : "-"}</h5>
                    <a
                      href="/ProfilePageedit"
                      className="text_under_font text-white fw-bold"
                    >
                      {" "}
                      <i className="bi bi-pencil-square text-light "></i> Edit
                      Profile{" "}
                    </a>
                  </div>
                  <div class="col-md-8">
                    <div class="card-body  p-4">
                      <h6 className="fs-3">User Profile</h6>
                      <hr class="mt-0 mb-4" />
                      <div class="row pt-1">
                        <div class="col-6 mb-3">
                          <h6>Name</h6>
                          <p class="text-muted">
                            {user?.name ? user?.name : "-"}
                          </p>
                        </div>
                        <div class="col-6 mb-3"></div>
                      </div>{" "}
                      <br />
                      <div class="row pt-1">
                        <div class="col-6 mb-3">
                          <h6>E-mail</h6>
                          <p class="text-muted">
                            {user?.email ? user?.email : "-"}
                          </p>
                        </div>
                        <div class="col-6 mb-3"></div>
                      </div>{" "}
                      <br />
                      <div class="row pt-1">
                        <div class="col-6 mb-3">
                          <h6>Mobile Number</h6>
                          <p class="text-muted">
                            {user?.mobileNumber ? user?.mobileNumber : "-"}
                          </p>
                        </div>
                        <div class="col-6 mb-3"></div>
                      </div>{" "}
                      <br />
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

export default Profilepage;
