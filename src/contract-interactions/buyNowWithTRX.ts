interface BuyNowWithTRXProps {
  contractInstance: any;
  auctionId: number | string;
  instantSalePrice: number | string;
  shouldPollResponse?: boolean;
}

export const buyNowWithTRX = async ({
  contractInstance,
  auctionId,
  instantSalePrice,
  shouldPollResponse = false,
}: BuyNowWithTRXProps) => {
  if (window?.tronWeb?.ready) {
    try{
      return contractInstance.instantBuyAssetWithTRX(auctionId).send({
        feeLimit: 100_000_000,
        callValue: instantSalePrice,
        shouldPollResponse,
      });  
    }catch(error){
      console.log(error)
    }
  } else {
    throw new Error('Wallet not connected');
  }
};
