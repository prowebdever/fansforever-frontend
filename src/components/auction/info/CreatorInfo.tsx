import styled from 'styled-components';

import FlexRowWrapper from 'components/common/FlexRowWrapper';
import FlexColumnWrapper from 'components/common/FlexColumnWrapper';
import { useState } from 'react';
import Popover from '@mui/material/Popover';
import ProfileCard from 'components/profile/ProfileCard';
const CreatorInfoWrapper = styled.div`
  width: 100px;
  height: auto;
  cursor: pointer;
  ${FlexRowWrapper}, ${FlexColumnWrapper} {
    width: 100px;
  }

  ${FlexRowWrapper} {
    align-items: center;
  }

  .profile-image {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 12px;
  }

  .username {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.21px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.textColors.primary};
    margin-bottom: 4px;
  }

  .account-handle {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.21px;
    color: ${({ theme }) => theme.textColors.secondary};
  }
`;

interface CreatorInfoProps {
  creatorProfileImageUrl: string;
  creatorUsername: string;
  creatorAccountHandle: string;
  profileQuery?: any;
}

const CreatorInfo: React.VFC<CreatorInfoProps> = ({
  creatorProfileImageUrl,
  creatorUsername,
  creatorAccountHandle,
  profileQuery
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  return (
    <>
      <CreatorInfoWrapper onMouseEnter = {handlePopoverOpen} onMouseLeave={handlePopoverClose}>
        <FlexRowWrapper>
          <img
            src={creatorProfileImageUrl.replace(
              'ipfs.io',
              'fansforever.mypinata.cloud'
            )}
            alt={creatorUsername}
            className="profile-image"
          />
          <FlexColumnWrapper>
            <p className="username">{creatorUsername}</p>
            <p className="account-handle">@{creatorAccountHandle}</p>
          </FlexColumnWrapper>
        </FlexRowWrapper>
          <Popover
            id="mouse-over-popover"
            open={open}
            anchorEl={anchorEl}
      
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            
        >
            <ProfileCard
              profileImg={profileQuery?.userProfileImageUrl}
              profileName={profileQuery?.username}
              walletAddress={profileQuery?.userCryptoAddress}
              bio={profileQuery?.userDescription}
              facebookUrl={profileQuery?.userSocials?.facebook}
              twitterUrl={profileQuery?.userSocials?.twitter}
              instagramUrl={profileQuery?.userSocials?.instagram}
              youtubeUrl={profileQuery?.userSocials?.youtube}
              spotifyUrl={profileQuery?.userSocials?.spotify}
              isVerified={profileQuery?.isVerified}
              profile = {profileQuery}
            />
        </Popover>
      </CreatorInfoWrapper>
    </>
  );
};

export default CreatorInfo;
