import { useEffect, useMemo, useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { v4 as uuidv4 } from 'uuid';

import { getProfileActionAsync } from 'actions/userActions';

import config from 'config';
import { RootState } from 'store';

import Container from 'components/layout/Container';
import PageTitle from 'components/common/PageTitle';
import PageSubtitle from 'components/common/PageSubtitle';
import ProfileForm, { initialValues } from 'components/profile/ProfileForm';

import { createProfile } from 'apis/createProfile';

const CreateProfileWrapper = styled.div`
  padding: 50px 0;
  width: 100%;
`;

const CreateProfile = () => {
  const { isWalletConnected } = useSelector((state: RootState) => state.wallet);
  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();
  const history = useHistory();

  const createProfileMutation = useMutation(createProfile);

  useEffect(() => {
    if (!isWalletConnected || !window?.tronWeb?.ready) {
      history.replace('/');
    }
  }, [isWalletConnected, history]);

  useEffect(() => {
    if (user?.profile) {
      history.replace(`/profile/${user.profile.userAccountHandle}`);
    }
  }, [user, history]);

  const initialProfileValues = useMemo(
    () => ({
      ...initialValues,
      uuid: uuidv4(),
      ...(Boolean(isWalletConnected && window?.tronWeb?.ready) && {
        userCryptoAddress: window?.tronWeb?.defaultAddress?.base58,
      }),
    }),
    [isWalletConnected]
  );

  const handleCreateProfile = useCallback(
    async (values) => {
      try {
        const { data } = await createProfileMutation.mutateAsync({
          ...values,
          userContractAddress: config.justFanCollectionContractAddress,
        });
        if (data) {
          dispatch(getProfileActionAsync());
          toast.success('Profile created successfully', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            pauseOnHover: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
          });
          setTimeout(() => {
            history.replace(`/profile/${values.userAccountHandle}`);
          }, 500);
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    },
    [createProfileMutation, dispatch, history]
  );

  return (
    <CreateProfileWrapper>
      <Container>
        <PageTitle>Create Your Profile</PageTitle>
        <PageSubtitle>This is how people will view you on Fan</PageSubtitle>
        <ProfileForm
          userProfile={initialProfileValues}
          isMutatingProfile={createProfileMutation.isLoading}
          onMutateProfile={handleCreateProfile}
        />
      </Container>
    </CreateProfileWrapper>
  );
};

export default CreateProfile;
