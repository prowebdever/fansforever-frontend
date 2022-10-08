import config from 'config';

export const auctionEngineContractInstance = async () => {
  if (window?.tronWeb?.ready) {
    return window.tronWeb.contract().at(config.masterAuctionContractAddress);
  } else {
    throw new Error('Wallet not connected');
  }
};
