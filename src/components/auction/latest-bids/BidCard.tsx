import styled from 'styled-components';
//import moment from 'moment';
import BigNumber from 'bignumber.js';
//import { GoLinkExternal } from 'react-icons/go';

import FlexColumnWrapper from 'components/common/FlexColumnWrapper';
//import config from 'config';

const BidCardWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto auto;
  background: ${({ theme }) => theme.backgroundColors.secondary};
  box-shadow: 0px 1px 5px rgba(0, 0, 0, 0.17);
  border-radius: 5px;

  margin-bottom: 12px;

  @media screen and (max-width: 767.99px) {
    //width: 600px;
  }

  @media screen and (max-width: 625px) {
    width: 95%;
  }

  .bidder {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    color: ${({ theme }) => theme.textColors.secondary};
    span {
      color: ${({ theme }) => theme.textColors.primary};
    }

    @media screen and (max-width: 575.99px) {
      font-size: 14px;
    }
  }

  .bid-amount {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 19px;
    line-height: 23px;
    letter-spacing: -0.21px;
    color: ${({ theme }) => theme.textColors.secondary};
    @media screen and (max-width: 575.99px) {
      font-size: 16px;
    }

    span {
      text-transform: uppercase;
      color: ${({ theme }) => theme.textColors.secondary};
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
      <FlexColumnWrapper>
        <p className="bidder">
          <span>@{bidderAccountHandle}</span>
        </p>
      </FlexColumnWrapper>
      <FlexColumnWrapper>
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
    </BidCardWrapper>
  );
};

export default BidCard;
