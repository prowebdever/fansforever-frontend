import * as React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useClipboard } from 'use-clipboard-copy';
import { MdContentCopy } from 'react-icons/md';
import { ImFacebook2, ImTwitter } from 'react-icons/im';
import { SiInstagram, SiYoutube, SiSpotify } from 'react-icons/si';
import { FaClipboardCheck, FaUserCircle } from 'react-icons/fa';
import { GoVerified } from 'react-icons/go';

import FlexColumnWrapper from 'components/common/FlexColumnWrapper';
import FlexRowWrapper from 'components/common/FlexRowWrapper';

import shortenWalletAddress from 'utils/shortenWalletAddress';
import FollowButton from './FollowButton'

const ProfileCardWrapper = styled.div`
  width: 265px;
  min-height: 450px;

  background: ${({ theme }) => theme.backgroundColors.primary};
  border: 1px solid ${({ theme }) => theme.borderColors.tertiary};
  box-sizing: border-box;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
  border-radius: 25px;

  padding: 30px 20px;

  & > ${FlexColumnWrapper} {
    justify-content: center;
    align-items: center;
  }

  .profile-image {
    position: relative;
    top: 5%;
    width: 86px;
    cursor: pointer;
    height: 86px;
    border-radius: 50%;
    margin-bottom: 32px;
    color: ${({ theme }) => theme.textColors.tertiary};
  }

  .follower-image {
    float: left;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    cursor: pointer;
    color: ${({ theme }) => theme.textColors.tertiary};
  }


  .follow-button {
    position:relative;
    margin: 0px;
    top: 30%;
    left: 30px;
    color: rgba(0,0,0,0.4);
  }
  .profile-name-row {
    align-items: center;
    margin-bottom: 8px;

    .profile-name {
      width: 100%;
      font-family: 'Clash Grotesk';
      font-weight: 600;
      font-size: 28px;
      line-height: 34px;
      text-align: center;
      text-transform: capitalize;
      color: ${({ theme }) => theme.textColors.primary};
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    
    .verified-icon {
      color: ${({ theme }) => theme.accentColors.primary};
    }
  }

  .wallet-address-row {
    margin-bottom: 36px;
    justify-content: center;
    align-items: center;

    .wallet-address {
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      text-align: center;
      text-transform: capitalize;
      color: ${({ theme }) => theme.textColors.tertiary};
    }
    .clipboard-check-icon,
    .copy-icon {
      width: 16px;
      height: 16px;
      margin-left: 14px;
      color: ${(props) => props.theme.accentColors.primary};
      cursor: pointer;
    }
    .clipboard-check-icon {
      color: green;
    }
  }

  .bio {
    height: 100px;
    margin-bottom: 36px;
    font-family: Inter;
    font-size: 15px;
    overflow-y:auto;
    line-height: 24px;
    letter-spacing: -0.21px;
    color: ${({ theme }) => theme.textColors.secondary};
    white-space: wrap;
    word-break: break-all;
  }
  .follow {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    text-transform: capitalize;
    color: ${({ theme }) => theme.textColors.tertiary};    
  }
  .socials-row {
    justify-content: space-evenly;
    margin-bottom: 24px;

    a {
      text-decoration: none;
      color: none;
    }

    .icon {
      width: 20px;
      height: 20px;
      color: ${(props) => props.theme.accentColors.primary};
    }
  }
`;

interface ProfileCardProps {
  profileImg: string;
  profileName: string;
  walletAddress: string;
  bio: string;
  facebookUrl: string | undefined;
  twitterUrl: string | undefined;
  instagramUrl: string | undefined;
  youtubeUrl: string | undefined;
  spotifyUrl: string | undefined;
  isVerified: boolean;
  profile: any;
}

