import API from "./api";
import { FAQ } from "./endpoints";

export const getFilterQA = (data) => {
  return API.get(`${FAQ}/getFilterDeveloper`, data);
};
export const answerQA = (data) => {
  return API.post(`${FAQ}/replydoctor`, data);
};

export const getSingleFaq = (data) => {
  return API.get(`${FAQ}/getSingleUser`, { params: { _id: data } });
};
