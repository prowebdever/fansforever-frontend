import styled from 'styled-components';

import FlexRowWrapper from '../common/FlexRowWrapper';
import FlexColumnWrapper from '../common/FlexColumnWrapper';

import compassIcon from '../../assets/icons/compass.svg';
import tronLogoAccented from '../../assets/logos/tron_logo.svg';
import lightningOutline from '../../assets/icons/lightning-outline.svg';

const SellingPointsWrapper = styled.div`
  width: 1122px;
  min-height: 342px;

  padding: 84px 36px;
  background: #2a2e36;
  border-radius: 16px;

  margin: 82px auto 65px auto;

  ${FlexRowWrapper} {
    justify-content: space-between;
  }

  ${FlexColumnWrapper} {
    .icon {
      width: 34px;
      height: 34px;
    }

    .title {
      width: 325px;
      margin-top: 28px;
      margin-bottom: 12px;
      font-family: Space Grotesk;
      font-style: normal;
      font-weight: bold;
      font-size: 27px;
      line-height: 34px;
      letter-spacing: -0.21px;

      color: #ffffff;
    }

    .description {
      width: 304px;
      font-family: Roboto;
      font-style: normal;
      font-weight: 300;
      font-size: 20px;
      line-height: 133.19%;

      color: rgba(255, 255, 255, 0.49);
    }
  }
`;

const SellingPoints = (props) => {
  return (
    <SellingPointsWrapper>
      <FlexRowWrapper>
        <FlexColumnWrapper>
          <img src={compassIcon} alt="" className="icon" />
          <div className="title">Explore New Art</div>
          <div className="description">
            Firdaos distrupts the UAE market by incorporating decentralised
            finance like nobody else
          </div>
        </FlexColumnWrapper>
        <FlexColumnWrapper>
          <img src={tronLogoAccented} alt="" className="icon" />
          <div className="title">Powered by TRX</div>
          <div className="description">
            Firdaos distrupts the UAE market by incorporating decentralised
            finance like nobody else
          </div>
        </FlexColumnWrapper>
        <FlexColumnWrapper>
          <img src={lightningOutline} alt="" className="icon" />
          <div className="title">Low Cost High Profts</div>
          <div className="description">
            Firdaos distrupts the UAE market by incorporating decentralised
            finance like nobody else
          </div>
        </FlexColumnWrapper>
      </FlexRowWrapper>
    </SellingPointsWrapper>
  );
};

export default SellingPoints;
