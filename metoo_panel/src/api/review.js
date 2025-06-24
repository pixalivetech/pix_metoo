import API from "./api";
import { PanelReview, Reviews } from "./endpoints";

export const ListReviews = (data) => {
  return API.get(`${Reviews}/getDoctorReview`, {
    params: { doctorId: data?.doctorId },
  });
};

export const getSingleReview = (data) => {
  return API.get(`${Reviews}/getSingleDoctorReview`, { params: { _id: data } });
};

export const ListDoctorReviews = (data) => {
  return API.put(`${Reviews}/getFilterDoctorReview`, data);
};

export const savePanelReview = (data) => {
  return API.post(`${PanelReview}`, data);
};

export const updatePanelReview = (data) => {
  return API.put(`${PanelReview}`, data);
};

export const listPanelReview = (data) => {
  return API.get(`${PanelReview}`, { params: { panelId: data?.panelId } });
};

export const deleteReview = (data) => {
  return API.delete(`${PanelReview}`, { params: { _id: data } });
};

export const getSinglePanelReview = (data) => {
  return API.get(`${PanelReview}/getSinglePanelReview`, {
    params: { _id: data },
  });
};

export const listAllPanelReview = (data) => {
  return API.put(`${PanelReview}/getFilterPanelReview`, data);
};
