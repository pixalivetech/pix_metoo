import API from "./api";
import { Profile } from "./endpoints";

export const getsingleProfile = (data) => {
  return API.get(`${Profile}/getSinglePanel`, { params: { _id: data } });
};
export const getProfileDetails = (data) => {
  return API.get(`${Profile}/getProfileDetails`, { params: { _id: data } });
};

export const updateProfile = (data) => {
  return API.put(`${Profile}`, data);
};

export const getAllPanelProfileDetails = (data) => {
  return API.put(`${Profile}/getFilterPanel`, { params: { _id: data } });
};
