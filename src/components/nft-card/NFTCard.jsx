import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import FlexColumnWrapper from 'components/common/FlexColumnWrapper';
import FlexRowWrapper from 'components/common/FlexRowWrapper';
import AssetPreview from '../AssetPreview';
import TokenOptions from './TokenOptions';
import ConditionalStatusPill from './ConditionalStatusPill';
// import {BsMessenger} from 'react-icons/bs';
import Badge from "@mui/material/Badge"
import MailIcon from '@mui/icons-material/Mail';
import { showOwnerChatModal } from 'actions/userActions';
import { useState, useEffect } from 'react';
import config from 'config';

const NFTCardWrapper = styled.div`
  width: 288px;
  min-height: 365px;
  position: relative;

  background: ${({ theme }) => theme.backgroundColors.primary};
  border: 1px solid ${({ theme }) => theme.borderColors.tertiary};
  box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.03);
  border-radius: 15px;
  margin: 0 auto;
  

  .nft-preview {
    width: 100%;
    height: 260px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    overflow: hidden;

    border-top-left-radius: 15px;
    border-top-right-radius: 15px;

    .wrapper {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  ${FlexRowWrapper} {
    align-items: center;
  }

  .info {
    padding: 20px;

    h3 {
      font-family: Clash Grotesk;
      font-style: normal;
      font-weight: 600;
      font-size: 32px;
      line-height: 39px;
      text-transform: capitalize;
      color: ${({ theme }) => theme.textColors.primary};
      margin-bottom: 18px;
      width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    h4 {
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      text-align: center;
      letter-spacing: -0.21px;
      color: ${({ theme }) => theme.textColors.primary};
    }
  }

  .profile-thumbnail {
    width: 29.55px;
    height: 29.55px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: contain;
    margin-right: 12px;
    background: ${({ theme }) => theme.textColors.tertiary}33;
  }

  .title-row {
    justify-content: space-between;
  }
  .message {
    color: rgba(255,52,101,0.4);
    width: 30px;
    height: 30px;
    float: right;
  }
  .message:hover {
    color: rgba(255,52,101,0.4);
  }
`;

const NFTCard = ({
  idx,
  image,
  title,
  nftDetails,
  onBurnTokenClick,
  auctionIndex,
}) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const showOwnerChatModalhandler=(payload)=>{
    console.log(payload)
    dispatch(showOwnerChatModal(payload))
  }
  const user = useSelector((state) => state.user);
  const [newMessageNumber, setMessageNumber] = useState(0);
  useEffect( ()=>{
    async function getNum() {
      const response = await fetch(`${config.apiBaseUrl}/chat/getNewMessageNumber`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          auctionId: auctionIndex,
          to: window?.tronWeb?.defaultAddress?.base58
        }),
      });
      var result =  await response.json();
      setMessageNumber(result)
    }
    getNum();
  }, [auctionIndex])
  return (
    <NFTCardWrapper>
      <ConditionalStatusPill 
        isApprovedForAuction={nftDetails?.isApprovedForAuction}
        isMovedToAuction={nftDetails?.isMovedToAuction}
        userCryptoAddress={nftDetails?.user?.[0]?.userCryptoAddress}
        ownerWalletAddress={nftDetails?.ownerWalletAddress}
      />
      <FlexColumnWrapper>
        <div className="nft-preview"
            onClick={() => {
              if (nftDetails?.isMovedToAuction && Boolean(auctionIndex)) {
                history.push(`/auction/${auctionIndex}`);
              }
            }}
        >
          <AssetPreview
            previewUrl={image}
            assetMimetype={nftDetails?.assetMimetype}
            hasControls={false}
          />
        </div>
        <div className="info">
          <FlexRowWrapper className="title-row">
            <h3>{title}</h3>
            {nftDetails?.ownerWalletAddress ===
              user?.profile?.userCryptoAddress &&
              !nftDetails?.isMovedToAuction && (
                <TokenOptions
                  title={title}
                  tokenId={idx}
                  nftDetails={nftDetails}
                  onBurnTokenClick={onBurnTokenClick}
                />
              )}
          </FlexRowWrapper>
          <FlexRowWrapper>
            <img
              className="profile-thumbnail"
              src={nftDetails?.user?.[0]?.userProfileImageUrl?.replace(
                'ipfs.io',
                'fansforever.mypinata.cloud'
              )}
              alt=""
              onClick={(e) => {
                e.stopPropagation();
                history.push(
                  `/profile/${nftDetails?.user?.[0]?.userAccountHandle}`
                );
              }}
            />
            <h4
              onClick={(e) => {
                e.stopPropagation();
                history.push(
                  `/profile/${nftDetails?.user?.[0]?.userAccountHandle}`
                );
              }}
            >
              @{nftDetails?.user?.[0]?.userAccountHandle}
            </h4>
            {
            nftDetails?.ownerWalletAddress === window?.tronWeb?.defaultAddress?.base58&& Boolean(auctionIndex)&&
            <div  style={{position:'absolute' , right: 25, cursor: 'pointer', zIndex: 1000}} onClick={()=>showOwnerChatModalhandler({show: true, selectedAuctionId: auctionIndex})}>
              <Badge badgeContent={newMessageNumber} color="success">
                <MailIcon className="message"/>
              </Badge>
            </div>
            }
          </FlexRowWrapper>
        </div>
      </FlexColumnWrapper>
    </NFTCardWrapper>
  );
};

export default NFTCard;
