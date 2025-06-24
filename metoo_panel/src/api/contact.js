import API from "./api";
import { Contactus } from "./endpoints";

export const saveContact = (data) => {
  return API.post(`${Contactus}`, data);
};

export const getSingleUsers = (data) => {
  return API.get(`${Contactus}/getSingleUser`, { params: { _id: data } });
};

export const deleteContact = (data) => {
  return API.delete(`${Contactus}`, { params: { _id: data } });
};

export const getFilterContact = (data) => {
  return API.put(`${Contactus}/getFilterContact`, data);
};
