import styled from 'styled-components';
import BigNumber from 'bignumber.js';

import FlexColumnWrapper from 'components/common/FlexColumnWrapper';
import FlexRowWrapper from 'components/common/FlexRowWrapper';
import ConditionalCountdown from 'components/ConditionalCountdown';

const HighestBidCountdownComboWrapper = styled.div`
  width: 722px;
  min-height: 134px;
  margin-bottom: 30px;
  border: 1px solid #cdcdcd;
  box-sizing: border-box;
  border-radius: 9px;

  @media screen and (max-width: 767.99px) {
    width: 600px;
  }

  @media screen and (max-width: 625px) {
    width: 95%;
  }

  & > ${FlexRowWrapper} {
    width: 100%;
    height: 100%;
    justify-content: space-between;
    padding: 16px 32px;

    @media screen and (max-width: 767.99px) {
      flex-flow: row wrap;
      padding: 12px;
    }

    ${FlexColumnWrapper} {
      width: auto;
      justify-content: center;
      align-items: center;
    }
  }

  .highest-bid-wrapper {
    min-width: 200px;
    justify-content: flex-start;

    @media screen and (max-width: 767.99px) {
      min-width: 250px;
    }

    @media screen and (max-width: 625px) {
      min-width: 150px;
    }

    * {
      width: 100%;
    }

    p {
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 14px;
      line-height: 17px;
      letter-spacing: -0.21px;
      color: ${({ theme }) => theme.textColors.secondary};
      margin-bottom: 12px;
    }

    h2 {
      text-transform: uppercase;
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 33px;
      line-height: 40px;
      letter-spacing: -0.21px;
      color: ${({ theme }) => theme.textColors.primary};
      margin-bottom: 4px;

      @media screen and (max-width: 767.99px) {
        font-size: 24px;
        line-height: 30px;
      }
    }

    h4 {
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 17px;
      line-height: 21px;
      letter-spacing: -0.21px;
      color: ${({ theme }) => theme.textColors.tertiary};
      text-transform: uppercase;
    }
  }

  .countdown-wrapper {
    min-width: 222px;

    h2 {
      text-transform: uppercase;
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 33px;
      line-height: 40px;
      letter-spacing: -0.21px;
      color: ${({ theme }) => theme.accentColors.primary};
      margin-bottom: 4px;
    }

    & > div {
      height: 100%;
    }

    p {
      font-size: 14px;
      line-height: 17px;
      font-weight: 600;
      margin-bottom: 12px;
      margin-top: 4px;

      @media screen and (max-width: 767.99px) {
        margin-top: 10px;
      }
    }

    h3 {
      font-size: 33px;
      line-height: 44px;

      @media screen and (max-width: 767.99px) {
        font-size: 24px;
        line-height: 30px;
      }
    }
  }

  .divider-wrapper {
    @media screen and (max-width: 630px) {
      display: none;
    }

    .divider {
      height: 72px;
      width: 0px;
      border: 1px solid #cacaca;
    }
  }
`;

interface HighestBidCountdownComboProps {
  highestBid: number | string;
  conversionRate: number;
  tokenMultiplicationFactor: number | string;
  tokenSymbol: string;
  startsAt: number;
  endsAt: number;
  currentAuctionStatus: number;
}

const HighestBidCountdownCombo: React.VFC<HighestBidCountdownComboProps> = ({
  highestBid,
  conversionRate,
  tokenMultiplicationFactor,
  tokenSymbol,
  startsAt,
  endsAt,
  currentAuctionStatus,
}) => {
  return (
    <HighestBidCountdownComboWrapper>
      <FlexRowWrapper>
        <FlexColumnWrapper className="highest-bid-wrapper">
          <p>Current Highest Bid</p>
          <h2>
            $
            {new BigNumber(highestBid)
              .dividedBy(tokenMultiplicationFactor)
              .multipliedBy(conversionRate)
              .toFormat(2, {
                decimalSeparator: '.',
                groupSeparator: ',',
                groupSize: 3,
              })}
            &nbsp;USD
          </h2>
          <h4>
            {new BigNumber(highestBid)
              .dividedBy(tokenMultiplicationFactor)
              .toFormat(2, {
                decimalSeparator: '.',
                groupSeparator: ',',
                groupSize: 3,
              })}
            &nbsp;
            {tokenSymbol}
          </h4>
        </FlexColumnWrapper>
        <FlexColumnWrapper className="divider-wrapper">
          <div className="divider" />
        </FlexColumnWrapper>
        <FlexColumnWrapper className="countdown-wrapper">
          {currentAuctionStatus !== 2 ? (
            <ConditionalCountdown startsAt={startsAt} endsAt={endsAt} />
          ) : (
            <h2>Auction Ended</h2>
          )}
        </FlexColumnWrapper>
      </FlexRowWrapper>
    </HighestBidCountdownComboWrapper>
  );
};

export default HighestBidCountdownCombo;
