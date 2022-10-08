import { axiosInstance } from './axiosInstance';

interface FetchNftsListProps {
  userAccountHandle: string;
}

export const fetchNftsList = async ({
  userAccountHandle,
}: FetchNftsListProps) => {
  const url = '/nft/list';

  const searchParams = new URLSearchParams();
  searchParams.append('userAccountHandle', userAccountHandle);

  return axiosInstance.get(`${url}?${searchParams.toString()}`);
};
