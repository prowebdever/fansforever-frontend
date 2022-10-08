import { axiosInstance } from './axiosInstance';

interface FetchNftsListProps {
  userCryptoAddress: string;
  userContractAddress: string;
}

export const fetchNftsList = async ({
  userCryptoAddress,
  userContractAddress,
}: FetchNftsListProps) => {
  return await axiosInstance.post('/nft/list', {
    userCryptoAddress,
    userContractAddress,
  });
};
