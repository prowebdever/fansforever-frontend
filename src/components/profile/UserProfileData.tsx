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
import { showModal } from 'actions/userActions';
import shortenWalletAddress from 'utils/shortenWalletAddress';
import FollowButton from './FollowButton'
import { useDispatch } from 'react-redux';

const UserProfileDatadWrapper = styled.div`
  width: 100%;
  min-height: 350px;
  background: ${({ theme }) => theme.backgroundColors.primary};
  border-bottom: 1px solid ${({ theme }) => theme.borderColors.tertiary};
  box-sizing: border-box;
  margin:auto;
  padding-bottom: 40px;

  & > ${FlexColumnWrapper} {
    justify-content: center;
    align-items: center;
  }

  .profile-image {
    position: relative;
    width: 182px;
    cursor: pointer;
    height: 182px;
    margin: auto;
    border-radius: 50%;
    // margin-bottom: 32px;
    color: ${({ theme }) => theme.textColors.tertiary};
  }
  .profile-row {
    position: relative;
    top: -75px;
    margin: auto;
    width: 183px;
    margin-bottom: -60px;
    color: ${({ theme }) => theme.textColors.tertiary};
  }




  .follow-button {
    position:relative;
    margin: 0px;
    top: 30%;
    margin-right: 30px;
    left: 30px;
    color: rgba(0,0,0,0.4);
  }
  .profile-name-row {
    align-items: center;
    margin-bottom: 8px;

    .profile-name {
      width: 100%;
      font-family: 'Clash Grotesk';
      font-weight: 700;
      font-size: 47px;
      line-height: 59.97px;
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
    display: flex;
    .wallet-address {
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 24.2px;
      text-align: center;
      text-transform: capitalize;
      color: ${({ theme }) => theme.textColors.primary};
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
    margin-bottom: 0px;
    font-family: Inter;
    font-size: 20px;
    width: 60%;
    margin: auto;
    text-align: center;
    letter-spacing: -0.21px;
    color: ${({ theme }) => theme.textColors.secondary};
    white-space: wrap;
    word-break: break-all;
  }
  .follow {
    font-family: Inter;
    font-style: normal;
    font-weight: 700;
    font-size: 23px;
    line-height: 34.5px;
    text-align: center;
    text-transform: capitalize;
    cursor: pointer;
    color: ${({ theme }) => theme.textColors.tertiary};    
  }
  .follow:hover {
    color: white;
  }
  .socials-row {
    padding-top: 20px;
    display: flex;
    justify-content: center;
    margin-bottom: 24px;
    align-items: center;
    a {
      text-decoration: none;
      color: none;
    }

    .icon {
      width: 20px;
      height: 20px;
      margin-left: 25px;
      color: ${(props) => props.theme.textColors.primary};
    }
  }
`;

interface ProfileDataProps {
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

const UserProfileData: React.VFC<ProfileDataProps> = ({
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
  console.log(profile)
  const [userprofile , setUserProfileData] = useState(profile)
  React.useEffect(()=>{
    setUserProfileData(profile)
  }, [profile])
  const clipboard = useClipboard({
    copiedTimeout: 2000, // timeout duration in milliseconds
    onError() {
      console.log('Failed to copy text!');
    },
  });
  const history = useHistory();
  const dispatch = useDispatch()

  return (
    <UserProfileDatadWrapper>
        <div className="profile-row">
          <div>
            {Boolean(profileImg) ? (
              <img src={profileImg} alt={profileName} className="profile-image" onClick={()=>history.push('/profile/' + profile.userAccountHandle)} />
            ) : (
              <FaUserCircle className="profile-image" />
            )}
          </div>
        </div>
        <div className="profile-name-row">
          <h1 className="profile-name">{profileName}</h1>
          {isVerified && <GoVerified className="verified-icon" />}
        </div>
        <div className="wallet-address-row">
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
        </div>
        <p className="bio">{bio}</p>
        <div className="socials-row">
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
          <div className="icon">{userprofile?.follow?.length}</div>
          <div className="follow" onClick={()=>dispatch(showModal({isfollow: true,show:true, followdata:userprofile.follow}))}>Following</div>
{/* 
          <div className="icon">{userprofile?.follow?.length}</div>
          <div className="follow">Follower</div> */}
        </div>
    </UserProfileDatadWrapper>
  );
};

export default UserProfileData;
