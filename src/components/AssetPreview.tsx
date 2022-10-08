import { useState } from 'react';
import styled from 'styled-components';

import Spinner from './Spinner';

const AssetPreviewWrapper = styled.div`
  width: 100%;
  height: 100%;

  .wrapper {
    width: 100%;
    height: 100%;
    position: relative;
    margin: 0 auto;

    display: flex;
    justify-content: center;
    align-items: center;

    background-color: transparent;
    img {
      object-fit: cover;
    }

    img,
    video {
      height: 95%;
      width: 95%;
    }

    ${Spinner} {
      position: absolute;
    }
  }
`;

interface AssetPreviewProps {
  assetMimetype?: string;
  previewUrl: string;
  hasControls?: boolean;
}

const AssetPreview: React.VFC<AssetPreviewProps> = ({
  assetMimetype = 'image/jpeg',
  previewUrl,
  hasControls = true,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AssetPreviewWrapper>
      <div className="wrapper">
        {isLoading && <Spinner />}
        {{
          'image/png': (
            <img
              src={previewUrl.replace('ipfs.io', 'fansforever.mypinata.cloud')}
              alt="PNG Preview"
              style={{ visibility: isLoading ? 'hidden' : 'visible' }}
              onLoad={() => setIsLoading(false)}
            />
          ),
          'image/jpeg': (
            <img
              src={previewUrl.replace('ipfs.io', 'fansforever.mypinata.cloud')}
              alt="JPEG Preview"
              style={{ visibility: isLoading ? 'hidden' : 'visible' }}
              onLoad={() => setIsLoading(false)}
            />
          ),
          'image/gif': (
            <img
              src={previewUrl.replace('ipfs.io', 'fansforever.mypinata.cloud')}
              alt="GIF Preview"
              style={{ visibility: isLoading ? 'hidden' : 'visible' }}
              onLoad={() => setIsLoading(false)}
            />
          ),
          'video/mp4': (
            <video
              autoPlay
              controls={hasControls}
              muted
              style={{ visibility: isLoading ? 'hidden' : 'visible' }}
              onCanPlay={() => setIsLoading(false)}
            >
              <source
                src={previewUrl.replace(
                  'ipfs.io',
                  'fansforever.mypinata.cloud'
                )}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          ),
        }?.[`${assetMimetype}`] || 'Invalid Asset Type'}
      </div>
    </AssetPreviewWrapper>
  );
};

export default AssetPreview;
