import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { getSinglePost } from "../../api/postDoctor";
import { localDate } from "../../Utils/DateFormat";
import Mastersidebar from "../../Components/MasterSidebar";
import Masterheader from "../../Components/MasterHeader";

const MasterDoctorpostview = () => {
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
      <Mastersidebar />
      <Masterheader />
      <div className="content-wrapper">
        <div className="content-header mt-3">
          <div className="row justify-content-start mb-2">
            <div className="col-12 col-md-6">
              <h5 className="text-bold mx-5" style={{ color: "#9265cc" }}>
                View Post
              </h5>
            </div>
            <div className="col-12 col-md-6 mt-2 mt-md-0 text-md-start">
              <div style={{ marginLeft: "250px" }}>
                <Link to="/MasterDoctorpostlist">
                  <button
                    className="btn btn-outline border text-white rounded-pill"
                    style={{ backgroundColor: "#9265cc" }}
                  >
                    Post List
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="content container-fluid">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="text-center">
                  <video
                    src={post?.video}
                    width="100%"
                    height="250px"
                    controls
                    style={{ maxWidth: "500px" }}
                  />
                </div>
              </div>
            </div>
            <div className="row justify-content-center mt-4">
              <div className="col-12 col-md-6">
                <div className="form-group">
                  <label style={{ color: "#9265cc" }}>Name</label>
                  <br />
                  <span>{post?.title}</span>
                </div>
                <div className="form-group">
                  <label style={{ color: "#9265cc" }}>Created On</label>
                  <br />
                  <span>{localDate(post?.createdOn)}</span>
                </div>
                <div className="form-group">
                  <label style={{ color: "#9265cc" }}>Description</label>
                  <br />
                  <span>{post?.content}</span>
                </div>
                <div className="form-group">
                  <label style={{ color: "#9265cc" }}>Likes</label>
                  <br />
                  <span>{post?.likeCount}</span>
                </div>
                <div className="form-group">
                  <label style={{ color: "#9265cc" }}>Comment</label>
                  <br />
                  <span>{post?.commentCount}</span>
                </div>
                <div className="form-group">
                  <label style={{ color: "#9265cc" }}>Share</label>
                  <br />
                  <span>{post?.shareCount}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MasterDoctorpostview;
