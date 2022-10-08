interface MintNFTProps {
  contractInstance: any;
  creatoraddress: string;
  approved:boolean;
  shouldPollResponse: boolean;
}

export const setApprovalForAll = async ({
  contractInstance,
  creatoraddress,
  approved = true,
  shouldPollResponse = false
}: MintNFTProps) => {
  if (window?.tronWeb?.ready) {
    return contractInstance
      .setApprovalForAll(creatoraddress, approved)
      .send({
        feeLimit: 100_000_000,
        callValue: 0,
        shouldPollResponse,
      });
  } else {
    throw new Error('Wallet not connected');
  }
};
