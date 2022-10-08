import { useQuery } from 'react-query';

import { fetchProfile } from 'apis/fetchProfile';

const useCryptoAddressProfileQuery = ({
  userCryptoAddress,
}: {
  userCryptoAddress: string;
}) => {
  const profileQuery = useQuery(
    ['user-profile', userCryptoAddress],
    () =>
      fetchProfile({
        userCryptoAddress,
      }),
    {
      enabled: Boolean(userCryptoAddress),
    }
  );

  return profileQuery;
};

export default useCryptoAddressProfileQuery;
