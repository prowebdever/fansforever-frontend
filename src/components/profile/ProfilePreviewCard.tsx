import styled from 'styled-components';
import { useFormikContext } from 'formik';

import ProfileCard from './ProfileCard';

const ProfilePreviewCardWrapper = styled.div``;

interface FormikContextValues {
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
    youtube: string;
    spotify: string;
  };
}

const ProfilePreviewCard = () => {
  const { values, errors } = useFormikContext<FormikContextValues>();

  return (
    <ProfilePreviewCardWrapper>
      <ProfileCard
        profileImg={values.userProfileImageUrl}
        profileName={values.username}
        walletAddress={values.userCryptoAddress}
        bio={values.userDescription}
        facebookUrl={
          !errors?.userSocials?.facebook ? values.userSocials.facebook : ''
        }
        twitterUrl={
          !errors?.userSocials?.twitter ? values.userSocials.twitter : ''
        }
        instagramUrl={
          !errors?.userSocials?.instagram ? values.userSocials.instagram : ''
        }
        youtubeUrl={
          !errors?.userSocials?.youtube ? values.userSocials.youtube : ''
        }
        spotifyUrl={
          !errors?.userSocials?.spotify ? values.userSocials.spotify : ''
        }
        isVerified={false}
        profile = {values}
      />
    </ProfilePreviewCardWrapper>
  );
};

export default ProfilePreviewCard;
