import { useQuery } from 'react-query';

import { fetchAuctionsList } from 'apis/fetchAuctionsList';

const useAuctionsListQuery = () => {
  const auctionsListQuery = useQuery('auctions-list', fetchAuctionsList);

  return auctionsListQuery;
};

export default useAuctionsListQuery;
