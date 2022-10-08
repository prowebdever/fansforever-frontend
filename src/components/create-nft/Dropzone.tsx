import { useRef } from 'react';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';

import FlexRowWrapper from 'components/common/FlexRowWrapper';

import { ReactComponent as UploadIcon } from 'assets/icons/upload.svg';

const DropzoneWrapper = styled.div`
  .dropzone-area {
    width: 100%;
    height: auto;
    min-height: 130px;

    display: grid;
    place-items: center;

    background: ${({ theme }) => theme.backgroundColors.secondary};
    border: 1px dashed ${({ theme }) => theme.borderColors.tertiary};
    box-sizing: border-box;
    border-radius: 4px;
    padding: 42px;

    @media screen and (max-width: 575.99px) {
      padding: 24px 0;
    }

    ${FlexRowWrapper} {
      width: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: row wrap;
    }

    p {
      width: 253px;
      font-family: Space Grotesk;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 20px;
      color: ${({ theme }) => theme.textColors.primary};
      text-align: center;

      @media screen and (max-width: 900px) {
      }
    }

    p.accented {
      color: ${({ theme }) => theme.accentColors.primary};
      font-weight: bold;
    }

    svg {
      width: 52px;
      height: 36px;
      color: ${({ theme }) => theme.textColors.secondary};
      margin-right: 36px;

      @media screen and (max-width: 625px) {
        margin-right: 0;
        margin-bottom: 20px;
      }
    }
  }

  & > ${FlexRowWrapper} {
    justify-content: flex-end;
    padding-top: 32px;
  }
`;

const UploadCTA = styled.div`
  width: 209px;
  height: 50px;

  background: rgba(44, 141, 255, 0.25);
  border-radius: 4px;

  display: grid;
  place-items: center;

  font-family: Inter;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.21px;

  color: #4085d9;
  cursor: pointer;
`;

interface DropZoneProps {
  multiple?: boolean;
  disabled?: boolean;
  accept?: string | string[];
  maxSize?: number;
  onDrop: (acceptedFiles: File[]) => void;
}

const Dropzone: React.VFC<DropZoneProps> = ({
  multiple = false,
  disabled = false,
  accept,
  maxSize,
  onDrop,
}) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple,
    disabled,
    ...(Boolean(accept) && { accept }),
    ...(Boolean(maxSize) && { maxSize }),
  });

  const dropzoneRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <DropzoneWrapper {...getRootProps()}>
        <div className="dropzone-area">
          <input {...getInputProps()} ref={dropzoneRef} />
          {isDragActive ? (
            <p className="accented">Drop the files here ...</p>
          ) : (
            <FlexRowWrapper>
              <UploadIcon />
              <p>40Mb upload limit, supported file types MP4, GIF, JPG</p>
            </FlexRowWrapper>
          )}
        </div>
        <FlexRowWrapper>
          <UploadCTA
            onClick={() => {
              if (dropzoneRef && dropzoneRef.current) {
                dropzoneRef.current.click();
              }
            }}
          >
            Upload NFT
          </UploadCTA>
        </FlexRowWrapper>
      </DropzoneWrapper>
    </>
  );
};

export default Dropzone;
