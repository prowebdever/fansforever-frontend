import styled from 'styled-components';

import FlexRowWrapper from '../common/FlexRowWrapper';

import celeb1 from '../../assets/celebs/celeb1.png';
import celeb2 from '../../assets/celebs/celeb2.png';
import celeb3 from '../../assets/celebs/celeb3.png';
import celeb4 from '../../assets/celebs/celeb4.png';
import celeb5 from '../../assets/celebs/celeb5.png';

const PoweredBySectionWrapper = styled.section`
  width: 100%;
  margin-top: 55px;

  ${FlexRowWrapper} {
    div {
      width: 50%;
    }
  }

  .info-block {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-flow: column nowrap;

    h1 {
      width: 443px;
      font-family: Space Grotesk;
      font-style: normal;
      font-weight: bold;
      font-size: 44px;
      line-height: 56px;
      margin-bottom: 25px;

      color: #ffffff;
    }

    p {
      font-family: Roboto;
      font-style: normal;
      font-weight: 300;
      font-size: 25px;
      line-height: 33px;
      margin-bottom: 58px;

      color: rgba(255, 255, 255, 0.49);
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

  .illustration-block {
    .dotted {
      width: 472px;
      height: 472px;
      margin: 0 auto;

      display: flex;
      justify-content: center;
      align-items: center;

      position: relative;

      border: 1px dashed rgba(255, 255, 255, 0.21);
      padding: 40px;
      border-radius: 50%;

      .gradient {
        width: 100%;
        height: 100%;

        background: linear-gradient(
          180deg,
          rgba(255, 52, 101, 0.08) 0%,
          rgba(255, 52, 101, 0) 100%
        );
        border-radius: 50%;
      }

      .celebs {
        width: 120%;
        height: auto;
        position: absolute;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-flow: row wrap;

        .celeb {
          width: 135px;
          height: 135px;
          padding: 16px;
          margin: 0 15px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.31);

          img {
            width: 100%;
            height: 100%;
            background-color: #ff3465;
            border-radius: 50%;
            object-fit: contain;
          }
        }
      }
    }
  }
`;

const PoweredBySection = (props) => {
  return (
    <PoweredBySectionWrapper>
      <FlexRowWrapper>
        <div className="info-block">
          <h1>Powered by your favourite celebriities</h1>
          <p>
            Fan is the future of NFTs, find the latest drops by celebrities on
            this platform
          </p>
          <p className="subscribe">Subscribe &rarr;</p>
        </div>
        <div className="illustration-block">
          <div className="dotted">
            <div className="gradient"></div>
            <div className="celebs">
              <div className="celeb">
                <img src={celeb1} alt="" />
              </div>
              <div className="celeb">
                <img src={celeb2} alt="" />
              </div>
              <div className="celeb">
                <img src={celeb3} alt="" />
              </div>
              <div className="celeb">
                <img src={celeb4} alt="" />
              </div>
              <div className="celeb">
                <img src={celeb5} alt="" />
              </div>
            </div>
          </div>
        </div>
      </FlexRowWrapper>
    </PoweredBySectionWrapper>
  );
};

export default PoweredBySection;
