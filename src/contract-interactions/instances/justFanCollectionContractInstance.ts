import config from 'config';

export const justFanCollectionContractInstance = async () => {
  if (window?.tronWeb?.ready) {
    return window.tronWeb
      .contract()
      .at(config.justFanCollectionContractAddress);
  } else {
    throw new Error('Wallet not connected');
  }
};
