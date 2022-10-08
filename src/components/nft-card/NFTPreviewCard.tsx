import styled from 'styled-components';
import { useSelector } from 'react-redux';

import FlexColumnWrapper from 'components/common/FlexColumnWrapper';
import FlexRowWrapper from 'components/common/FlexRowWrapper';
import AssetPreview from '../AssetPreview';
import { RootState } from 'store';
import Spinner from 'components/Spinner';

const NFTPreviewCardWrapper = styled.div`
  width: 288px;
  min-height: 365px;
  position: relative;

  background: ${({ theme }) => theme.backgroundColors.primary};
  border: 1px solid ${({ theme }) => theme.borderColors.tertiary};
  box-shadow: 0px 0px 18px rgba(0, 0, 0, 0.03);
  border-radius: 15px;
  margin: 0 auto;

  .nft-preview {
    width: 100%;
    height: 260px;
    margin: 0 auto;
    border-radius: 15px;
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 12px;
    background-color: ${({ theme }) => theme.textColors.tertiary}11;
    overflow: hidden;

    .wrapper {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  ${FlexRowWrapper} {
    align-items: center;
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
      width: 220px;
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
  }

  .profile-thumbnail {
    width: 29.55px;
    height: 29.55px;
    border-radius: 50%;
    overflow: hidden;
    object-fit: contain;
    margin-right: 12px;
    background: ${({ theme }) => theme.textColors.tertiary}33;
  }

  .title-row {
    justify-content: space-between;
  }

  ${Spinner} {
    position: absolute;
  }
`;

interface NFTPreviewCardProps {
  previewUrl: string;
  assetMimetype: string;
  title: string;
  isLoading: boolean;
}

const NFTPreviewCard = ({
  previewUrl,
  assetMimetype,
  title,
  isLoading,
}: NFTPreviewCardProps): JSX.Element => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <NFTPreviewCardWrapper>
      <FlexColumnWrapper>
        <div className="nft-preview">
          {isLoading ? (
            <Spinner />
          ) : previewUrl && assetMimetype ? (
            <AssetPreview
              previewUrl={previewUrl}
              assetMimetype={assetMimetype}
              hasControls={true}
            />
          ) : null}
        </div>
        <div className="info">
          <FlexRowWrapper className="title-row">
            <h3>{title}</h3>
          </FlexRowWrapper>
          {Boolean(user) ? (
            <FlexRowWrapper>
              <img
                className="profile-thumbnail"
                src={user?.profile?.userProfileImageUrl?.replace(
                  'ipfs.io',
                  'fansforever.mypinata.cloud'
                )}
                alt=""
              />
              <h4>@{user?.profile?.userAccountHandle}</h4>
            </FlexRowWrapper>
          ) : null}
        </div>
      </FlexColumnWrapper>
    </NFTPreviewCardWrapper>
  );
};

export default NFTPreviewCard;
