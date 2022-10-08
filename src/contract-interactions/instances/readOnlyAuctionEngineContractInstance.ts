import TronWeb from 'tronweb';

import config from 'config';

const tronWeb = new TronWeb({ fullHost: config.fullhost });
tronWeb.setAddress(config.trxTokenAddress);

export const readOnlyAuctionEngineContractInstance = async () => {
  return tronWeb.contract().at(config.masterAuctionContractAddress);
};
