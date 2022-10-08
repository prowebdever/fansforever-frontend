import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import BigNumber from 'bignumber.js';

import AssetPreview from 'components/AssetPreview';
import FlexColumnWrapper from 'components/common/FlexColumnWrapper';
import FlexRowWrapper from 'components/common/FlexRowWrapper';

const HeroPostWrapper = styled.div`
  padding: 20px;
  border-radius: 10px;
  border: 1px solid transparent;
  width: 492px;
  max-width: 492px;

  @media screen and (max-width: 1199.99px) {
    margin-bottom: 24px;
  }

  @media screen and (max-width: 599.99px) {
    width: 90%;
    max-width: 400px;
    margin: 0 auto;
  }

  &:hover {
    cursor: pointer;
    border: 1px solid ${({ theme }) => theme.textColors.tertiary};
  }

  ${FlexRowWrapper} {
    align-items: center;
    flex-flow: row wrap;

    &:first-of-type {
      margin-bottom: 32px;

      img,
      video {
        max-height: 500px;
      }
    }

    &:nth-of-type(2) {
      justify-content: space-between;
      ${FlexColumnWrapper} {
        width: auto;
        align-items: flex-start;
      }
    }
  }

  .title {
    font-family: Clash Grotesk;
    font-style: normal;
    font-weight: 600;
    font-size: 32px;
    line-height: 39px;
    text-transform: capitalize;
    color: ${({ theme }) => theme.textColors.primary};
  }

  .account-handle {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
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
    text-align: center;
    letter-spacing: -0.21px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.textColors.secondary};

    @media screen and (max-width: 599.99px) {
      margin-top: 24px;
    }
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
`;

interface HeroPostProps {
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
}

const HeroPost: React.VFC<HeroPostProps> = ({
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
}) => {
  const history = useHistory();

  return (
    <HeroPostWrapper onClick={() => history.push(`/auction/${auctionId}`)}>
      <FlexColumnWrapper>
        <div className="nft-preview">
          <FlexRowWrapper>
            <AssetPreview
              previewUrl={previewUrl}
              assetMimetype={assetMimetype}
            />
          </FlexRowWrapper>
          <FlexRowWrapper>
            <FlexColumnWrapper>
              <h2 className="title">{nftTitle}</h2>
              <h4 className="account-handle">@{creatorAccountHandle}</h4>
            </FlexColumnWrapper>
            <FlexColumnWrapper>
              <p className="bids">{bidCount}&nbsp;Bids</p>
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
        </div>
      </FlexColumnWrapper>
    </HeroPostWrapper>
  );
};

export default HeroPost;
