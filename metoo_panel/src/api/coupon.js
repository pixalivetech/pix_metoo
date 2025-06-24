import API from "./api";
import { Coupon } from "./endpoints";

export const createCoupon = (data) => {
  return API.post(`${Coupon}/createCoupon`, data);
};
