import { axiosInstance } from './axiosInstance';

export const fetchAuctionsList = async () => {
  return axiosInstance.get('/auction/list');
};
