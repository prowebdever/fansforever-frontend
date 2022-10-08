import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import FlexColumnWrapper from './common/FlexColumnWrapper';
import FlexRowWrapper from './common/FlexRowWrapper';

import AssetPreview from './AssetPreview';
import ConditionalCountdown from './ConditionalCountdown';

const AuctionCardWrapper = styled.div`
  width: 288px;
  min-height: 475px;
  position: relative;

  background: ${({ theme }) => theme.backgroundColors.primary};
  border: 1px solid ${({ theme }) => theme.borderColors.tertiary};
  box-sizing: border-box;
  box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.03);
  border-radius: 10px;

  margin: 0 auto;
  cursor: pointer;
  overflow: hidden;

  .nft-preview {
    width: 100%;
    height: 260px;

    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;

    .wrapper {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .info {
    padding: 20px;

    h3 {
      font-family: Clash Grotesk;
      font-style: normal;
      font-weight: 600;
      font-size: 32px;
      line-height: 39px;
      text-transform: capitalize;
      color: ${({ theme }) => theme.textColors.primary};
      margin-bottom: 18px;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    h4 {
      font-family: Inter;
      font-style: normal;
      font-weight: 600;
      font-size: 16px;
      line-height: 19px;
      text-align: center;
      letter-spacing: -0.21px;
      color: ${({ theme }) => theme.textColors.primary};
    }

    ${FlexRowWrapper} {
      align-items: center;
    }
  }

  .profile-thumbnail {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: contain;
    margin-right: 12px;
  }

  .footer-section {
    position: absolute;
    width: 288px;
    height: 84px;
    bottom: 0;
    left: 0;

    border-top: 1px solid ${({ theme }) => theme.borderColors.tertiary};
    border-radius: 0px 0px 15px 15px;

    align-items: center;
    justify-content: space-evenly;

    ${FlexColumnWrapper} {
      width: auto;
      min-width: 32%;

      &:nth-of-type(2) {
        min-width: 145px;
      }

      p {
        font-family: Inter;
        font-weight: 600;
        font-size: 14px;
        line-height: 19px;
        letter-spacing: -0.21px;
        color: ${({ theme }) => theme.textColors.secondary};
        margin-bottom: 4px;
      }

      h3 {
        font-weight: 600;
        font-size: 16px;
        line-height: 24px;
        letter-spacing: -0.21px;
        color: ${({ theme }) => theme.textColors.primary};
      }
    }
  }
`;

const numberWithCommas = (number) => {
  return number.toLocaleString();
};

const AuctionCard = ({
  idx,
  isTrxAuction = true,
  assetType,
  assetIpfsHash,
  title,
  profileImage,
  creator,
  price,
  startsAt,
  endsIn,
}) => {
  const history = useHistory();

  return (
    <AuctionCardWrapper onClick={() => history.push(`/auction/${idx}`)}>
      <FlexColumnWrapper>
        <div className="nft-preview">
          <AssetPreview
            assetMimetype={assetType}
            previewUrl={`https://fansforever.mypinata.cloud/ipfs/${assetIpfsHash}`}
            hasControls={false}
          />
        </div>
        <div className="info">
          <h3>{title}</h3>
          <FlexRowWrapper>
            <img className="profile-thumbnail" src={profileImage} alt="" />
            <h4>@{creator}</h4>
          </FlexRowWrapper>
        </div>
        <FlexRowWrapper className="footer-section">
          <FlexColumnWrapper>
            <p>Reserve Price</p>
            <h3>
              {numberWithCommas(price)}
              {isTrxAuction ? 'TRX' : 'USDT'}
            </h3>
          </FlexColumnWrapper>
          <FlexColumnWrapper>
            <ConditionalCountdown startsAt={startsAt} endsAt={endsIn} />
          </FlexColumnWrapper>
        </FlexRowWrapper>
      </FlexColumnWrapper>
    </AuctionCardWrapper>
  );
};

export default AuctionCard;
