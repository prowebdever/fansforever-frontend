import { useQuery } from 'react-query';

import { fetchProfile } from 'apis/fetchProfile';

const useAccountHandleProfileQuery = ({
  userAccountHandle,
}: {
  userAccountHandle: string;
}) => {
  const profileQuery = useQuery(
    ['user-profile', userAccountHandle],
    () =>
      fetchProfile({
        userAccountHandle,
      }),
    {
      enabled: Boolean(userAccountHandle),
    }
  );

  return profileQuery;
};

export default useAccountHandleProfileQuery;
