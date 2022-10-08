import styled, { useTheme } from 'styled-components';
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import AssetPreview from 'components/AssetPreview';

const ArtworkFullscreenPreviewWrapper = styled.div`
  width: 100%;
  height: 100%;

  .wrapper {
    img {
      height: 90%;
      object-fit: contain;
    }
  }
`;

interface ArtworkFullscreenPreviewProps {
  assetIpfsHash: string;
  assetMimetype: string;
  isOpen: boolean;
  onClose: () => void;
}

const ArtworkFullscreenPreview = ({
  assetIpfsHash,
  assetMimetype,
  isOpen,
  onClose,
}: ArtworkFullscreenPreviewProps): JSX.Element => {
  const theme = useTheme();

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      center
      closeOnEsc={false}
      styles={{
        modalContainer: {
          background: 'rgba(255, 255, 255, 0.1)',
        },
        modal: {
          padding: 0,
          background: theme.backgroundColors.secondary,
          color: theme.textColors.primary,
          width: '95vw',
          maxWidth: '95vw',
          height: '95vh',
          borderRadius: '10px',
        },
        closeButton: {
          background: theme.backgroundColors.secondary,
          borderRadius: '50%',
        },
      }}
    >
      <ArtworkFullscreenPreviewWrapper>
        <AssetPreview
          previewUrl={`https://fansforever.mypinata.cloud/ipfs/${assetIpfsHash}`}
          assetMimetype={assetMimetype}
        />
      </ArtworkFullscreenPreviewWrapper>
    </Modal>
  );
};

export default ArtworkFullscreenPreview;
