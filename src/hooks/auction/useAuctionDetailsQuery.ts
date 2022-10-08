import { useQuery } from 'react-query';

import { fetchAuctionDetails } from 'apis/fetchAuctionDetails';

const useAuctionDetailsQuery = ({ auctionId }: { auctionId: number }) => {
  const auctionDetailsQuery = useQuery(
    ['auction', auctionId],
    () => fetchAuctionDetails(auctionId),
    {
      enabled: Boolean(auctionId),
    }
  );

  return auctionDetailsQuery;
};

export default useAuctionDetailsQuery;
