import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import Masterheader from "../../Components/MasterHeader";
import Mastersidebar from "../../Components/MasterSidebar";
import { getAdminId, getUserId } from "../../Utils/Storage";
import {
  getAllMasterOrder,
  updateOrderMasterStatus,
} from "../../api/masterorder";

export default function MasterTrackOrderList() {
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const [order, setOrder] = useState([]);
  const page = Math.floor(pagination.from / pageSize) + 1;
  useEffect(() => {
    getAllMasterOrderList();
  }, [pagination.from, pagination.to]);

  const getAllMasterOrderList = () => {
    const data = {
      limit: 10,
      page: pagination.from,
      panelId: getUserId(),
      companyId: getAdminId(),
    };
    getAllMasterOrder(data)
      .then((res) => {
        const filteredOrders = res?.data?.result.flatMap((order) =>
          order.products
            .filter((product) => product)
            .map((product) => ({ ...order, products: [product] }))
        );
        console.log("filteredOrders", filteredOrders);
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

  const currentUserCompanyId = getAdminId();
  const handleStatusChange = (orderId, newStatus) => {
    updateOrderMasterStatus({ orderId, newStatus })
      .then((res) => {
        const updatedOrderList = order.map((orderItem) => {
          if (orderItem._id === orderId) {
            return { ...orderItem, orderStatus: newStatus };
          }
          return orderItem;
        });
        setOrder(updatedOrderList);
        getAllMasterOrderList();
      })
      .catch((err) => {
        console.log(err);
      });
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
                <h1 className="m-0">Track Your Order</h1>
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
                        <tr className="text-primary">
                          <th>S No.</th>
                          <th>Company Name</th>
                          <th>Ordered Person</th>
                          <th>Product Name</th>
                          <th>Product Image</th>
                          <th>Order Number</th>
                          <th>Tracking Number</th>
                          <th>Status</th>
                          <th>Returned / Cancelled</th>
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
                                <td>
                                  <p> {product?.productName}</p>
                                </td>
                                <td>
                                  <img
                                    className="avatar-sm-post"
                                    width={100}
                                    height={100}
                                    src={product?.productImage}
                                    alt="Product Image"
                                  />
                                </td>
                                <td>{orderItem?.orderNumber}</td>
                                <td>{product?.trackingNumber}</td>
                                <td>
                                  <select
                                    onChange={(event) => {
                                      handleStatusChange(
                                        product._id,
                                        event.target.value
                                      );
                                    }}
                                    className="form-select"
                                    name="orderStatus"
                                    value={product.orderStatus}
                                    disabled={
                                      (product?.companyId?._id !==
                                        currentUserCompanyId &&
                                        product.companyId?._id !==
                                          currentUserCompanyId) ||
                                      !!product.productStatus
                                    }
                                  >
                                    <option value={"pending"}>Pending</option>
                                    <option value={"progress"}>
                                      In Progress
                                    </option>
                                    <option value={"shipped"}>Shipped</option>
                                    <option value={"delivered"}>
                                      Delivered
                                    </option>
                                  </select>
                                </td>
                                <td>
                                  {product?.productStatus
                                    ? product?.productStatus
                                    : "-"}
                                </td>
                                <td></td>
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
                                          pathname: "/Mastertrackingorderview",
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
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                    onChange={handlePageChange}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
