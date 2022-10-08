import { axiosInstance } from './axiosInstance';

interface claimAssetProps {
  isAssetClaimed: boolean;
  auctionId: number| string;
}

export const claimNFT = async ({
  isAssetClaimed, auctionId
}: claimAssetProps) => {
  return axiosInstance.post('/auction/claim/asset', {
    isAssetClaimed, auctionId
  });
};

interface claimTokenProps {
  isTokenClaimed: boolean;
  auctionId: number| string;
}

export const claimToken = async ({
  isTokenClaimed, auctionId
}: claimTokenProps) => {
  return axiosInstance.post('/auction/claim/token', {
    isTokenClaimed, auctionId
  });
};

interface cancelAuctionProps {
  auctionId: number| string;
  tokenId: number | string;
}

export const cancelAuction = async ({
  auctionId, tokenId
}: cancelAuctionProps) => {
  return axiosInstance.post('/auction/cancel', {
    auctionId, tokenId
  });
};
