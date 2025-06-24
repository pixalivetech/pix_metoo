import React, { useState, useEffect } from "react";
import Mastersidebar from "../../../Components/MasterSidebar";
import Masterheader from "../../../Components/MasterHeader";
import { getSingleUsers } from "../../../api/contact";
import { Link, useLocation } from "react-router-dom";

const ViewContact = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [contact, setContact] = useState();

  useEffect(() => {
    getContactDetails();
  }, []);

  const getContactDetails = () => {
    getSingleUsers(id)
      .then((res) => {
        setContact(res?.data?.result);
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
                  <h5 style={{ color: "#9265cc" }} className=" text-bold">
                    View Contact
                  </h5>
                </div>
                <div className="content-page-header">
                  <Link to="/Mastercontactlist">
                    <button
                      className="btn border text-white  p-2"
                      style={{ backgroundColor: "#9265cc" }}
                    >
                      Contact List
                    </button>
                  </Link>
                </div>
              </div>
              <div className="container">
                <div className="row">
                  <div className="col-12">
                    <div className="card mt-2 p-2">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}> Name</label>
                              <br />
                              <span>{contact?.name}</span>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>Email</label>
                              <br />
                              <span>{contact?.email}</span>
                            </div>
                          </div>
                        </div>

                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>
                                Mobile Number
                              </label>
                              <br />
                              <span>{contact?.mobileNumber}</span>
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-sm-12">
                            <div className="form-group">
                              <label style={{ color: "#9265cc" }}>
                                Message
                              </label>
                              <br />
                              <span>{contact?.messages}</span>
                            </div>
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

export default ViewContact;
