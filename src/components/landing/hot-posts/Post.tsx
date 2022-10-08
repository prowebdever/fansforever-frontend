import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import { Link } from 'react-router-dom';

import FlexRowWrapper from 'components/common/FlexRowWrapper';
import AssetPreview from 'components/AssetPreview';
import FlexColumnWrapper from 'components/common/FlexColumnWrapper';
import ConditionalCountdown from 'components/ConditionalCountdown';

const PostWrapper = styled.div`
  width: 600px;
  padding: 10px;
  min-height: 120px;

  border-radius: 10px;
  border: 1px solid transparent;

  @media screen and (max-width: 767.99px) {
    width: 575px;
  }

  @media screen and (max-width: 575.99px) {
    width: 450px;
  }

  @media screen and (max-width: 459.99px) {
    width: 95vw;
    max-width: 95vw;
    padding: 10px 0;
  }

  &:hover {
    border: 1px solid ${({ theme }) => theme.textColors.tertiary};
  }

  & > ${FlexRowWrapper} {
    width: auto;
    justify-content: space-between;

    @media screen and (max-width: 599.99px) {
      flex-flow: row wrap;
    }

    &:first-of-type {
      align-items: center;
      justify-content: center;
      @media screen and (max-width: 767.99px) {
        width: 100%;
      }
    }

    & > ${FlexColumnWrapper} {
      justify-content: center;

      ${FlexRowWrapper} {
        padding: 4px 20px;
        justify-content: space-between;
        flex-flow: row wrap;

        @media screen and (max-width: 459.99px) {
          padding: 5px;
        }
      }

      ${FlexColumnWrapper} {
        width: auto;
      }
    }
  }

  ${FlexRowWrapper} > ${FlexColumnWrapper} > ${FlexRowWrapper} {
    &:nth-of-type(1) {
      margin-bottom: 24px;
    }

    &:nth-of-type(2) {
      align-items: center;
    }
  }

  .nft-preview {
    width: 170px;
    height: 121px;
  }

  .title {
    font-family: Clash Grotesk;
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 39px;
    text-transform: capitalize;
    color: ${({ theme }) => theme.textColors.primary};
    width: 225px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .account-handle {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.21px;
    color: ${({ theme }) => theme.textColors.secondary};
  }

  .bids {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    letter-spacing: -0.21px;
    color: ${({ theme }) => theme.textColors.tertiary};
  }

  .crypto-bid {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.21px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.textColors.secondary};
    margin-bottom: 8px;
  }

  .converted-bid {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.21px;
    color: ${({ theme }) => theme.textColors.tertiary};
  }

  .place-bid-button {
    width: 148px;
    height: 35px;

    background: rgba(44, 141, 255, 0.25);
    border-radius: 4px;
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

    color: #4085d9;
  }
`;

interface PostProps {
  auctionId: number;
  isTrxAuction: boolean;
  previewUrl: string;
  assetMimetype: string;
  nftTitle: string;
  creatorAccountHandle: string;
  bidCount: number;
  bidAmount: number | string;
  conversionRate: number;
  tokenMultiplicationFactor: number | string;
  startsAt: number;
  endsAt: number;
}

const Post: React.VFC<PostProps> = ({
  auctionId,
  isTrxAuction,
  previewUrl,
  assetMimetype,
  nftTitle,
  creatorAccountHandle,
  bidCount,
  bidAmount,
  conversionRate,
  tokenMultiplicationFactor,
  startsAt,
  endsAt,
}) => {
  return (
    <PostWrapper>
      <FlexRowWrapper>
        <div className="nft-preview">
          <AssetPreview previewUrl={previewUrl} assetMimetype={assetMimetype} />
        </div>
        <FlexColumnWrapper>
          <FlexRowWrapper>
            <FlexColumnWrapper>
              <div className="title">{nftTitle}</div>
              <div className="account-handle">@{creatorAccountHandle}</div>
            </FlexColumnWrapper>
            <FlexColumnWrapper>
              <h4 className="crypto-bid">
                {new BigNumber(bidAmount)
                  .dividedBy(tokenMultiplicationFactor)
                  .toFormat(2, {
                    decimalSeparator: '.',
                    groupSeparator: ',',
                    groupSize: 3,
                  })}
                &nbsp;
                {isTrxAuction ? 'trx' : 'usdt'}
              </h4>
              <p className="converted-bid">
                $
                {new BigNumber(bidAmount)
                  .dividedBy(tokenMultiplicationFactor)
                  .multipliedBy(conversionRate)
                  .toFormat(2, {
                    decimalSeparator: '.',
                    groupSeparator: ',',
                    groupSize: 3,
                  })}
                &nbsp;USD
              </p>
            </FlexColumnWrapper>
          </FlexRowWrapper>
          <FlexRowWrapper>
            <p className="bids">{bidCount}&nbsp;Bids</p>
            <ConditionalCountdown startsAt={startsAt} endsAt={endsAt} />
            <Link className="place-bid-button" to={`/auction/${auctionId}`}>
              <p>Place a Bid</p>
            </Link>
          </FlexRowWrapper>
        </FlexColumnWrapper>
      </FlexRowWrapper>
    </PostWrapper>
  );
};

export default Post;
