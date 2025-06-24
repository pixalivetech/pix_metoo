import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { deletePost, getFilterPost } from "../../api/postDoctor";
import { toast } from "react-toastify";
import { Dialog, DialogContent, Pagination } from "@mui/material";
import { localDate } from "../../Utils/DateFormat";
import { getDoctorId } from "../../Utils/Storage";
import DoctorHeader from "../../Components/DoctorHeader";
import DoctorSidebar from "../../Components/DoctorSidebar";

const DoctorPostlist = () => {
  const [open, setOpen] = useState(false);

  const [deleteId, setDeleteId] = useState();
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const [post, setPost] = useState();

  useEffect(() => {
    getAllPostList();
  }, [pagination.from, pagination.to]);

  const getAllPostList = () => {
    const data = {
      limit: 10,
      page: pagination.from,
      doctorId: getDoctorId(),
    };
    getFilterPost(data)
      .then((res) => {
        setPost(res?.data?.result?.postList);
        setPagination({ ...pagination, count: res?.data?.result?.postCount });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handlePageChange = (event, page) => {
    const from = (page - 1) * pageSize;
    const to = (page - 1) * pageSize + pageSize;
    setPagination({ ...pagination, from: from, to: to });
  };

  const openPopup = (data) => {
    setOpen(true);
    setDeleteId(data);
  };

  const closePopup = () => {
    setOpen(false);
  };

  const deletePostData = () => {
    deletePost(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getAllPostList();
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
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ color: "#9265cc" }}>Post List</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb d-flex justify-content-end align-items-center">
                  <li class="m-2">
                    <Link class="btn btn-pix-primary" to="/DoctorAddpost">
                      <button
                        className="btn btn-outline border text-white  p-2"
                        style={{ backgroundColor: "#9265cc" }}
                      >
                        <i
                          class="fa fa-plus-circle me-2"
                          aria-hidden="true"
                        ></i>{" "}
                        Add Post
                      </button>
                    </Link>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-xl-12">
            <div className="card mt-2">
              <div className="card-body">
                <div className="card-table">
                  <div className="table-responsive">
                    <table className=" table card-table dataTable text-center">
                      <thead>
                        <tr style={{ color: "#9265cc" }}>
                          <th>S No</th>
                          <th> Title</th>
                          <th>Video</th>
                          <th>Description</th>
                          <th>createdOn</th>
                          <th>Likes</th>
                          <th>Comment</th>
                          <th>Share</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {post?.map((data, index) => (
                          <tr key={index}>
                            <td>#{pagination.from + index + 1}</td>
                            <td>{data?.title}</td>
                            <td>
                              <video
                                className="avatar-sm-post"
                                height={100}
                                width={200}
                              >
                                <source src={data?.video} type="video/mp4" />
                                <source src={data?.video} type="video/ogg" />
                              </video>
                            </td>
                            <td>{data?.content}</td>
                            <td>{localDate(data?.createdOn)}</td>
                            <td>{data?.likeCount}</td>
                            <td>{data?.commentCount}</td>
                            <td>{data?.shareCount}</td>

                            <td>
                              <div className="dropdown dropdown-action">
                                <a
                                  href="/#"
                                  className="action-icon dropdown-toggle"
                                  data-bs-toggle="dropdown"
                                  aria-expanded="false"
                                >
                                  <i className="fe fe-more-horizontal"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right">
                                  <Link
                                    className="dropdown-item"
                                    to={{
                                      pathname: "/DoctorEditpost",
                                      search: `?id=${data?._id}`,
                                    }}
                                  >
                                    <i className="far fa-edit me-2"></i>Edit
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    to={{
                                      pathname: "/DoctorViewpost",
                                      search: `?id=${data?._id}`,
                                    }}
                                  >
                                    <i className="far fa-eye me-2"></i>View
                                  </Link>
                                  <Link
                                    className="dropdown-item"
                                    onClick={() => {
                                      openPopup(data?._id);
                                    }}
                                  >
                                    <i className="far fa-trash-alt me-2"></i>
                                    Delete
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {post?.length === 0 ? (
                          <tr>
                            <td className="form-text text-danger">No data</td>
                          </tr>
                        ) : null}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="float-end my-2">
                  <Pagination
                    count={Math.ceil(pagination.count / pageSize)}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={open}>
        <DialogContent>
          <div className="text-center m-4">
            <h5 className="mb-4">
              Are you sure you want to Delete <br /> the selected Post ?
            </h5>
            <button
              type="button"
              className="btn btn-save mx-3"
              onClick={deletePostData}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-cancel "
              onClick={closePopup}
            >
              No
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DoctorPostlist;
