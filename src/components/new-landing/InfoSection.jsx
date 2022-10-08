import styled from 'styled-components';

import FlexRowWrapper from '../common/FlexRowWrapper';

import exploreScreen from '../../assets/images/explore-screen.png';
import tronLogo from '../../assets/logos/tron_logo.svg';

const InfoSectionWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-top: 200px;
  margin-bottom: 42px;

  ${FlexRowWrapper} {
    div {
      width: 50%;
    }

    .img-wrapper {
      position: relative;

      & > img {
        width: 551px;
        height: 436px;
      }

      .tron-tag {
        width: 102px;
        height: 102px;
        position: absolute;
        display: grid;
        place-items: center;
        top: calc(218px - 51px);
        right: 25px;
        background: #ff3465;
        border-radius: 50%;

        img {
          width: 54px;
        }
      }
    }

    .info-block {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-flow: column nowrap;

      width: 471px;
      margin-left: 20px;

      h1 {
        font-family: Space Grotesk;
        font-style: normal;
        font-weight: bold;
        font-size: 44px;
        line-height: 56px;
        margin-bottom: 25px;

        color: #ffffff;
      }

      p {
        width: 430px;
        font-family: Roboto;
        font-style: normal;
        font-weight: 300;
        font-size: 25px;
        line-height: 33px;

        color: rgba(255, 255, 255, 0.49);
        margin-bottom: 25px;
      }

      .subscribe {
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 133.19%;

        color: #ff3465;
      }
    }
  }
`;

const InfoSection = (props) => {
  return (
    <InfoSectionWrapper>
      <FlexRowWrapper>
        <div className="img-wrapper">
          <img src={exploreScreen} alt="" />
          <div className="tron-tag">
            <img src={tronLogo} alt="" />
          </div>
        </div>
        <div className="info-block">
          <h1>Buy / Sell or mint your favourite artwork fast</h1>
          <p>
            Fan is the future of NFTs, find the latest drops by celebrities on
            this platform. Fan is the future of NFTs, find the latest drops by
            celebrities on this platform
          </p>
          <p className="subscribe">Subscribe &rarr;</p>
        </div>
      </FlexRowWrapper>
    </InfoSectionWrapper>
  );
};

export default InfoSection;
