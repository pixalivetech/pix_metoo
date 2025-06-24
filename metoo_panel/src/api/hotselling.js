import API from "./api";
import { Hotselling } from "./endpoints";

export const saveSelling = (data) => {
  return API.post(`${Hotselling}`, data);
};
