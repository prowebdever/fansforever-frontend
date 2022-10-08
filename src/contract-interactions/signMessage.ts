export const signMessage = async (values: {}) => {
  if (window?.tronWeb?.ready) {
    return window.tronWeb.trx.sign(
      window.tronWeb.toHex(JSON.stringify(values))
    );
  } else {
    throw new Error('Wallet not connected');
  }
};
