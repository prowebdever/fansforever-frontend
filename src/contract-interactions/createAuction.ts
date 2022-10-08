interface CreateAuctionProps {
  contractInstance: any;
  userContractAddress: string;
  tokenId: number | string;
  startPrice: number | string;
  startTime: number;
  duration: number;
  instantSalePrice: number | string;
  trc20TokenAddress: string;
  shouldPollResponse?: boolean;
}

export const createAuction = ({
  contractInstance,
  userContractAddress,
  tokenId,
  startPrice,
  startTime,
  duration,
  instantSalePrice,
  trc20TokenAddress,
  shouldPollResponse = false,
}: CreateAuctionProps) => {
  if (window?.tronWeb?.ready) {
    return contractInstance
      .createAuction(
        userContractAddress,
        tokenId,
        startPrice,
        startTime,
        duration,
        instantSalePrice,
        trc20TokenAddress
      )
      .send({
        feeLimit: 100_000_000,
        callValue: 0,
        shouldPollResponse,
      });
  } else {
    throw new Error('Wallet not connected');
  }
};
