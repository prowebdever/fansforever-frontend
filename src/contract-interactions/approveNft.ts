import config from 'config';

interface ApproveNftProps {
  contractInstance: any;
  tokenId: number | string;
  shouldPollResponse?: boolean;
}

export const approveNft = async ({
  contractInstance,
  tokenId,
  shouldPollResponse = false,
}: ApproveNftProps) => {
  if (window?.tronWeb?.ready) {
    return contractInstance
      .approve(config.masterAuctionContractAddress, tokenId)
      .send({
        feeLimit: 100_000_000,
        callValue: 0,
        shouldPollResponse,
      });
  } else {
    throw new Error('Wallet not connected');
  }
};
