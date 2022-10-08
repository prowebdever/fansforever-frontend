import { useQuery } from 'react-query';

import { fetchAuctionBids } from 'apis/fetchAuctionBids';

const useAuctionBidsQuery = ({
  auctionId,
  currentAuctionStatus,
}: {
  auctionId: number;
  currentAuctionStatus: number;
}) => {
  const auctionBidsQuery = useQuery(
    ['auction-bids', auctionId],
    () => fetchAuctionBids(auctionId),
    {
      enabled: Boolean(auctionId),
      ...(currentAuctionStatus === 1 && { refetchInterval: 15000 }),
    }
  );

  return auctionBidsQuery;
};

export default useAuctionBidsQuery;
