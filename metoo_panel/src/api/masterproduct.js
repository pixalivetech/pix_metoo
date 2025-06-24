import API from "./api";
import { Product } from "./endpoints";

export const saveMasterProduct = (data) => {
  return API.post(`${Product}/productForCompany`, data);
};

export const getAllMasterProductList = (data) => {
  return API.get(`${Product}`, data);
};

export const getSingleMasterProduct = (data) => {
  return API.get(`${Product}/getSingleProduct`, { params: { _id: data } });
};

export const getFilterMasterProduct = (data) => {
  return API.put(`${Product}/getFilterProduct`, data);
};

export const updateMasterProduct = (data) => {
  return API.put(`${Product}`, data);
};

export const deleteMasterProduct = (data) => {
  return API.delete(`${Product}`, { params: { _id: data } });
};
