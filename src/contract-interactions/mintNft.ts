interface MintNFTProps {
  contractInstance: any;
  userCryptoAddress: string;
  totalSupply: number;
  tokenIpfsHash: string;
  shouldPollResponse?: boolean;
}

export const mintNFT = async ({
  contractInstance,
  userCryptoAddress,
  totalSupply,
  tokenIpfsHash,
  shouldPollResponse = false,
}: MintNFTProps) => {
  if (window?.tronWeb?.ready) {
    console.log(userCryptoAddress)
    return contractInstance
      .mint(userCryptoAddress)
      .send({
        feeLimit: 100_000_000,
        callValue: 0,
        shouldPollResponse,
      });
  } else {
    throw new Error('Wallet not connected');
  }
};
