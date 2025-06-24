import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/SideBar";
import { Link } from "react-router-dom";
import { Pagination } from "@mui/material";
import { getUserId } from "../../Utils/Storage";
import { getAllOrder, updateOrderStatus } from "../../api/ordertrack";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

export default function TrackYourOrder() {
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });

  const [order, setOrder] = useState([]);

  const page = Math.floor(pagination.from / pageSize) + 1;
  useEffect(() => {
    getAllOrderList();
  }, [pagination.from, pagination.to]);

  const getAllOrderList = () => {
    getAllOrder()
      .then((res) => {
        const filteredOrders = res?.data?.result.flatMap((order) =>
          order.products
            .filter(
              (product) =>
                product.panelId && product.panelId._id === getUserId()
            )
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

  const handleStatusChange = (orderId, newStatus) => {
    updateOrderStatus({ orderId, newStatus })
      .then((res) => {
        const updatedOrderList = order.map((orderItem) => {
          if (orderItem._id === orderId) {
            return { ...orderItem, orderStatus: newStatus };
          }
          return orderItem;
        });
        setOrder(updatedOrderList);
        getAllOrderList();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  let totalIndex = 0;

  return (
    <div>
      <Sidebar />
      <Header />
      <div className="content-wrapper">
        <div className="content-header">
          <div className="container-fluid">
            <div className="row mb-2">
              <div className="col-sm-6">
                <h1 className="m-0" style={{ color: "#9265cc" }}>
                  Track Order List
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="card-table">
            <div className="table-responsive">
              <table className=" table card-table dataTable text-center">
                <thead>
                  <tr style={{ color: "#9265cc" }}>
                    <th>S No.</th>
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
                            {orderItem?.ShippingAddress?.length > 0 && (
                              <p>{orderItem.ShippingAddress[0]?.name}</p>
                            )}
                          </td>
                          <td>{product?.productName}</td>
                          <td>
                            <img
                              className="avatar-sm-post"
                              width={100}
                              height={100}
                              src={product?.productImage}
                              alt="product image"
                            />
                          </td>
                          <td>{orderItem.orderNumber}</td>
                          <td>{product?.trackingNumber}</td>
                          <td>
                            <select
                              onChange={(event) => {
                                handleStatusChange(
                                  product?._id,
                                  event.target.value
                                );
                              }}
                              className="form-select"
                              name="orderStatus"
                              value={product?.orderStatus || ""}
                              disabled={product?.productStatus}
                            >
                              <option value="" disabled hidden>
                                Select Status
                              </option>
                              <option value={"pending"}>Pending</option>
                              <option value={"progress"}>In Progress</option>
                              <option value={"shipped"}>Shipped</option>
                              <option value={"delivered"}>Delivered</option>
                            </select>
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
                                    pathname: "/Trackyourorderview",
                                    search: `?id=${
                                      orderItem && orderItem?._id
                                    }&trackingNumber=${
                                      product?.trackingNumber
                                    }`,
                                  }}
                                >
                                  <i className="far fa-eye me-2"></i>&nbsp;View
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
  );
}
