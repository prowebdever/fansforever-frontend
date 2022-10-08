import { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import AuctionInteractionButton from './AuctionInteractionButton';

import { auctionEngineContractInstance } from 'contract-interactions/instances/auctionEngineContractInstance';
import { claimWonBid } from 'contract-interactions/claimWonBid';
import { claimToken } from 'apis/updateAuction'

const ClaimWonBidInteraction: React.VFC<{ auctionId: number }> = ({
  auctionId,
}) => {
  const [isClaimingWonBid, setIsClaimingWonBid] = useState(false);
  const history = useHistory();
  const handleClaimWonBid = useCallback(async () => {
    try {
      setIsClaimingWonBid(true);
      const contractInstance = await auctionEngineContractInstance();
      await claimWonBid(contractInstance, auctionId);
      await claimToken({isTokenClaimed: true, auctionId})
      setIsClaimingWonBid(false);
      history.push('/')
    } catch (error) {
      console.log('Handle Claim Won Bid Error: ', error);
      alert('Failed to claim won bid ');
      setIsClaimingWonBid(false);
    }
  }, [auctionId, history]);

  return (
    <AuctionInteractionButton
      label="Auction Sold"
      buttonText="Claim your winning bid amount"
      onButtonClick={handleClaimWonBid}
      isLoading={isClaimingWonBid}
      loadingText="Claiming your winnings..."
    />
  );
};

export default ClaimWonBidInteraction;
