import { useQuery } from 'react-query';

import { getMessageHandler } from 'apis/chatAPI';

const useGetChatDataQuery = ({
  auctionId,
  from,
  to
}: {
  auctionId: number;
  from: string;
  to: string;
}) => {
  const chatdataQuery = useQuery(
    ['get-chatdata',from, to, auctionId],
    () => getMessageHandler({from, to, auctionId}),
    {
      enabled: Boolean(auctionId),
      ...({ refetchInterval: 5000 }),
    }
  );

  return chatdataQuery;
};

export default useGetChatDataQuery;
