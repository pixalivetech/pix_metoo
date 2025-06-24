import API from "./api";
import { TrackOrder } from "./endpoints";

export const getAllMasterOrder = (data) => {
  return API.get(`${TrackOrder}/`, data);
};

export const getFilterMasterOrder = (data) => {
  return API.put(`${TrackOrder}/getFilteredOrder`, data);
};

export const updateOrderMasterStatus = (data) => {
  return API.put(`${TrackOrder}/updateOrderStatus`, data);
};

export const getSingleMasterOrder = (data) => {
  return API.get(`${TrackOrder}/getSingleOrder`, { params: { _id: data } });
};
