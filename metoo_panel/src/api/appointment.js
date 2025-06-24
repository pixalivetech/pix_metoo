import API from "./api";
import { Appointment } from "./endpoints";

export const ListAppointment = (data) => {
  return API.get(`${Appointment}/getDoctorAppointments`, {
    params: {
      doctorId: data?.doctorId,
    },
  });
};

export const getSingleAppointment = (data) => {
  return API.get(`${Appointment}/getSingleAppointment`, {
    params: { _id: data },
  });
};

export const updateAppointmentStatus = (appointmentId, newStatus) => {
  return API.put(`${Appointment}/updatedStatus`, {
    _id: appointmentId,
    scheduleStatus: newStatus,
  });
};

export const ListAllAppointment = (data) => {
  return API.put(`${Appointment}/filterAppointment`, data);
};

export const getDoctorAppointments = (data) => {
  return API.get(`${Appointment}/`, data);
};
