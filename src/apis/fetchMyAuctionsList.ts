import { axiosInstance } from './axiosInstance';

interface FetchMyAuctionsListProps {
  userAccountHandle: string;
}

export const fetchMyAuctionsList = ({
  userAccountHandle,
}: FetchMyAuctionsListProps) => {
  const url = '/auction';

  const searchParams = new URLSearchParams();
  searchParams.append('userAccountHandle', userAccountHandle);

  return axiosInstance.get(`${url}?${searchParams.toString()}`);
};
