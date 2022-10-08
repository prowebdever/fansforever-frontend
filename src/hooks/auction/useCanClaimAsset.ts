import { useState, useEffect } from 'react';

import { readOnlyAuctionEngineContractInstance } from 'contract-interactions/instances/readOnlyAuctionEngineContractInstance';
import { getAuctionWinner } from 'contract-interactions/getAuctionWinner';

const useCanClaimAsset = ({
  auctionId,
  currentAuctionStatus,
}: {
  auctionId: number;
  currentAuctionStatus: number;
}) => {
  const [canClaimAsset, setCanClaimAsset] = useState(false);

  useEffect(() => {
    (async function () {
      if (currentAuctionStatus === 2) {
        const contractInstance = await readOnlyAuctionEngineContractInstance();
        const address = await getAuctionWinner({ auctionId, contractInstance });
        if (address === window?.tronWeb?.defaultAddress?.hex) {
          setCanClaimAsset(true);
        }
      }
    })();
  }, [currentAuctionStatus, auctionId]);

  return { canClaimAsset };
};

export default useCanClaimAsset;
