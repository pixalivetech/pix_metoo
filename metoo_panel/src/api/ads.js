import API from "./api";
import { Carousel } from "./endpoints";

export const postCarousel = (data) => {
  return API.post(`${Carousel}/`, data);
};

export const getAllCarousel = (data) => {
  return API.get(`${Carousel}/`, data);
};

export const getCarousel = (data) => {
  return API.put(`${Carousel}/getFilterCarousel`, data);
};

export const getSingleCarousel = (data) => {
  return API.get(`${Carousel}/getSingleCarousel`, { params: { _id: data } });
};

export const updateCarousel = (data) => {
  return API.put(`${Carousel}/`, data);
};

export const deleteCarousel = (data) => {
  return API.delete(`${Carousel}/`, { params: { _id: data } });
};
