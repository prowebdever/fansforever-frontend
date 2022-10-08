import styled from 'styled-components';
import { IoLogoUsd } from 'react-icons/io';

import FlexRowWrapper from 'components/common/FlexRowWrapper';
import FlexColumnWrapper from 'components/common/FlexColumnWrapper';

import { ReactComponent as TronLogo } from 'assets/logos/tron_logo.svg';

const InstantSalePriceInfoWrapper = styled.div`
  width: auto;
  height: auto;

  ${FlexRowWrapper}, ${FlexColumnWrapper} {
    width: auto;
  }

  ${FlexRowWrapper} {
    align-items: center;
  }

  .circle {
    width: 45px;
    height: 45px;

    background: #e9dcff;
    border-radius: 50%;
    margin-right: 12px;

    display: grid;
    place-items: center;

    svg {
      width: 20px;
      height: 20px;
    }
  }

  .amount-text {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.21px;
    text-transform: uppercase;
    color: ${({ theme }) => theme.textColors.primary};
    margin-bottom: 4px;
  }

  .sub-text {
    font-family: Inter;
    font-style: normal;
    font-weight: 600;
    font-size: 12px;
    line-height: 15px;
    letter-spacing: -0.21px;
    text-transform: capitalize;
    color: ${({ theme }) => theme.textColors.secondary};
  }
`;

const InstantSalePriceInfo: React.VFC<{
  isTrxAuction: boolean;
  instantPrice: number;
}> = ({ instantPrice, isTrxAuction }) => {
  return (
    <InstantSalePriceInfoWrapper>
      <FlexRowWrapper>
        <div className="circle">
          {isTrxAuction ? <TronLogo /> : <IoLogoUsd />}
        </div>
        <FlexColumnWrapper>
          <p className="amount-text">
            {instantPrice}&nbsp;{isTrxAuction ? 'trx' : 'usdt'}
          </p>
          <p className="sub-text">Insatant price</p>
        </FlexColumnWrapper>
      </FlexRowWrapper>
    </InstantSalePriceInfoWrapper>
  );
};

export default InstantSalePriceInfo;
