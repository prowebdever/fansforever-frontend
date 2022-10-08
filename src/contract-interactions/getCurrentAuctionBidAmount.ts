interface GetCurrentAuctionBidAmountProps {
  auctionId: number;
  contractInstance: any;
}

export const getCurrentAuctionBidAmount = async ({
  auctionId,
  contractInstance,
}: GetCurrentAuctionBidAmountProps) => {
  return contractInstance
    .getCurrentBidAmount(auctionId)
    .call()
    .then((resp: any) => parseInt(resp['_hex'], 16));
};
