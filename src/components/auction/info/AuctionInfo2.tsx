import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BigNumber from 'bignumber.js';

import { RootState } from 'store';

import FlexRowWrapper from 'components/common/FlexRowWrapper';
import FlexColumnWrapper from 'components/common/FlexColumnWrapper';

//import BidsPlaced from './BidsPlaced';
import PlaceTrxBidButton from '../place-bid/PlaceTrxBidButton';
import PlaceTrc20BidButton from '../place-bid/PlaceTrc20BidButton';
import BuyNowTrxButton from '../place-bid/BuyNowTrxButton';
import BuyNowTrc20Button from '../place-bid/BuyNowTrc20Button';
import CancelBidButton from '../place-bid/cancelBidButton';
import AcceptBidButton from '../place-bid/acceptBidButton';
import FollowButton from '../../profile/FollowButton';
//import ReservePriceInfo from './ReservePriceInfo';
//import InstantSalePriceInfo from './InstantSalePriceInfo';
import BidAmountInput from '../place-bid/BidAmountInput';
//import NftTitle from './NftTitle';
// import PayDMButton from '../place-bid/PayDMButton';

const AuctionInfoWrapper = styled.div`
  width: 100%;
  height: auto;
  display: grid;
  grid-template-columns: auto;
  @media screen and (max-width: 575.99px) {
    width: 95%;
  }

  & > ${FlexRowWrapper} {
    align-items: center;
    // justify-content: space-between;
    margin-bottom: 32px;
    flex-flow: row wrap;
  }
  & > ${FlexRowWrapper}.actionbutton {
    display:grid;
    grid-template-columns: auto auto;
    align-items: center;
    @media screen and (max-width: 575.99px) {
      display:grid;
      grid-template-columns: auto;
      align-items: center;
    }
  }

  .accept-cancel {
    display:grid;
    padding: 10px;
    grid-template-columns: auto auto;
    align-items: center;
    @media screen and (max-width: 575.99px) {
      display:grid;
      grid-template-columns: auto;
      align-items: center;
    }
  }

  .bid-buy {
    display:grid;
    padding: 10px;
    grid-template-columns: auto auto auto;
    align-items: center;
    @media screen and (max-width: 575.99px) {
      display:grid;
      grid-template-columns: auto;
      align-items: center;
    }
  }
  .profile-image {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    margin-right: 12px;
  }

  .creator-profile {
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.textColors.primary};
  }

  h1 {
    width: 100%;
    font-family: Clash Grotesk;
    font-weight: 500;
    font-size: 48px;
    line-height: 100px;
    text-transform: capitalize;
    color: ${({ theme }) => theme.textColors.primary};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h4 {
    width: 100%;
    font-family: Clash Grotesk;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    text-transform: capitalize;
    color: ${({ theme }) => theme.textColors.primary};
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

interface AuctionInfoProps {
  isTrxAuction: boolean;
  instantSalePrice: any;
  nftTitle: string;
  nftDescription: string;
  bidCount: number;
  currentBidAmount: string;
  currentBidOwner: string;
  currentAuctionStatus: number;
  trc20TokenAddress: string;
  reservePrice: number;
  creatorProfileImageUrl: string;
  creatorUsername: string;
  creatorAccountHandle: string;
  creatorWalletAddress: string;
  tokenId: number;
  buyInfo: any;
  profileQuery: any;
}

const AuctionInfo: React.VFC<AuctionInfoProps> = ({
  isTrxAuction,
  nftTitle,
  nftDescription,
  instantSalePrice,
  bidCount,
  currentBidAmount,
  currentBidOwner,
  currentAuctionStatus,
  trc20TokenAddress,
  reservePrice,
  creatorWalletAddress,
  tokenId,
  buyInfo,
  profileQuery
}) => {
  const [newUserBidAmount, setNewUserBidAmount] = useState('0');
  //const [userprofile , setUserProfileData] = useState(profile);

  const [isFollowedOwner, setFollowedOwner] = useState(0);
  const { auctionId } = useParams<{ auctionId: string }>();

  const isWalletConnected = useSelector(
    (state: RootState) => state.wallet.isWalletConnected
  );

  const setFollowUnfollowFunc = (result: any) => {
    if(result){
      setFollowedOwner((pv) => {
        //console.log(pv);
        return 3-pv;
      });
    }
  }
  useEffect(() => {
    if (bidCount === 0) {
      return setNewUserBidAmount(reservePrice?.toFixed(2));
    } else {
      if (currentBidAmount) {
        const _nextBidAmount = new BigNumber(currentBidAmount)
          .dividedBy(isTrxAuction ? '1e+6' : '1e+6')
          .plus(1)
          .toFixed(2);
        setNewUserBidAmount(_nextBidAmount);
      }
    }
    
  }, [reservePrice, bidCount, isTrxAuction, currentBidAmount]);

  useEffect(() => {
    if(!window?.tronWeb?.defaultAddress?.base58){
      return;
    }
    if(window?.tronWeb?.defaultAddress?.base58 === profileQuery.userCryptoAddress){
      setFollowedOwner(0);
    }else{
      if(profileQuery?.follow?.filter((prf)=>prf?.userCryptoAddress === window?.tronWeb?.defaultAddress?.base58).length === 0){
        setFollowedOwner(1); // Follow
      }else{
        setFollowedOwner(2); //Unfollow
      }
    }
  }, [profileQuery]);
  
  return (
    <AuctionInfoWrapper>
      <FlexRowWrapper className="actionbutton">
        <FlexColumnWrapper>
          <h1>{nftTitle}</h1>
        </FlexColumnWrapper>
        <FlexColumnWrapper>
          {
            creatorWalletAddress === localStorage.getItem('accountAddress')?
              <FlexRowWrapper className="accept-cancel">
                <CancelBidButton
                  bidCount={parseInt(bidCount.toFixed())}
                  auctionId={auctionId}
                  tokenId={tokenId}
                />
                <AcceptBidButton
                  bidCount = {parseInt(bidCount.toFixed())}
                  auctionId = {auctionId}
                  tokenId={tokenId}
                  currentAuctionStatus={currentAuctionStatus}
                />
              </FlexRowWrapper>
          : 
          <FlexRowWrapper className="bid-buy">
            {isWalletConnected && currentAuctionStatus === 1 ? (
                <BidAmountInput
                  isTrxAuction={isTrxAuction}
                  bidAmount={newUserBidAmount}
                  onBidAmountInput={(value) => setNewUserBidAmount(value)}
                />
            ) : null}
            
            {isWalletConnected && currentAuctionStatus === 1 ? (
              isTrxAuction ? (
                <PlaceTrxBidButton
                  auctionId={+auctionId}
                  currentBidAmount={currentBidAmount}
                  currentBidOwner={currentBidOwner}
                  newTrxBidAmount={newUserBidAmount}
                />
              ) : (
                <PlaceTrc20BidButton
                  auctionId={+auctionId}
                  currentBidAmount={currentBidAmount}
                  currentBidOwner={currentBidOwner}
                  newTrc20BidAmount={newUserBidAmount}
                  trc20TokenAddress={trc20TokenAddress}
                />
              )
            ) : null}

            {isWalletConnected && currentAuctionStatus === 1 ? (
              isTrxAuction ? (
                <BuyNowTrxButton
                  auctionId={+auctionId}
                  instantSalePrice={instantSalePrice}
                  creatorWalletAddress = {creatorWalletAddress}
                  tokenId = {tokenId}
                  buyInfo = {buyInfo}
                />
              ) : (
                <BuyNowTrc20Button
                  auctionId={+auctionId}
                  currentBuyer={currentBidOwner}
                  instantSalePrice={instantSalePrice}
                  trc20TokenAddress={trc20TokenAddress}
                />
              )
            ) : null}
                {/* <PayDMButton
                  auctionId={+auctionId}
                  ownerAddress={currentBidOwner}
                /> */}
          </FlexRowWrapper>
          }
        </FlexColumnWrapper> 
      </FlexRowWrapper>
      <FlexRowWrapper>
          <FlexColumnWrapper>
            <div className="creator-profile">
              <img
                src={profileQuery?.userProfileImageUrl.replace(
                  'ipfs.io',
                  'fansforever.mypinata.cloud'
                )}
                alt={profileQuery?.username}
                className="profile-image"
              />
              @{profileQuery?.userAccountHandle}
              
              {isFollowedOwner === 1 && <><span>&nbsp;&nbsp;/ &nbsp;&nbsp;</span><FollowButton text="follow" setData = {setFollowUnfollowFunc}  profiledata = {profileQuery} myWalletAddress = {window?.tronWeb?.defaultAddress?.base58} /></>}
              {isFollowedOwner === 2 && <><span>&nbsp;&nbsp;/ &nbsp;&nbsp;</span><FollowButton text="unfollow" setData = {setFollowUnfollowFunc}  profiledata = {profileQuery} myWalletAddress = {window?.tronWeb?.defaultAddress?.base58} /></>}
            </div>
          </FlexColumnWrapper>
          <FlexColumnWrapper>
          </FlexColumnWrapper>

      </FlexRowWrapper>
      <FlexRowWrapper>
        <h4>{nftDescription}</h4>
      </FlexRowWrapper>
      {/* <FlexRowWrapper>
        <ReservePriceInfo
          reservePrice={reservePrice}
          isTrxAuction={isTrxAuction}
        />
        <InstantSalePriceInfo
          instantPrice={instantSalePrice}
          isTrxAuction={isTrxAuction}
        />
        <BidsPlaced bidCount={bidCount} />
        
      </FlexRowWrapper> */}
    </AuctionInfoWrapper>
  );
};

export default AuctionInfo;
