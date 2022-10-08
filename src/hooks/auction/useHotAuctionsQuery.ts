import { useQuery } from 'react-query';

import { fetchHotAuctions } from 'apis/fetchHotAuctions';

const useHotAuctionsQuery = () => {
  const hotAuctionsQuery = useQuery('hot-auctions', fetchHotAuctions);

  return hotAuctionsQuery;
};

export default useHotAuctionsQuery;
