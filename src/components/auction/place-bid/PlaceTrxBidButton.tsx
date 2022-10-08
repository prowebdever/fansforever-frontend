import { useState, useCallback } from 'react';
import BigNumber from 'bignumber.js';
import TronGrid from 'trongrid/dist/trongrid';

import PlaceBidButton from './PlaceBidButton';

import { auctionEngineContractInstance } from 'contract-interactions/instances/auctionEngineContractInstance';
import { claimTokens } from 'contract-interactions/claimTokens';
import { placeTrxBid } from 'contract-interactions/placeTrxBid';
import config from 'config';

const PlaceTrxBidButton = ({
  auctionId,
  newTrxBidAmount,
  currentBidAmount,
  currentBidOwner,
}) => {
  const [isPlacingBid, setIsPlacingBid] = useState(false);

  const handlePlaceBid = useCallback(async () => {
    try {
      setIsPlacingBid(true);
      const contractInstance = await auctionEngineContractInstance();

      const _currentBidAmount = new BigNumber(currentBidAmount);
      const _userBidAmount = new BigNumber(newTrxBidAmount).multipliedBy(
        '1e+6'
      );

      if (currentBidOwner === window?.tronWeb?.defaultAddress.hex) {
        setIsPlacingBid(false);
        return alert('You are already the highest bidder');
      }
      if (_currentBidAmount.gte(_userBidAmount)) {
        setIsPlacingBid(false);
        return alert('Place a bid higher than the current bid amount!');
      }

      if (
        _currentBidAmount.lt(_userBidAmount) &&
        currentBidOwner !== window?.tronWeb?.defaultAddress.hex
      ) {
        alert('Claim your previous TRX prior to placing new bid.');
        await claimTokens(contractInstance, auctionId);
        const bidTransactionId = await placeTrxBid({
          contractInstance,
          auctionId,
          bidAmount: _userBidAmount.toFixed(),
        });
        const tronGrid = new TronGrid(window?.tronWeb);
        do {
          var events = await tronGrid.transaction.getEvents(bidTransactionId);
          console.log("bid events", events);
          if (events?.data?.length) {
            await fetch(`${config.apiBaseUrl}/events/auction/bids/event`, {
              method: 'POST',
              headers: {
                'content-type': 'application/json',
              },
              body: JSON.stringify({
                events: events.data[0]
              }),
            });
            alert('Bid placed successfully');
            setIsPlacingBid(false);
          } 
        }while(events?.data?.length === 0);
      }
    } catch (error) {
      console.error(error);
      alert('Failed to place bid');
      setIsPlacingBid(false);
    }
  }, [auctionId, currentBidAmount, currentBidOwner, newTrxBidAmount]);

  return (
    <PlaceBidButton isLoading={isPlacingBid} onPlaceBid={handlePlaceBid} />
  );
};

export default PlaceTrxBidButton;
