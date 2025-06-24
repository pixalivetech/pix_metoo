import React, { useState, useEffect } from "react";
import Mastersidebar from "../../Components/MasterSidebar";
import Masterheader from "../../Components/MasterHeader";
import { Link, useLocation } from "react-router-dom";
import { getSingleCategory } from "../../api/category";

const MasterViewCategory = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [category, setCategory] = useState();

  useEffect(() => {
    getCategoryDetails();
  }, []);

  const getCategoryDetails = () => {
    getSingleCategory(id)
      .then((res) => {
        setCategory(res?.data?.result);
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
                    View Category
                  </h5>
                </div>
                <div className="content-page-header">
                  <Link to="/Mastercategorylist">
                    <button
                      className="btn btn-outline border text-white  p-2"
                      style={{ backgroundColor: "#9265cc" }}
                    >
                      Category List
                    </button>
                  </Link>
                </div>
              </div>
              <div className="col">
                <div className="col-xl-12">
                  <div className="card mt-2 p-2">
                    <div className="card-body  w-100">
                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group text-center">
                          <label style={{ color: "#9265cc" }}>
                            Category Image
                          </label>
                          <br />
                          <div
                            className="circle d-flex align-items-center justify-content-center"
                            id="profile-picture-circle"
                          >
                            <div className="p-image">
                              {category?.categoryImage ? (
                                <img
                                  className="avatar-sm-post rounded-circle border p-2"
                                  src={category?.categoryImage}
                                  alt="User"
                                  width={200}
                                  height={200}
                                />
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-12 col-md-12 col-sm-12">
                        <div className="form-group">
                          <label style={{ color: "#9265cc" }}>
                            Category Name
                          </label>
                          <br />
                          <span>{category?.categoryName}</span>
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

export default MasterViewCategory;
