import API from "./api";
import { TrackOrder } from "./endpoints";

export const getAllOrder = (data) => {
  return API.get(`${TrackOrder}/`, data);
};

export const getFilterOrder = (data) => {
  return API.put(`${TrackOrder}/getFilteredOrder`, data);
};

export const updateOrderStatus = (data) => {
  return API.put(`${TrackOrder}/updateOrderStatus`, data);
};

export const cancelOrder = (orderId) => {
  return API.put(`${TrackOrder}/cancelOrdered`, { orderId });
};

export const returnOrder = (orderId) => {
  return API.put(`${TrackOrder}/return`, { orderId });
};

export const getSingleOrder = (data) => {
  return API.get(`${TrackOrder}/getSingleOrder`, { params: { _id: data } });
};
