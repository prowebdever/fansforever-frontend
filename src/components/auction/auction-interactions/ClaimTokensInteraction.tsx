import { useState, useCallback } from 'react';

import AuctionInteractionButton from './AuctionInteractionButton';

import { auctionEngineContractInstance } from 'contract-interactions/instances/auctionEngineContractInstance';
import { claimTokens } from 'contract-interactions/claimTokens';

const ClaimTokensInteraction: React.VFC<{ auctionId: number }> = ({
  auctionId,
}) => {
  const [isClaimingTokens, setIsClaimingTokens] = useState(false);

  const handleClaimTokens = useCallback(async () => {
    try {
      setIsClaimingTokens(true);
      const contractInstance = await auctionEngineContractInstance();
      const response = await claimTokens(contractInstance, auctionId);
      if (response) {
        setIsClaimingTokens(false);
        alert('Claim requested! Check your wallet for returns');
      }
    } catch (error) {
      console.log('Handle Claim Trx Error: ', error);
      alert('Failed to claim back assets');
      setIsClaimingTokens(false);
    }
  }, [auctionId]);

  return (
    <AuctionInteractionButton
      label="Reclaim Tokens"
      buttonText="Claim your previous bid tokens!"
      onButtonClick={handleClaimTokens}
      isLoading={isClaimingTokens}
      loadingText="Claiming previous bid tokens..."
    />
  );
};

export default ClaimTokensInteraction;
