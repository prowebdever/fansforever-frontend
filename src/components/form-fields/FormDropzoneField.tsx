import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useField } from 'formik';

import Dropzone from '../create-nft/Dropzone';

import { addFileToIpfs } from 'apis/addFileToIPFS';

const FormDropzoneFieldWrapper = styled.div`
  width: 100%;
  position: relative;

  .progress-wrapper {
    width: 100%;
    height: 6px;
    border-radius: 1px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    overflow: hidden;
    position: absolute;
    bottom: 82px;

    & > div {
      height: 100%;
      width: auto;
      background: ${({ theme }) => theme.accentColors.primary};
    }
  }

  .error {
    margin-top: 4px;
    color: ${({ theme }) => theme.accentColors.primary};
  }
`;

const FormDropzoneField = ({
  name,
  multiple,
  accept,
  maxSize,
  disabled,
  onLoading,
  onFile,
  onResult,
}) => {
  const [progress, setProgress] = useState<ProgressEvent | null>(null);
  const [field, meta, { setValue }] = useField({ name });

  const handleDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        onLoading(true);
        if (acceptedFiles.length) {
          setValue('');
          const file = acceptedFiles[0];
          onFile(file);
          const { data } = await addFileToIpfs({
            file,
            uploadProgressHandler: (e: ProgressEvent) => setProgress(e),
          });
          if (data) {
            onResult(data);
            setValue(data?.previewUrl);
          }
          onLoading(false);
        }
      } catch (error) {
        console.log(error);
        onLoading(false);
      } finally {
        onLoading(false);
      }
    },
    [onFile, onLoading, onResult, setValue]
  );

  return (
    <FormDropzoneFieldWrapper>
      <Dropzone
        multiple={multiple}
        accept={accept}
        maxSize={maxSize}
        disabled={disabled}
        onDrop={handleDrop}
      />
      {!Boolean(field.value) && (
        <div className="progress-wrapper">
          {progress?.lengthComputable && progress?.isTrusted && (
            <div
              style={{
                width: `${Math.floor(
                  (progress?.loaded / progress?.total) * 100
                )}%`,
              }}
            ></div>
          )}
        </div>
      )}
      {meta.touched && meta.error ? (
        <div className="error">{meta.error} !</div>
      ) : null}
    </FormDropzoneFieldWrapper>
  );
};

export default FormDropzoneField;
