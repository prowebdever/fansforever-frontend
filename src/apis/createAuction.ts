import { axiosInstance } from './axiosInstance';

interface CreateAuctionProps {
  nftDetails: {};
  startPrice: number | string;
  startTime: number;
  duration: number;
  instantSalePrice: number | string;
  auctionTransactionId: string;
  auctionEventResult: {};
  trc20TokenAddress: string;
}

export const createAuction = async ({
  nftDetails,
  startPrice,
  startTime,
  duration,
  instantSalePrice,
  auctionTransactionId,
  auctionEventResult,
  trc20TokenAddress,
}: CreateAuctionProps) => {
  return axiosInstance.post('/auction', {
    nftDetails,
    startPrice,
    startTime,
    duration,
    instantSalePrice,
    auctionTransactionId,
    auctionEventResult,
    trc20TokenAddress,
  });
};
