interface BuyNowWithTRC20Props {
  contractInstance: any;
  auctionId: number | string;
  instantSalePrice: number | string;
  shouldPollResponse?: boolean;
}

export const buyNowWithTRC20 = async ({
  contractInstance,
  auctionId,
  instantSalePrice,
  shouldPollResponse = false,
}: BuyNowWithTRC20Props) => {
  if (window?.tronWeb?.ready) {
    return contractInstance.instantBuyAssetWithTRC20(auctionId, instantSalePrice).send({
      feeLimit: 100_000_000,
      callValue: 0,
      shouldPollResponse,
    });
  } else {
    throw new Error('Wallet not connected');
  }
};
