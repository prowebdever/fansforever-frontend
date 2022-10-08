export const trc20TokenContractInstance = async (trc20TokenAddress: string) => {
  if (window?.tronWeb?.ready) {
    return window.tronWeb.contract().at(trc20TokenAddress);
  } else {
    throw new Error('Wallet not connected');
  }
};
