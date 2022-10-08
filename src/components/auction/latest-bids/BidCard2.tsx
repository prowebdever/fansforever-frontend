import styled from 'styled-components';
import moment from 'moment';
import BigNumber from 'bignumber.js';
import { GoLinkExternal } from 'react-icons/go';

import FlexColumnWrapper from 'components/common/FlexColumnWrapper';
import config from 'config';

const BidCardWrapper = styled.div`
  width: 722px;
  height: 95px;

  background: ${({ theme }) => theme.backgroundColors.secondary};
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.17);
  border-radius: 5px;

  margin-bottom: 12px;

  @media screen and (max-width: 767.99px) {
    width: 600px;
  }

  @media screen and (max-width: 625px) {
    width: 95%;
  }

  .grid {
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 1.5fr 4fr 2fr 1fr;

    @media screen and (max-width: 625px) {
      grid-template-columns: 1.5fr 4fr 2.5fr 1fr;
    }

    .block {
      height: 100%;
    }

    .image-container {
      display: grid;
      place-items: center;

      img {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        overflow: hidden;
      }
    }

    .bidder-info {
      ${FlexColumnWrapper} {
        height: 100%;
        justify-content: center;
        align-items: flex-start;

        .bidder {
          font-family: Inter;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 19px;
          color: ${({ theme }) => theme.textColors.secondary};
          margin-bottom: 9px;

          span {
            color: ${({ theme }) => theme.textColors.primary};
          }

          @media screen and (max-width: 575.99px) {
            font-size: 14px;
          }
        }

        .timestamp {
          font-family: Inter;
          font-style: normal;
          font-weight: 600;
          font-size: 16px;
          line-height: 19px;
          color: ${({ theme }) => theme.textColors.secondary};

          @media screen and (max-width: 575.99px) {
            font-size: 14px;
          }
        }
      }
    }

    .bid-amount-info {
      ${FlexColumnWrapper} {
        height: 100%;
        justify-content: center;

        .bid-amount {
          font-family: Inter;
          font-style: normal;
          font-weight: 600;
          font-size: 19px;
          line-height: 23px;
          letter-spacing: -0.21px;
          color: ${({ theme }) => theme.textColors.secondary};
          margin-bottom: 3px;

          @media screen and (max-width: 575.99px) {
            font-size: 16px;
          }

          span {
            text-transform: uppercase;
            color: ${({ theme }) => theme.textColors.secondary};
          }
        }

        .converted-amount {
          font-family: Inter;
          font-style: normal;
          font-weight: 600;
          font-size: 19px;
          line-height: 23px;
          letter-spacing: -0.21px;
          color: ${({ theme }) => theme.textColors.primary};

          @media screen and (max-width: 575.99px) {
            font-size: 16px;
          }
        }
      }
    }

    .external-link-container {
      display: grid;
      place-items: center;

      .icon {
        width: 24px;
        height: 24px;
        color: ${({ theme }) => theme.textColors.secondary};

        @media screen and (max-width: 575.99px) {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
`;

interface BidCardProps {
  bidderProfileImage: string;
  bidderAccountHandle: string;
  bidTimestamp: number;
  bidAmount: string | number;
  tokenSymbol: string;
  tokenMultiplicationFactor: string | number;
  conversionRate: string | number;
  transactionId: string;
}

const BidCard: React.VFC<BidCardProps> = ({
  bidderProfileImage,
  bidderAccountHandle,
  bidTimestamp,
  bidAmount,
  tokenSymbol,
  tokenMultiplicationFactor,
  conversionRate,
  transactionId,
}) => {
  return (
    <BidCardWrapper>
      <div className="grid">
        <div className="block image-container">
          <img src={bidderProfileImage} alt={bidderAccountHandle} />
        </div>
        <div className="block bidder-info">
          <FlexColumnWrapper>
            <p className="bidder">
              Bid placed by <span>@{bidderAccountHandle}</span>
            </p>
            <p className="timestamp">
              {moment(bidTimestamp).format('MMM DD, YYYY [at] hh:mmA')}
            </p>
          </FlexColumnWrapper>
        </div>
        <div className="block bid-amount-info">
          <FlexColumnWrapper>
            <p className="converted-amount">
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
            <p className="bid-amount">
              {new BigNumber(bidAmount)
                .dividedBy(tokenMultiplicationFactor)
                .toFormat(2, {
                  decimalSeparator: '.',
                  groupSeparator: ',',
                  groupSize: 3,
                })}
              &nbsp;<span>{tokenSymbol}</span>
            </p>
          </FlexColumnWrapper>
        </div>
        <div className="block external-link-container">
          <a
            href={`${config.tronscan.transactionBaseUrl}${transactionId}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GoLinkExternal className="icon" />
          </a>
        </div>
      </div>
    </BidCardWrapper>
  );
};

export default BidCard;
