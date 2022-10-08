import { axiosInstance } from './axiosInstance';

export const checkUserExists = ({
  userAccountHandle,
}: {
  userAccountHandle: string;
}) => {
  const url = '/profile/user';
  const searchParams = new URLSearchParams();
  searchParams.append('userAccountHandle', userAccountHandle);
  return axiosInstance.get(`${url}?${searchParams.toString()}`);
};
