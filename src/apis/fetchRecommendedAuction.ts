import { axiosInstance } from './axiosInstance';

export const fetchRecommendedAuction = () => {
  return axiosInstance.get('/auction/recommended');
};
