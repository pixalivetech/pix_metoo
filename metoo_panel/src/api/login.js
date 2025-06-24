import API from "./api";
import { Login } from "./endpoints";

export const Loginpanel = (data) => {
  return API.post(`${Login}/panelLogin`, data);
};

export const CompanyPanel = (data) => {
  return API.post(`${Login}/company`, data);
};

export const DoctorPanel = (data) => {
  return API.post(`${Login}/doctor`, data);
};

export const verifyOTP = (data) => {
  return API.post(`${Login}/verifyGmailOtp`, data);
};

export const resendOTP = (data) => {
  return API.post(`${Login}/panelLogin`, data);
};
