import API from "./api";
import { User } from "./endpoints";

export const getSingleUser = (data) => {
  return API.get(`${User}/getSingleUser`, { params: { _id: data } });
};

export const getFilterUser = (data) => {
  return API.put(`${User}/getFilteredUser`, data);
};

export const getAllUserProfileDetails = (data) => {
  return API.get(`${User}`, data);
};

export const getFilterMasterUser = (data) => {
  return API.put(`${User}/getFilteredUser`, { params: { _id: data } });
};

export const deleteMasterUserprofile = (data) => {
  return API.delete(`${User}`, { params: { _id: data } });
};
