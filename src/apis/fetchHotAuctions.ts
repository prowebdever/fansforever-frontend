import { axiosInstance } from './axiosInstance';

export const fetchHotAuctions = () => {
  return axiosInstance.get('/auction/hot');
};
