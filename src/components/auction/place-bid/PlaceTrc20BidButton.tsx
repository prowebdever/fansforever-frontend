import { useState, useCallback } from 'react';
import BigNumber from 'bignumber.js';
import TronGrid from 'trongrid/dist/trongrid';

import PlaceBidButton from './PlaceBidButton';

import config from 'config';

import { auctionEngineContractInstance } from 'contract-interactions/instances/auctionEngineContractInstance';
import { claimTokens } from 'contract-interactions/claimTokens';
import { placeTrc20Bid } from 'contract-interactions/placeTrc20Bid';
import { trc20TokenContractInstance } from 'contract-interactions/instances/trc20TokenContractInstance';
import { approveTrc20Spender } from 'contract-interactions/approveTrc20Spender';

const PlaceTrc20BidButton = ({
  auctionId,
  newTrc20BidAmount,
  currentBidAmount,
  currentBidOwner,
  trc20TokenAddress,
}) => {
  const [isPlacingBid, setIsPlacingBid] = useState(false);

  const handlePlaceBid = useCallback(async () => {
    try {
      setIsPlacingBid(true);
      const contractInstance = await auctionEngineContractInstance();

      const _currentBidAmount = new BigNumber(currentBidAmount);
      const _userBidAmount = new BigNumber(newTrc20BidAmount).multipliedBy(
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
        alert('Claim your previous TRC20 Tokens prior to placing new bid.');
        await claimTokens(contractInstance, auctionId);
        // TRC20 Token Contract Instance
        const trc20ContractInstance = await trc20TokenContractInstance(
          trc20TokenAddress
        );
        alert('Approve Auction to receive TRC20 Token transfer');
        await approveTrc20Spender({
          contractInstance: trc20ContractInstance,
          spenderAddress: config.masterAuctionContractAddress,
          amount: _userBidAmount.toFixed(),
        });
        alert('Approve your account to transfer TRC20 Tokens');
        await approveTrc20Spender({
          contractInstance: trc20ContractInstance,
          spenderAddress: window?.tronWeb?.defaultAddress?.base58,
          amount: _userBidAmount.toFixed(),
        });

        const bidTransactionId = await placeTrc20Bid({
          contractInstance,
          auctionId,
          bidAmount: _userBidAmount.toFixed(),
        });
        const tronGrid = new TronGrid(window?.tronWeb);
        setTimeout(async () => {
          const events = await tronGrid.transaction.getEvents(bidTransactionId);
          if (events?.data?.length) {
            alert('Bid placed successfully');
            setIsPlacingBid(false);
          } else {
            alert('Failed to place bid');
            setIsPlacingBid(false);
          }
        }, 20000);
      }
    } catch (error) {
      console.log(error);
    }
  }, [
    auctionId,
    currentBidAmount,
    currentBidOwner,
    newTrc20BidAmount,
    trc20TokenAddress,
  ]);

  return (
    <PlaceBidButton isLoading={isPlacingBid} onPlaceBid={handlePlaceBid} />
  );
};

export default PlaceTrc20BidButton;
