import { axiosInstance } from './axiosInstance';

interface FetchProfileWithUserAccountHandle {
  userAccountHandle: string;
  userCryptoAddress?: never;
}

interface FetchProfileWithUserCryptoAddress {
  userCryptoAddress: string;
  userAccountHandle?: never;
}

export const fetchProfile = async ({
  userAccountHandle,
  userCryptoAddress,
}: FetchProfileWithUserAccountHandle | FetchProfileWithUserCryptoAddress) => {
  let searchParams = new URLSearchParams();
  userAccountHandle &&
    searchParams.append('userAccountHandle', userAccountHandle);
  userCryptoAddress &&
    searchParams.append('userCryptoAddress', userCryptoAddress);
  let url = `/profile?${searchParams.toString()}`;
  return await axiosInstance.get(url);
};
