import { AxiosResponse } from 'axios';
import { axiosInstance } from './axiosInstance';
interface Bid {
  user_profile_image_url?: string;
  block_timestamp: number;
  result: {
    _bidder: string;
    amount: string;
    _index: string;
  };
  amount: string;
  _bidder: string;
  _index: string;
  transaction_id: string;
  user_account_handle: string;
  _id: string;
}

export const fetchAuctionBids = async (auctionId: number) => {
  return axiosInstance.get<any, AxiosResponse<{ events: Bid[] }>>(
    `/events/auction/bids?auctionIndex=${auctionId}`
  );
};