const ProfileCard: React.VFC<ProfileCardProps> = ({
  profileImg,
  profileName,
  walletAddress,
  bio,
  facebookUrl,
  twitterUrl,
  instagramUrl,
  youtubeUrl,
  spotifyUrl,
  isVerified,
  profile,
}) => {
  const [userprofile , setUserProfileData] = useState(profile)
  const clipboard = useClipboard({
    copiedTimeout: 2000, // timeout duration in milliseconds
    onError() {
      console.log('Failed to copy text!');
    },
  });
  const history = useHistory()
  return (
    <ProfileCardWrapper>
      <FlexColumnWrapper>
        <FlexRowWrapper>
          <FlexColumnWrapper>
            {Boolean(profileImg) ? (
              <img src={profileImg} alt={profileName} className="profile-image" onClick={()=>history.push('/profile/' + profile.userAccountHandle)} />
            ) : (
              <FaUserCircle className="profile-image" />
            )}
          </FlexColumnWrapper>
          <FlexColumnWrapper>
            <div className = "follow-button">
              {window?.tronWeb?.defaultAddress?.base58 !== userprofile.userCryptoAddress && 
              userprofile?.follow?.filter((prf)=>prf?.userCryptoAddress === window?.tronWeb?.defaultAddress?.base58).length === 0&&
               <FollowButton text="follow" setData = {setUserProfileData}  profiledata = {userprofile} myWalletAddress = {window?.tronWeb?.defaultAddress?.base58} />
              }
              {window?.tronWeb?.defaultAddress?.base58 !== userprofile.userCryptoAddress && 
              userprofile?.follow?.filter((prf)=>prf.userCryptoAddress === window?.tronWeb?.defaultAddress?.base58).length !==0 &&
                <FollowButton text="unfollow" setData = {setUserProfileData}  profiledata = {userprofile} myWalletAddress = {window?.tronWeb?.defaultAddress?.base58} />
              }
            </div>
          </FlexColumnWrapper>
        </FlexRowWrapper>
        <FlexRowWrapper className="profile-name-row">
          <h1 className="profile-name">{profileName}</h1>
          {isVerified && <GoVerified className="verified-icon" />}
        </FlexRowWrapper>
        <FlexRowWrapper className="wallet-address-row">
          <p className="wallet-address">
            {walletAddress&&shortenWalletAddress(walletAddress, 8)}
          </p>
          {clipboard.copied ? (
            <FaClipboardCheck className="clipboard-check-icon" />
          ) : (
            <MdContentCopy
              className="copy-icon"
              onClick={() => clipboard.copy(walletAddress)}
            />
          )}
        </FlexRowWrapper>
        <p className="bio">{bio}</p>
        <FlexRowWrapper className="socials-row">
          {Boolean(facebookUrl) && (
              <ImFacebook2 className="icon" onClick={(e)=>{e.preventDefault();window.open(facebookUrl, '_blank')}}/>
          )}
          {Boolean(twitterUrl) && (
              <ImTwitter className="icon" onClick={(e)=>{e.preventDefault();window.open(twitterUrl, '_blank')}}/>
          )}
          {Boolean(instagramUrl) && (
              <SiInstagram className="icon" onClick={(e)=>{e.preventDefault();window.open(instagramUrl, '_blank')}}/>
          )}
          {Boolean(youtubeUrl) && (
              <SiYoutube className="icon" onClick={(e)=>{e.preventDefault();window.open(youtubeUrl, '_blank')}}/>
          )}
          {Boolean(spotifyUrl) && (
              <SiSpotify className="icon" onClick={(e)=>{e.preventDefault();window.open(spotifyUrl, '_blank')}}/>
          )}
        </FlexRowWrapper>
        
        <FlexRowWrapper>

          <FlexColumnWrapper style={{width: '30%'}}>
            <div className="follow">FOLLOWER</div>
            <div className="follow">{userprofile?.follow?.length}</div>
          </FlexColumnWrapper>

          <FlexColumnWrapper>
            <div style = {{float: 'left'}}>
              {userprofile?.follow?.map((follower)=>{
                if(follower){
                  return <img key={follower?.username} src={follower?.userProfileImageUrl} alt={follower?.username} className="follower-image" onClick = {()=>{history.push('/profile/'+ follower?.userAccountHandle)}} />
                }else {
                  return {}
                }
              }
              )}
            </div>
          </FlexColumnWrapper>
        </FlexRowWrapper>
      </FlexColumnWrapper>
    </ProfileCardWrapper>
  );
};

export default ProfileCard;
