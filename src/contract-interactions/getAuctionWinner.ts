interface GetAuctionWinnerProps {
  auctionId: number;
  contractInstance: any;
}

export const getAuctionWinner = async ({
  auctionId,
  contractInstance,
}: GetAuctionWinnerProps) => {
  return contractInstance.getWinner(auctionId).call();
};
