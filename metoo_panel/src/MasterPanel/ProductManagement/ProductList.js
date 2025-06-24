import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Pagination,
} from "@mui/material";
import Masterheader from "../../Components/MasterHeader";
import Mastersidebar from "../../Components/MasterSidebar";
import {
  deleteMasterProduct,
  getFilterMasterProduct,
} from "../../api/masterproduct";
import { localDate } from "../../Utils/DateFormat";
import { getAdminId, getUserId } from "../../Utils/Storage";
import { toast } from "react-toastify";
import { templatePdf } from "../../Utils/PdfMake";
import { ExportCsvService } from "../../Utils/Excel";

export default function Masterproductlist() {
  const initialStateInputs = {
    productName: "",
    selling: "",
  };

  const [open, setOpen] = useState(false);
  const [inputs, setInputs] = useState(initialStateInputs);
  const [openFilter, setOpenFilter] = useState(false);
  const [deleteId, setDeleteId] = useState();
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const [product, setProduct] = useState();
  const [filter, setFilter] = useState(false);

  useEffect(() => {
    filter ? filterProductList() : getAllProduct();
  }, [pagination.from, pagination.to]);

  const getAllProduct = () => {
    const data = {
      limit: 10,
      page: pagination.from,
      companyId: getAdminId(),
      panelId: getUserId(),
    };

    getFilterMasterProduct(data)
      .then((res) => {
        setProduct(res?.data?.result?.productList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.productCount,
        });
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

  const deleteProductData = () => {
    deleteMasterProduct(deleteId)
      .then((res) => {
        toast.success(res?.data?.message);
        closePopup();
        getAllProduct();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openFilterPopup = () => {
    setOpenFilter(true);
  };

  const closeFilterPopup = () => {
    setOpenFilter(false);
  };

  const filterProductList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
      productName: inputs?.productName,
      selling: inputs?.selling,
      limit: 10,
      page: pagination.from,
      companyId: getAdminId(),
      panelId: getUserId(),
    };
    getFilterMasterProduct(data)
      .then((res) => {
        setProduct(res?.data?.result?.productList);
        setPagination({
          ...pagination,
          count: res?.data?.result?.productCount,
        });
        closeFilterPopup();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetFilter = () => {
    setFilter(false);
    setInputs(initialStateInputs);
    getAllProduct();
  };

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  const pdfDownload = (event) => {
    event?.preventDefault();
    const data = { panelId: getUserId(), companyId: getAdminId() };
    getFilterMasterProduct(data)
      .then((res) => {
        var result = res?.data?.result?.productList;
        var tablebody = [];
        tablebody.push([
          {
            text: "S.NO",
            fontSize: 11,
            alignment: "center",
            margin: [5, 5],
            bold: true,
          },
          {
            text: "Company Name",
            fontSize: 11,
            alignment: "center",
            margin: [5, 5],
            bold: true,
          },
          {
            text: "Product Name",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "post Date",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Original price",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "GST (%)",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Discount Percentage",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Discount Price",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Quantity",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
          {
            text: "Selling",
            fontSize: 11,
            alignment: "center",
            margin: [20, 5],
            bold: true,
          },
        ]);
        result.forEach((element, index) => {
          tablebody.push([
            {
              text: index + 1,
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
              border: [true, false, true, true],
            },
            {
              text: element?.panelId?.companyName ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
              border: [true, false, true, true],
            },

            {
              text: element?.productName ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },

            {
              text: localDate(element?.createdOn) ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.originalPrice ?? 0,
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.gstRate ?? 0,
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.discountPercentage ?? 0,
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.discountedPrice ?? 0,
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.quantity ?? 0,
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
            {
              text: element?.selling ?? "-",
              fontSize: 10,
              alignment: "left",
              margin: [5, 3],
            },
          ]);
        });
        templatePdf("Product List", tablebody, "landscape");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exportCsv = (event) => {
    event?.preventDefault();
    const data = { panelId: getUserId() };
    getFilterMasterProduct(data)
      .then((res) => {
        var result = res?.data?.result?.productList;
        let list = [];
        result?.forEach((res) => {
          list.push({
            companyName: res?.panelId?.companyName ?? "-",
            productName: res?.productName ?? "-",
            registrationDate: localDate(res?.createdOn) ?? "-",
            originalPrice: res?.originalPrice ?? 0,
            gstRate: res?.gstRate ?? 0,
            productDescription: res?.productDescription ?? "-",
            discountPercentage: res?.discountPercentage ?? 0,
            discountedPrice: res?.discountedPrice ?? 0,
            quantity: res?.quantity ?? 0,
            selling: res?.selling ?? "-",
          });
        });
        let header1 = [
          "companyName",
          "productName",
          "registrationDate",
          "originalPrice",
          "gstRate",
          "productDescription",
          "discountPercentage",
          "discountedPrice",
          "quantity",
          "selling",
        ];
        let header2 = [
          "Company Name",
          "Product Name",
          "Post Date",
          "Original Price",
          "GST",
          "Product Description",
          "Discount Percentage",
          "Discounted Price",
          "Quantity",
          "Selling",
        ];
        ExportCsvService.downloadCsv(
          list,
          "productList",
          "Product List",
          header1,
          header2
        );
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
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ color: "#9265cc" }}>Product List</h1>
              </div>
              <div className="col-sm-6">
                <ol className="breadcrumb d-flex justify-content-end align-items-center">
                  <li class="m-2">
                    <Link class="btn-filters" onClick={pdfDownload}>
                      <button className="btn btn-outline-primary p-2">
                        <span>
                          <i class="fa fa-file-pdf" aria-hidden="true"></i>
                        </span>
                      </button>
                    </Link>
                  </li>
                  <li class="m-2">
                    <Link class="btn-filters" onClick={exportCsv}>
                      <span>
                        <button className="btn btn-outline-primary p-2">
                          <i class="fa fa-file-excel" aria-hidden="true"></i>
                        </button>
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link class="btn-filters" onClick={openFilterPopup}>
                      <span>
                        <button className="btn btn-outline-primary p-2">
                          <i class="fa fa-filter" aria-hidden="true"></i>
                        </button>
                      </span>
                    </Link>
                  </li>
                  <li class="m-2">
                    <Link class="btn btn-pix-primary" to="/Masteraddproduct">
                      <button
                        className="btn btn-outline border text-white rounded-pill p-2"
                        style={{ backgroundColor: "#9265cc" }}
                      >
                        <i
                          class="fa fa-plus-circle me-2"
                          aria-hidden="true"
                        ></i>{" "}
                        Add Product
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
                          <th>Company Name</th>
                          <th>Product Image</th>
                          <th>Product GIF</th>
                          <th>Name of the Product</th>
                          <th>Original Price</th>
                          <th>GST(%)</th>
                          <th>Final Price</th>
                          <th>Discount(%)</th>
                          <th>Discount Price</th>
                          <th>Quantity</th>
                          <th>Selling</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product?.map((data, index) => (
                          <tr key={index}>
                            <td>#{pagination.from + index + 1}</td>
                            <td>
                              {data?.panelId?.companyName
                                ? data?.panelId?.companyName
                                : data?.companyId?.companyName}
                            </td>
                            <td>
                              <img
                                className="avatar-sm-post"
                                width={100}
                                height={100}
                                src={data?.productImage}
                                alt="User"
                              />
                            </td>
                            <td>
                              <img
                                className="avatar-sm-post"
                                width={100}
                                height={100}
                                src={data?.productGif}
                                alt="User"
                              />
                            </td>
                            <td>{data?.productName}</td>
                            <td>{data?.originalPrice}</td>
                            <td>{data?.gstRate}</td>
                            <td>{data?.finalPrice}</td>
                            <td>{data?.discountPercentage}</td>
                            <td>{data?.discountedPrice}</td>
                            <td>{data?.quantity}</td>
                            <td>{data?.selling}</td>
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
                                      pathname: "/Masterviewproduct",
                                      search: `?id=${data?._id}`,
                                    }}
                                  >
                                    <i className="far fa-eye me-2"></i>
                                    &nbsp;View
                                  </Link>
                                  {data?.companyId?._id === getAdminId() ? (
                                    <>
                                      <Link
                                        className="dropdown-item"
                                        to={{
                                          pathname: "/Mastereditproduct",
                                          search: `?id=${data?._id}`,
                                        }}
                                      >
                                        <i className="far fa-edit me-2"></i>
                                        &nbsp;Edit
                                      </Link>
                                      <Link
                                        className="dropdown-item"
                                        onClick={() => {
                                          openPopup(data?._id);
                                        }}
                                      >
                                        <i className="far fa-trash-alt me-2"></i>
                                        &nbsp;Delete
                                      </Link>
                                    </>
                                  ) : null}
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                        {product?.length === 0 ? (
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
              Are you sure you want to Delete <br /> the selected Product ?
            </h5>
            <button
              type="button"
              className="btn btn-save mx-3"
              onClick={deleteProductData}
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
      <Dialog open={openFilter} fullWidth maxWidth="sm">
        <DialogTitle>
          Filter Products
          <IconButton className="float-right" onClick={closeFilterPopup}>
            <i className="fa fa-times fa-xs" aria-hidden="true"></i>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form>
            <div className="from-group mb-3">
              <label className="form-label">Search By Selling</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="selling"
                value={inputs?.selling}
                onChange={handleInputs}
                placeholder="search..."
              />
            </div>
            <div>
              <button
                type="button"
                className="btn btn-cancel border text-white float-right bg"
                style={{ backgroundColor: "#9265cc" }}
                onClick={resetFilter}
              >
                Reset
              </button>
              <button
                type="submit"
                onClick={filterProductList}
                className="btn btn-save border text-white float-right mx-2"
                style={{ backgroundColor: "#9265cc" }}
              >
                Apply
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
