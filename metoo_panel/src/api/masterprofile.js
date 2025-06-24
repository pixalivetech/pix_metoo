import API from "./api";
import { Master } from "./endpoints";

export const getsingleMaster = (data) => {
  return API.get(`${Master}/getSingleCompany`, { params: { _id: data } });
};
export const getMasterDetails = (data) => {
  return API.get(`${Master}/getProfileDetails`, { params: { _id: data } });
};
export const updateMaster = (data) => {
  return API.put(`${Master}`, data);
};
