import { useEffect } from "react";
import DoctorHeader from "../../Components/DoctorHeader";
import DoctorSidebar from "../../Components/DoctorSidebar";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { getSinglePost } from "../../api/postDoctor";
import { localDate } from "../../Utils/DateFormat";

const DoctorViewpost = () => {
  const location = useLocation();
  const id = new URLSearchParams(location.search).get("id");
  const [post, setPost] = useState({});
  useEffect(() => {
    getPostDetails();
  }, []);

  const getPostDetails = () => {
    getSinglePost(id)
      .then((res) => {
        setPost(res?.data?.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <DoctorSidebar />
      <DoctorHeader />
      <div className="content-wrapper">
        <div className="content-header mt-3">
          <div className="content container-fluid w-75">
            <form>
              <div className="row d-flex justify-content-between">
                <div className="content-page-header">
                  <h5 style={{ color: "#9265cc" }} className=" text-bold">
                    View Post
                  </h5>
                </div>
                <div className="content-page-header">
                  <Link to="/Doctorpostlist">
                    <button
                      className="btn btn-outline border text-white rounded p-2"
                      style={{ backgroundColor: "#9265cc" }}
                    >
                      List Post
                    </button>
                  </Link>
                </div>
              </div>
              <div className="col">
                <div className="col-xl-12">
                  <div className="card mt-2 p-2">
                    <div className="card-body">
                      <div className="row">
                        <div className="col-lg-12 col-md-6 col-sm-12 text-center">
                          <div className="upload-img form-group">
                            <label style={{ color: "#9265cc" }}>Video</label>
                            <div
                              className="circle d-flex align-items-center justify-content-center"
                              id="profile-picture-circle"
                            >
                              <div className="p-image">
                                <video
                                  src={post?.video}
                                  width="100%"
                                  height="300px"
                                  controls
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}> Title</label>
                            <br />
                            <p>{post?.title}</p>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>
                              Description
                            </label>
                            <br />
                            <p>{post?.content}</p>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>
                              createdOn
                            </label>
                            <br />
                            <p>{localDate(post?.createdOn)}</p>
                          </div>
                        </div>

                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>Likes</label>
                            <br />
                            <p>{post?.likeCount}</p>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>Comments</label>
                            <br />
                            <p>{post?.commentCount}</p>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-12 col-sm-12">
                          <div className="form-group">
                            <label style={{ color: "#9265cc" }}>Share</label>
                            <br />
                            <p>{post?.shareCount}</p>
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

export default DoctorViewpost;
