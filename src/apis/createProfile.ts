import { axiosInstance } from './axiosInstance';

interface CreateProfileProps {
  uuid: string;
  userBannerImageUrl: string;
  userProfileImageUrl: string;
  username: string;
  userAccountHandle: string;
  userCryptoAddress: string;
  userDescription: string;
  userSocials: {
    twitter: string;
    facebook: string;
    instagram: string;
  };
  userContractAddress: string;
  justFanCollectionContractAddress: string;
}

export const createProfile = async ({
  uuid,
  userBannerImageUrl,
  userProfileImageUrl,
  username,
  userAccountHandle,
  userCryptoAddress,
  userDescription,
  userSocials,
  userContractAddress,
  justFanCollectionContractAddress,
}: CreateProfileProps) => {
  return axiosInstance.post('/profile', {
    uuid,
    userBannerImageUrl,
    userProfileImageUrl,
    username,
    userAccountHandle,
    userCryptoAddress,
    userDescription,
    userSocials,
    userContractAddress,
    justFanCollectionContractAddress,
  });
};
