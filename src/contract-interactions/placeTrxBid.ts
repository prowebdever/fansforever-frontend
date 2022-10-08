interface PlaceTrxBidProps {
  contractInstance: any;
  auctionId: number | string;
  bidAmount: number | string;
  shouldPollResponse?: boolean;
}

export const placeTrxBid = async ({
  contractInstance,
  auctionId,
  bidAmount,
  shouldPollResponse = false,
}: PlaceTrxBidProps) => {
  if (window?.tronWeb?.ready) {
    return contractInstance.bidTRX(auctionId).send({
      feeLimit: 100_000_000,
      callValue: bidAmount,
      shouldPollResponse,
    });
  } else {
    throw new Error('Wallet not connected');
  }
};
