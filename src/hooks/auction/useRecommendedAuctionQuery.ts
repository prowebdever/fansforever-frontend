import { useQuery } from 'react-query';

import { fetchRecommendedAuction } from 'apis/fetchRecommendedAuction';

const useRecommendedAuctionQuery = () => {
  const recommendedAuctionQuery = useQuery(
    'recommended-auction',
    fetchRecommendedAuction
  );

  return recommendedAuctionQuery;
};

export default useRecommendedAuctionQuery;
