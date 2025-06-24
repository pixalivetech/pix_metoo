import API from "./api";
import { SignUpPanel } from "./endpoints";
import { Login } from "./endpoints";

export const signUp = (data) => {
  return API.post(`${SignUpPanel}`, data);
};

export const signVerifyOTP = (data) => {
  return API.post(`${Login}/verifyEmailOtp`, data);
};

export const signResendOTP = (data) => {
  return API.post(`${Login}/panelLogin`, data);
};
