export const claimAsset = async (
  contractInstance: any,
  auctionId: number | string,
  shouldPollResponse = false
) => {
  if (window?.tronWeb?.ready) {
    return contractInstance.claimAsset(auctionId).send({
      feeLimit: 100_000_000,
      callValue: 0,
      shouldPollResponse,
    });
  } else {
    throw new Error('Wallet not connected');
  }
};
