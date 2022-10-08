import { axiosInstance } from './axiosInstance';

export const fetchAuctionDetails = async (auctionId: number) => {
  return axiosInstance.get(`/auction?auctionIndex=${auctionId}`);
};
