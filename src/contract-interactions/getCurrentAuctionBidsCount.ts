interface GetCurrentAuctionBidsCountProps {
  auctionId: number;
  contractInstance: any;
}

export const getCurrentAuctionBidsCount = async ({
  auctionId,
  contractInstance,
}: GetCurrentAuctionBidsCountProps) => {
  return contractInstance
    .getBidCount(auctionId)
    .call()
    .then((resp: any) => parseInt(resp['_hex'], 16));
};
