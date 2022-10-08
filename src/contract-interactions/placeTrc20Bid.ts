interface PlaceTrc20BidProps {
  contractInstance: any;
  auctionId: number | string;
  bidAmount: number | string;
  shouldPollResponse?: boolean;
}

export const placeTrc20Bid = async ({
  contractInstance,
  auctionId,
  bidAmount,
  shouldPollResponse = false,
}: PlaceTrc20BidProps) => {
  if (window?.tronWeb?.ready) {
    return contractInstance.bidTRC20(auctionId, bidAmount).send({
      feeLimit: 100_000_000,
      callValue: 0,
      shouldPollResponse,
    });
  } else {
    throw new Error('Wallet not connected');
  }
};
