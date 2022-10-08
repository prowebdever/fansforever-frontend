interface BurnNftProps {
  contractInstance: any;
  tokenId: number | string;
  shouldPollResponse: boolean;
}

export const burnNft = async ({
  contractInstance,
  tokenId,
  shouldPollResponse = false
}: BurnNftProps) => {
  if (window?.tronWeb?.ready) {
    return await contractInstance
      .burn(tokenId)
      .send({
        feeLimit: 100_000_000,
        callValue: 0,
        shouldPollResponse,
      });
  } else {
    throw new Error('Wallet not connected');
  }
};
