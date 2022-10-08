import { axiosInstance } from './axiosInstance';

interface UpdateProfileProps {
  originalBody: {};
  signedMessage: string;
  userCryptoAddress: string;
}

export const updateProfile = ({
  originalBody,
  signedMessage,
  userCryptoAddress,
}: UpdateProfileProps) => {
  return axiosInstance.put('/profile', {
    originalBody,
    signedMessage,
    userCryptoAddress,
  });
};
