import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import Masterheader from "../../Components/MasterHeader";
import Mastersidebar from "../../Components/MasterSidebar";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import { getAdminId, getUserId } from "../../Utils/Storage";
import { getFilterMasterOrder, getAllMasterOrder } from "../../api/masterorder";

export default function MasterOrderList() {
  const initialStateInputs = {
    orderNumber: "",
  };

  const [inputs, setInputs] = useState(initialStateInputs);
  const [openFilter, setOpenFilter] = useState(false);
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  const [order, setOrder] = useState([]);
  const [filter, setFilter] = useState(false);
  const page = Math.floor(pagination.from / pageSize) + 1;
  useEffect(() => {
    filter ? filterOrderList() : getAllMasterOrderList();
  }, [pagination.from, pagination.to]);

  const getAllMasterOrderList = () => {
    getAllMasterOrder()
      .then((res) => {
        const filteredOrders = res?.data?.result.flatMap((order) =>
          order.products
            .filter((product) => product)
            .map((product) => ({ ...order, products: [product] }))
        );
        const fromIndex = (page - 1) * pageSize;
        const toIndex = page * pageSize;
        const productsForPage = filteredOrders.slice(fromIndex, toIndex);

        setOrder(productsForPage);
        setPagination({ ...pagination, count: filteredOrders.length });
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

  const closeFilterPopup = () => {
    setOpenFilter(false);
  };

  const filterOrderList = (event) => {
    event?.preventDefault();
    setFilter(true);
    const data = {
      orderNumber: inputs?.orderNumber,
      limit: 10,
      page: pagination.from,
      companyId: getAdminId(),
      panelId: getUserId(),
    };
    getFilterMasterOrder(data)
      .then((res) => {
        setOrder(res?.data?.result?.orderList);
        setPagination({ ...pagination, count: res?.data?.result?.orderCount });
        closeFilterPopup();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const resetFilter = () => {
    setFilter(false);
    setInputs(initialStateInputs);
    getAllMasterOrderList();
  };

  const handleInputs = (event) => {
    setInputs({ ...inputs, [event.target.name]: event.target.value });
  };

  let totalIndex = 0;
  return (
    <div>
      <Mastersidebar />
      <Masterheader />

      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 style={{ color: "#9265cc" }}>Order Management</h1>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="col-xl-12">
            <div className="card mt-2">
              <div className="card-body">
                <div className="card-table">
                  <div className="table-responsive">
                    <table className=" table card-table dataTable text-center">
                      <thead>
                        <tr style={{ color: "#9265cc" }}>
                          <th>S No.</th>
                          <th>Company Name</th>
                          <th>Product Image</th>
                          <th>Product Name</th>
                          <th>Quantity</th>
                          <th>Ordered Person</th>
                          <th>Order Number</th>
                          <th>Mobile Number</th>
                          <th>Payment Method</th>
                          <th>Status</th>
                          <th>Return / Cancel</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order?.length === 0 ? (
                          <tr>
                            <td colSpan="9" className="form-text text-danger">
                              No data
                            </td>
                          </tr>
                        ) : (
                          order.map((orderItem, orderIndex) =>
                            orderItem.products.map((product, productIndex) => (
                              <tr key={`${orderIndex}-${productIndex}`}>
                                <td>#{++totalIndex}</td>
                                <td>
                                  {product?.panelId?.companyName
                                    ? product.panelId.companyName
                                    : product?.companyId?.companyName}
                                </td>
                                <td>
                                  <img
                                    className="avatar-sm-post"
                                    width={100}
                                    height={100}
                                    src={product?.productImage}
                                    alt="product image"
                                  />
                                </td>
                                <td>{product?.productName}</td>
                                <td>{product?.quantity}</td>
                                <td>
                                  {" "}
                                  {orderItem?.ShippingAddress?.length > 0 ? (
                                    <>
                                      <p>
                                        {" "}
                                        {orderItem.ShippingAddress[0].name}
                                      </p>
                                    </>
                                  ) : null}
                                </td>
                                <td>{orderItem?.orderNumber}</td>
                                <td>
                                  {" "}
                                  {orderItem?.ShippingAddress?.length > 0 ? (
                                    <>
                                      <p>
                                        {" "}
                                        {
                                          orderItem.ShippingAddress[0]
                                            .mobileNumber
                                        }
                                      </p>
                                    </>
                                  ) : null}
                                </td>
                                <td>{orderItem?.paymentMethod}</td>
                                <td>
                                  {product?.orderStatus
                                    ? product?.orderStatus
                                    : "-"}
                                </td>
                                <td>
                                  {product?.productStatus
                                    ? product?.productStatus
                                    : "-"}
                                </td>
                                <td>
                                  <div className="dropdown dropdown-action">
                                    <a
                                      href=""
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
                                          pathname: "/Masterorderview",
                                          search: `?id=${
                                            orderItem && orderItem?._id
                                          }&trackingNumber=${
                                            product?.trackingNumber
                                          }`,
                                        }}
                                      >
                                        <i className="far fa-eye me-2"></i>
                                        &nbsp;View
                                      </Link>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )
                        )}
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
      <Dialog open={openFilter} fullWidth maxWidth="sm">
        <DialogTitle>
          Filter Order
          <IconButton className="float-right" onClick={closeFilterPopup}>
            <i className="fa fa-times fa-xs" aria-hidden="true"></i>
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <form>
            <div className="from-group mb-3">
              <label className="form-label">Search by Order Number</label>
              <br />
              <input
                type="text"
                className="form-control"
                name="orderNumber"
                value={inputs?.orderNumber}
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
                onClick={filterOrderList}
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
