import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BigNumber from 'bignumber.js';

import { RootState } from 'store';

import FlexRowWrapper from 'components/common/FlexRowWrapper';

import BidsPlaced from './BidsPlaced';
import PlaceTrxBidButton from '../place-bid/PlaceTrxBidButton';
import PlaceTrc20BidButton from '../place-bid/PlaceTrc20BidButton';
import BuyNowTrxButton from '../place-bid/BuyNowTrxButton';
import BuyNowTrc20Button from '../place-bid/BuyNowTrc20Button';
import CancelBidButton from '../place-bid/cancelBidButton';
import AcceptBidButton from '../place-bid/acceptBidButton';
import ReservePriceInfo from './ReservePriceInfo';
import InstantSalePriceInfo from './InstantSalePriceInfo';
import BidAmountInput from '../place-bid/BidAmountInput';
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
    justify-content: space-between;
    margin-bottom: 32px;
    flex-flow: row wrap;
  }
  & > ${FlexRowWrapper}.actionbutton {
    display:grid;
    grid-template-columns: auto auto auto auto;
    align-items: center;
    @media screen and (max-width: 575.99px) {
      display:grid;
      grid-template-columns: auto;
      align-items: center;
    }
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
}

const AuctionInfo: React.VFC<AuctionInfoProps> = ({
  isTrxAuction,
  instantSalePrice,
  bidCount,
  currentBidAmount,
  currentBidOwner,
  currentAuctionStatus,
  trc20TokenAddress,
  reservePrice,
  creatorWalletAddress,
  tokenId,
  buyInfo
}) => {
  const [newUserBidAmount, setNewUserBidAmount] = useState('0');

  const { auctionId } = useParams<{ auctionId: string }>();

  const isWalletConnected = useSelector(
    (state: RootState) => state.wallet.isWalletConnected
  );

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

  return (
    <AuctionInfoWrapper>
      {
        creatorWalletAddress === localStorage.getItem('accountAddress')?
      <FlexRowWrapper>
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
      <FlexRowWrapper className="actionbutton">
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
      <FlexRowWrapper>
        <ReservePriceInfo
          reservePrice={reservePrice}
          isTrxAuction={isTrxAuction}
        />
        <InstantSalePriceInfo
          instantPrice={instantSalePrice}
          isTrxAuction={isTrxAuction}
        />
        <BidsPlaced bidCount={bidCount} />
        
      </FlexRowWrapper>
    </AuctionInfoWrapper>
  );
};

export default AuctionInfo;
