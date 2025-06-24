import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getFilterQA } from "../../api/faq";
import { Pagination } from "@mui/material";
import DoctorHeader from "../../Components/DoctorHeader";
import DoctorSidebar from "../../Components/DoctorSidebar";
import { getDoctorId } from "../../Utils/Storage";

const DoctorChatlist = () => {
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const [doctor, setDoctor] = useState();

  useEffect(() => {
    getAllDoctorList();
  }, [pagination.from, pagination.to]);

  const getAllDoctorList = () => {
    const data = {
      limit: 10,
      page: pagination.from / pageSize + 1,
    };
    const doctorId = getDoctorId();
    getFilterQA(data)
      .then((res) => {
        console.log("edwin", res);
        const filteredDoctor = res?.data?.result?.faqList;
        console.log("sarath", filteredDoctor);
        setDoctor(filteredDoctor);
        setPagination({ ...pagination, count: res?.data?.result?.faqCount });
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

  return (
    <div>
      <DoctorSidebar />
      <DoctorHeader />

      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ color: "#9265cc" }}>Questions List</h1>
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
                          <th>S No.</th>
                          <th>Name</th>
                          <th>Question</th>
                          <th>Answer</th>
                          <th>Reply</th>
                        </tr>
                      </thead>
                      <tbody>
                        {doctor?.map((data, index) => (
                          <tr key={index}>
                            <td>#{pagination.from + index + 1}</td>
                            <td>{data?.userId?.name}</td>
                            <td>{data?.question}</td>
                            <td>
                              {data?.answers
                                .filter(
                                  (item) => item?.doctorId === getDoctorId()
                                )
                                .map((item, index) => (
                                  <div key={index}>{item.answer}</div>
                                ))}
                            </td>
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
                                      pathname: "/Doctorchat",
                                      search: `?id=${data?._id}`,
                                    }}
                                  >
                                    <i className="far fa-eye me-2"></i>View
                                  </Link>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {doctor?.length === 0 ? (
                          <tr>
                            <td className="form-text text-danger" colSpan="9">
                              No data
                            </td>
                          </tr>
                        ) : null}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="float-right my-2">
                  <Pagination
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
    </div>
  );
};

export default DoctorChatlist;
