import styled from 'styled-components';

import useRecommendedAuctionQuery from 'hooks/auction/useRecommendedAuctionQuery';
import RecommendedPost from './RecommendedPost';

const RecommendedPostSectionWrapper = styled.section``;

const RecommendedPostSection: React.VFC<{
  conversionRate: { tether: { usd: number }; tron: { usd: number } };
}> = ({ conversionRate }) => {
  const { data: auctionDetails } = useRecommendedAuctionQuery();
  return (
    <RecommendedPostSectionWrapper>
      {auctionDetails?.data && auctionDetails?.data?.length !== 0 ? (
        <RecommendedPost
          auctionId={auctionDetails.data.auctionIndex}
          isTrxAuction={auctionDetails.data.isTrxAuction}
          nftTitle={auctionDetails.data.nftDetails.assetName}
          nftAssetPreviewUrl={`https://fansforever.mypinata.cloud/ipfs/${auctionDetails.data.nftDetails.assetIpfsHash}`}
          nftAssetMimetype={auctionDetails.data.nftDetails.assetMimetype}
          creatorProfileImageUrl={auctionDetails.data.userProfileImage?.replace(
            'ipfs.io',
            'fansforever.mypinata.cloud'
          )}
          creatorUsername={auctionDetails.data.username}
          creatorAccountHandle={auctionDetails.data.userAccountHandle}
          reservePrice={auctionDetails.data.startPrice}
          conversionRate={
            conversionRate[auctionDetails.data.isTrxAuction ? 'tron' : 'tether']
              .usd
          }
          auctionStartTime={auctionDetails.data.startTime}
          auctionEndTime={auctionDetails.data.endsAt}
          userWalletAddress = {auctionDetails.data.nftDetails.userWalletAddress}
        />
      ) : null}
    </RecommendedPostSectionWrapper>
  );
};

export default RecommendedPostSection;
