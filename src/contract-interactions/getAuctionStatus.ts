interface GetAuctionStatusProps {
  auctionId: number;
  contractInstance: any;
}

export const getAuctionStatus = async ({
  auctionId,
  contractInstance,
}: GetAuctionStatusProps) => {
  return contractInstance.getStatus(auctionId).call();
};
