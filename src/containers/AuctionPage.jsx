import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import useConversionRateQuery from 'hooks/auction/useConversionRateQuery';
import useCryptoAddressProfileQuery from 'hooks/profile/useCryptoAddressProfileQuery';
import useAuctionDetailsQuery from 'hooks/auction/useAuctionDetailsQuery';
import useAuctionBlockchainDetails from 'hooks/auction/useAuctionBlockchainDetails';
import useCanClaimAsset from 'hooks/auction/useCanClaimAsset';
import useAuctionsListQuery from 'hooks/auction/useAuctionsListQuery';

import Container from 'components/layout/Container';
import FlexColumnWrapper from 'components/common/FlexColumnWrapper';
import FlexRowWrapper from 'components/common/FlexRowWrapper';
import AnimatedSphere from 'components/AnimatedSphere';
import ArtworkPreview from 'components/auction/ArtworkPreview';
//import ViewOnIPFS from 'components/auction/links/ViewOnIPFS';
//import ViewOnTronscan from 'components/auction/links/ViewOnTronscan';
import AuctionInteractions from 'components/auction/auction-interactions/AuctionInteractions';
import AuctionInfo from 'components/auction/info/AuctionInfo2';
//import HighestBidCountdownCombo from 'components/auction/HighestBidCountdownCombo';
import ConditionalCountdown from 'components/ConditionalCountdown';
import LatestBids from 'components/auction/latest-bids/LatestBids';
//import NftTitle from 'components/auction/info/NftTitle';
//import NftDescription from 'components/auction/info/NftDescription';
//import CreatorInfo from 'components/auction/info/CreatorInfo';
import PriceChart from 'components/common/PriceChart'
import Banner from 'components/Banner';
import Footer from 'components/layout/Footer';
import PayDM from 'components/stickyFooter';
import FavoriteAuctions from 'components/auction/info/FavoriteAuctions';


//import config from 'config';

const AuctionPageWrapper = styled.main`
  width: 100%;
  padding-bottom: 60px;

  background: ${({ theme }) => theme.backgroundColors.primary};

  & > ${Container} {
    margin-right:0px;
    margin-left : 0px;
    @media screen and (max-width: 1285px) {
      margin-right: 5px;
      margin-left: 5px;
    }

    @media screen and (max-width: 575.99px) {
      margin-right: 0;
      margin-left: 0;
    }
  }

  & > ${Container} > .auction-page-grid {
    width: 100%;
    margin-top: 65px;
    margin-left: 0px;
    display: grid;
    grid-template-columns: auto;
    grid-column-gap: 4px;

    @media screen and (max-width: 1199.99px) {
      justify-content: center;
      grid-column-gap: 32px;
      grid-template-columns: auto;
      grid-column-gap: 0;
      grid-row-gap: 64px;
    }

    & > ${FlexRowWrapper}.content >${FlexColumnWrapper} {
      width: auto;
      @media screen and (max-width: 1199.99px) {
        
      }
    }

    .count-down {
      display: flex;
      justify-content: center;
    }

    .artwork {
      display: flex;
      justify-content: center;

    }
    .recent-bids {
      display: flex;
      justify-content: center;
    }
    .additional-actions {
      display: flex;
      justify-content: center;
    }

    .price-chart {
      width: 100%;
      height : 20vh;
      @media screen and (max-width: 1199.99px) {
        align-items: center;
      }
    }

    & > ${FlexRowWrapper}.art {
      width: auto;
      margin: auto;
      margin-bottom: 100px;
      align-items: center;
      @media screen and (max-width: 1199.99px) {
        align-items: center;
        margin:auto;
      }
    }

    & > ${FlexRowWrapper}.content {
      width: auto;
      margin-left: 0px;
      display: grid;
      align-items: center;
      grid-template-columns: 36% auto;
      @media screen and (max-width: 500.99px) {
        align-items: center;
        grid-template-columns: auto;
        display: grid;
      }
    }
  }
`;

const AuctionPage = () => {
  const [auction, setAuction] = useState({});

  const { auctionId } = useParams();

  const { isWalletConnected } = useSelector((state) => state.wallet);

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
 
  const auctionDetailsQuery = useAuctionDetailsQuery({ auctionId });
  const auctionsListQuery = useAuctionsListQuery();

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
          {/* <FlexRowWrapper className="art">
          </FlexRowWrapper> */}
          {/* <div style={{borderBottom:'solid 1px rgba(0,0,0,0.3)', width: 'auto', marginLeft: 40, marginBottom:30}}>
            {<CreatorInfo style={{position:'relative', top:"120"}}
              creatorProfileImageUrl={profileQuery?.data?.data?.userProfileImageUrl?.replace('ipfs.io', 'fansforever.mypinata.cloud')}
              creatorUsername={profileQuery?.data?.data?.username}
              creatorAccountHandle={profileQuery?.data?.data?.userAccountHandle}
              profileQuery = {profileQuery?.data?.data}
            />}
          </div> */}
          <FlexRowWrapper className="content">
              <FlexColumnWrapper>
                <div className="artwork">
                <ArtworkPreview
                  assetIpfsHash={auction?.nftDetails?.assetIpfsHash}
                  assetMimetype={auction?.nftDetails?.assetMimetype}
                />
                </div>
                <div className="count-down">
                  {currentAuctionStatus !== 2 ? (
                    <ConditionalCountdown startsAt={auction?.startsAt} endsAt={auction?.endsAt} />
                  ) : (
                    <h2>Auction Ended</h2>
                  )}
                </div>
                <div className="recent-bids">
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
                </div>
                {/* <ViewOnIPFS
                  link={`https://fansforever.mypinata.cloud/ipfs/${auction?.nftDetails?.nftIpfsHash}`}
                />
                <ViewOnTronscan
                  link={`${config.tronscan.transactionBaseUrl}${auction?.nftDetails?.mintTransactionId}`}
                /> */}
                <div className="additional-actions">
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
                </div>
              </FlexColumnWrapper>
              
              <FlexColumnWrapper>
                  {/* <NftTitle nftTitle={auction?.nftDetails?.assetName}/> */}

                  {/* <NftDescription >{auction?.nftDetails?.assetDescription}</NftDescription> */}
                  {/* <HighestBidCountdownCombo
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
                    /> */}

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
                      /* creatorProfileImageUrl={profileQuery?.data?.data?.userProfileImageUrl?.replace(
                        'ipfs.io',
                        'fansforever.mypinata.cloud'
                      )}
                      creatorUsername={profileQuery?.data?.data?.username}
                      creatorAccountHandle={profileQuery?.data?.data?.userAccountHandle} */
                      creatorWalletAddress = {auction?.nftDetails?.ownerWalletAddress}
                      tokenId = {auction?.nftDetails?.tokenId}
                      buyInfo = {auction?.nftDetails?.buyInfo}
                      profileQuery = {profileQuery?.data?.data}
                    />
                    <PriceChart buyinfo = {auction?.nftDetails?.buyInfo}/>
              </FlexColumnWrapper>
          </FlexRowWrapper>
          <div className="auctions-list">
            <FavoriteAuctions auctions={auctionsListQuery?.data?.data || []} />
          </div>
        </div>
      </Container>
      <Banner />
      <Footer />

      {
        window.tronWeb&&auction?.nftDetails?.ownerWalletAddress !== window.tronWeb.defaultAddress.base58 &&
        <PayDM 
          auctionId = {auctionId} 
          creatorAddress = {auction?.nftDetails?.ownerWalletAddress}
          nftTitle={auction?.nftDetails?.assetName}
        />
      }
      

    </AuctionPageWrapper>
  );
};

export default AuctionPage;
