import * as React from 'react';

import { Fragment } from 'react';

import styled from 'styled-components';

import AuctionCard from 'components/AuctionCard';

const FavoriteAuctionsTitleWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 45px;
  margin-bottom: 52px;

  h2 {
    flex: 0 1 auto;
    font-family: Clash Grotesk;
    font-style: normal;
    font-weight: bold;
    font-size: 37px;
    line-height: 46px;
    text-transform: uppercase;
    white-space: nowrap;
    color: ${({ theme }) => theme.textColors.tertiary};
  }

  .line {
    margin-left: 40px;
    flex: 0 1 90%;
    height: 0px;
    border: 1px solid ${({ theme }) => theme.textColors.tertiary};
  }
`;

const FavoriteAuctionsWrapper = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(288px, 1fr));
  grid-column-gap: 24px;
  grid-row-gap: 45px;
  position: relative;
`;

const FavoriteAuctions = ({ auctions = []}) => {
  //const [item_count, setItemCount] = useState(4);
  const item_count = 4;
  return (
    <Fragment>
      <FavoriteAuctionsTitleWrapper>
        <h2>You may also like...</h2>
        <div className="line" />
      </FavoriteAuctionsTitleWrapper>
      <FavoriteAuctionsWrapper>
        {auctions?.length > 0 &&
          auctions.map((auction, itemIdx) => (
            itemIdx < item_count && <AuctionCard
              key={auction._id}
              idx={auction.auctionIndex}
              isTrxAuction={auction?.isTrxAuction}
              assetType={auction.nftDetails.assetMimetype}
              assetIpfsHash={auction.nftDetails.assetIpfsHash}
              title={auction.nftDetails.assetName}
              price={auction.startPrice}
              creator={auction.userAccountHandle}
              profileImage={auction.userProfileImage}
              startsAt={auction.startTime}
              endsIn={auction.endsAt || auction.startTime + auction.duration}
            /> 
          ))}
        
      </FavoriteAuctionsWrapper>
    </Fragment>
  );
};

export default FavoriteAuctions;
