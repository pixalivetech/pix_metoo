import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Sidebar from "../../Components/SideBar";
import { Link } from "react-router-dom";
import { getUserId } from "../../Utils/Storage";
import { Pagination } from "@mui/material";
import { getAllOrder } from "../../api/ordertrack";

export default function OrderManagementList() {
  const pageSize = 10;
  const [pagination, setPagination] = useState({
    count: 0,
    from: 0,
    to: pageSize,
  });
  const [order, setOrder] = useState();
  const page = Math.floor(pagination.from / pageSize) + 1;
  useEffect(() => {
    getAllOrderList();
  }, [pagination.from, pagination.to]);

  const getAllOrderList = () => {
    getAllOrder()
      .then((res) => {
        const filteredOrders =
          res?.data?.result.flatMap((order) =>
            order.products
              .filter(
                (product) =>
                  product.panelId && product.panelId._id === getUserId()
              )
              .map((product) => ({ ...order, products: [product] }))
          ) || [];
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

  let totalIndex = 0;
  return (
    <>
      <div>
        <Sidebar />
        <Header />
        <div className="content-wrapper">
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0" style={{ color: "#9265cc" }}>
                    Order Management
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-12">
            <div className="card mt-2">
              <div className="card-body">
                <div className="card-table">
                  <div className="table-responsive">
                    <table className=" table card-table dataTable text-center">
                      <thead>
                        <tr style={{ color: "#9265cc" }}>
                          <th>S No.</th>
                          <th>Product Image</th>
                          <th>Product Name</th>
                          <th>Quantity</th>
                          <th>Ordered Person</th>
                          <th>Email</th>
                          <th>Mobile Number</th>
                          <th>Payment Method</th>
                          <th>Status</th>
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
                          order?.map((orderItem, orderIndex) =>
                            (orderItem?.products || []).map(
                              (product, productIndex) => (
                                <tr key={`${orderIndex}-${productIndex}`}>
                                  <td>#{++totalIndex}</td>
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
                                    {orderItem?.ShippingAddress?.length > 0 && (
                                      <p>
                                        {orderItem.ShippingAddress[0]?.name}
                                      </p>
                                    )}
                                  </td>

                                  <td>{orderItem.ShippingAddress[0]?.email}</td>
                                  <td>
                                    {orderItem.ShippingAddress[0]?.mobileNumber}
                                  </td>
                                  <td>{orderItem?.paymentMethod}</td>
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
                                          <i className="far fa-eye me-2"></i>
                                          &nbsp;View
                                        </Link>
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              )
                            )
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
    </>
  );
}
