import { axiosInstance } from './axiosInstance';

interface BuyNftProps {
  currentuserWalletAddress: string;
  buyerWalletAddress: string;
  tokenId: number | string;
  buyInfo:any;
}
export const buyNft = async ({
  currentuserWalletAddress,
  buyerWalletAddress,
  tokenId,
  buyInfo
}: BuyNftProps) => {
  return axiosInstance.put('/nft/buy', {
    currentuserWalletAddress,
    buyerWalletAddress,
    tokenId,
    buyInfo
  });
};
