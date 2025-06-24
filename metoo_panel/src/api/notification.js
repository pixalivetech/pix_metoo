import API from "./api";
import { Notification } from "./endpoints";

export const getAllNotification = (data) => {
  return API.get(`${Notification}/`, data);
};
