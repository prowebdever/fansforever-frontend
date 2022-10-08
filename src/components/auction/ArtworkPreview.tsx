import { useState } from 'react';
import styled from 'styled-components';
import { BsArrowsFullscreen } from 'react-icons/bs';

import AssetPreview from 'components/AssetPreview';
import ArtworkFullscreenPreview from './ArtworkFullscreenPreview';

const ArtworkPreviewWrapper = styled.div`
  width: 300px;
  height: 300px;
  border-radius: 8px;
  display: grid;
  place-items: center;
  background-color: ${({ theme }) => theme.backgroundColors.secondary};
  overflow: hidden;
  position: relative;

  .fullscreen-cta {
    top: 20px;
    right: 20px;
    position: absolute;
    width: 40px;
    height: 40px;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.backgroundColors.secondary};
    z-index: 10;
    display: grid;
    place-items: center;
    cursor: pointer;

    filter: drop-shadow(0 0 3px ${({ theme }) => theme.accentColors.primary});
    transition: all 0.25s cubic-bezier(0.075, 0.82, 0.165, 1);

    &:hover {
      filter: drop-shadow(0 0 7px ${({ theme }) => theme.accentColors.primary});
    }

    svg {
      color: ${({ theme }) => theme.textColors.primary};
      width: 60%;
      height: 60%;
    }
  }

  .wrapper {
    max-height: 400px;
    width: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }

  @media screen and (max-width: 399.99px) {
    width: 95%;
  }
`;

interface ArtworkPreviewProps {
  assetIpfsHash: string;
  assetMimetype: string;
}

const ArtworkPreview: React.VFC<ArtworkPreviewProps> = ({
  assetIpfsHash,
  assetMimetype,
}) => {
  const [isFullscreenPreviewOpen, setIsFullscreenPreviewOpen] = useState(false);

  return (
    <ArtworkPreviewWrapper>
      <div
        className="fullscreen-cta"
        onClick={() => setIsFullscreenPreviewOpen(true)}
      >
        <BsArrowsFullscreen />
      </div>
      <AssetPreview
        previewUrl={`https://fansforever.mypinata.cloud/ipfs/${assetIpfsHash}`}
        assetMimetype={assetMimetype}
      />
      <ArtworkFullscreenPreview
        assetIpfsHash={assetIpfsHash}
        assetMimetype={assetMimetype}
        isOpen={isFullscreenPreviewOpen}
        onClose={() => setIsFullscreenPreviewOpen(false)}
      />
    </ArtworkPreviewWrapper>
  );
};

export default ArtworkPreview;
