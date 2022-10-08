import { useMemo } from 'react';
import styled from 'styled-components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { useMutation } from 'react-query';
import { ImFacebook2, ImTwitter } from 'react-icons/im';
import { SiInstagram, SiYoutube, SiSpotify } from 'react-icons/si';

import FlexRowWrapper from 'components/common/FlexRowWrapper';
import ProfilePicUploadField from 'components/form-fields/ProfilePicUploadField';
import FormTextField from 'components/form-fields/FormTextField';
import FormTextAreaField from 'components/form-fields/FormTextAreaField';
import SocialMediaFormField from 'components/form-fields/SocialMediaFormField';
import ProfilePreviewCard from 'components/profile/ProfilePreviewCard';
import Spinner from 'components/Spinner';

import { checkUserExists } from 'apis/checkUserExists';

const ProfileFormWrapper = styled.div`
  width: 100%;

  form {
    width: 100%;
  }

  .profile-form {
    margin-top: 20px;

    .section-label {
      font-family: Inter;
      font-style: normal;
      font-weight: bold;
      font-size: 16px;
      line-height: 19px;
      color: ${({ theme }) => theme.textColors.primary};
      margin-bottom: 16px;
      text-transform: uppercase;
    }
  }

  button {
    width: 451px;
    height: 47px;

    @media screen and (max-width: 575px) {
      width: 400px;
    }

    @media screen and (max-width: 425px) {
      width: 100%;
    }

    background: ${({ theme }) => theme.accentColors.primary};
    border-radius: 5px;
    outline: none;
    border: none;
    cursor: pointer;

    font-family: 'IBM Plex Sans';
    font-style: normal;
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    text-transform: uppercase;
    color: #ffffff;
    margin: 40px auto 0 auto;

    display: flex;
    justify-content: center;
    align-items: center;

    position: relative;

    ${Spinner} {
      width: 30px;
      height: 30px;
      margin-right: 20px;
    }

    svg {
      position: absolute;
      left: 40px;
      color: #ffffff;
    }
  }

  .grid-layout {
    display: grid;
    grid-template-columns: min-content min-content min-content;
    grid-column-gap: 50px;
    justify-content: center;

    @media screen and (max-width: 900px) {
      grid-template-columns: min-content;
      place-items: center;
      grid-row-gap: 32px;
    }
  }

  .grid-column-1 {
    order: 1;
    @media screen and (max-width: 900px) {
      order: 2;
    }
  }

  .grid-column-2 {
    order: 2;
    @media screen and (max-width: 900px) {
      display: none;
      order: 3;
    }

    .divider {
      height: 700px;
      width: 0px;
      border: 1px solid #b2cbc7;
    }
  }

  .grid-column-3 {
    order: 3;
    @media screen and (max-width: 900px) {
      order: 1;
    }

    .preview-title {
      font-family: Clash Grotesk;
      font-style: normal;
      font-weight: bold;
      font-size: 32px;
      line-height: 39px;
      color: ${({ theme }) => theme.textColors.tertiary};
      margin-bottom: 16px;
      text-transform: uppercase;
      margin-top: 20px;
    }
  }
`;

export const initialValues = {
  uuid: '',
  userBannerImageUrl: '',
  userProfileImageUrl: '',
  username: '',
  userAccountHandle: '',
  userCryptoAddress: '',
  userDescription: '',
  userSocials: {
    twitter: '',
    facebook: '',
    instagram: '',
    youtube: '',
    spotify: '',
  },
};

const validationSchema = Yup.object().shape({
  uuid: Yup.string().uuid().required(),
  userBannerImageUrl: Yup.string().url(),
  userProfileImageUrl: Yup.string().url(),
  username: Yup.string().required('Name is a required field'),
  userCryptoAddress: Yup.string().required(),
  userDescription: Yup.string().required('Bio is a required field'),
  userSocials: Yup.object().shape({
    twitter: Yup.string().url('Link must be a valid URL'),
    facebook: Yup.string().url('Link must be a valid URL'),
    instagram: Yup.string().url('Link must be a valid URL'),
    youtube: Yup.string().url('Link must be a valid URL'),
    spotify: Yup.string().url('Link must be a valid URL'),
  }),
});

