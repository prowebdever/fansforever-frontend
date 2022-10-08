import styled from 'styled-components';

import FlexRowWrapper from '../common/FlexRowWrapper';

import lightningSolid from '../../assets/icons/lightning-solid.svg';
import nftDrop from '../../assets/images/nft-drop.svg';
import lindsayLohan from '../../assets/new-landing/lindsay_lohan.png';
import circle from '../../assets/new-landing/Ellipse 2.png';

const HeroSectionWrapper = styled.div`
  width: 100%;
  min-height: calc(100vh - 50px);

  display: flex;
  justify-content: center;
  align-items: flex-end;

  ${FlexRowWrapper} {
    .info-block {
      width: 40%;
      min-height: 100vh;

      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
      flex-flow: column nowrap;

      .title {
        width: 430px;
        font-family: Space Grotesk;
        font-style: normal;
        font-weight: bold;
        font-size: 44px;
        line-height: 56px;

        color: #ffffff;
        margin-top: 24px;
        margin-bottom: 12px;
      }

      .description {
        width: 440px;
        font-family: Roboto;
        font-style: normal;
        font-weight: 300;
        font-size: 25px;
        line-height: 33px;

        color: rgba(255, 255, 255, 0.49);
        margin-bottom: 36px;
      }

      ${FlexRowWrapper} {
        margin-bottom: 45px;

        .email-input {
          width: 350px;
          height: 54px;
          background: #333e4f;
          border-radius: 6px;
          border: none;
          outline: none;
          padding: 14px 16px;

          font-family: Roboto;
          font-style: normal;
          font-weight: normal;
          font-size: 22px;
          line-height: 26px;

          color: #ffffff;
          ::placeholder {
            color: #fff;
            opacity: 1; /* Firefox */
          }
        }
        .subscribe-button {
          width: 170px;
          height: 54px;
          background: #ff3465;
          border-radius: 10px;
          border: none;
          outline: none;
          font-family: Roboto;
          font-style: normal;
          font-weight: 500;
          font-size: 20px;
          line-height: 133.19%;

          color: #ffffff;
          cursor: pointer;
          margin-left: -10px;
        }
      }

      .launches-in {
        font-family: Roboto;
        font-style: normal;
        font-weight: bold;
        font-size: 17px;
        line-height: 20px;
        text-transform: uppercase;
        color: #ffffff;
        margin-bottom: 8px;
      }

      .time {
        font-family: Roboto Mono;
        font-style: normal;
        font-weight: bold;
        font-size: 63px;
        line-height: 83px;

        color: #ffffff;
        margin-bottom: 56px;
      }
    }

    .illustration-block {
      width: 60%;
      min-height: 100vh;
      position: relative;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex-flow: column nowrap;

      .celeb {
        z-index: 1000;
      }

      .circle {
        width: 666px;
        height: 666px;
        position: absolute;
        top: calc(50vh - 333px);
      }
    }
  }
`;

const HeroSection = (props) => {
  return (
    <HeroSectionWrapper>
      <FlexRowWrapper>
        <div className="info-block">
          <img src={lightningSolid} alt="" />
          <h1 className="title">The first tron based NFT Drop is coming</h1>
          <p className="description">
            Fan is the future of NFTs, find the latest drops by celebrities on
            this platform
          </p>
          <FlexRowWrapper>
            <input
              className="email-input"
              type="text"
              placeholder="Enter your email"
            />
            <button className="subscribe-button">Subscribe</button>
          </FlexRowWrapper>
          <p className="launches-in">Launches In</p>
          <h3 className="time">9h:34m:06s</h3>
          <div>
            <img src={nftDrop} alt="" />
            <img src={nftDrop} alt="" />
            <img src={nftDrop} alt="" />
          </div>
        </div>
        <div className="illustration-block">
          <img src={lindsayLohan} alt="" className="celeb" />
          <img src={circle} alt="" className="circle" />
        </div>
      </FlexRowWrapper>
    </HeroSectionWrapper>
  );
};

export default HeroSection;
