import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useConversionRateQuery from 'hooks/auction/useConversionRateQuery';
import useCryptoAddressProfileQuery from 'hooks/profile/useCryptoAddressProfileQuery';
import useAuctionDetailsQuery from 'hooks/auction/useAuctionDetailsQuery';
import useAuctionBlockchainDetails from 'hooks/auction/useAuctionBlockchainDetails';
import useCanClaimAsset from 'hooks/auction/useCanClaimAsset';

import Container from 'components/layout/Container';
import FlexColumnWrapper from 'components/common/FlexColumnWrapper';
import AnimatedSphere from 'components/AnimatedSphere';
import ArtworkPreview from 'components/auction/ArtworkPreview';
import HighestBidCountdownCombo from 'components/auction/HighestBidCountdownCombo';
import LatestBids from 'components/auction/latest-bids/LatestBids';
// import Banner from 'components/Banner';
import Footer from 'components/layout/Footer';

import config from 'config';

const AuctionPageWrapper = styled.main`
  width: 100%;
  padding-bottom: 60px;

  background: ${({ theme }) => theme.backgroundColors.primary};

  & > ${Container} {
    @media screen and (max-width: 1285px) {
      margin-right: 15px;
      margin-left: 15px;
    }

    @media screen and (max-width: 575.99px) {
      margin-right: 0;
      margin-left: 0;
    }
  }

  & > ${Container} > .auction-page-grid {
    width: 100%;
    margin-top: 65px;
    display: grid;
    grid-template-columns: auto auto;
    grid-column-gap: 64px;

    @media screen and (max-width: 1199.99px) {
      justify-content: center;
      grid-column-gap: 32px;
      grid-template-columns: auto;
      grid-column-gap: 0;
      grid-row-gap: 64px;
    }

    & > ${FlexColumnWrapper} {
      width: auto;

      @media screen and (max-width: 1199.99px) {
        align-items: center;
      }
    }
  }
`;

const NewAuctionPage = () => {
  const [auction, setAuction] = useState({});

  const { auctionId } = useParams();

  const { isWalletConnected } = useSelector((state) => state.wallet);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const auctionDetailsQuery = useAuctionDetailsQuery({ auctionId });

  useEffect(() => {
    if (auctionDetailsQuery.data?.data) {
      setAuction(auctionDetailsQuery.data.data);
    }
  }, [auctionDetailsQuery?.data?.data]);

  const profileQuery = useCryptoAddressProfileQuery({
    userCryptoAddress: auction?.nftDetails?.userWalletAddress,
  });

  const conversionRateQuery = useConversionRateQuery({
    coingeckoCryptoId: 'tron,tether',
    coingeckoCurrency: 'usd',
  });

  const {
    currentAuctionStatus,
    currentBidAmount,
    currentBidCount,
    currentBidOwner,
  } = useAuctionBlockchainDetails({ auctionId });

  const { canClaimAsset } = useCanClaimAsset({
    auctionId,
    currentAuctionStatus,
  });

  if (
    auctionDetailsQuery.isIdle ||
    auctionDetailsQuery.isLoading ||
    profileQuery.isIdle ||
    profileQuery.isLoading
  )
    return <AnimatedSphere />;

  return (
    <AuctionPageWrapper>
      <Container>
        <div className="auction-page-grid">
          <FlexColumnWrapper>
            <ArtworkPreview
              assetIpfsHash={auction?.nftDetails?.assetIpfsHash}
              assetMimetype={auction?.nftDetails?.assetMimetype}
            />
            {isWalletConnected ? (
              <AuctionInteractions
              auctionId={+auctionId}
              currentAuctionStatus={currentAuctionStatus}
              currentBidOwner={currentBidOwner}
              showClaimAsset={canClaimAsset}
              ownerWalletAddress={auction?.nftDetails?.ownerWalletAddress}
              instantSalePrice = {auction?.instantSalePrice}
              tokenId = {auction?.nftDetails?.tokenId}
              buyInfo = {auction?.nftDetails?.buyInfo}
              isTokenClaimed= {auction?.isTokenClaimed}
              isAssetClaimed = {auction?.isAssetClaimed}
              />
            ) : null}
            <LatestBids
              auctionId={auctionId}
              isTrxAuction={auction?.isTrxAuction}
              currentAuctionStatus={currentAuctionStatus}
              conversionRate={
                conversionRateQuery?.data?.data?.[
                  auction?.isTrxAuction ? 'tron' : 'tether'
                ]?.usd
              }
            />
          </FlexColumnWrapper>
          <FlexColumnWrapper>
            <AuctionInfo
                      isTrxAuction={auction?.isTrxAuction}
                      nftTitle={auction?.nftDetails?.assetName}
                      nftDescription={auction?.nftDetails?.assetDescription}
                      bidCount={currentBidCount}
                      currentBidAmount={currentBidAmount}
                      currentBidOwner={currentBidOwner}
                      currentAuctionStatus={currentAuctionStatus}
                      instantSalePrice = {auction?.instantSalePrice}
                      trc20TokenAddress={auction?.trc20TokenAddress}
                      reservePrice={auction?.startPrice}
                      creatorProfileImageUrl={profileQuery?.data?.data?.userProfileImageUrl?.replace(
                        'ipfs.io',
                        'fansforever.mypinata.cloud'
                      )}
                      creatorUsername={profileQuery?.data?.data?.username}
                      creatorAccountHandle={profileQuery?.data?.data?.userAccountHandle}
                      creatorWalletAddress = {auction?.nftDetails?.ownerWalletAddress}
                      tokenId = {auction?.nftDetails?.tokenId}
                      buyInfo = {auction?.nftDetails?.buyInfo}
            />
            <HighestBidCountdownCombo
                highestBid={currentBidAmount}
                conversionRate={
                  conversionRateQuery?.data?.data?.[
                    auction?.isTrxAuction ? 'tron' : 'tether'
                  ]?.usd
                }
                tokenMultiplicationFactor={
                  auction?.isTrxAuction ? '1e+6' : '1e+6'
                }
                tokenSymbol={auction?.isTrxAuction ? 'trx' : 'usdt'}
                startsAt={auction?.startTime}
                endsAt={auction?.endsAt}
                currentAuctionStatus={currentAuctionStatus}
            />
          </FlexColumnWrapper>
        </div>
      </Container>
      {/* <Banner /> */}
      <Footer />
    </AuctionPageWrapper>
  );
};

export default NewAuctionPage;
