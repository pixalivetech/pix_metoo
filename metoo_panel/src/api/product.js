import API from "./api";
import { Product } from "./endpoints";
import { ProductReview } from "./endpoints";

export const saveProduct = (data) => {
  return API.post(`${Product}`, data);
};

export const getAllProductList = (data) => {
  return API.get(`${Product}`, data);
};

export const getSingleProduct = (data) => {
  return API.get(`${Product}/getSingleProduct`, { params: { _id: data } });
};

export const getFilterProduct = (data) => {
  return API.put(`${Product}/getFilterProduct`, data);
};

export const updateProduct = (data) => {
  return API.put(`${Product}`, data);
};

export const deleteProduct = (data) => {
  return API.delete(`${Product}`, { params: { _id: data } });
};

export const listProductReview = (data) => {
  return API.get(`${ProductReview}/getPanelRatings`, {
    params: { panelId: data?.panelId },
  });
};

export const getSingleProductReview = (data) => {
  return API.get(`${ProductReview}/getSingleProductRating`, {
    params: { _id: data },
  });
};

export const listAllProductReview = (data) => {
  return API.put(`${ProductReview}/getFilterProductRating`, data);
};

export const getAllSingleProductReview = (data) => {
  return API.get(`${ProductReview}/getSingleProductRating`, {
    params: { _id: data },
  });
};
