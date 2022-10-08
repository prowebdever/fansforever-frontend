import { axiosInstance } from './axiosInstance';

interface FetchNftDetailsProps {
  tokenId: number | string;
  userCryptoAddress: string;
  userContractAddress: string;
}

export const fetchNftDetails = ({
  tokenId,
  userCryptoAddress,
  userContractAddress,
}: FetchNftDetailsProps) => {
  return axiosInstance.post(`/nft/details/${tokenId}`, {
    userCryptoAddress,
    userContractAddress,
  });
};
