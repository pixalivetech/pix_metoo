import API from "./api";
import { Post } from "./endpoints";

export const savePost = (data) => {
  return API.post(`${Post}/`, data);
};

export const updatePost = (data) => {
  return API.put(`${Post}/`, data);
};

export const getFilterPost = (data) => {
  return API.put(`${Post}/getFilterPost`, data);
};

export const getSinglePost = (data) => {
  return API.get(`${Post}/getSinglePost`, { params: { _id: data } });
};

export const deletePost = (data) => {
  return API.delete(`${Post}`, { params: { _id: data } });
};
export const getAllPost = (data) => {
  return API.put(`${Post}/`, data);
};