const socialIcons = {
  twitter: ImTwitter,
  facebook: ImFacebook2,
  instagram: SiInstagram,
  youtube: SiYoutube,
  spotify: SiSpotify,
};

interface ProfileFormProps {
  userProfile?: {
    uuid: string;
    userBannerImageUrl: string;
    userProfileImageUrl: string;
    username: string;
    userAccountHandle: string;
    userCryptoAddress: string;
    userDescription: string;
    userSocials: {
      twitter: string;
      facebook: string;
      instagram: string;
      youtube: string;
      spotify: string;
    };
  };
  isMutatingProfile: boolean;
  onMutateProfile: (values: any) => void;
  profileUpdateMode?: boolean;
}

const ProfileForm: React.VFC<ProfileFormProps> = ({
  userProfile = {},
  isMutatingProfile,
  onMutateProfile,
  profileUpdateMode = false,
}) => {
  const checkUserExistsMutation = useMutation(checkUserExists);

  const initialProfileValues = useMemo(
    () => ({
      ...initialValues,
      uuid: uuidv4(),
      ...(userProfile && userProfile),
    }),
    [userProfile]
  );

  const validateUserAccountHandle = async (value: string) => {
    let error: string | undefined;
    if (!value) {
      error = 'Account handle cannot be empty';
      return error;
    }
    if (value.length > 30) {
      error = 'Account handle cannot be longer than 30 characters';
      return error;
    }
    try {
      const { data } = await checkUserExistsMutation.mutateAsync({
        userAccountHandle: value,
      });
      if (data && data?.userExists) {
        error = 'Account Handle already taken';
      }
    } catch (err) {
      return err.message || JSON.stringify(err);
    }
    return error;
  };

  return (
    <ProfileFormWrapper>
      <Formik
        key={initialProfileValues.uuid}
        initialValues={initialProfileValues}
        validationSchema={validationSchema}
        validateOnMount={false}
        validateOnChange={false}
        validateOnBlur={true}
        enableReinitialize={true}
        onSubmit={onMutateProfile}
      >
        {() => (
          <Form>
            <div className="grid-layout">
              <div className="grid-column-1">
                <div className="profile-form">
                  <ProfilePicUploadField name="userProfileImageUrl" />
                  <FormTextField
                    label="Name"
                    name="username"
                    placeholder="Enter your name"
                    style={{ marginTop: 38 }}
                  />
                  <FormTextAreaField
                    label="Bio"
                    name="userDescription"
                    placeholder="Enter your bio"
                  />
                  {!profileUpdateMode && (
                    <FormTextField
                      label="Username"
                      name="userAccountHandle"
                      placeholder="Example: TronKing"
                      validate={validateUserAccountHandle}
                    />
                  )}
                  <h1 className="section-label">Social Media</h1>
                  {Object.keys(initialProfileValues.userSocials)
                    .filter((key) => key !== 'linkedIn')
                    .map((key, i) => (
                      <SocialMediaFormField
                        key={i}
                        icon={socialIcons[key]}
                        name={`userSocials.${key}`}
                        placeholder={`Enter your ${key} account URL`}
                      />
                    ))}
                  <FlexRowWrapper>
                    <button type="submit" disabled={isMutatingProfile}>
                      {isMutatingProfile ? (
                        <>
                          <Spinner />
                          {profileUpdateMode ? 'Updating' : 'Creating'} Profile
                          ...
                        </>
                      ) : (
                        <>
                          {profileUpdateMode ? 'Update' : 'Create'} Your Profile
                        </>
                      )}
                    </button>
                  </FlexRowWrapper>
                </div>
              </div>
              <div className="grid-column-2">
                <div className="divider" />
              </div>
              <div className="grid-column-3">
                <h1 className="preview-title">Preview</h1>
                <ProfilePreviewCard />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </ProfileFormWrapper>
  );
};

export default ProfileForm;
