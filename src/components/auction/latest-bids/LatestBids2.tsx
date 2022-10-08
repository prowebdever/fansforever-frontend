import styled from 'styled-components';

import useAuctionBidsQuery from 'hooks/auction/useAuctionBidsQuery';

import FlexColumnWrapper from 'components/common/FlexColumnWrapper';
import BidCard from 'components/auction/latest-bids/BidCard2';

const LatestBidsWrapper = styled.div`
  width: auto;
  height: auto;
  margin-top: 32px;

  @media screen and (max-width: 625px) {
    width: 100%;
  }

  ${FlexColumnWrapper} {
    align-items: center;
  }

  .latest-bids {
    font-family: Clash Grotesk;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 39px;
    text-transform: uppercase;
    margin-bottom: 18px;
    color: ${({ theme }) => theme.textColors.tertiary};
    width: 95%;
    margin: 0 auto 20px auto;
  }
`;

interface LatestBidsProps {
  auctionId: number;
  isTrxAuction?: boolean;
  currentAuctionStatus: number;
  conversionRate: number;
}

const LatestBids: React.VFC<LatestBidsProps> = ({
  auctionId,
  isTrxAuction = true,
  currentAuctionStatus,
  conversionRate,
}) => {
  const auctionBidsQuery = useAuctionBidsQuery({
    auctionId,
    currentAuctionStatus,
  });
  console.log(auctionBidsQuery)
  return (
    <LatestBidsWrapper>
      {auctionBidsQuery.data?.data?.events?.length === 0 ? null : (
        <h2 className="latest-bids">Latest Bids</h2>
      )}
      <FlexColumnWrapper>
        {auctionBidsQuery.data?.data?.events?.map((bid) => (
          <BidCard
            key={bid.transaction_id}
            bidderProfileImage={
              bid?.user_profile_image_url?.replace(
                'ipfs.io',
                'fansforever.mypinata.cloud'
              ) || ''
            }
            bidderAccountHandle={bid.user_account_handle}
            bidTimestamp={bid.block_timestamp}
            bidAmount={bid.result.amount}
            tokenSymbol={isTrxAuction ? 'trx' : 'usdt'}
            tokenMultiplicationFactor={isTrxAuction ? '1e+6' : '1e+6'}
            conversionRate={conversionRate}
            transactionId={bid.transaction_id}
          />
        ))}
      </FlexColumnWrapper>
    </LatestBidsWrapper>
  );
};

export default LatestBids;
