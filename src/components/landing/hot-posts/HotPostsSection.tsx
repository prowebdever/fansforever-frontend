import { useMemo } from 'react';
import styled from 'styled-components';

import useHotAuctionsQuery from 'hooks/auction/useHotAuctionsQuery';
import HeroPost from './HeroPost';
import FlexRowWrapper from 'components/common/FlexRowWrapper';
import SectionTitle from 'components/common/SectionTitle';
import Post from './Post';

const HotPostsSectionWrapper = styled.div`
  & > ${FlexRowWrapper} {
    width: 100%;
    align-items: center;
    justify-content: space-between;
    flex-flow: row wrap;

    @media screen and (max-width: 1199.99px) {
      justify-content: center;
    }

    & > div {
      height: 100%;

      &:last-of-type {
        flex: 0 1 55%;

        .post {
          margin-bottom: 54px;
        }
      }
    }
  }
`;

const HotPostsSection: React.VFC<{
  conversionRate: { tether: { usd: number }; tron: { usd: number } };
}> = ({ conversionRate }) => {
  const hotAuctionsQuery = useHotAuctionsQuery();

  const heroAuction = useMemo(() => {
    if (hotAuctionsQuery.data?.data?.length) {
      return hotAuctionsQuery.data.data[0];
    } else {
      return null;
    }
  }, [hotAuctionsQuery.data?.data]);

  const hotAuctions = useMemo(() => {
    if (hotAuctionsQuery.data?.data?.length) {
      return hotAuctionsQuery?.data?.data.filter(
        (_: any, i: number) => i !== 0 && i < 4
      );
    } else {
      return null;
    }
  }, [hotAuctionsQuery.data?.data]);

  return (
    <HotPostsSectionWrapper>
      <SectionTitle title="Hot Drops" />
      <FlexRowWrapper>
        <div>
          {heroAuction ? (
            <HeroPost
              auctionId={heroAuction?.auctionIndex}
              isTrxAuction={heroAuction?.isTrxAuction}
              previewUrl={`https://fansforever.mypinata.cloud/ipfs/${heroAuction?.nftDetails?.assetIpfsHash}`}
              assetMimetype={heroAuction?.nftDetails?.assetMimetype}
              nftTitle={heroAuction?.nftDetails?.assetName}
              creatorAccountHandle={heroAuction?.userAccountHandle}
              bidCount={heroAuction?.bidCount}
              bidAmount={heroAuction?.latestBidAmount || 0}
              conversionRate={
                conversionRate[heroAuction?.isTrxAuction ? 'tron' : 'tether']
                  .usd
              }
              tokenMultiplicationFactor={
                heroAuction?.isTrxAuction ? '1e+6' : '1e+6'
              }
            />
          ) : null}
        </div>
        <div>
          {hotAuctions?.map((hotAuction: any, i: number) => (
            <div className="post" key={i}>
              <Post
                auctionId={hotAuction?.auctionIndex}
                isTrxAuction={hotAuction?.isTrxAuction}
                previewUrl={`https://fansforever.mypinata.cloud/ipfs/${hotAuction?.nftDetails?.assetIpfsHash}`}
                assetMimetype={hotAuction?.nftDetails?.assetMimetype}
                nftTitle={hotAuction?.nftDetails?.assetName}
                creatorAccountHandle={hotAuction?.userAccountHandle}
                bidCount={hotAuction?.bidCount}
                bidAmount={hotAuction?.latestBidAmount || 0}
                conversionRate={
                  conversionRate[heroAuction?.isTrxAuction ? 'tron' : 'tether']
                    .usd
                }
                tokenMultiplicationFactor={
                  hotAuction?.isTrxAuction ? '1e+6' : '1e+6'
                }
                startsAt={hotAuction?.startTime}
                endsAt={hotAuction?.endsAt}
              />
            </div>
          ))}
        </div>
      </FlexRowWrapper>
    </HotPostsSectionWrapper>
  );
};

export default HotPostsSection;
