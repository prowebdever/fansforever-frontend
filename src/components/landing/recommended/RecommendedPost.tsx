import styled from 'styled-components';
import { Link } from 'react-router-dom';

import HighestBidCountdownCombo from 'components/auction/HighestBidCountdownCombo';
import CreatorInfo from 'components/auction/info/CreatorInfo';
import ReservePriceInfo from 'components/auction/info/ReservePriceInfo';
import FlexColumnWrapper from 'components/common/FlexColumnWrapper';
import FlexRowWrapper from 'components/common/FlexRowWrapper';
import AssetPreview from 'components/AssetPreview';
import useAuctionBlockchainDetails from 'hooks/auction/useAuctionBlockchainDetails';
import NftTitle from 'components/auction/info/NftTitle';
import useCryptoAddressProfileQuery from 'hooks/profile/useCryptoAddressProfileQuery';

const RecommendedPostWrapper = styled.div`
  & > ${FlexRowWrapper} {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 60px;
    flex-flow: row wrap;

    @media screen and (max-width: 1199.99px) {
      justify-content: center;
    }

    & > ${FlexColumnWrapper} {
      width: auto;

      &:first-of-type {
        order: 1;

        @media screen and (max-width: 1199.99px) {
          order: 2;
        }

        & > ${FlexRowWrapper} {
          margin-bottom: 42px;
          margin-left: auto;
          margin-right: auto;

          @media screen and (max-width: 575.99px) {
            width: 95%;
          }

          &:last-of-type {
            align-items: center;
          }
        }
      }

      &:last-of-type {
        order: 2;
        @media screen and (max-width: 1199.99px) {
          order: 1;
        }
      }
    }
  }

  .divider {
    align-items: center;
    height: 42px;
    width: 1px;
    border: 1px solid ${({ theme }) => theme.textColors.tertiary};
    margin: 0 42px;
  }

  .recommended {
    font-family: Clash Grotesk;
    font-style: normal;
    font-weight: bold;
    font-size: 37px;
    line-height: 42px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.textColors.tertiary};
    margin-bottom: 32px;

    @media screen and (max-width: 1199.99px) {
      display: none;
    }
  }

  .preview-wrapper {
    width: 438px;
    height: 602px;

    border: 1px solid ${({ theme }) => theme.textColors.tertiary};
    box-sizing: border-box;
    border-radius: 38px;

    display: grid;
    place-items: center;
    margin: 0 auto;
    overflow: hidden;

    .wrapper {
      width: 100%;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
      }
    }

    @media screen and (max-width: 1199.99px) {
      width: 70%;
      height: auto;
    }
  }

  .place-bid-button {
    width: 179px;
    height: 47px;

    background: ${({ theme }) => theme.accentColors.primary};
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;

    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 22px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: -0.21px;

    color: #fff;
  }
`;

interface RecommendedPostProps {
  auctionId: number;
  isTrxAuction: boolean;
  nftTitle: string;
  nftAssetPreviewUrl: string;
  nftAssetMimetype: string;
  creatorProfileImageUrl: string;
  creatorUsername: string;
  creatorAccountHandle: string;
  reservePrice: number;
  conversionRate: number;
  auctionStartTime: number;
  auctionEndTime: number;
  userWalletAddress:string;
}

const RecommendedPost: React.VFC<RecommendedPostProps> = ({
  auctionId,
  isTrxAuction,
  nftTitle,
  nftAssetPreviewUrl,
  nftAssetMimetype,
  creatorProfileImageUrl,
  creatorUsername,
  creatorAccountHandle,
  reservePrice,
  conversionRate,
  auctionStartTime,
  auctionEndTime,
  userWalletAddress
}) => {
  const { currentAuctionStatus, currentBidAmount } =
    useAuctionBlockchainDetails({ auctionId, pollingInterval: 60000 });
  
  const profileQuery = useCryptoAddressProfileQuery({
      userCryptoAddress: userWalletAddress,
  });
  return (
    <RecommendedPostWrapper>
      <FlexRowWrapper>
        <FlexColumnWrapper>
          <FlexRowWrapper>
            <h2 className="recommended">Recommended</h2>
          </FlexRowWrapper>
          <FlexRowWrapper>
            <NftTitle nftTitle={nftTitle} />
          </FlexRowWrapper>
          <FlexRowWrapper>
            <CreatorInfo
              creatorProfileImageUrl={creatorProfileImageUrl?.replace(
                'ipfs.io',
                'fansforever.mypinata.cloud'
              )}
              creatorUsername={creatorUsername}
              creatorAccountHandle={creatorAccountHandle}
              profileQuery={profileQuery?.data?.data}
            />
            <div className="divider"></div>
            <ReservePriceInfo
              isTrxAuction={isTrxAuction}
              reservePrice={reservePrice}
            />
          </FlexRowWrapper>
          <FlexRowWrapper>
            <HighestBidCountdownCombo
              conversionRate={conversionRate}
              currentAuctionStatus={currentAuctionStatus}
              endsAt={auctionEndTime}
              highestBid={currentBidAmount}
              startsAt={auctionStartTime}
              tokenMultiplicationFactor={isTrxAuction ? '1e+6' : '1e+6'}
              tokenSymbol={isTrxAuction ? 'trx' : 'usdt'}
            />
          </FlexRowWrapper>
          <FlexRowWrapper>
            <Link className="place-bid-button" to={`/auction/${auctionId}`}>
              <p>Place a Bid</p>
            </Link>
          </FlexRowWrapper>
        </FlexColumnWrapper>
        <FlexColumnWrapper>
          <div className="preview-wrapper">
            <AssetPreview
              previewUrl={nftAssetPreviewUrl}
              assetMimetype={nftAssetMimetype}
              hasControls={false}
            />
          </div>
        </FlexColumnWrapper>
      </FlexRowWrapper>
    </RecommendedPostWrapper>
  );
};

export default RecommendedPost;
