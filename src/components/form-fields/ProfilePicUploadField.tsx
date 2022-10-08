import { useCallback } from 'react';
import styled from 'styled-components';
import { useField } from 'formik';
import { useMutation } from 'react-query';

import FlexColumnWrapper from 'components/common/FlexColumnWrapper';
import FlexRowWrapper from 'components/common/FlexRowWrapper';
import Spinner from 'components/Spinner';

import { addFileToIpfs } from 'apis/addFileToIPFS';

import { ReactComponent as UploadIcon } from 'assets/icons/upload.svg';

interface ProfilePicUploadFieldWrapperProps {
  canDelete: boolean;
  isLoading: boolean;
}

const ProfilePicUploadFieldWrapper = styled.div<ProfilePicUploadFieldWrapperProps>`
  width: 100%;

  & > ${FlexColumnWrapper} > ${FlexRowWrapper} {
    align-items: center;
  }

  label > ${FlexRowWrapper} {
    width: auto;
    align-items: center;
  }

  .upload-circle {
    width: 64px;
    height: 64px;

    background: ${({ theme }) => theme.backgroundColors.secondary};
    border: 1px dashed ${({ theme }) => theme.textColors.primary};
    box-sizing: border-box;
    display: grid;
    place-items: center;
    margin-right: 30px;
    border-radius: 50%;
    cursor: ${({ isLoading }) => (isLoading ? 'not-allowed' : 'pointer')};

    & > svg {
      width: 26px;
      height: 26px;
      color: ${({ theme }) => theme.textColors.primary};
    }

    ${Spinner} {
      width: 30px;
      height: 30px;
    }
  }

  .profile-picture {
    font-family: Inter;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 19px;

    color: ${({ theme }) => theme.textColors.primary};
    margin-bottom: 8px;
  }

  .upload-button {
    width: 100px;
    height: 29px;
    background: #cae2ff;
    border-radius: 8px;

    font-family: IBM Plex Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 17px;
    text-transform: uppercase;
    color: #000;
    display: grid;
    place-items: center;
    cursor: pointer;
    margin-right: 32px;
    cursor: ${({ isLoading }) => (isLoading ? 'not-allowed' : 'pointer')};
  }

  input[type='file'] {
    display: none;
  }

  .delete {
    height: 17px;
    font-family: IBM Plex Sans;
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 17px;
    text-transform: uppercase;
    color: ${({ canDelete, theme }) =>
      canDelete
        ? `${theme.textColors.primary}ff`
        : `${theme.textColors.primary}44`};
    cursor: ${({ canDelete }) => (canDelete ? 'pointer' : 'not-allowed')};
    margin-top: 28px;
  }

  .error {
    margin-top: 4px;
    color: ${({ theme }) => theme.accentColors.primary};
  }
`;

const ProfilePicUploadField = ({ name }: { name: string }) => {
  const [field, meta, { setValue }] = useField(name);

  const mutation = useMutation(addFileToIpfs, {});

  const handleFileUpload = useCallback(
    async (e) => {
      const file = e.target.files?.[0];
      if (file) {
        const { data } = await mutation.mutateAsync({ file });
        if (data) {
          setValue(data?.previewUrl);
        }
      }
    },
    [mutation, setValue]
  );

  return (
    <ProfilePicUploadFieldWrapper
      canDelete={Boolean(field.value)}
      isLoading={mutation.isLoading}
    >
      <FlexColumnWrapper>
        <FlexRowWrapper>
          <label htmlFor="profile-image">
            <FlexRowWrapper>
              <div className="upload-circle">
                {mutation.isLoading ? <Spinner /> : <UploadIcon />}
              </div>
              <FlexColumnWrapper style={{ width: 'auto' }}>
                <h3 className="profile-picture">Profile Picture</h3>
                <div className="upload-button">Upload</div>
              </FlexColumnWrapper>
            </FlexRowWrapper>
          </label>
          <div
            className="delete"
            onClick={() => {
              return field.value ? setValue('') : null;
            }}
          >
            Delete
          </div>
          <input
            type="file"
            id="profile-image"
            multiple={false}
            accept="image/jpeg,image/png"
            onChange={handleFileUpload}
            disabled={mutation.isLoading}
          />
        </FlexRowWrapper>
        {meta.touched && meta.error ? (
          <div className="error">{meta.error} !</div>
        ) : null}
      </FlexColumnWrapper>
    </ProfilePicUploadFieldWrapper>
  );
};

export default ProfilePicUploadField;
