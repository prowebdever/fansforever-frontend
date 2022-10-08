import styled from 'styled-components';

import FlexColumnWrapper from 'components/common/FlexColumnWrapper';
import FlexRowWrapper from 'components/common/FlexRowWrapper';

import topographyBanner from 'assets/backgrounds/topography_banner.svg';
import { useHistory } from 'react-router-dom'
const BannerWrapper = styled.div`
  width: 100%;
  height: 356px;
  background-color: ${({ theme }) => theme.accentColors.primary};
  position: relative;

  margin-top: 60px;

  .topography {
    position: absolute;
    z-index: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  ${FlexColumnWrapper} {
    width: 100%;
    height: 100%;
    justify-content: center;
    align-items: center;

    h2 {
      width: 540px;
      font-family: Clash Grotesk;
      font-style: normal;
      font-weight: 600;
      font-size: 48px;
      line-height: 59px;
      text-align: center;
      margin-bottom: 42px;
      // z-index: 0;
      color: #fff;

      @media screen and (max-width: 575.99px) {
        width: 90%;
        font-size: 28px;
        line-height: 36px;
        text-align: center;
      }
    }

    ${FlexRowWrapper} {
      justify-content: center;
      align-items: center;
      // z-index: 100;

      .start-bidding {
        width: 209px;
        height: 50px;
        z-index: 100;
        background: #ffffff;
        border-radius: 4px;
        margin-right: 36px;

        display: grid;
        place-items: center;

        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        text-align: center;
        letter-spacing: -0.21px;

        color: #ff3465;
        cursor: pointer;

        @media screen and (max-width: 575.99px) {
          width: 150px;
          font-size: 18px;
          line-height: 22px;
          margin-right: 20px;
        }
      }

      .creator-signup {
        font-family: Inter;
        font-style: normal;
        font-weight: 600;
        font-size: 20px;
        line-height: 24px;
        text-align: center;
        letter-spacing: -0.21px;
        color: #ffffff;
        cursor: pointer;

        @media screen and (max-width: 575.99px) {
          font-size: 18px;
          line-height: 22px;
        }
      }
    }
  }
`;

const Banner: React.VFC = () => {
  const history = useHistory()
  return (
    <BannerWrapper>
      <img className="topography" src={topographyBanner} alt="" />
      <FlexColumnWrapper>
        <h2>Be A Part of the NFT Revolution</h2>
        <FlexRowWrapper>
          <div className="start-bidding" onClick = {()=>history.push("/")}>Start Bidding</div>
        </FlexRowWrapper>
      </FlexColumnWrapper>
    </BannerWrapper>
  );
};

export default Banner;
