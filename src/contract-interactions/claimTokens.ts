export const claimTokens = async (
  contractInstance: any,
  auctionId: number | string,
  shouldPollResponse = false
) => {
  if (window?.tronWeb?.ready) {
    return contractInstance.claimTokens(auctionId).send({
      feeLimit: 100_000_000,
      callValue: 0,
      shouldPollResponse,
    });
  } else {
    throw new Error('Wallet not connected');
  }
};
