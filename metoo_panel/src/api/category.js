import API from "./api";
import { Category } from "./endpoints";

export const saveCategory = (data) => {
  return API.post(`${Category}`, data);
};

export const updateCategory = (data) => {
  return API.put(`${Category}`, data);
};

export const deleteCategory = (data) => {
  return API.delete(`${Category}`, { params: { _id: data } });
};

export const getAllcategoryList = (data) => {
  return API.get(`${Category}`, data);
};

export const getSingleCategory = (data) => {
  return API.get(`${Category}/getSingleCategory`, { params: { _id: data } });
};

export const getFilterMasterCategory = (data) => {
  return API.put(`${Category}/getFilterCategory`, data);
};
