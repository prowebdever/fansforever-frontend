export const getTotalSupply = async (contractInstance: any) => {
  if (window?.tronWeb?.ready) {
    return contractInstance
      .totalSupply()
      .call()
      .then((resp: any) => parseInt(resp['_hex'], 16));
  } else {
    throw new Error('Wallet not connected');
  }
};
