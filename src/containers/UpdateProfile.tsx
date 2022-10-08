import { useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import { useMutation } from 'react-query';

import { RootState } from 'store';
import useAccountHandleProfileQuery from 'hooks/profile/useAccountHandleProfileQuery';
import { getProfileActionAsync } from 'actions/userActions';

import Container from 'components/layout/Container';
import FlexColumnWrapper from 'components/common/FlexColumnWrapper';
import PageTitle from 'components/common/PageTitle';
import PageSubtitle from 'components/common/PageSubtitle';
import ProfileForm from 'components/profile/ProfileForm';
import AnimatedSphere from 'components/AnimatedSphere';

import { updateProfile } from 'apis/updateProfile';
import { signMessage } from 'contract-interactions/signMessage';

const EditProfileWrapper = styled.div`
  padding: 50px 0;
  width: 100%;
`;

const UpdateProfile = () => {
  const { isWalletConnected } = useSelector((state: RootState) => state.wallet);

  const dispatch = useDispatch();
  const history = useHistory();
  const { handle: userAccountHandle } = useParams<{ handle: string }>();

  const {
    isIdle,
    data: userProfile,
    isLoading,
    isFetched,
    isError,
    error,
  } = useAccountHandleProfileQuery({ userAccountHandle });

  const updateProfileMutation = useMutation(updateProfile, {
    onError(err) {
      console.log(err);
    },
  });

  useEffect(() => {
    if (!isWalletConnected || !window?.tronWeb?.ready) {
      history.replace('/');
    }
  }, [isWalletConnected, history]);

  useEffect(() => {
    if (!isIdle && isError) {
      console.log(error);
      history.replace('/');
    }
  }, [isIdle, isError, error, history]);

  useEffect(() => {
    if (!isIdle && isFetched && !userProfile?.data) return history.replace('/');
  }, [isIdle, isFetched, userProfile, history]);

  const handleEditProfile = useCallback(
    async (values) => {
      try {
        const signedMessage = await signMessage(values);
        const { data } = await updateProfileMutation.mutateAsync({
          originalBody: values,
          signedMessage,
          userCryptoAddress: window?.tronWeb?.defaultAddress?.base58,
        });
        if (data) {
          toast.success('Profile update successfully', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: false,
            pauseOnHover: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
          });
          dispatch(getProfileActionAsync());
          setTimeout(() => {
            history.replace(`/profile/${values.userAccountHandle}`);
          }, 200);
        }
      } catch (error) {
        console.log(error);
        toast.error(error?.error || JSON.stringify(error), {
          position: 'top-center',
          autoClose: 2000,
          hideProgressBar: false,
          pauseOnHover: false,
          closeOnClick: true,
          draggable: true,
          progress: undefined,
        });
      }
    },
    [dispatch, history, updateProfileMutation]
  );

  if (isIdle || isLoading || !isFetched) return <AnimatedSphere />;

  return isFetched && Boolean(userProfile?.data) ? (
    <EditProfileWrapper>
      <Container>
        <FlexColumnWrapper>
          <PageTitle>Edit Profile</PageTitle>
          <PageSubtitle>This is how people will view you on Fan</PageSubtitle>
          <ProfileForm
            profileUpdateMode={true}
            isMutatingProfile={updateProfileMutation.isLoading}
            userProfile={userProfile?.data}
            onMutateProfile={handleEditProfile}
          />
        </FlexColumnWrapper>
      </Container>
    </EditProfileWrapper>
  ) : null;
};

export default UpdateProfile;
