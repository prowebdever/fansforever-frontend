import AssetPreview from 'components/AssetPreview';
import styled from 'styled-components';

import Spinner from '../Spinner';

const PreviewWindowWrapper = styled.div`
  width: 100%;

  .heading {
    font-family: Clash Grotesk;
    font-style: normal;
    font-weight: bold;
    font-size: 32px;
    line-height: 39px;
    color: ${({ theme }) => theme.textColors.tertiary};
    margin-bottom: 16px;
    text-transform: uppercase;
  }

  .wrapper {
    width: 335px;
    height: 472px;

    background: ${({ theme }) => theme.backgroundColors.secondary};
    border-radius: 14px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

interface PreviewWindowProps {
  isLoading: boolean;
  assetMimetype: string;
  previewUrl: string;
}

const PreviewWindow: React.VFC<PreviewWindowProps> = ({
  isLoading,
  assetMimetype,
  previewUrl,
}) => {
  return (
    <PreviewWindowWrapper>
      <div className="heading">Preview</div>
      <div className="wrapper">
        {isLoading ? <Spinner /> : null}
        {Boolean(previewUrl) && Boolean(assetMimetype) ? (
          <AssetPreview
            previewUrl={previewUrl}
            assetMimetype={assetMimetype}
            hasControls={true}
          />
        ) : null}
      </div>
    </PreviewWindowWrapper>
  );
};

export default PreviewWindow;
