import { useState, useEffect } from 'react';

import { readOnlyAuctionEngineContractInstance } from 'contract-interactions/instances/readOnlyAuctionEngineContractInstance';
import { getAuctionStatus } from 'contract-interactions/getAuctionStatus';
import { getCurrentAuctionBidOwner } from 'contract-interactions/getCurrentAuctionBidOwner';
import { getCurrentAuctionBidsCount } from 'contract-interactions/getCurrentAuctionBidsCount';
import { getCurrentAuctionBidAmount } from 'contract-interactions/getCurrentAuctionBidAmount';

const useAuctionBlockchainDetails = ({
  auctionId,
  pollingInterval = 1000,
  shouldPoll = true,
}: {
  auctionId: number;
  pollingInterval?: number;
  shouldPoll?: boolean;
}) => {
  const [currentAuctionStatus, setCurrentAuctionStatus] = useState(0);
  const [currentBidOwner, setCurrentBidOwner] = useState(null);
  const [currentBidCount, setCurrentBidCount] = useState(0);
  const [currentBidAmount, setCurrentBidAmount] = useState(0);

  useEffect(() => {
    async function fetchBlockchainAuctionInfo() {
      try {
        const contractInstance = await readOnlyAuctionEngineContractInstance();
        if (contractInstance) {
          setCurrentAuctionStatus(
            await getAuctionStatus({
              auctionId,
              contractInstance,
            })
          );
          setCurrentBidOwner(
            await getCurrentAuctionBidOwner({ auctionId, contractInstance })
          );
          setCurrentBidCount(
            await getCurrentAuctionBidsCount({
              auctionId,
              contractInstance,
            })
          );
          setCurrentBidAmount(
            await getCurrentAuctionBidAmount({
              auctionId,
              contractInstance,
            })
          );
        }
      } catch (error) {
        console.log(error);
      }
    }

    if (auctionId) {
      fetchBlockchainAuctionInfo();
    }
    //console.log(currentAuctionStatus)
    let interval: NodeJS.Timeout | null = null;
    if (auctionId && currentAuctionStatus === 1 && shouldPoll) {
      interval = setInterval(fetchBlockchainAuctionInfo, pollingInterval);
    }

    return () => {
      Boolean(interval) && clearInterval();
    };
  }, [auctionId, currentAuctionStatus, pollingInterval, shouldPoll]);

  return {
    currentAuctionStatus,
    currentBidOwner,
    currentBidCount,
    currentBidAmount,
  };
};

export default useAuctionBlockchainDetails;
