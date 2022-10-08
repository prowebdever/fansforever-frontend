interface GetCurrentAuctionBidOwnerProps {
  auctionId: number;
  contractInstance: any;
}

export const getCurrentAuctionBidOwner = async ({
  auctionId,
  contractInstance,
}: GetCurrentAuctionBidOwnerProps) => {
  return contractInstance.getCurrentBidOwner(auctionId).call();
};
