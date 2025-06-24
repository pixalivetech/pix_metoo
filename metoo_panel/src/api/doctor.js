import API from "./api";
import { Doctor } from "./endpoints";
import { Login } from "./endpoints";

export const signupDoctor = (data) => {
  return API.post(`${Doctor}`, data);
};

export const signDoctorVerifyOTP = (data) => {
  return API.post(`${Login}/verifyEmailOtp`, data);
};

export const signDoctorResendOTP = (data) => {
  return API.post(`${Login}/panelLogin`, data);
};

export const getSingleDoctor = (data) => {
  return API.get(`${Doctor}/getSingleDoctor`, { params: { _id: data } });
};

export const getDoctorDetails = (data) => {
  return API.get(`${Doctor}/getProfileDetails`, { params: { _id: data } });
};

export const updateDoctor = (data) => {
  return API.put(`${Doctor}`, data);
};

export const getAllDoctor = (data) => {
  return API.get(`${Doctor}`, data);
};

export const getFilterMasterDoctor = (data) => {
  return API.put(`${Doctor}/getFilteredDoctor`, { params: { _id: data } });
};
export const deleteMasterDoctorprofile = (data) => {
  return API.delete(`${Doctor}`, { params: { _id: data } });
};






export const updateEducation = (data) => {
  return API.put(`${Doctor}/updateDoctorQualification`,  data)
}

export const  deleteEducation = (data) => {
  return API.put(`${Doctor}/deleteDoctorQualification`,  data)
}

export const updateExperience = (data) => {
  return API.put(`${Doctor}/updateDoctorExperience`,  data)
}

export const deleteExperience= (data) => {
  return API.put(`${Doctor}/deleteDoctorExperience`,  data)
}